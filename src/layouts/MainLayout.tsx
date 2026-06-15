import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { SearchModal } from '../components/SearchModal';

import { useCartQuery } from '../hooks/useShopify';
import { useStore } from '../store/useStore';

export const MainLayout: React.FC = () => {
  const { data: cartData } = useCartQuery();
  const cartId = useStore((state) => state.cartId);
  const setCartId = useStore((state) => state.setCartId);
  const setCart = useStore((state) => state.setCart);

  useEffect(() => {
    if (cartId && cartData === null) {
      setCartId(null);
      setCart(null);
    }
  }, [cartData, cartId, setCartId, setCart]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
};
export default MainLayout;
