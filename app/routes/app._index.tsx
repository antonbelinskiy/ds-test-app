import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import { Layout, Page } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { GetOrders } from "app/graphQl/GetOrders.adm-gql";
import { OrdersTable } from "../components/OrdersTable";
import type { OrderType } from "../components/OrdersTable";
import { useOrderExport } from "../hooks/useOrderExport";

type OrdersData = {
  data: {
    orders: {
      edges: OrderType[];
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
      };
    };
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  try {
    const response = await admin.graphql(GetOrders, {
      variables: { first: 50 },
    });

    const data = await response.json();
    return json(data as OrdersData);
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  console.log(admin);
  const formData = await request.formData();
  console.log(formData);
  const cursor = formData.get('cursor')?.toString();
  const direction = formData.get('direction')?.toString();
  try {
    const response = await admin.graphql(GetOrders, {
      variables: direction === 'previous' 
        ? { last: 50, before: cursor || null }
        : { first: 50, after: cursor || null },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const exportOrders = useOrderExport();
  const loaderData = useLoaderData<typeof loader>();
  
  const orders = ((fetcher.data?.data?.orders?.edges || loaderData.data?.orders?.edges) || []) as OrderType[];
  const pageInfo = ((fetcher.data?.data?.orders?.pageInfo || loaderData.data?.orders?.pageInfo) || {
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
      <Layout>
        <Layout.Section>
            <OrdersTable
              orders={orders}
              pageInfo={pageInfo}
              isLoading={isLoading}
              onPageChange={handlePageChange}
            />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
