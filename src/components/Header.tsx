import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useCartQuery } from '../hooks/useShopify';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { setSearchOpen, setCartOpen, wishlist, isInitialLoading } = useStore();
  const { data: cart } = useCartQuery();
  const location = useLocation();

  const cartCount = cart?.lines?.edges?.reduce((sum, edge) => sum + edge.node.quantity, 0) || 0;
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => document.body.classList.remove('scroll-locked');
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTIONS', path: '/collection/asset-pack-47843966978-example-products' },
    { name: 'WISHLIST', path: '/wishlist' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isInitialLoading && location.pathname === '/'
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      } ${
        scrolled
          ? 'glass-panel py-2 sm:py-3 shadow-md'
          : 'bg-transparent py-3 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Burger menu for Mobile */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1c1c1c] hover:text-[#b39359] transition-colors p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Left: Brand / Logo */}
          <Link
            to="/"
            className="font-serif text-2xl sm:text-3xl tracking-wide text-[#0b3c2a] font-bold hover:text-[#b39359] transition-all duration-300 lowercase relative flex items-center"
          >
            isya
            <span className="text-[10px] text-[#b39359] ml-0.5 select-none relative -top-1.5">•</span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-semibold tracking-widest text-[#1c1c1c] hover:text-[#b39359] transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#b39359] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    location.pathname === link.path ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#1c1c1c] hover:text-[#b39359] transition-all duration-300 p-2 hover:scale-105"
              aria-label="Search Store"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="text-[#1c1c1c] hover:text-[#b39359] transition-all duration-300 p-2 relative hover:scale-105"
              aria-label="View Wishlist"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#b39359] text-white text-[8px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="text-[#1c1c1c] hover:text-[#b39359] transition-all duration-300 p-2 relative hover:scale-105"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#0b3c2a] text-[#faf9f6] text-[8px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Animated */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-0 bg-black/30 z-[-1]"
            />
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[#faf9f6] border-b border-[#e6c89c]/20 shadow-lg py-6 px-6 space-y-1 flex flex-col"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold tracking-widest py-3 border-b border-gray-100 transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#b39359]'
                      : 'text-[#1c1c1c] hover:text-[#b39359]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
