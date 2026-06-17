import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
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
  const location = useLocation();

  const [progress, setProgress] = useState(0);
  const isInitialLoading = useStore((state) => state.isInitialLoading);
  const setInitialLoading = useStore((state) => state.setInitialLoading);
  const setStartAnimate = useStore((state) => state.setStartAnimate);

  useEffect(() => {
    if (cartId && cartData === null) {
      setCartId(null);
      setCart(null);
    }
  }, [cartData, cartId, setCartId, setCart]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Coordinate home preloader progression
  useEffect(() => {
    if (location.pathname !== '/' || !isInitialLoading) {
      setStartAnimate(true);
      setInitialLoading(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 15) + 5;
      current = Math.min(current + step, 100);
      setProgress(current);
      if (current === 100) {
        clearInterval(interval);
        const timeout = setTimeout(() => {
          setInitialLoading(false);
          const animTimeout = setTimeout(() => {
            setStartAnimate(true);
          }, 700);
          return () => clearTimeout(animTimeout);
        }, 850);
        return () => clearTimeout(timeout);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [location.pathname, isInitialLoading, setInitialLoading, setStartAnimate]);

  // Lock body scroll while loader is active
  useEffect(() => {
    if (isInitialLoading && location.pathname === '/') {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [isInitialLoading, location.pathname]);

  useEffect(() => {
    // Detect touch device - skip Lenis for native mobile scrolling
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    
    if (isTouchDevice) {
      // On mobile/touch devices, use native smooth scrolling
      // Lenis can cause janky scroll behavior on phones
      return;
    }

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
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* 0. Luxury Preloader Overlay */}
      <AnimatePresence>
        {isInitialLoading && location.pathname === '/' && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ 
              y: '-100%', 
              transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d221b] overflow-hidden px-4"
          >
            {/* Silk/Smoke luxury background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay scale-105"
              style={{ backgroundImage: `url('/luxury-smoke.webp')` }}
            />
            
            {/* Ambient golden glows */}
            <div className="absolute w-[500px] h-[500px] bg-[#e6c89c]/10 rounded-full blur-[140px] -top-40 -left-40 pointer-events-none animate-pulse" />
            <div className="absolute w-[500px] h-[500px] bg-[#b39359]/5 rounded-full blur-[140px] -bottom-40 -right-40 pointer-events-none" />

            <div className="relative text-center z-10 space-y-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="font-serif text-4xl sm:text-5xl text-[#faf9f6] tracking-wide lowercase flex items-center justify-center gap-1 font-bold"
              >
                isya<span className="text-xl text-[#b39359] relative -top-3.5 select-none">•</span>
              </motion.h1>
              <p className="text-[10px] tracking-[0.35em] text-[#e6c89c] font-light uppercase">
                Modern Jewellery for GenZ
              </p>
              
              {/* Elegant Line Loader */}
              <div className="w-56 h-[1px] bg-white/10 mx-auto relative overflow-hidden mt-8">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#e6c89c] to-[#b39359]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeInOut', duration: 0.1 }}
                />
              </div>
              
              {/* Percentage counter */}
              <div className="font-serif text-xs text-[#e6c89c]/70 tracking-[0.2em] pt-2">
                {progress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <main className="flex-grow pt-14 sm:pt-16">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
};
export default MainLayout;
