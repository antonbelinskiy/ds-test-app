import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { GetOrders } from "app/graphQl/GetOrders.adm-gql";
import { OrdersTable } from "../components/OrdersTable";
import type { OrderType } from "../components/OrdersTable";
import { useOrderExport } from "../hooks/useOrderExport";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const cursor = formData.get('cursor')?.toString();
  const direction = formData.get('direction')?.toString();
  try {
    const response = await admin.graphql(GetOrders, {
      variables: direction === 'previous' 
        ? { last: 50, before: cursor || null }
        : { first: 50, after: cursor || null },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const exportOrders = useOrderExport();

  const orders = (fetcher.data?.data?.orders?.edges || []) as unknown as OrderType[];
  const pageInfo = (fetcher.data?.data?.orders?.pageInfo || {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  }) as { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string | null; endCursor: string | null };
  
  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST";
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrders = (cursor: string | null = null, direction: 'next' | 'previous' | null = null) => {
    const formData = new FormData();
    if (cursor) {
      formData.append('cursor', cursor);
    }
    if (direction) {
      formData.append('direction', direction);
    }
    fetcher.submit(formData, {
      method: "POST",
    });
  };

  useEffect(() => {
    fetchOrders();
  });

  const handlePageChange = (cursor: string | null, direction: 'next' | 'previous') => {
    fetchOrders(cursor, direction);
  };
  const handleAction = () => {
    setActionLoading(true);
    exportOrders({ type: 'all' }).then(() => {
      shopify.toast.show('Orders exported successfully');

    }).catch((error) => {
      shopify.toast.show('Error exporting orders', {
        isError: true,
      });
    }).finally(() => {
      setActionLoading(false);
    });
  }
  return (
    <Page 
      fullWidth
      title="Orders list"
      primaryAction={{
        content: 'Export All Orders',
        onAction: handleAction,
        loading: actionLoading,
      }}
    >
      <OrdersTable
        orders={orders}
        pageInfo={pageInfo}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </Page>
  );
}
