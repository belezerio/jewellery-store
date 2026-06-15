import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProducts,
  getCollections,
  getCollectionByHandle,
  getProductByHandle,
  searchProducts,
} from '../services/shopify/queries';
import {
  createCart,
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  ShopifyCart,
} from '../services/shopify/cart';
import { useStore } from '../store/useStore';

// 1. Fetching Hooks
export function useProducts(first = 20) {
  return useQuery({
    queryKey: ['products', first],
    queryFn: () => getProducts(first),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(),
    staleTime: 1000 * 60 * 30, // 30 minutes cache
  });
}

export function useCollection(handle: string, firstProducts = 20) {
  return useQuery({
    queryKey: ['collection', handle, firstProducts],
    queryFn: () => getCollectionByHandle(handle, firstProducts),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductDetail(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearch(query: string, first = 20) {
  return useQuery({
    queryKey: ['search', query, first],
    queryFn: () => searchProducts(query, first),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  });
}

// 2. Shopify Cart Sync Hooks
export function useCartQuery() {
  const cartId = useStore((state) => state.cartId);
  const setCart = useStore((state) => state.setCart);

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null;
      try {
        const cartData = await getCart(cartId);
        if (cartData) {
          setCart(cartData);
          return cartData;
        }
        return null;
      } catch (error) {
        console.warn('Error fetching cart:', error);
        return null;
      }
    },
    enabled: !!cartId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const cartId = useStore((state) => state.cartId);
  const setCartId = useStore((state) => state.setCartId);
  const setCart = useStore((state) => state.setCart);
  const setCartOpen = useStore((state) => state.setCartOpen);

  return useMutation({
    mutationFn: async (variables: { merchandiseId: string; quantity: number }) => {
      if (!cartId) {
        // Create cart directly with the item
        return await createCart([
          { merchandiseId: variables.merchandiseId, quantity: variables.quantity },
        ]);
      }
      try {
        return await addToCart(cartId, [
          { merchandiseId: variables.merchandiseId, quantity: variables.quantity },
        ]);
      } catch (error) {
        console.warn('Failed to add to existing cart, creating a new one...', error);
        // Fallback: create a brand new cart with the item
        return await createCart([
          { merchandiseId: variables.merchandiseId, quantity: variables.quantity },
        ]);
      }
    },
    onSuccess: (data) => {
      setCartId(data.id);
      setCart(data);
      queryClient.setQueryData(['cart', data.id], data);
      setCartOpen(true); // Open the cart drawer automatically when item is added!
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const cartId = useStore((state) => state.cartId);
  const setCart = useStore((state) => state.setCart);

  return useMutation({
    mutationFn: async (variables: { id: string; quantity: number }) => {
      if (!cartId) throw new Error('Cart does not exist');
      return await updateCart(cartId, [variables]);
    },
    onSuccess: (data) => {
      setCart(data);
      queryClient.setQueryData(['cart', cartId], data);
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const cartId = useStore((state) => state.cartId);
  const setCart = useStore((state) => state.setCart);

  return useMutation({
    mutationFn: async (lineId: string) => {
      if (!cartId) throw new Error('Cart does not exist');
      return await removeFromCart(cartId, [lineId]);
    },
    onSuccess: (data) => {
      setCart(data);
      queryClient.setQueryData(['cart', cartId], data);
    },
  });
}
