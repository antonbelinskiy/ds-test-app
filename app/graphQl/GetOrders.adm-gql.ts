export const OrderFragment = `#graphql
  fragment OrderFragment on Order {
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
      phone
      email
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
          ...LineItemFragment
        }
      }
    }
  }
`;

export const LineItemFragment = `#graphql
  fragment LineItemFragment on LineItem {
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
    discountAllocations {
      allocatedAmount {
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
      ...ImageFragment
    }
  }
`;

const ImageFragment = `#graphql
  fragment ImageFragment on Image {
    id
    url
  }
`;

export const GetOrders = `#graphql
query GetOrders($first: Int, $after: String, $last: Int, $before: String) {
  orders(
    first: $first, 
    after: $after, 
    last: $last, 
    before: $before,
    sortKey: CREATED_AT,
    reverse: true
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...OrderFragment
      }
    }
  }
}
${OrderFragment}  
${LineItemFragment}
${ImageFragment}
`;