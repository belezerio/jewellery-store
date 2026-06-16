import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Star, ArrowUpRight, ShieldCheck, Gem, Sparkles } from 'lucide-react';
import { useProducts, useCollections } from '../hooks/useShopify';
import { ProductCard } from '../components/ProductCard';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Home: React.FC = () => {
  const { data: products, isLoading: productsLoading } = useProducts(8);
  const { data: collections } = useCollections();

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    // Dynamic luxury loader progression
    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 15) + 5;
      current = Math.min(current + step, 100);
      setProgress(current);
      if (current === 100) {
        clearInterval(interval);
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 850);
        return () => clearTimeout(timeout);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* 0. Luxury Preloader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d221b] overflow-hidden"
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
                className="font-serif text-5xl text-[#faf9f6] tracking-wide lowercase flex items-center justify-center gap-1 font-bold"
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

      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[95vh] lg:h-[100vh] flex items-center bg-[#eae1d8]/40 overflow-hidden pt-24 lg:pt-16 pb-12 lg:pb-0">
        {/* Abstract Gold Background Details */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#faf5ef_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#e6c89c]/10 blur-[140px] -top-20 -right-20 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#b39359]/5 blur-[120px] -bottom-20 -left-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Main Copy & Shortcuts list) - Column 5 */}
            <div className="lg:col-span-5 text-left space-y-8 lg:space-y-12">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-serif italic text-lg sm:text-xl text-[#b39359] tracking-wide block"
                >
                  The original
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-7xl lg:text-[5.5rem] font-serif tracking-tight text-[#0b3c2a] leading-[1.05] font-bold"
                >
                  Shine <br />
                  <span className="italic font-normal">bright.</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pt-4"
                >
                  <Link
                    to="/collection/asset-pack-47843966978-example-products"
                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-[#0b3c2a] uppercase border-b-2 border-[#0b3c2a]/40 hover:border-[#b39359] hover:text-[#b39359] pb-1.5 transition-all duration-300 group/link"
                  >
                    DISCOVER NOW
                    <span className="inline-block transform translate-x-0 group-hover/link:translate-x-1.5 transition-transform duration-300">➔</span>
                  </Link>
                </motion.div>
              </div>

              {/* Bottom Left Navigation Shortcuts */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={!isLoading ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden lg:flex flex-col gap-5 border-l-2 border-[#0b3c2a]/10 pl-6"
              >
                {[
                  { num: '01', label: 'Ring & Earring Store', handle: 'frontpage' },
                  { num: '02', label: 'Pendant & Bracelet Vault', handle: 'frontpage' },
                  { num: '03', label: 'Daily Wear Essentials', handle: 'frontpage' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/collection/${item.handle}`}
                    className="group/item flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-[#0b3c2a]/60 hover:text-[#b39359] transition-all duration-300"
                  >
                    <span className="font-serif text-[10px] text-[#b39359] group-hover/item:text-[#0b3c2a] transition-colors duration-300">{item.num}</span>
                    <span className="group-hover/item:translate-x-2 transition-transform duration-300 uppercase">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Middle Column (Model Image & Smoke Reveal) - Column 5 */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[350px] sm:max-w-[390px] aspect-[4/5] group/portrait">
                {/* Image Frame */}
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={!isLoading ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/60 bg-[#e3d8cd]"
                >
                  <img
                    src="/hero-model.webp"
                    alt="Isya Premium Luxury Portrait"
                    className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover/portrait:scale-105"
                  />
                  
                  {/* Subtle luxurious color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d221b]/25 via-transparent to-transparent pointer-events-none" />

                  {/* Dispersing Smoke Overlay */}
                  <motion.div
                    initial={{ opacity: 0.9, scale: 1, filter: 'blur(0px)' }}
                    animate={!isLoading ? { opacity: 0, scale: 1.25, filter: 'blur(20px)' } : {}}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                    className="absolute inset-0 bg-cover bg-center mix-blend-color-burn z-10 pointer-events-none"
                    style={{ backgroundImage: `url('/luxury-smoke.webp')` }}
                  />
                </motion.div>
                
                {/* Floating soft gold accent element behind image */}
                <div className="absolute -inset-4 bg-[#e6c89c]/15 blur-2xl rounded-[60px] -z-10 group-hover/portrait:scale-105 transition-transform duration-700 pointer-events-none" />
              </div>
            </div>

            {/* Right Column (Play Button Orb) - Column 2 */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={!isLoading ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
                onClick={() => setVideoOpen(true)}
                className="w-28 h-28 rounded-full border border-[#b39359]/30 flex items-center justify-center relative cursor-pointer group/play overflow-hidden bg-white/40 backdrop-blur-sm shadow-md hover:border-[#b39359] transition-all duration-500 hover:scale-105"
              >
                {/* Pulsing gold core */}
                <div className="absolute w-20 h-20 bg-[#e6c89c]/10 rounded-full scale-75 group-hover/play:scale-105 transition-transform duration-500 animate-pulse" />
                
                {/* Slow spinning SVG text */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin 18s linear infinite' }}>
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text className="fill-[#0b3c2a] text-[6.5px] uppercase tracking-[0.2em] font-sans font-bold">
                    <textPath href="#circlePath">
                      • Watch Isya Story • Watch Isya Story
                    </textPath>
                  </text>
                </svg>
                
                {/* Play core */}
                <div className="w-10 h-10 bg-[#0b3c2a] rounded-full flex items-center justify-center shadow z-10 group-hover/play:bg-[#b39359] transition-colors duration-300">
                  <svg className="w-3.5 h-3.5 text-[#faf9f6] fill-current translate-x-[1.5px]" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 1.5. Premium Video Preview Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setVideoOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#e6c89c] transition-colors text-xs tracking-[0.25em] font-semibold flex items-center gap-2"
          >
            CLOSE [ESC]
          </button>
          <div className="w-full max-w-4xl aspect-video px-4">
            <iframe
              className="w-full h-full rounded-3xl shadow-2xl border border-white/10"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Isya Luxury Story"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 2. Shop by Category (GIVA Style Rounded Widescreen Swiper) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 relative group">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0b3c2a]">
            Shop by Category
          </h2>
          <div className="w-16 h-[2px] bg-[#b39359] mx-auto mt-3" />
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          navigation
          centerInsufficientSlides={true}
          breakpoints={{
            480: { slidesPerView: 5 },
            768: { slidesPerView: 7 },
            1024: { slidesPerView: 8 },
          }}
          className="category-swiper pb-4"
        >
          {[
            { name: 'Rings', handle: 'frontpage', img: '/categories/rings.webp' },
            { name: 'Bracelets', handle: 'frontpage', img: '/categories/bracelets.webp' },
            { name: 'Pendants', handle: 'frontpage', img: '/categories/pendants.webp' },
            { name: 'Earrings', handle: 'frontpage', img: '/categories/earrings.webp' },
            { name: 'Men in Silver', handle: 'frontpage', img: '/categories/men.webp' },
            { name: 'Sets', handle: 'frontpage', img: '/categories/sets.webp' },
            { name: 'Anklets', handle: 'frontpage', img: '/categories/anklets.webp' },
            { name: 'Silver Chains', handle: 'frontpage', img: '/categories/chains.webp' },
          ].map((cat, idx) => (
            <SwiperSlide key={idx}>
              <Link to={`/collection/${cat.handle}`} className="group text-center block">
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative aspect-square w-full bg-isya-green rounded-[24px] overflow-hidden flex items-center justify-center p-3 shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-[18px] relative z-0 transition-transform duration-700 group-hover:scale-108"
                  />
                </motion.div>
                <h3 className="font-sans text-[11px] font-semibold tracking-wide text-gray-700 uppercase mt-3 group-hover:text-isya-gold transition-colors duration-300">
                  {cat.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2.5. Isya Trust Badges Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: '925 Fine Silver',
              desc: 'With Brand Authenticity',
              icon: (
                <svg className="w-8 h-8 text-isya-green" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M7 10h10M9 14h6M12 7v10" />
                  <text x="12" y="14" fontSize="4.5" textAnchor="middle" fill="currentColor" fontWeight="bold">925</text>
                </svg>
              ),
            },
            {
              title: '6-Month Warranty',
              desc: 'Quality Guarantee',
              icon: (
                <svg className="w-8 h-8 text-isya-green" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              ),
            },
            {
              title: 'Lifetime Plating',
              desc: 'Brilliant Polish Finish',
              icon: (
                <svg className="w-8 h-8 text-isya-green" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 2l3 6 7 1-5 5 1.5 7.5L12 18l-6.5 3.5L7 14 2 9l7-1z" />
                </svg>
              ),
            },
            {
              title: 'Easy 15 Days Return',
              desc: 'Zero-Hassle Exchange',
              icon: (
                <svg className="w-8 h-8 text-isya-green" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 1 1 21.27 15" />
                  <path d="M13 9l3 3-3 3" />
                </svg>
              ),
            },
          ].map((badge, idx) => (
            <div key={idx} className="bg-white border border-isya-gold/15 p-5 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-isya-sand rounded-full flex items-center justify-center shadow-sm border border-isya-gold/10 flex-shrink-0">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-sans text-xs sm:text-sm font-bold text-isya-green tracking-wide">{badge.title}</h4>
                <p className="text-[9px] tracking-wide text-gray-500 uppercase mt-0.5">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.6. GIVA Gender Split Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shop For Him */}
          <div className="relative overflow-hidden group bg-gradient-to-t from-[#f6ebe1] to-[#faf9f6] rounded-[24px] border border-[#e6c89c]/15 p-6 flex flex-col justify-between items-center text-center h-[350px] md:h-[400px]">
            <div className="absolute bottom-0 w-[80%] h-[85%] bg-[#ecdac9] rounded-t-[140px] z-0" />
            <img
              src="/man.webp"
              alt="Shop For Him"
              className="absolute bottom-0 h-[80%] object-contain z-10 transition-transform duration-700 group-hover:scale-103"
            />
            <div />
            <Link
              to="/collection/frontpage"
              className="relative z-20 mb-4 inline-flex items-center gap-3 bg-[#b39359] text-white font-semibold text-xs tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-[#0b3c2a] transition-colors duration-300 shadow-md group-hover:scale-105"
            >
              SHOP FOR HIM ➔
            </Link>
          </div>

          {/* Shop For Her */}
          <div className="relative overflow-hidden group bg-gradient-to-t from-[#f6ebe1] to-[#faf9f6] rounded-[24px] border border-[#e6c89c]/15 p-6 flex flex-col justify-between items-center text-center h-[350px] md:h-[400px]">
            <div className="absolute bottom-0 w-[80%] h-[85%] bg-[#ecdac9] rounded-t-[140px] z-0" />
            <img
              src="/girl.webp"
              alt="Shop For Her"
              className="absolute bottom-0 h-[80%] object-contain z-10 transition-transform duration-700 group-hover:scale-103"
            />
            <div />
            <Link
              to="/collection/frontpage"
              className="relative z-20 mb-4 inline-flex items-center gap-3 bg-[#b39359] text-white font-semibold text-xs tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-[#0b3c2a] transition-colors duration-300 shadow-md group-hover:scale-105"
            >
              SHOP FOR HER ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 2.65. Why Isya - Brand Pillars (Replicating Isya Jewels launch) */}
      <section className="bg-[#0b3c2a] text-[#faf9f6] py-20 relative overflow-hidden">
        {/* Soft elegant glows and smoke trails */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url('/luxury-smoke.webp')` }}
        />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#faf5ef]/5 blur-[120px] -top-20 -right-20 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#b39359]/10 blur-[120px] -bottom-20 -left-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.4em] text-[#b39359] font-bold uppercase block font-sans">
              Announcing The Launch Of
            </span>
            <h2 className="font-serif text-5xl tracking-wide lowercase flex items-center justify-center gap-1 font-bold">
              isya
              <span className="text-xl text-[#b39359] relative -top-3.5 select-none">•</span>
            </h2>
            <p className="text-xs tracking-[0.25em] text-[#faf9f6]/70 uppercase font-bold pt-1 font-sans">
              JEWELRY <span className="font-script text-3xl text-[#b39359] tracking-normal lowercase ml-1" style={{ fontFamily: "'Alex Brush', cursive" }}>for Genz</span>
            </p>
            <div className="w-12 h-[1px] bg-[#b39359]/40 mx-auto mt-4" />
          </div>

          {/* Core Green Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Card 1: Gold vs Silver */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="bg-[#05251a] border border-[#b39359]/20 rounded-[32px] p-8 flex flex-col items-center text-center space-y-6 shadow-xl relative group/card"
            >
              {/* Ring Icon SVG */}
              <div className="w-16 h-16 rounded-full bg-[#0b3c2a] flex items-center justify-center border border-[#b39359]/25 shadow-inner">
                <svg className="w-8 h-8 text-[#b39359]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="15" r="5" />
                  <path d="M12 10V6l-3 1.5M12 6l3 1.5" />
                  <path d="M12 10L9 8.5M12 10l3-1.5" />
                </svg>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.3em] text-[#b39359] font-bold uppercase font-sans">Why</span>
                <h3 className="font-serif text-3xl font-semibold tracking-wider text-[#faf9f6]">GOLD</h3>
                <span className="text-[10px] tracking-[0.2em] text-[#faf9f6]/60 uppercase block font-sans">When it can be</span>
                <h4 className="font-script text-4xl text-[#b39359]" style={{ fontFamily: "'Alex Brush', cursive" }}>Silver?</h4>
              </div>
            </motion.div>

            {/* Card 2: Diamonds vs Lab Grown */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="bg-[#05251a] border border-[#b39359]/20 rounded-[32px] p-8 flex flex-col items-center text-center space-y-6 shadow-xl relative group/card"
            >
              {/* Diamond Icon SVG */}
              <div className="w-16 h-16 rounded-full bg-[#0b3c2a] flex items-center justify-center border border-[#b39359]/25 shadow-inner">
                <svg className="w-8 h-8 text-[#b39359]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 10l6-7 6 7-6 11-6-11z" />
                  <path d="M6 10h12M12 3v18" />
                </svg>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.3em] text-[#b39359] font-bold uppercase font-sans">Why</span>
                <h3 className="font-serif text-3xl font-semibold tracking-wider text-[#faf9f6]">NATURAL DIAMONDS</h3>
                <span className="text-[10px] tracking-[0.2em] text-[#faf9f6]/60 uppercase block font-sans">When it can be</span>
                <h4 className="font-script text-3xl text-[#b39359]" style={{ fontFamily: "'Alex Brush', cursive" }}>Lab Grown Diamonds</h4>
              </div>
            </motion.div>
          </div>

          {/* Buy Back Guarantee */}
          <div className="pt-6 space-y-4">
            <h4 className="text-[#b39359] text-xs sm:text-sm tracking-[0.35em] font-extrabold uppercase animate-pulse font-sans">
              Buy Smart With Buy Back Guarantee
            </h4>
            <h3 className="font-script text-4xl text-[#faf9f6]/90 tracking-wider pt-2" style={{ fontFamily: "'Alex Brush', cursive" }}>
              Stay Tuned....
            </h3>
          </div>

          {/* Surprise Gift Promo Strip */}
          <div className="bg-gradient-to-r from-[#05251a] via-[#0b3c2a] to-[#05251a] rounded-[24px] border border-[#b39359]/20 p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              {/* Light Green Gift Box Icon */}
              <div className="w-14 h-14 bg-[#144f38] border border-[#b39359]/30 rounded-2xl flex items-center justify-center shadow-lg relative flex-shrink-0">
                <svg className="w-7 h-7 text-[#faf9f6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20 12v10H4V12m16-4v4H4V8h16z" />
                  <path d="M12 22V8M12 8a3 3 0 1 0 0-6 3 3 0 1 0 0 6z" />
                </svg>
              </div>
              <div className="text-left space-y-1">
                <span className="text-[9px] tracking-[0.3em] text-[#b39359] font-bold uppercase block font-sans">Exclusive Launch Offer</span>
                <h4 className="font-serif text-sm sm:text-base font-extrabold text-[#faf9f6] uppercase tracking-wider">
                  First 50 Buyers Gets A
                </h4>
              </div>
            </div>
            
            <div className="bg-[#b39359] text-[#05251a] font-bold text-xs sm:text-sm tracking-[0.25em] px-8 py-3.5 rounded-full shadow-lg border border-[#faf9f6]/20 animate-bounce uppercase font-sans">
              Free Surprise Gift!
            </div>
          </div>

        </div>
      </section>

      {/* 2.7. GIVA "Everyone's Favourites" Curated Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Curated Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#faf8f5] via-[#eae1d8] to-[#faf8f5] rounded-[24px] border border-isya-gold/20 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[200px]">
          {/* Left: Jewelry Accent */}
          <div className="hidden md:block w-36 h-36 relative overflow-hidden rounded-full border border-white/40 shadow-inner flex-shrink-0 bg-white/20">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300"
              alt="Jewelry Accent"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center: Curated Copy */}
          <div className="text-center md:text-left flex-1 space-y-2">
            <h2 className="font-serif text-3xl md:text-4xl italic text-isya-green tracking-wide font-semibold">
              Everyone's Favourites
            </h2>
            <p className="text-sm tracking-wider text-isya-gold font-bold uppercase">
              Everyone picked these. Your turn now
            </p>
          </div>

          {/* Right: Brand Ambassador Overlay */}
          <div className="w-44 h-44 md:w-48 md:h-48 relative overflow-hidden rounded-full border border-white/50 shadow flex-shrink-0 bg-white/30">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300"
              alt="Kriti Sanon Brand Ambassador"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Curated Product Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-white rounded-lg border border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 2.8. GIVA "Latest Collections" Overlapping Product Panels */}
      <section className="w-full px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0b3c2a] font-semibold">
            Latest Collections
          </h2>
          <div className="w-16 h-[2px] bg-[#b39359] mx-auto mt-3" />
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          centerInsufficientSlides={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
            1440: { slidesPerView: 3 },
          }}
          className="latest-collections-swiper pb-12"
        >
          {[
            {
              title: 'THALASSA',
              subtitle: 'Celebrating teal, this season\'s standout color.',
              tag: 'NEW SEASON',
              bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
              bgColor: 'bg-slate-900',
              products: [
                { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1', delay: 'delay-[0ms]' },
                { img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2', delay: 'delay-[75ms]' },
                { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3', delay: 'delay-[150ms]' }
              ]
            },
            {
              title: 'pearl-fectly SILVER',
              subtitle: 'Timeless pearls meet everyday sterling silver.',
              tag: 'CLASSIC ESSENTIALS',
              bg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800',
              bgColor: 'bg-[#1f242e]',
              products: [
                { img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1', delay: 'delay-[0ms]' },
                { img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2', delay: 'delay-[75ms]' },
                { img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3', delay: 'delay-[150ms]' }
              ]
            },
            {
              title: 'ROYAL GOLD',
              subtitle: 'Exquisite 18K solid gold masterworks.',
              tag: 'ROYALTY',
              bg: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800',
              bgColor: 'bg-[#2b1f13]',
              products: [
                { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1', delay: 'delay-[0ms]' },
                { img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2', delay: 'delay-[75ms]' },
                { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3', delay: 'delay-[150ms]' }
              ]
            },
            {
              title: 'DIAMOND VAULT',
              subtitle: 'Brilliant conflict-free diamonds handcrafted to shine.',
              tag: 'FOREVER FINE',
              bg: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800',
              bgColor: 'bg-[#182126]',
              products: [
                { img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1', delay: 'delay-[0ms]' },
                { img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2', delay: 'delay-[75ms]' },
                { img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3', delay: 'delay-[150ms]' }
              ]
            }
          ].map((col, colIdx) => (
            <SwiperSlide key={colIdx}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden group rounded-[28px] border border-[#e6c89c]/15 shadow-sm h-[420px] flex flex-col justify-between p-6 ${col.bgColor}`}
              >
                {/* Background image overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-[2s] ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${col.bg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-0" />

                {/* Top title area */}
                <div className="relative z-10 space-y-2">
                  <span className="text-[9px] tracking-[0.3em] text-[#e6c89c] font-bold uppercase">{col.tag}</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide font-semibold group-hover:text-[#e6c89c] transition-colors duration-300">
                    {col.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light max-w-sm tracking-wider">
                    {col.subtitle}
                  </p>
                </div>

                {/* Overlapping Products List Sitting at the Bottom */}
                <div className="relative z-10 flex gap-3 mt-4 items-center">
                  {col.products.map((prod, pIdx) => (
                    <div
                      key={pIdx}
                      className={`flex-shrink-0 transition-transform duration-500 ease-out transform group-hover:-translate-y-4 ${prod.delay}`}
                    >
                      <Link
                        to={prod.link}
                        className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl overflow-hidden border border-[#e6c89c]/20 p-1 flex items-center justify-center shadow-lg block hover:scale-105 transition-transform duration-300 hover:border-[#b39359]"
                      >
                        <img src={prod.img} alt="Product thumb" className="w-full h-full object-cover rounded-xl" />
                      </Link>
                    </div>
                  ))}
                  <div className="transition-transform duration-500 ease-out transform group-hover:-translate-y-4 delay-[225ms]">
                    <Link
                      to="/collection/frontpage"
                      className="w-10 h-10 md:w-12 md:h-12 bg-[#b39359] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#0b3c2a] transition-colors duration-300 shadow-lg font-bold hover:scale-110"
                    >
                      ➔
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 3. New Arrivals (Swiper Carousel) */}
      <section className="bg-[#faf9f6]/50 py-16 border-y border-[#e6c89c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#a88a5e] uppercase block font-semibold mb-1">
                New Additions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wider text-[#0b3c2a]">
                The New Arrivals
              </h2>
            </div>
            <Link
              to="/collection/asset-pack-47843966978-example-products"
              className="group flex items-center gap-1 text-xs font-semibold tracking-wider text-[#0b3c2a] hover:text-[#b39359] transition-colors duration-300"
            >
              VIEW ALL <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-white rounded-lg border border-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              centerInsufficientSlides={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {products?.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* 4. Craftsmanship / Storytelling section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video lg:aspect-square overflow-hidden rounded-xl shadow-2xl border border-[#e6c89c]/20"
        >
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800"
            alt="Craftsman working on jewellery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0b3c2a]/15" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-[10px] tracking-[0.35em] text-[#a88a5e] uppercase block font-semibold">
            Honest Craftsmanship
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#0b3c2a] leading-tight">
            Designed to Last <br />A Lifetime
          </h2>
          <p className="text-sm tracking-wider text-gray-600 leading-relaxed font-light">
            Every Isya creation is handcrafted with extreme precision and devotion. We use only ethical sterling silver, conflict-free lab-grown diamonds, and carefully selected gemstones.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="h-6 w-6 text-[#b39359] flex-shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#0b3c2a]">100% Certified</h4>
                <p className="text-[11px] text-gray-500 mt-1">Hallmarked & certified precious metals.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Gem className="h-6 w-6 text-[#b39359] flex-shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#0b3c2a]">Fine Cut Diamonds</h4>
                <p className="text-[11px] text-gray-500 mt-1">Exquisite quality cuts with certification.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. Gifting Store Banner */}
      <section className="bg-[#0b3c2a] text-[#faf9f6] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1920')] bg-cover bg-center mix-blend-overlay opacity-15" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <Sparkles className="h-8 w-8 text-[#e6c89c] mx-auto animate-pulse" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wider text-[#e6c89c]">
            The Isya Gift Experience
          </h2>
          <p className="text-xs sm:text-sm tracking-widest text-gray-300 max-w-lg mx-auto font-light leading-relaxed">
            Beautifully boxed with customizable handwritten cards and premium velvet bags. Make your gift memorable.
          </p>
          <div className="pt-4">
            <Link
              to="/collection/asset-pack-47843966978-example-products"
              className="inline-block bg-[#e6c89c] text-[#0b3c2a] font-semibold text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-white transition-colors duration-300"
            >
              EXPLORE GIFT STORE
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.35em] text-[#a88a5e] uppercase block font-semibold mb-1">
            Our Customers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0b3c2a]">
            Shared Love
          </h2>
          <div className="w-16 h-[2px] bg-[#b39359] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The diamond ring is absolutely breathtaking! The sparkle is unmatched and the custom velvet packaging made me feel so special.",
              author: "Priya Sharma",
              role: "Verified Buyer"
            },
            {
              quote: "Customer support helped me find the perfect anniversary pendant. The delivery was fast and the certification documentation was crystal clear.",
              author: "Ananya Goel",
              role: "Verified Buyer"
            },
            {
              quote: "I bought the silver minimalist hoop earrings. They are very lightweight and perfect for everyday styling. Isya is my new go-to store.",
              author: "Meera Sen",
              role: "Verified Buyer"
            }
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e6c89c]/20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="flex gap-1 text-[#b39359]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed font-light">
                "{t.quote}"
              </p>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#0b3c2a]">{t.author}</h4>
                <span className="text-[10px] tracking-wider text-gray-400 uppercase">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0b3c2a]">
          Join The Isya Club
        </h2>
        <p className="text-xs tracking-wider text-gray-500 max-w-md mx-auto font-light">
          Subscribe to receive preview access to new collections, exclusive vault offers, and fine jewellery guidance.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            required
            className="flex-1 bg-white border border-[#e6c89c]/40 text-xs px-5 py-3 rounded-full focus:outline-none focus:border-[#0b3c2a] tracking-widest font-sans"
          />
          <button
            type="submit"
            className="bg-[#0b3c2a] text-[#faf9f6] font-semibold text-xs tracking-widest px-8 py-3 rounded-full hover:bg-[#b39359] transition-colors duration-300"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>
    </div>
  );
};
export default Home;
