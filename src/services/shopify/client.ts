const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>(query: string, variables = {}): Promise<{ data: T; errors?: any[] }> {
  try {
    const res = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      throw new Error(`Shopify API error: HTTP ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch from Shopify Storefront API:', error);
    throw error;
  }
}
