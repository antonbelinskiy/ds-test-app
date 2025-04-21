const ExportOrderFragment = `#graphql
    fragment ExportOrderFragment on Order {
        id
        name
        createdAt
        displayFinancialStatus
        displayFulfillmentStatus
        totalShippingPriceSet {
            shopMoney {
                amount
                currencyCode
            }
        }
        totalTaxSet {
            shopMoney {
                amount
                currencyCode
            }
        }
        customer {
            firstName
            lastName
            email
        }
        subtotalPriceSet {
            shopMoney {
                amount
                currencyCode
            }
        }
        totalPriceSet {
            shopMoney {
                amount
                currencyCode
            }
        }
        totalDiscountsSet {
            shopMoney {
                amount
                currencyCode
            }
        }
        lineItems(first: 50) {
            edges {
                node {
                    name
                    quantity
                }
            }
        }
    }
`
export const GetOrdersExport = `#graphql
  query GetOrdersExport($first: Int!, $query: String!, $after: String) {
    orders(first: $first, query: $query, after: $after) {
      edges {
        node {
          ...ExportOrderFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${ExportOrderFragment}    
`;