/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type GetOrderQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type GetOrderQuery = { order?: AdminTypes.Maybe<(
    Pick<AdminTypes.Order, 'id' | 'name' | 'email' | 'phone' | 'createdAt' | 'displayFinancialStatus' | 'displayFulfillmentStatus' | 'note'>
    & { subtotalPriceSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, totalDiscountsSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountApplications: { edges: Array<{ node: (
          Pick<AdminTypes.AutomaticDiscountApplication, 'allocationMethod' | 'targetSelection' | 'targetType'>
          & { value: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> | Pick<AdminTypes.PricingPercentageValue, 'percentage'> }
        ) | (
          Pick<AdminTypes.DiscountCodeApplication, 'allocationMethod' | 'targetSelection' | 'targetType'>
          & { value: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> | Pick<AdminTypes.PricingPercentageValue, 'percentage'> }
        ) | (
          Pick<AdminTypes.ManualDiscountApplication, 'allocationMethod' | 'targetSelection' | 'targetType'>
          & { value: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> | Pick<AdminTypes.PricingPercentageValue, 'percentage'> }
        ) | (
          Pick<AdminTypes.ScriptDiscountApplication, 'allocationMethod' | 'targetSelection' | 'targetType'>
          & { value: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> | Pick<AdminTypes.PricingPercentageValue, 'percentage'> }
        ) }> }, totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalShippingPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, taxLines: Array<(
      Pick<AdminTypes.TaxLine, 'title' | 'rate'>
      & { priceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )>, totalTaxSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'>>, shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'country' | 'countryCode' | 'province' | 'provinceCode' | 'zip' | 'phone'>>, lineItems: { edges: Array<{ node: (
          Pick<AdminTypes.LineItem, 'id' | 'name' | 'title' | 'quantity'>
          & { originalUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountedUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, variant?: AdminTypes.Maybe<Pick<AdminTypes.ProductVariant, 'id' | 'sku' | 'title' | 'price' | 'inventoryQuantity'>>, product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id' | 'title' | 'handle'>>, image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
        ) }> } }
  )> };

export type OrderFragmentFragment = (
  Pick<AdminTypes.Order, 'id' | 'name' | 'email' | 'phone' | 'createdAt' | 'displayFinancialStatus' | 'displayFulfillmentStatus' | 'note'>
  & { subtotalPriceSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalShippingPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalTaxSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'id' | 'firstName' | 'lastName' | 'phone' | 'email'>>, shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'country' | 'countryCode' | 'province' | 'provinceCode' | 'zip' | 'phone'>>, lineItems: { edges: Array<{ node: (
        Pick<AdminTypes.LineItem, 'id' | 'name' | 'title' | 'quantity'>
        & { originalUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountedUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ allocatedAmount: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, variant?: AdminTypes.Maybe<Pick<AdminTypes.ProductVariant, 'id' | 'sku' | 'title' | 'price' | 'inventoryQuantity'>>, product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id' | 'title' | 'handle'>>, image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
      ) }> } }
);

export type LineItemFragmentFragment = (
  Pick<AdminTypes.LineItem, 'id' | 'name' | 'title' | 'quantity'>
  & { originalUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountedUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ allocatedAmount: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, variant?: AdminTypes.Maybe<Pick<AdminTypes.ProductVariant, 'id' | 'sku' | 'title' | 'price' | 'inventoryQuantity'>>, product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id' | 'title' | 'handle'>>, image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
);

export type ImageFragmentFragment = Pick<AdminTypes.Image, 'id' | 'url'>;

export type GetOrdersQueryVariables = AdminTypes.Exact<{
  first?: AdminTypes.InputMaybe<AdminTypes.Scalars['Int']['input']>;
  after?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
  last?: AdminTypes.InputMaybe<AdminTypes.Scalars['Int']['input']>;
  before?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetOrdersQuery = { orders: { pageInfo: Pick<AdminTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, edges: Array<(
      Pick<AdminTypes.OrderEdge, 'cursor'>
      & { node: (
        Pick<AdminTypes.Order, 'id' | 'name' | 'email' | 'phone' | 'createdAt' | 'displayFinancialStatus' | 'displayFulfillmentStatus' | 'note'>
        & { subtotalPriceSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalShippingPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalTaxSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'id' | 'firstName' | 'lastName' | 'phone' | 'email'>>, shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'country' | 'countryCode' | 'province' | 'provinceCode' | 'zip' | 'phone'>>, lineItems: { edges: Array<{ node: (
              Pick<AdminTypes.LineItem, 'id' | 'name' | 'title' | 'quantity'>
              & { originalUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountedUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ allocatedAmount: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, variant?: AdminTypes.Maybe<Pick<AdminTypes.ProductVariant, 'id' | 'sku' | 'title' | 'price' | 'inventoryQuantity'>>, product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id' | 'title' | 'handle'>>, image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'id' | 'url'>> }
            ) }> } }
      ) }
    )> } };

export type ExportOrderFragmentFragment = (
  Pick<AdminTypes.Order, 'id' | 'name' | 'createdAt' | 'displayFinancialStatus' | 'displayFulfillmentStatus'>
  & { totalShippingPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalTaxSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'firstName' | 'lastName' | 'email'>>, subtotalPriceSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalDiscountsSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, lineItems: { edges: Array<{ node: Pick<AdminTypes.LineItem, 'name' | 'quantity'> }> } }
);

export type GetOrdersExportQueryVariables = AdminTypes.Exact<{
  first: AdminTypes.Scalars['Int']['input'];
  query: AdminTypes.Scalars['String']['input'];
}>;


export type GetOrdersExportQuery = { orders: { edges: Array<{ node: (
        Pick<AdminTypes.Order, 'id' | 'name' | 'createdAt' | 'displayFinancialStatus' | 'displayFulfillmentStatus'>
        & { totalShippingPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalTaxSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'firstName' | 'lastName' | 'email'>>, subtotalPriceSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, totalDiscountsSet?: AdminTypes.Maybe<{ shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }>, lineItems: { edges: Array<{ node: Pick<AdminTypes.LineItem, 'name' | 'quantity'> }> } }
      ) }>, pageInfo: Pick<AdminTypes.PageInfo, 'hasNextPage' | 'endCursor'> } };

interface GeneratedQueryTypes {
  "#graphql\n  query GetOrder($id: ID!) {\n    order(id: $id) {\n      id\n      name\n      email\n      phone\n      createdAt\n      displayFinancialStatus\n      displayFulfillmentStatus\n      note\n      subtotalPriceSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n      totalDiscountsSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n      discountApplications(first: 10) {\n        edges {\n          node {\n            allocationMethod\n            targetSelection\n            targetType\n            value {\n              ... on MoneyV2 {\n                amount\n                currencyCode\n              }\n              ... on PricingPercentageValue {\n                percentage\n              }\n            }\n          }\n        }\n      }\n      totalPriceSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n      totalShippingPriceSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n      taxLines {\n        title\n        rate\n        priceSet {\n          shopMoney {\n            amount\n            currencyCode\n          }\n        }\n      }  \n      totalTaxSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n      customer {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      shippingAddress {\n        address1\n        address2\n        city\n        country\n        countryCode\n        province\n        provinceCode\n        zip\n        phone\n      }\n      lineItems(first: 50) {\n        edges {\n          node {\n            id\n            name\n            title\n            quantity\n            originalUnitPriceSet {\n              shopMoney {\n                amount\n                currencyCode\n              }\n            }\n            discountedUnitPriceSet {\n              shopMoney {\n                amount\n                currencyCode\n              }\n            }\n            variant {\n              id\n              sku\n              title\n              price\n              inventoryQuantity\n            }\n            product {\n              id\n              title\n              handle\n            }\n            image {\n              id\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: GetOrderQuery, variables: GetOrderQueryVariables},
  "#graphql\nquery GetOrders($first: Int, $after: String, $last: Int, $before: String) {\n  orders(\n    first: $first, \n    after: $after, \n    last: $last, \n    before: $before,\n    sortKey: CREATED_AT,\n    reverse: true\n  ) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...OrderFragment\n      }\n    }\n  }\n}\n#graphql\n  fragment OrderFragment on Order {\n    id\n    name\n    email\n    phone\n    createdAt\n    displayFinancialStatus\n    displayFulfillmentStatus\n    note\n    subtotalPriceSet {\n      shopMoney {\n        amount\n        currencyCode\n      }\n    }\n    totalPriceSet {\n      shopMoney {\n        amount\n        currencyCode\n      }\n    }\n    totalShippingPriceSet {\n      shopMoney {\n        amount\n        currencyCode\n      }\n    }\n    totalTaxSet {\n      shopMoney {\n        amount\n        currencyCode\n      }\n    }\n    customer {\n      id\n      firstName\n      lastName\n      phone\n      email\n    }\n    shippingAddress {\n      address1\n      address2\n      city\n      country\n      countryCode\n      province\n      provinceCode\n      zip\n      phone\n    }\n    lineItems(first: 50) {\n      edges {\n        node {\n          ...LineItemFragment\n        }\n      }\n    }\n  }\n  \n#graphql\n  fragment LineItemFragment on LineItem {\n    id\n    name\n    title\n    quantity\n    originalUnitPriceSet {\n      shopMoney {\n        amount\n        currencyCode\n      }\n    }\n    discountedUnitPriceSet {\n      shopMoney {\n        amount\n        currencyCode\n      }\n    }\n    discountAllocations {\n      allocatedAmount {\n        amount\n        currencyCode\n      }\n    }\n    variant {\n      id\n      sku\n      title\n      price\n      inventoryQuantity\n    }\n    product {\n      id\n      title\n      handle\n    }\n    image {\n      ...ImageFragment\n    }\n  }\n\n#graphql\n  fragment ImageFragment on Image {\n    id\n    url\n  }\n\n": {return: GetOrdersQuery, variables: GetOrdersQueryVariables},
  "#graphql\n  query GetOrdersExport($first: Int!, $query: String!) {\n    orders(first: $first, query: $query, reverse: true) {\n      edges {\n        node {\n          ...ExportOrderFragment\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n  #graphql\n    fragment ExportOrderFragment on Order {\n        id\n        name\n        createdAt\n        displayFinancialStatus\n        displayFulfillmentStatus\n        totalShippingPriceSet {\n            shopMoney {\n                amount\n                currencyCode\n            }\n        }\n        totalTaxSet {\n            shopMoney {\n                amount\n                currencyCode\n            }\n        }\n        customer {\n            firstName\n            lastName\n            email\n        }\n        subtotalPriceSet {\n            shopMoney {\n                amount\n                currencyCode\n            }\n        }\n        totalPriceSet {\n            shopMoney {\n                amount\n                currencyCode\n            }\n        }\n        totalDiscountsSet {\n            shopMoney {\n                amount\n                currencyCode\n            }\n        }\n        lineItems(first: 50) {\n            edges {\n                node {\n                    name\n                    quantity\n                }\n            }\n        }\n    }\n    \n": {return: GetOrdersExportQuery, variables: GetOrdersExportQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
