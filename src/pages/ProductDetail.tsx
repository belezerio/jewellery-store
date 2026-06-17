import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail, useAddToCart, useProducts } from '../hooks/useShopify';
import { useStore } from '../store/useStore';
import { Heart, ShoppingBag, Truck, RotateCcw, Shield, ChevronDown, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProductDetail(handle || '');
  const { mutate: addToCartMut, isPending: isAdding } = useAddToCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');

  // Fetch related products
  const { data: allProducts } = useProducts(8);

  const wishlisted = product ? isInWishlist(product.handle) : false;

  // Initialize selected options on load
  useEffect(() => {
    if (product?.options) {
      const defaults: Record<string, string> = {};
      product.options.forEach((opt) => {
        if (opt.values?.length) {
          defaults[opt.name] = opt.values[0];
        }
      });
      setSelectedOptions(defaults);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b39359] mb-4" />
        <p className="font-serif tracking-widest text-[#0b3c2a] text-sm uppercase">Unveiling Jewellery Details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center min-h-[50vh]">
        <h2 className="font-serif text-2xl text-red-700 mb-4">Failed to load product details</h2>
        <Link to="/" className="text-sm font-semibold tracking-wider text-[#0b3c2a] hover:underline uppercase">
          Back to Home Page
        </Link>
      </div>
    );
  }

  const images = product.images?.edges?.map((e) => e.node) || [];
  const activeImage = images[activeImageIndex]?.url || 'https://via.placeholder.com/600x750';

  // Find variant matching selected options
  const activeVariant = product.variants?.edges?.find(({ node }) => {
    return node.selectedOptions.every(
      (opt) => selectedOptions[opt.name] === opt.value
    );
  })?.node || product.variants?.edges?.[0]?.node;

  const price = activeVariant?.price || product.priceRange?.minVariantPrice;
  const comparePrice = activeVariant?.compareAtPrice;

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.handle);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (activeVariant?.id) {
      addToCartMut({ merchandiseId: activeVariant.id, quantity: 1 });
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

  // Filter out current product for related items
  const relatedProducts = allProducts?.filter((p) => p.handle !== product.handle) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-16">
      {/* Breadcrumbs */}
      <nav className="text-[10px] tracking-[0.25em] text-gray-500 uppercase flex gap-2">
        <Link to="/" className="hover:text-[#b39359] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/collection/asset-pack-47843966978-example-products" className="hover:text-[#b39359] transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-[#0b3c2a] font-semibold">{product.title}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] flex-row scrollbar-none max-w-full md:w-24">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square w-16 md:w-full border rounded-md overflow-hidden bg-gray-50 flex-shrink-0 transition-all ${
                    idx === activeImageIndex
                      ? 'border-[#b39359] ring-1 ring-[#b39359]'
                      : 'border-[#e6c89c]/20 hover:border-gray-400'
                  }`}
                >
                  <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Large Image Preview with hover-zoom */}
          <div className="flex-1 aspect-[4/5] bg-white border border-[#e6c89c]/20 rounded-xl overflow-hidden relative group">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {comparePrice && (
              <span className="absolute top-4 left-4 bg-red-600 text-white font-sans text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow">
                Save
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs tracking-[0.3em] text-[#a88a5e] uppercase font-semibold">
              {product.productType || 'Fine Jewellery'}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0b3c2a] tracking-wide font-semibold leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-4 border-b border-[#e6c89c]/20 pb-4">
            <span className="text-2xl font-bold text-[#0b3c2a]">
              {price ? formatPrice(price.amount, price.currencyCode) : ''}
            </span>
            {comparePrice && (
              <span className="text-base text-gray-400 line-through">
                {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
              </span>
            )}
          </div>

          {/* Variant Selector Options */}
          {product.options && product.options.length > 0 && (
            <div className="space-y-4">
              {product.options.map((opt) => (
                <div key={opt.name} className="space-y-2">
                  <span className="text-[10px] tracking-widest text-[#a88a5e] uppercase font-semibold">
                    Select {opt.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val) => {
                      const isSelected = selectedOptions[opt.name] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleOptionChange(opt.name, val)}
                          className={`px-4 py-2 border text-xs tracking-wider rounded-md transition-all duration-300 font-medium ${
                            isSelected
                              ? 'bg-[#0b3c2a] text-[#faf9f6] border-[#0b3c2a] shadow-sm'
                              : 'bg-white text-gray-700 border-[#e6c89c]/20 hover:border-[#b39359]'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to Cart & Wishlist Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !activeVariant?.availableForSale}
              className={`flex-1 flex items-center justify-center gap-2 rounded-full py-4 text-xs font-semibold tracking-widest text-[#faf9f6] transition-all duration-300 shadow-md ${
                activeVariant?.availableForSale
                  ? 'bg-[#0b3c2a] hover:bg-[#b39359]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              {isAdding ? 'ADDING...' : activeVariant?.availableForSale ? 'ADD TO CART' : 'OUT OF STOCK'}
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                wishlisted
                  ? 'border-red-500 bg-red-50 text-red-500 scale-105'
                  : 'border-gray-200 hover:border-[#b39359] text-gray-500'
              }`}
              aria-label="Toggle Wishlist"
            >
              <Heart className={`h-5 w-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[#e6c89c]/20 text-center">
            <div className="flex flex-col items-center space-y-1.5">
              <Truck className="h-5 w-5 text-[#b39359]" />
              <span className="text-[9px] sm:text-[10px] tracking-wide text-gray-600 font-medium">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <RotateCcw className="h-5 w-5 text-[#b39359]" />
              <span className="text-[9px] sm:text-[10px] tracking-wide text-gray-600 font-medium">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Shield className="h-5 w-5 text-[#b39359]" />
              <span className="text-[9px] sm:text-[10px] tracking-wide text-gray-600 font-medium">Lifetime Warranty</span>
            </div>
          </div>

          {/* Description & Details Accordions */}
          <div className="pt-6 border-t border-[#e6c89c]/20 space-y-2">
            {[
              {
                id: 'details',
                title: 'Description & Features',
                content: product.descriptionHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    className="prose prose-sm font-light text-gray-600 tracking-wider text-xs leading-relaxed"
                  />
                ) : (
                  <p className="text-xs text-gray-600 font-light tracking-wider">{product.description}</p>
                )
              },
              {
                id: 'shipping',
                title: 'Shipping & Complimentary Gift Wrap',
                content: (
                  <p className="text-xs text-gray-600 font-light tracking-wider leading-relaxed">
                    All ISYA shipments are completely insured and transit-protected. Arrives in our signature velvet casket box with a certificate of authenticity and custom greetings.
                  </p>
                )
              }
            ].map((accordion) => {
              const isOpen = activeAccordion === accordion.id;
              return (
                <div key={accordion.id} className="border-b border-gray-100 pb-2">
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : accordion.id)}
                    className="w-full flex justify-between items-center py-2 text-left font-serif text-sm font-semibold tracking-wide text-[#0b3c2a] hover:text-[#b39359] transition-colors"
                  >
                    <span>{accordion.title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="py-2 animate-fadeIn">
                      {accordion.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Related Products Section (Swiper) */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-[#e6c89c]/20">
          <div className="text-center mb-10">
            <Sparkles className="h-6 w-6 text-[#b39359] mx-auto mb-2" />
            <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-[#0b3c2a]">
              You May Also Design
            </h2>
            <div className="w-12 h-[1.5px] bg-[#b39359] mx-auto mt-2" />
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 2.2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pb-12"
          >
            {relatedProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
export default ProductDetail;
