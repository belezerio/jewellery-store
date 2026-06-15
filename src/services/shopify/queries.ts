import { shopifyFetch } from './client';

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ProductVariant }[];
  };
  priceRange: {
    minVariantPrice: Money;
  };
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: { node: Product }[];
  };
}

// GraphQL Query Definitions
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query GetCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!, $firstProducts: Int!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $firstProducts) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
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

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

// Fetch API wrappers
export async function getProducts(first = 20): Promise<Product[]> {
  const res = await shopifyFetch<{ products: { edges: { node: Product }[] } }>(
    PRODUCTS_QUERY,
    { first }
  );
  return res.data?.products?.edges?.map(edge => edge.node) || [];
}

export async function getCollections(): Promise<Omit<Collection, 'products'>[]> {
  const res = await shopifyFetch<{ collections: { edges: { node: Omit<Collection, 'products'> }[] } }>(
    COLLECTIONS_QUERY
  );
  return res.data?.collections?.edges?.map(edge => edge.node) || [];
}

export async function getCollectionByHandle(handle: string, firstProducts = 20): Promise<Collection | null> {
  const res = await shopifyFetch<{ collectionByHandle: Collection }>(
    COLLECTION_BY_HANDLE_QUERY,
    { handle, firstProducts }
  );
  return res.data?.collectionByHandle || null;
}

export async function getProductByHandle(handle: string): Promise<Product & { options: { name: string; values: string[] }[] } | null> {
  const res = await shopifyFetch<{ productByHandle: Product & { options: { name: string; values: string[] }[] } }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return res.data?.productByHandle || null;
}

export async function searchProducts(query: string, first = 20): Promise<Product[]> {
  const res = await shopifyFetch<{ products: { edges: { node: Product }[] } }>(
    SEARCH_PRODUCTS_QUERY,
    { query, first }
  );
  return res.data?.products?.edges?.map(edge => edge.node) || [];
}
