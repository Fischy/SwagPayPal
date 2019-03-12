<?php declare(strict_types=1);
/**
 * (c) shopware AG <info@shopware.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SwagPayPal\Test\Core\Checkout\Payment\Cart\PaymentHandler;

use PHPUnit\Framework\TestCase;
use Shopware\Core\Checkout\Order\Aggregate\OrderTransaction\OrderTransactionDefinition;
use Shopware\Core\Defaults;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\Test\TestCaseBase\KernelTestBehaviour;
use Shopware\Core\System\StateMachine\StateMachineRegistry;
use SwagPayPal\Core\Checkout\Payment\Cart\PaymentHandler\PayPalPayment;
use SwagPayPal\SwagPayPal;
use SwagPayPal\Test\Helper\ConstantsForTesting;
use SwagPayPal\Test\Helper\PaymentTransactionTrait;
use SwagPayPal\Test\Helper\ServicesTrait;
use SwagPayPal\Test\Mock\DIContainerMock;
use SwagPayPal\Test\Mock\PayPal\Client\_fixtures\CreateResponseFixture;
use SwagPayPal\Test\Mock\Repositories\DefinitionRegistryMock;
use SwagPayPal\Test\Mock\Repositories\OrderTransactionRepoMock;
use SwagPayPal\Test\Mock\Setting\Service\SettingsServiceMock;
use Symfony\Component\HttpFoundation\Request;

class PayPalPaymentTest extends TestCase
{
    use PaymentTransactionTrait,
        ServicesTrait,
        KernelTestBehaviour;

    public const PAYER_ID_PAYMENT_INCOMPLETE = 'testPayerIdIncomplete';

    /**
     * @var EntityRepositoryInterface
     */
    private $orderTransactionRepo;

    /**
     * @var StateMachineRegistry
     */
    private $stateMachineRegistry;

    /**
     * @var DefinitionRegistryMock
     */
    private $definitionRegistry;

    protected function setUp(): void
    {
        $this->definitionRegistry = new DefinitionRegistryMock([], new DIContainerMock());
        $this->orderTransactionRepo = $this->definitionRegistry->getRepository(OrderTransactionDefinition::getEntityName());
        /** @var StateMachineRegistry $stateMachineRegistry */
        $stateMachineRegistry = $this->getContainer()->get(StateMachineRegistry::class);
        $this->stateMachineRegistry = $stateMachineRegistry;
    }

    public function testPay(): void
    {
        $handler = $this->createPayPalPaymentHandler();

        $paymentTransaction = $this->createPaymentTransactionStruct();
        $context = Context::createDefaultContext();
        $response = $handler->pay($paymentTransaction, $context);

        static::assertNotNull($response);
        if ($response === null) {
            return;
        }

        static::assertSame(CreateResponseFixture::CREATE_PAYMENT_APPROVAL_URL, $response->getTargetUrl());

        /** @var OrderTransactionRepoMock $orderTransactionRepo */
        $orderTransactionRepo = $this->orderTransactionRepo;
        $updatedData = $orderTransactionRepo->getData();
        static::assertSame(
            CreateResponseFixture::CREATE_PAYMENT_ID,
            $updatedData['attributes'][SwagPayPal::PAYPAL_TRANSACTION_ATTRIBUTE_NAME]
        );
    }

    public function testFinalizeSale(): void
    {
        $handler = $this->createPayPalPaymentHandler();

        $transactionId = 'testTransactionId';
        $request = $this->createRequest();
        $context = Context::createDefaultContext();
        $handler->finalize($transactionId, $request, $context);
        /** @var OrderTransactionRepoMock $orderTransactionRepo */
        $orderTransactionRepo = $this->orderTransactionRepo;
        $updatedData = $orderTransactionRepo->getData();

        $expectedStateId = $this->stateMachineRegistry->getStateByTechnicalName(
            Defaults::ORDER_TRANSACTION_STATE_MACHINE,
            Defaults::ORDER_TRANSACTION_STATES_PAID,
            $context
        )->getId();

        static::assertSame($transactionId, $updatedData['id']);
        static::assertSame($expectedStateId, $updatedData['stateId']);
    }

    public function testFinalizeAuthorization(): void
    {
        $handler = $this->createPayPalPaymentHandler();

        $transactionId = 'testTransactionId';
        $request = $this->createRequest();
        $request->query->set(
            PayPalPayment::PAYPAL_REQUEST_PARAMETER_PAYER_ID,
            ConstantsForTesting::PAYER_ID_PAYMENT_AUTHORIZE
        );
        $context = Context::createDefaultContext();
        $handler->finalize($transactionId, $request, $context);
        /** @var OrderTransactionRepoMock $orderTransactionRepo */
        $orderTransactionRepo = $this->orderTransactionRepo;
        $updatedData = $orderTransactionRepo->getData();

        $expectedStateId = $this->stateMachineRegistry->getStateByTechnicalName(
            Defaults::ORDER_TRANSACTION_STATE_MACHINE,
            Defaults::ORDER_TRANSACTION_STATES_OPEN,
            $context
        )->getId();

        static::assertSame($transactionId, $updatedData['id']);
        static::assertSame($expectedStateId, $updatedData['stateId']);
    }

    public function testFinalizeOrder(): void
    {
        $handler = $this->createPayPalPaymentHandler();

        $transactionId = 'testTransactionId';
        $request = $this->createRequest();
        $request->query->set(
            PayPalPayment::PAYPAL_REQUEST_PARAMETER_PAYER_ID,
            ConstantsForTesting::PAYER_ID_PAYMENT_ORDER
        );
        $context = Context::createDefaultContext();
        $handler->finalize($transactionId, $request, $context);
        /** @var OrderTransactionRepoMock $orderTransactionRepo */
        $orderTransactionRepo = $this->orderTransactionRepo;
        $updatedData = $orderTransactionRepo->getData();

        $expectedStateId = $this->stateMachineRegistry->getStateByTechnicalName(
            Defaults::ORDER_TRANSACTION_STATE_MACHINE,
            Defaults::ORDER_TRANSACTION_STATES_OPEN,
            $context
        )->getId();

        static::assertSame($transactionId, $updatedData['id']);
        static::assertSame($expectedStateId, $updatedData['stateId']);
    }

    public function testFinalizeWithCancel(): void
    {
        $handler = $this->createPayPalPaymentHandler();

        $transactionId = 'testTransactionId';
        $request = new Request(['cancel' => true]);
        $context = Context::createDefaultContext();
        $handler->finalize($transactionId, $request, $context);
        /** @var OrderTransactionRepoMock $orderTransactionRepo */
        $orderTransactionRepo = $this->orderTransactionRepo;
        $updatedData = $orderTransactionRepo->getData();

        $expectedStateId = $this->stateMachineRegistry->getStateByTechnicalName(
            Defaults::ORDER_TRANSACTION_STATE_MACHINE,
            Defaults::ORDER_TRANSACTION_STATES_CANCELLED,
            $context
        )->getId();

        static::assertSame($transactionId, $updatedData['id']);
        static::assertSame($expectedStateId, $updatedData['stateId']);
    }

    public function testFinalizePaymentNotCompleted(): void
    {
        $handler = $this->createPayPalPaymentHandler();

        $transactionId = 'testTransactionId';
        $request = $this->createRequest();
        $request->query->set(PayPalPayment::PAYPAL_REQUEST_PARAMETER_PAYER_ID, self::PAYER_ID_PAYMENT_INCOMPLETE);
        $context = Context::createDefaultContext();
        $handler->finalize($transactionId, $request, $context);
        /** @var OrderTransactionRepoMock $orderTransactionRepo */
        $orderTransactionRepo = $this->orderTransactionRepo;
        $updatedData = $orderTransactionRepo->getData();

        $expectedStateId = $this->stateMachineRegistry->getStateByTechnicalName(
            Defaults::ORDER_TRANSACTION_STATE_MACHINE,
            Defaults::ORDER_TRANSACTION_STATES_OPEN,
            $context
        )->getId();

        static::assertSame($transactionId, $updatedData['id']);
        static::assertSame($expectedStateId, $updatedData['stateId']);
    }

    private function createPayPalPaymentHandler(): PayPalPayment
    {
        $settingsProvider = new SettingsServiceMock($this->definitionRegistry);

        return new PayPalPayment(
            $this->definitionRegistry,
            $this->createPaymentResource($settingsProvider),
            $this->createPaymentBuilder($settingsProvider),
            $this->stateMachineRegistry
        );
    }

    private function createRequest(): Request
    {
        $request = new Request([
            PayPalPayment::PAYPAL_REQUEST_PARAMETER_PAYER_ID => 'testPayerId',
            PayPalPayment::PAYPAL_REQUEST_PARAMETER_PAYMENT_ID => 'testPaymentId',
        ]);

        return $request;
    }
}
