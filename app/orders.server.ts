import type { authenticate } from "./shopify.server";
import { GetOrdersExport } from "./graphQl/GetOrdersExport.adm-gql";

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface OrdersResponse {
  data: {
    orders: {
      edges: Array<{
        node: any;
      }>;
      pageInfo: PageInfo;
    };
  };
}

type Admin = Awaited<ReturnType<typeof authenticate.admin>>['admin'];

export async function fetchOrders(admin: Admin, gqlQuery: string = '') {
  let hasNextPage = true;
  let endCursor: string | null = null;
  const allOrders: any[] = [];

  while (hasNextPage) {
    const response = await admin.graphql(GetOrdersExport, {
      variables: {
        first: 250,
        query: gqlQuery,
        after: endCursor,
      },
    });

    const result = (await response.json()) as OrdersResponse;
    const edges = result.data.orders.edges;
    const pageInfo = result.data.orders.pageInfo;

    allOrders.push(...edges.map((e) => e.node));
    hasNextPage = pageInfo.hasNextPage;
    endCursor = pageInfo.endCursor;

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  //Reversing the orders to get the latest orders first
  return allOrders.reverse();
} 