import { shopifyFetch } from './client';

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images: {
        edges: { node: { url: string; altText: string | null } }[];
      };
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: { node: ShopifyCartLine }[];
  };
}

// Fragment to share cart fields across queries/mutations
const CART_FRAGMENT = `
  id
  checkoutUrl
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            product {
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART_QUERY = `
  query GetCart($id: ID!) {
    cart(id: $id) {
      ${CART_FRAGMENT}
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [BaseCartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_CART_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<ShopifyCart> {
  const lineInputs = lines.map(line => ({
    merchandiseId: line.merchandiseId,
    quantity: line.quantity,
  }));
  const res = await shopifyFetch<{ cartCreate: { cart: ShopifyCart; userErrors: any[] } }>(
    CREATE_CART_MUTATION,
    { input: { lines: lineInputs } }
  );
  if (res.errors || res.data?.cartCreate?.userErrors?.length) {
    const errorMsg = res.data?.cartCreate?.userErrors?.[0]?.message || 'Failed to create cart';
    throw new Error(errorMsg);
  }
  return res.data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const res = await shopifyFetch<{ cart: ShopifyCart }>(GET_CART_QUERY, { id: cartId });
  return res.data?.cart || null;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart> {
  const lineInputs = lines.map(line => ({
    merchandiseId: line.merchandiseId,
    quantity: line.quantity,
  }));
  const res = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart; userErrors: any[] } }>(
    ADD_TO_CART_MUTATION,
    { cartId, lines: lineInputs }
  );
  if (res.errors || res.data?.cartLinesAdd?.userErrors?.length) {
    const errorMsg = res.data?.cartLinesAdd?.userErrors?.[0]?.message || 'Failed to add items to cart';
    throw new Error(errorMsg);
  }
  return res.data.cartLinesAdd.cart;
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]): Promise<ShopifyCart> {
  const lineInputs = lines.map(line => ({
    id: line.id,
    quantity: line.quantity,
  }));
  const res = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart; userErrors: any[] } }>(
    UPDATE_CART_MUTATION,
    { cartId, lines: lineInputs }
  );
  if (res.errors || res.data?.cartLinesUpdate?.userErrors?.length) {
    const errorMsg = res.data?.cartLinesUpdate?.userErrors?.[0]?.message || 'Failed to update cart';
    throw new Error(errorMsg);
  }
  return res.data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const res = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart; userErrors: any[] } }>(
    REMOVE_FROM_CART_MUTATION,
    { cartId, lineIds }
  );
  if (res.errors || res.data?.cartLinesRemove?.userErrors?.length) {
    const errorMsg = res.data?.cartLinesRemove?.userErrors?.[0]?.message || 'Failed to remove items from cart';
    throw new Error(errorMsg);
  }
  return res.data.cartLinesRemove.cart;
}
