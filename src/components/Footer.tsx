import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f2e24] text-[#faf9f6] pt-16 pb-8 border-t border-[#e6c89c]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Branding Column */}
        <div className="space-y-4">
          <h2 className="font-serif text-3xl tracking-[0.2em] font-bold text-[#e6c89c]">
            AURELIA
          </h2>
          <p className="text-xs tracking-wider text-gray-300 leading-relaxed font-light">
            Crafting luxury hand-finished fine jewellery since 2012. Our pieces reflect timeless beauty, ethical sourcing, and modern craftsmanship.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
              <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
              <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
              <Compass className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Collections Column */}
        <div>
          <h3 className="font-serif text-sm tracking-widest text-[#e6c89c] uppercase mb-5 font-semibold">
            Shop Collections
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/collection/frontpage" className="text-xs tracking-wider text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/collection/asset-pack-47843966978-example-products" className="text-xs tracking-wider text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
                Featured Pieces
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="text-xs tracking-wider text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
                My Saved Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div>
          <h3 className="font-serif text-sm tracking-widest text-[#e6c89c] uppercase mb-5 font-semibold">
            Customer Services
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-xs tracking-wider text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
                Book a Virtual Consultation
              </a>
            </li>
            <li>
              <a href="#" className="text-xs tracking-wider text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="#" className="text-xs tracking-wider text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
                Easy Returns & Exchange
              </a>
            </li>
            <li>
              <a href="#" className="text-xs tracking-wider text-gray-300 hover:text-[#e6c89c] transition-colors duration-300">
                Jewellery Care Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm tracking-widest text-[#e6c89c] uppercase mb-5 font-semibold">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-xs tracking-wider text-gray-300">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#e6c89c]" />
              <span>+1 (800) AURELIA</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#e6c89c]" />
              <span>concierge@aurelia.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#e6c89c] mt-0.5" />
              <span className="leading-relaxed">
                Fifth Avenue Gallery,<br />
                New York, NY 10011
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom copyright row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] tracking-widest text-gray-400">
          &copy; {new Date().getFullYear()} AURELIA JEWELLERY. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[10px] tracking-widest text-gray-400">
          DEVELOPED SECURELY WITH SHOPIFY HEADLESS COMMERCE.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
