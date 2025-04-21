import { useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import {
  IndexTable,
  Card,
  useIndexResourceState,
  Badge,
  Text,
} from "@shopify/polaris";
import type { OrderFragmentFragment } from "app/types/admin.generated";
import { statusFulfillmentValueMap, statusPaymentValueMap } from "app/utils/utils";
import { useOrderExport } from "app/hooks/useOrderExport";

export type OrderType = {
  node: OrderFragmentFragment;
};

interface OrdersTableProps {
  orders: OrderType[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  isLoading: boolean;
  onPageChange: (cursor: string | null, direction: 'next' | 'previous') => void;
}

export function OrdersTable({ orders, pageInfo, isLoading, onPageChange }: OrdersTableProps) {
  const navigate = useNavigate();
  const exportOrders = useOrderExport();

  const { selectedResources, allResourcesSelected, handleSelectionChange } = 
    useIndexResourceState(orders, {
      resourceIDResolver: (order: OrderType) => order.node.id.split('/').pop() as string,
    });

  const handleNextPage = useCallback(() => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      onPageChange(pageInfo.endCursor, 'next');
    }
  }, [pageInfo, onPageChange]);

  const handlePreviousPage = useCallback(() => {
    if (pageInfo?.hasPreviousPage && pageInfo?.startCursor) {
      onPageChange(pageInfo.startCursor, 'previous');
    }
  }, [pageInfo, onPageChange]);

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const handleAction = () => {
    exportOrders({ type: 'selected', ids: selectedResources }).then(() => {
    shopify.toast.show('Orders exported successfully');
    }).catch((error) => {
      shopify.toast.show('Error exporting orders', {
        isError: true,
      });
    })
  }
  const promotedBulkActions = [
    {
      content: 'Export selected',
      onAction: handleAction,
    }
  ];

  const rowMarkup = orders.map(
    ({ node }: { node: OrderFragmentFragment }, index: number) => {
      const orderId = node.id.split('/').pop() as string;
      const paymentStatus = statusPaymentValueMap[node.displayFinancialStatus as keyof typeof statusPaymentValueMap]
      const fulfillmentStatus = statusFulfillmentValueMap[node.displayFulfillmentStatus as keyof typeof statusFulfillmentValueMap]

      return (
        <IndexTable.Row
          id={orderId}
          key={orderId}
          selected={selectedResources.includes(orderId)}
          position={index}
          onClick={() => navigate(`/app/orders/${orderId}`)}
        >
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {node.name}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            {new Date(node.createdAt).toLocaleDateString()}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {node.customer ? 
              `${node.customer.firstName} ${node.customer.lastName}` : 
              'No customer data'
            }
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" alignment="end" numeric>
              {node.totalPriceSet?.shopMoney && 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: node.totalPriceSet.shopMoney.currencyCode,
                }).format(parseFloat(node.totalPriceSet.shopMoney.amount))
              }
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Badge progress={paymentStatus.progress} tone={paymentStatus.tone}>
              {paymentStatus.label}
            </Badge>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Badge progress={fulfillmentStatus.progress} tone={fulfillmentStatus.tone}>
              {fulfillmentStatus.label}
            </Badge>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  return (
    <>
      <Card padding="0">
        <IndexTable
          resourceName={resourceName}
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          loading={isLoading}
          headings={[
            { title: 'Order' },
            { title: 'Date' },
            { title: 'Customer' },
            { title: 'Total', alignment: 'end' },
            { title: 'Payment status' },
            { title: 'Fulfillment status' },
          ]}
          promotedBulkActions={promotedBulkActions}
          hasMoreItems={pageInfo?.hasNextPage || false}
          pagination={{
            hasNext: pageInfo?.hasNextPage || false,
            hasPrevious: pageInfo?.hasPreviousPage || false,
            onNext: handleNextPage,
            onPrevious: handlePreviousPage,
          }}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </>
  );
} 