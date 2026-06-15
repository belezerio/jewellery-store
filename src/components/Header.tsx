import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useCartQuery } from '../hooks/useShopify';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { setSearchOpen, setCartOpen, wishlist } = useStore();
  const { data: cart } = useCartQuery();
  const location = useLocation();

  const cartCount = cart?.lines?.edges?.reduce((sum, edge) => sum + edge.node.quantity, 0) || 0;
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTIONS', path: '/collection/asset-pack-47843966978-example-products' },
    { name: 'WISHLIST', path: '/wishlist' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'glass-panel py-3 shadow-md'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Burger menu for Mobile */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1c1c1c] hover:text-[#c5a880] transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Left: Brand / Logo */}
          <Link
            to="/"
            className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#0f2e24] font-bold hover:text-[#c5a880] transition-all duration-300"
          >
            AURELIA
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-semibold tracking-widest text-[#1c1c1c] hover:text-[#c5a880] transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#c5a880] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    location.pathname === link.path ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#1c1c1c] hover:text-[#c5a880] transition-all duration-300 p-1 hover:scale-105"
              aria-label="Search Store"
            >
              <Search className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="text-[#1c1c1c] hover:text-[#c5a880] transition-all duration-300 p-1 relative hover:scale-105"
              aria-label="View Wishlist"
            >
              <Heart className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a880] text-white text-[8px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="text-[#1c1c1c] hover:text-[#c5a880] transition-all duration-300 p-1 relative hover:scale-105"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0f2e24] text-[#faf9f6] text-[8px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#faf9f6] border-b border-[#e6c89c]/20 shadow-lg py-6 px-4 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-xs font-semibold tracking-widest text-[#1c1c1c] hover:text-[#c5a880] transition-colors py-2 border-b border-gray-50"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
export default Header;
