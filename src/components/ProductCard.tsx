import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../services/shopify/queries';
import { useStore } from '../store/useStore';
import { useAddToCart } from '../hooks/useShopify';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { mutate: addToCartMut, isPending: isAdding } = useAddToCart();
  const wishlisted = isInWishlist(product.handle);

  const mainImage = product.images?.edges?.[0]?.node?.url || 'https://via.placeholder.com/400x500?text=Isya+Jewelry';
  const hoverImage = product.images?.edges?.[1]?.node?.url || mainImage;
  const price = product.priceRange?.minVariantPrice;
  const compareAtPrice = product.variants?.edges?.[0]?.node?.compareAtPrice;
  const firstVariantId = product.variants?.edges?.[0]?.node?.id;

  // Generate consistent mock rating and reviews based on name length for visual realism
  const rating = (4.5 + (product.handle.length % 5) * 0.1).toFixed(1);
  const reviewsCount = 42 + (product.handle.length % 9) * 38;
  const isBestseller = product.handle.length % 3 === 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.handle);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstVariantId) {
      addToCartMut({ merchandiseId: firstVariantId, quantity: 1 });
    }
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    const value = parseFloat(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden bg-white border border-[#e6c89c]/20 hover:shadow-lg hover:shadow-[#b39359]/5 transition-all duration-500 rounded-lg">
      <Link to={`/product/${product.handle}`} className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 block">
        {/* Bestseller Badge */}
        {isBestseller && (
          <span className="absolute top-0 left-0 bg-[#e58a9d] text-white font-sans text-[9px] font-bold tracking-widest px-3 py-1 rounded-br-lg z-10 shadow-sm uppercase">
            Bestseller
          </span>
        )}

        <img
          src={mainImage}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {hoverImage !== mainImage && (
          <img
            src={hoverImage}
            alt={product.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Rating overlay */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-semibold text-gray-700 border border-[#e6c89c]/10 z-10 flex items-center gap-1 shadow-sm">
          <span>{rating}</span>
          <span className="text-yellow-500">★</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">{reviewsCount}</span>
        </div>

        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 border border-[#e6c89c]/30 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white hover:scale-110 text-gray-500 hover:text-red-500"
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Quick add: always visible on mobile (no hover), hover-reveal on desktop */}
        <div className="absolute inset-x-0 bottom-2 sm:bottom-4 z-10 flex justify-center sm:opacity-0 sm:translate-y-3 transition-all duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 px-2 sm:px-4">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#0b3c2a]/90 sm:bg-[#0b3c2a] px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold tracking-wider text-[#faf9f6] hover:bg-[#b39359] transition-colors duration-300 shadow-md backdrop-blur-sm sm:backdrop-blur-none"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {isAdding ? 'ADDING...' : 'QUICK ADD'}
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4 bg-[#faf9f6]/30">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#a88a5e] mb-0.5 sm:mb-1 font-medium">
          {product.productType || 'Jewellery'}
        </span>
        <h3 className="text-xs sm:text-sm font-semibold text-[#1c1c1c] tracking-wide line-clamp-1 group-hover:text-[#b39359] transition-colors duration-300">
          <Link to={`/product/${product.handle}`}>{product.title}</Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-sm font-semibold text-isya-green">
            {price ? formatPrice(price.amount, price.currencyCode) : ''}
          </p>
          {compareAtPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </p>
          )}
        </div>
        {compareAtPrice && (
          <p className="text-[9px] font-bold text-isya-gold uppercase tracking-wider mt-1.5 animate-pulse">
            PRICE DROP!
          </p>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
