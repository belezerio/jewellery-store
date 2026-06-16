import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCollection } from '../hooks/useShopify';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ArrowDownAZ, Loader2 } from 'lucide-react';

export const Collection: React.FC = () => {
  const { handle = 'asset-pack-47843966978-example-products' } = useParams<{ handle: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('RELEVANCE');

  // Fetch products from Shopify collection
  const { data: collection, isLoading, error } = useCollection(handle, 40);

  const products = collection?.products?.edges?.map(edge => edge.node) || [];

  // Filter unique product types from the collection
  const productTypes = useMemo(() => {
    const types = new Set<string>();
    products.forEach((p) => {
      if (p.productType) types.add(p.productType);
    });
    return ['ALL', ...Array.from(types)];
  }, [products]);

  // Filter and sort products in-memory for premium fluid interaction
  const processedProducts = useMemo(() => {
    let list = [...products];

    // Apply URL search query if exists
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.productType?.toLowerCase().includes(q)
      );
    }

    // Apply Product Type Filter
    if (selectedType !== 'ALL') {
      list = list.filter((p) => p.productType === selectedType);
    }

    // Apply Sorting
    if (sortBy === 'PRICE_LOW_HIGH') {
      list.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (sortBy === 'PRICE_HIGH_LOW') {
      list.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    } else if (sortBy === 'TITLE_A_Z') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, selectedType, sortBy, searchQuery]);

  const displayedProducts = processedProducts.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="relative h-60 md:h-72 rounded-xl overflow-hidden bg-emerald-950 flex items-center justify-center text-center p-6 border border-[#e6c89c]/20">
        {collection?.image?.url ? (
          <div className="absolute inset-0 bg-cover bg-center opacity-40 scale-105" style={{ backgroundImage: `url(${collection.image.url})` }} />
        ) : (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800')] bg-cover bg-center opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b3c2a]/70" />
        <div className="relative space-y-3 max-w-2xl">
          <span className="text-[10px] tracking-[0.35em] text-[#e6c89c] uppercase font-bold block">
            Exclusive Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#faf9f6] tracking-wider uppercase font-semibold">
            {searchQuery ? `Search Results` : collection?.title || 'Luxury Collection'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 tracking-wider font-light line-clamp-2">
            {searchQuery
              ? `Found ${processedProducts.length} items matching "${searchQuery}"`
              : collection?.description || 'Indulge in fine craftsmanship. Handpicked selection of rings, earrings, pendants, and bracelets.'}
          </p>
        </div>
      </div>

      {/* 2. Sorting / Filtering Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-[#e6c89c]/20 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {productTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setVisibleCount(8);
              }}
              className={`px-4 py-1.5 border text-xs tracking-wider rounded-full font-medium transition-all duration-300 ${
                selectedType === type
                  ? 'bg-[#0b3c2a] text-[#faf9f6] border-[#0b3c2a] shadow-sm'
                  : 'bg-white text-gray-700 border-[#e6c89c]/20 hover:border-[#b39359]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Sort drop downs */}
        <div className="flex gap-4 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white w-full md:w-auto shadow-sm">
            <ArrowDownAZ className="h-4 w-4 text-[#b39359]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold tracking-wider text-gray-700 border-none outline-none focus:ring-0 cursor-pointer w-full md:w-auto"
            >
              <option value="RELEVANCE">Relevance</option>
              <option value="PRICE_LOW_HIGH">Price: Low to High</option>
              <option value="PRICE_HIGH_LOW">Price: High to Low</option>
              <option value="TITLE_A_Z">Alphabetical: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-4">
              <div className="aspect-[4/5] bg-white border border-gray-100 rounded-lg animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>
          ))}
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#e6c89c]/10 rounded-xl">
          <p className="font-serif text-lg text-gray-500 tracking-wider">
            No products found matching the criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Trigger */}
          {visibleCount < processedProducts.length && (
            <div className="text-center pt-8">
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 border border-[#0b3c2a] text-[#0b3c2a] font-semibold text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-[#0b3c2a] hover:text-[#faf9f6] transition-all duration-300"
              >
                LOAD MORE ITEMS
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Collection;
