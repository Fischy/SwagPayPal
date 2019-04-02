<?php declare(strict_types=1);
/**
 * (c) shopware AG <info@shopware.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SwagPayPal\Test\Helper;

use Shopware\Core\Checkout\Cart\Price\Struct\CalculatedPrice;
use Shopware\Core\Checkout\Cart\Tax\Struct\CalculatedTax;
use Shopware\Core\Checkout\Cart\Tax\Struct\CalculatedTaxCollection;
use Shopware\Core\Checkout\Cart\Tax\Struct\TaxRule;
use Shopware\Core\Checkout\Cart\Tax\Struct\TaxRuleCollection;
use Shopware\Core\Checkout\Order\Aggregate\OrderLineItem\OrderLineItemCollection;
use Shopware\Core\Checkout\Order\Aggregate\OrderLineItem\OrderLineItemEntity;
use Shopware\Core\Checkout\Order\Aggregate\OrderTransaction\OrderTransactionEntity;
use Shopware\Core\Checkout\Order\OrderEntity;
use Shopware\Core\Checkout\Payment\Cart\AsyncPaymentTransactionStruct;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\Currency\CurrencyEntity;
use SwagPayPal\Test\Payment\PaymentBuilderServiceTest;

trait PaymentTransactionTrait
{
    protected function createPaymentTransactionStruct(
        string $orderId = 'some-order-id',
        ?string $transactionId = null
    ): AsyncPaymentTransactionStruct {
        $orderTransaction = $this->createOrderTransaction($transactionId);
        $order = $this->createOrderEntity($orderId);

        return new AsyncPaymentTransactionStruct(
            $orderTransaction,
            $order,
            'http://www.test.de/'
        );
    }

    private function createOrderTransaction(?string $transactionId): OrderTransactionEntity
    {
        $orderTransaction = new OrderTransactionEntity();
        $orderTransaction->setOrderId(PaymentBuilderServiceTest::TEST_ORDER_ID);

        if ($transactionId === null) {
            $transactionId = Uuid::randomHex();
        }
        $orderTransaction->setId($transactionId);

        $amount = $this->createPriceStruct();
        $orderTransaction->setAmount($amount);

        return $orderTransaction;
    }

    private function createOrderEntity(string $orderId): OrderEntity
    {
        $order = new OrderEntity();
        $order->setShippingCosts(new CalculatedPrice(2.5, 2.5, new CalculatedTaxCollection(), new TaxRuleCollection()));
        $order->setId($orderId);
        $currency = $this->createCurrencyEntity();
        $order->setCurrency($currency);
        $order->setOrderNumber(PaymentBuilderServiceTest::TEST_ORDER_NUMBER);

        switch ($orderId) {
            case ConstantsForTesting::VALID_ORDER_ID:
                $order->setId(ConstantsForTesting::VALID_ORDER_ID);
                $order->setLineItems($this->getLineItems(true));
                break;
            case ConstantsForTesting::ORDER_ID_MISSING_PRICE:
                $order->setId(ConstantsForTesting::ORDER_ID_MISSING_PRICE);
                $order->setLineItems($this->getLineItems());
                break;
            default:
                $order->setId(ConstantsForTesting::ORDER_ID_MISSING_LINE_ITEMS);
        }

        return $order;
    }

    private function createPriceStruct(): CalculatedPrice
    {
        return new CalculatedPrice(
            1.5,
            3.0,
            new CalculatedTaxCollection(),
            new TaxRuleCollection(),
            2
        );
    }

    private function createCurrencyEntity(): CurrencyEntity
    {
        $currency = new CurrencyEntity();
        $currency->setShortName(PaymentBuilderServiceTest::EXPECTED_ITEM_CURRENCY);

        return $currency;
    }

    private function getLineItems(bool $setPrice = false): OrderLineItemCollection
    {
        $orderLineItem = new OrderLineItemEntity();

        $orderLineItem->setId('6198ff79c4144931919977829dbca3d6');
        $orderLineItem->setQuantity(PaymentBuilderServiceTest::EXPECTED_ITEM_QUANTITY);

        if ($setPrice) {
            $orderLineItem->setPrice(
                new CalculatedPrice(
                    578.0,
                    578.0,
                    new CalculatedTaxCollection([
                        new CalculatedTax(PaymentBuilderServiceTest::EXPECTED_ITEM_TAX, 7, 578),
                    ]),
                    new TaxRuleCollection([7 => new TaxRule(7)])
                )
            );
        }

        $orderLineItem->setLabel(PaymentBuilderServiceTest::EXPECTED_ITEM_NAME);
        $orderLineItem->setPayload(['id' => PaymentBuilderServiceTest::EXPECTED_ITEM_ID]);

        return new OrderLineItemCollection([$orderLineItem]);
    }
}
