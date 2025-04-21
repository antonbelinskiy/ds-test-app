import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Link,
  DataTable,
  Thumbnail,
  EmptyState,
} from "@shopify/polaris";
import { formatMoney, formatDate, statusFulfillmentValueMap, statusPaymentValueMap } from "app/utils/utils";
import { authenticate } from "../shopify.server";
import { GetOrder } from "../graphQl/GetOrder.adm-gql";
import type { GetOrderQuery as GetOrderQueryType } from "../types/admin.generated";
import { useOrderExport } from "app/hooks/useOrderExport";
import { useState } from "react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const { id } = params;

  try {
    const response = await admin.graphql(GetOrder, {
      variables: {
        id: `gid://shopify/Order/${id}`,
      },
    });

    const data = await response.json();
    return data?.data?.order as GetOrderQueryType['order'];
  } catch (error) {
    console.error('Failed to load order:', error);
    throw error;
  }
};

export default function OrderDetails() {
  const order = useLoaderData<typeof loader>();
  const exportOrders = useOrderExport();
  const [actionLoading, setActionLoading] = useState(false);
  if (!order) {
    return <Page>
        <Layout>
            <Layout.Section>
                <EmptyState
                    heading="Order not found"
                    action={{
                        content: 'Go to orders',
                        url: '/app'
                    }}
                    //Somehow the image don't want to load sometimes
                    image="/emptystate-files.png"
                    />
            </Layout.Section>
        </Layout>
    </Page>
  }

  const paymentStatus = statusPaymentValueMap[order.displayFinancialStatus as keyof typeof statusPaymentValueMap]
  const fulfillmentStatus = statusFulfillmentValueMap[order.displayFulfillmentStatus as keyof typeof statusFulfillmentValueMap]

  const rows = order.lineItems.edges.map(({ node }) => [
    <InlineStack gap="200" key={`product-${node.id}`}>
      {node.image?.url && (
        <Thumbnail
          source={node.image.url}
          size="small"
          alt={node.title || ''}
          />
        )}
      <BlockStack gap="100">
        <Text as="span">{node.title}</Text>
        {node.variant?.sku && (
          <Text as="span" tone="subdued">{node.variant.sku}</Text>
        )}
      </BlockStack>
    </InlineStack>,
    node.quantity,
    node.originalUnitPriceSet?.shopMoney && 
      formatMoney(
        node.originalUnitPriceSet.shopMoney.amount,
        node.originalUnitPriceSet.shopMoney.currencyCode
      ),
    node.originalUnitPriceSet?.shopMoney && 
      formatMoney(
        (parseFloat(node.originalUnitPriceSet.shopMoney.amount) * (node.quantity || 0)).toString(),
        node.originalUnitPriceSet.shopMoney.currencyCode
      ),
  ]);

  const orderId = order.id.split("/").pop() || "";

  const handleAction = () => {
    setActionLoading(true);
    exportOrders({ type: 'single', id: orderId }).then(() => {
      shopify.toast.show('Order exported successfully');
    }).catch((error) => {
      shopify.toast.show('Error exporting order', {
        isError: true,
      });
    }).finally(() => {
      setActionLoading(false);
    });
  }
  return (
    <Page
      fullWidth
      backAction={{ content: 'Orders', url: '/app' }}
      title={order.name || 'Order Details'}
      primaryAction={{
        content: 'Export this order',
        onAction: handleAction,
        loading: actionLoading,
      }}
      titleMetadata={
      <InlineStack gap="200">
        {order.displayFinancialStatus && (
          <Badge progress={paymentStatus.progress} tone={paymentStatus.tone}>
            {paymentStatus.label}
          </Badge>
        )}
        {order.displayFulfillmentStatus && (
          <Badge progress={fulfillmentStatus.progress} tone={fulfillmentStatus.tone}>
            {fulfillmentStatus.label}
          </Badge>
        )}
      </InlineStack>
      }
      subtitle={order.createdAt ? formatDate(order.createdAt) : undefined}
    >
      
      <Layout>
        <Layout.Section>
            <BlockStack gap="400">
              {order.lineItems.edges.length > 0 && (
                <Card>
                  <BlockStack gap="200">
                  <Text variant="headingSm" as="h3">Products</Text>
                  <DataTable
                    columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
                    headings={['Product', 'Quantity', 'Price', 'Total']}
                    rows={rows}
                  />
                </BlockStack>
                </Card>
              )}

              <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h3">Summary</Text>
                <InlineStack align="space-between">
                  <Text as="span">Subtotal</Text>
                  <Text as="span">
                    {order.subtotalPriceSet?.shopMoney && 
                      formatMoney(
                        order.subtotalPriceSet.shopMoney.amount,
                        order.subtotalPriceSet.shopMoney.currencyCode
                      )
                    }
                  </Text>
                </InlineStack>
                {order.discountApplications?.edges.map(({ node }, index) => (
                  <InlineStack key={index} align="space-between">
                    <Text as="span" tone="subdued">
                      Discount ({node.targetType.toLowerCase()} - {node.targetSelection.toLowerCase()})
                    </Text>
                    <Text as="span" tone="subdued">
                      {'percentage' in node.value ? 
                        `-${node.value.percentage}%` :
                        'amount' in node.value && `-${formatMoney(node.value.amount, node.value.currencyCode)}`
                      }
                    </Text>
                  </InlineStack>
                ))}
                {order.totalDiscountsSet?.shopMoney && parseFloat(order.totalDiscountsSet.shopMoney.amount) > 0 && (
                  <InlineStack align="space-between">
                    <Text as="span" tone="subdued">Total Discounts</Text>
                    <Text as="span" tone="subdued">
                      -{formatMoney(
                        order.totalDiscountsSet.shopMoney.amount,
                        order.totalDiscountsSet.shopMoney.currencyCode
                      )}
                    </Text>
                  </InlineStack>
                )}
                <InlineStack align="space-between">
                  <Text as="span">Shipping</Text>
                  <Text as="span">
                    {order.totalShippingPriceSet?.shopMoney && 
                      formatMoney(
                        order.totalShippingPriceSet.shopMoney.amount,
                        order.totalShippingPriceSet.shopMoney.currencyCode
                      )
                    }
                  </Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="span">Tax</Text>
                  <Text as="span">
                    {order.totalTaxSet?.shopMoney && 
                      formatMoney(
                        order.totalTaxSet.shopMoney.amount,
                        order.totalTaxSet.shopMoney.currencyCode
                      )
                    }
                  </Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="headingMd" as="span">Total</Text>
                  <Text variant="headingMd" as="span">
                    {order.totalPriceSet?.shopMoney && 
                      formatMoney(
                        order.totalPriceSet.shopMoney.amount,
                        order.totalPriceSet.shopMoney.currencyCode
                      )
                    }
                  </Text>
                </InlineStack>
              </BlockStack>
              </Card>
            </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
           <BlockStack gap="200">
           <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h3">Customer</Text>
                <BlockStack gap="100">
                  <Text as="p">
                    {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : null}
                  </Text>
                  {order.customer?.email && (
                    <Link url={`mailto:${order.customer.email}`} monochrome>
                      {order.customer.email}
                    </Link>
                  )}
                  {order.customer?.phone && (
                    <Link url={`tel:${order.customer.phone}`} monochrome>
                      {order.customer.phone}
                    </Link>
                  )}
                </BlockStack>
              </BlockStack>
              </Card>

              {order.shippingAddress && (
                <Card>
                  <BlockStack gap="200">
                  <Text variant="headingSm" as="h3">Shipping Address</Text>
                  <Text as="p">
                    {[
                      order.shippingAddress.address1,
                      order.shippingAddress.address2,
                      order.shippingAddress.city,
                      order.shippingAddress.province,
                      order.shippingAddress.zip,
                      order.shippingAddress.country
                    ].filter(Boolean).join(', ')}
                  </Text>
                </BlockStack>
                </Card>
              )}        
            </BlockStack>         
        </Layout.Section>
      </Layout>
    </Page>
  );
} 