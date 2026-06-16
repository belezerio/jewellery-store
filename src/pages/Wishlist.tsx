import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 min-h-[60vh]">
      {/* Header */}
      <div className="text-center space-y-3">
        <Heart className="h-10 w-10 text-[#b39359] mx-auto fill-current" />
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0b3c2a] uppercase font-semibold">
          My Saved Pieces
        </h1>
        <p className="text-xs tracking-wider text-gray-500 max-w-md mx-auto font-light">
          Review your dream selection. Keep track of your favourite items and add them to your cart when ready.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#e6c89c]/10 rounded-xl max-w-xl mx-auto space-y-6 shadow-sm">
          <p className="font-serif text-lg text-gray-600 font-light">
            Your wishlist is currently empty.
          </p>
          <Link
            to="/collection/asset-pack-47843966978-example-products"
            className="inline-flex items-center gap-2 bg-[#0b3c2a] text-[#faf9f6] font-semibold text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-[#b39359] transition-colors duration-300 shadow"
          >
            DISCOVER PIECES
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Wishlist;
