import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopifyCart } from '../services/shopify/cart';
import { Product } from '../services/shopify/queries';

interface StoreState {
  wishlist: Product[];
  cartId: string | null;
  cart: ShopifyCart | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isInitialLoading: boolean;
  startAnimate: boolean;
  
  // Actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;
  setCartId: (id: string | null) => void;
  setCart: (cart: ShopifyCart | null) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setInitialLoading: (loading: boolean) => void;
  setStartAnimate: (start: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      cartId: null,
      cart: null,
      isCartOpen: false,
      isSearchOpen: false,
      isInitialLoading: true,
      startAnimate: false,

      addToWishlist: (product) => {
        const current = get().wishlist;
        if (!current.some((p) => p.handle === product.handle)) {
          set({ wishlist: [...current, product] });
        }
      },

      removeFromWishlist: (handle) => {
        set({ wishlist: get().wishlist.filter((p) => p.handle !== handle) });
      },

      isInWishlist: (handle) => {
        return get().wishlist.some((p) => p.handle === handle);
      },

      setCartId: (id) => set({ cartId: id }),
      setCart: (cart) => set({ cart }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setInitialLoading: (loading) => set({ isInitialLoading: loading }),
      setStartAnimate: (start) => set({ startAnimate: start }),
    }),
    {
      name: 'jewellery-store-storage',
      partialize: (state) => ({
        wishlist: state.wishlist,
        cartId: state.cartId,
      }),
    }
  )
);
