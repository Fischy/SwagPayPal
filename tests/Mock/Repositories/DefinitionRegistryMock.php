<?php declare(strict_types=1);

namespace Swag\PayPal\Test\Mock\Repositories;

use Shopware\Core\Checkout\Order\Aggregate\OrderTransaction\OrderTransactionDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\DefinitionRegistry;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\Language\LanguageDefinition;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;
use Swag\PayPal\Setting\SwagPayPalSettingGeneralDefinition;
use Symfony\Component\DependencyInjection\ContainerInterface;

class DefinitionRegistryMock extends DefinitionRegistry
{
    /**
     * @var LanguageRepoMock
     */
    private $languageRepo;

    /**
     * @var SalesChannelRepoMock
     */
    private $salesChannelRepo;

    /**
     * @var OrderTransactionRepoMock
     */
    private $orderTransactionRepo;

    /**
     * @var SwagPayPalSettingGeneralRepoMock
     */
    private $swagPayPalSettingGeneralRepo;

    public function __construct(array $elements, ContainerInterface $container)
    {
        parent::__construct($elements, $container);
        $this->languageRepo = new LanguageRepoMock();
        $this->salesChannelRepo = new SalesChannelRepoMock();
        $this->orderTransactionRepo = new OrderTransactionRepoMock();
        $this->swagPayPalSettingGeneralRepo = new SwagPayPalSettingGeneralRepoMock();
    }

    /**
     * @return EntityRepositoryInterface|OrderTransactionRepoMock
     */
    public function getRepository(string $entityName): EntityRepositoryInterface
    {
        switch ($entityName) {
            case LanguageDefinition::getEntityName():
                return $this->languageRepo;
            case SalesChannelDefinition::getEntityName():
                return $this->salesChannelRepo;
            case OrderTransactionDefinition::getEntityName():
                return $this->orderTransactionRepo;
            case SwagPayPalSettingGeneralDefinition::getEntityName():
                return $this->swagPayPalSettingGeneralRepo;
            default:
                return parent::getRepository($entityName);
        }
    }
}