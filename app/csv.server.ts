import { createObjectCsvStringifier } from 'csv-writer';
import {formatDate, statusFulfillmentValueMap, statusPaymentValueMap} from "./utils/utils";
import type { ExportOrderFragmentFragment } from 'app/types/admin.generated';
export async function parseOrdersToCSV(orders: any[]) {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'order', title: 'Order Number' },
      { id: 'date', title: 'Created At' },
      { id: 'customer_name', title: 'Customer Name' },
      { id: 'customer_email', title: 'Customer Email' },
      {id: "financial_status", title: "Financial Status"},  
      {id: "fulfillment_status", title: "Fulfillment Status"},
      { id: 'items', title: 'Line Items' },
      {id: 'subtotal', title: 'Subtotal Price'},
      {id: 'total_discounts', title: 'Total Discounts Price'},
      { id: 'shipping', title: 'Shipping Price' },
      { id: 'tax', title: 'Tax Price' },
      { id: 'total', title: 'Total Price' },
    ],
  });

  const records = orders.map((order: ExportOrderFragmentFragment) => ({
    order: order.name,
    date: formatDate(order.createdAt),
    customer_name: (order.customer?.firstName || '') + ' ' + (order.customer?.lastName || ''),
    customer_email: order.customer?.email,
    financial_status: statusPaymentValueMap[order.displayFinancialStatus as keyof typeof statusPaymentValueMap].label,
    fulfillment_status: statusFulfillmentValueMap[order.displayFulfillmentStatus as keyof typeof statusFulfillmentValueMap].label,
    items: order.lineItems?.edges.map((e: any) => `${e.node.name} (x${e.node.quantity})`).join('; '),
    subtotal: `${order.subtotalPriceSet?.shopMoney?.amount} ${order.subtotalPriceSet?.shopMoney?.currencyCode}`,
    total_discounts: `${order.totalDiscountsSet?.shopMoney?.amount} ${order.totalDiscountsSet?.shopMoney?.currencyCode}`,
    shipping: `${order.totalShippingPriceSet?.shopMoney?.amount} ${order.totalShippingPriceSet?.shopMoney?.currencyCode}`,
    tax: `${order.totalTaxSet?.shopMoney?.amount} ${order.totalTaxSet?.shopMoney?.currencyCode}`,
    total: `${order.totalPriceSet?.shopMoney?.amount} ${order.totalPriceSet?.shopMoney?.currencyCode}`,

  }));

  const buffer = Buffer.from(csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records));

  return buffer;
}
