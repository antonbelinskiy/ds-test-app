import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { parseOrdersToCSV } from '../csv.server';
import { authenticate } from "../shopify.server";
import { fetchOrders } from '../orders.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ status: 'Only POST is allowed' }, { status: 405 });
}

export async function action({ request }: ActionFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { type, id, ids } = await request.json();
  
    let gqlQuery = '';
    if (type === 'single') {
      gqlQuery = `id:${id}`;
    } else if (type === 'selected') {
      gqlQuery = ids.map((id: string) => `id:${id}`).join(' OR ');
    }
  
    try {
      const orders = await fetchOrders(admin, gqlQuery);
      
      if (!orders || orders.length === 0) {
        return Response.json({ error: 'No orders found' }, { status: 404 });
      }
      
      const csvBuffer = await parseOrdersToCSV(orders);
  
      return new Response(csvBuffer, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=orders.csv',
        },
      });
    } catch (error: any) {
        if (error instanceof Response) {
          const errorText = await error.text();
          console.error('GraphQL error details:', errorText);
          return Response.json({ error: errorText }, { status: 500 });
        }
      
        console.error('Unknown export error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        return Response.json({ error: 'Export failed: ' + error.message }, { status: 500 });
      }
  }
  
  