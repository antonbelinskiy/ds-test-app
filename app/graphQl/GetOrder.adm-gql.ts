export const GetOrder = `#graphql
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      name
      email
      phone
      createdAt
      displayFinancialStatus
      displayFulfillmentStatus
      note
      subtotalPriceSet {
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
      discountApplications(first: 10) {
        edges {
          node {
            allocationMethod
            targetSelection
            targetType
            value {
              ... on MoneyV2 {
                amount
                currencyCode
              }
              ... on PricingPercentageValue {
                percentage
              }
            }
          }
        }
      }
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
      totalShippingPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
      taxLines {
        title
        rate
        priceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
      }  
      totalTaxSet {
        shopMoney {
          amount
          currencyCode
        }
      }
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      shippingAddress {
        address1
        address2
        city
        country
        countryCode
        province
        provinceCode
        zip
        phone
      }
      lineItems(first: 50) {
        edges {
          node {
            id
            name
            title
            quantity
            originalUnitPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            discountedUnitPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            variant {
              id
              sku
              title
              price
              inventoryQuantity
            }
            product {
              id
              title
              handle
            }
            image {
              id
              url
            }
          }
        }
      }
    }
  }
`; 