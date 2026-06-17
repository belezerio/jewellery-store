import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, History, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useSearch } from '../hooks/useShopify';
import { ProductCard } from './ProductCard';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  // Lock body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [isSearchOpen]);

  const { data: results, isLoading } = useSearch(debouncedTerm, 8);

  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  };

  const handleSuggestionClick = (term: string) => {
    setSearchTerm(term);
    saveSearch(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveSearch(searchTerm);
      setSearchOpen(false);
      navigate(`/collection/frontpage?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('recent-searches');
  };

  const trendingSearches = ['Ring', 'Gold', 'Silver', 'Earring', 'Necklace'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#faf9f6]/98 backdrop-blur-md overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header / Close Row */}
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-3xl tracking-wide text-[#0b3c2a] font-bold lowercase flex items-center">
                isya<span className="text-[10px] text-[#b39359] ml-0.5 select-none relative -top-1.5">•</span>
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-2 text-sm tracking-wider text-[#1c1c1c] hover:text-[#b39359] transition-colors duration-300"
              >
                <span>CLOSE</span>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Input Bar */}
            <div className="relative border-b-2 border-[#b39359]/30 pb-4 mb-8">
              <div className="flex items-center">
                <Search className="h-7 w-7 text-[#b39359] mr-4" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="SEARCH FOR GOLD, DIAMONDS, RINGS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none text-[#1c1c1c] placeholder-gray-400 focus:outline-none focus:ring-0 text-base sm:text-lg md:text-2xl tracking-widest font-serif"
                />
                {isLoading && (
                  <Loader2 className="h-6 w-6 text-[#b39359] animate-spin ml-4" />
                )}
              </div>
            </div>

            {/* Content layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar: Suggestions / History */}
              <div className="lg:col-span-1 space-y-8">
                {/* Trending */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#a88a5e] uppercase mb-4">
                    <TrendingUp className="h-4 w-4" />
                    Trending Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSuggestionClick(term)}
                        className="px-4 py-2 bg-white hover:bg-[#0b3c2a] hover:text-[#faf9f6] border border-[#e6c89c]/20 hover:border-[#0b3c2a] transition-all duration-300 text-xs tracking-wider rounded-full text-gray-700 shadow-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recents */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#a88a5e] uppercase">
                        <History className="h-4 w-4" />
                        Recent Searches
                      </h4>
                      <button
                        onClick={clearRecent}
                        className="text-[10px] tracking-widest text-red-500 hover:underline uppercase"
                      >
                        Clear
                      </button>
                    </div>
                    <ul className="space-y-2.5">
                      {recentSearches.map((term) => (
                        <li key={term}>
                          <button
                            onClick={() => handleSuggestionClick(term)}
                            className="text-sm tracking-wide text-gray-600 hover:text-[#b39359] transition-colors duration-300 flex items-center"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b39359] mr-2" />
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Grid: Results */}
              <div className="lg:col-span-3">
                {debouncedTerm.trim().length > 0 ? (
                  <div>
                    <h3 className="font-serif text-lg tracking-wider text-[#0b3c2a] mb-6 border-b border-gray-100 pb-2">
                      Search Results for "{debouncedTerm}" ({results?.length || 0})
                    </h3>
                    {results && results.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                        {results.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => setSearchOpen(false)}
                          >
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      !isLoading && (
                        <div className="text-center py-12">
                          <p className="font-serif text-lg text-gray-500 tracking-wide">
                            No products found matching your search.
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 rounded-lg bg-white/50">
                    <Search className="h-12 w-12 text-[#b39359] mb-4 opacity-50" />
                    <p className="font-serif text-lg text-gray-500 tracking-wide">
                      Start typing to discover luxury pieces
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SearchModal;
