import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="space-y-20 pb-20">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974')] bg-cover bg-center opacity-65 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm tracking-[0.3em] text-[#e6c89c] font-semibold block uppercase"
          >
            Fine Jewellery Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-widest text-[#faf9f6] leading-tight"
          >
            Timeless Elegance <br />
            <span className="italic text-[#e6c89c]">Handcrafted</span> for You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base text-gray-300 max-w-xl mx-auto tracking-wider font-light"
          >
            Discover exquisite rings, earrings, and neckpieces designed to celebrate life's most precious moments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6"
          >
            <Link
              to="/collection/asset-pack-47843966978-example-products"
              className="inline-flex items-center gap-3 bg-[#e6c89c] text-[#0f2e24] font-semibold text-xs tracking-[0.2em] px-8 py-4 rounded-full hover:bg-[#faf9f6] transition-colors duration-300 shadow-xl"
            >
              EXPLORE COLLECTIONS
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Shop by Category (GIVA Style Rounded Swiper) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0f2e24]">
            Shop by Category
          </h2>
          <div className="w-16 h-[2px] bg-[#c5a880] mx-auto mt-3" />
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={3}
          navigation
          breakpoints={{
            480: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }}
          className="category-swiper pb-4"
        >
          {[
            { name: 'Rings', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400' },
            { name: 'Bracelets', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400' },
            { name: 'Pendants', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400' },
            { name: 'Earrings', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=400' },
            { name: 'Men in Silver', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1618453292459-53424b6ebeb7?q=80&w=400' },
            { name: 'Sets', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400' },
            { name: 'Anklets', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=400' },
            { name: 'Silver Chains', handle: 'frontpage', img: 'https://images.unsplash.com/photo-1599643477877-537ef5278530?q=80&w=400' },
          ].map((cat, idx) => (
            <SwiperSlide key={idx}>
              <Link to={`/collection/${cat.handle}`} className="group text-center block">
                <div className="relative aspect-square w-full bg-[#82132d] rounded-[24px] overflow-hidden flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-[1.02] shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#82132d]/40 via-transparent to-[#4a0615]/60 z-10" />
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-[18px] relative z-0 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-sans text-[11px] font-semibold tracking-wide text-gray-700 uppercase mt-3 group-hover:text-[#c5a880] transition-colors duration-300">
                  {cat.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2.5. GIVA Trust Badges Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: '925 Fine Silver',
              desc: 'With Brand Authenticity',
              icon: (
                <svg className="w-8 h-8 text-[#82132d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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
                <svg className="w-8 h-8 text-[#82132d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              ),
            },
            {
              title: 'Lifetime Plating',
              desc: 'Brilliant Polish Finish',
              icon: (
                <svg className="w-8 h-8 text-[#82132d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 2l3 6 7 1-5 5 1.5 7.5L12 18l-6.5 3.5L7 14 2 9l7-1z" />
                </svg>
              ),
            },
            {
              title: 'Easy 15 Days Return',
              desc: 'Zero-Hassle Exchange',
              icon: (
                <svg className="w-8 h-8 text-[#82132d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 1 1 21.27 15" />
                  <path d="M13 9l3 3-3 3" />
                </svg>
              ),
            },
          ].map((badge, idx) => (
            <div key={idx} className="bg-[#faf5ef] border border-[#e6c89c]/15 p-5 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#e6c89c]/10 flex-shrink-0">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-sans text-xs sm:text-sm font-bold text-[#0f2e24] tracking-wide">{badge.title}</h4>
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
              src="https://images.unsplash.com/photo-1618453292459-53424b6ebeb7?q=80&w=600"
              alt="Shop For Him"
              className="absolute bottom-0 h-[80%] object-contain z-10 transition-transform duration-700 group-hover:scale-103"
            />
            <div />
            <Link
              to="/collection/frontpage"
              className="relative z-20 mb-4 inline-flex items-center gap-3 bg-[#b39359] text-white font-semibold text-xs tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-[#0f2e24] transition-colors duration-300 shadow-md group-hover:scale-105"
            >
              SHOP FOR HIM ➔
            </Link>
          </div>

          {/* Shop For Her */}
          <div className="relative overflow-hidden group bg-gradient-to-t from-[#f6ebe1] to-[#faf9f6] rounded-[24px] border border-[#e6c89c]/15 p-6 flex flex-col justify-between items-center text-center h-[350px] md:h-[400px]">
            <div className="absolute bottom-0 w-[80%] h-[85%] bg-[#ecdac9] rounded-t-[140px] z-0" />
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600"
              alt="Shop For Her"
              className="absolute bottom-0 h-[80%] object-contain z-10 transition-transform duration-700 group-hover:scale-103"
            />
            <div />
            <Link
              to="/collection/frontpage"
              className="relative z-20 mb-4 inline-flex items-center gap-3 bg-[#b39359] text-white font-semibold text-xs tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-[#0f2e24] transition-colors duration-300 shadow-md group-hover:scale-105"
            >
              SHOP FOR HER ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 2.7. GIVA "Kriti's Favourites" Curated Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Curated Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#faf2e9] via-[#f7e6d5] to-[#fcece0] rounded-[24px] border border-[#e6c89c]/20 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[200px]">
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
            <h2 className="font-serif text-3xl md:text-4xl italic text-[#0f2e24] tracking-wide font-semibold">
              Kriti's Favourites
            </h2>
            <p className="text-sm tracking-wider text-[#82132d] font-bold uppercase">
              Kriti picked these. Your turn now
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0f2e24] font-semibold">
            Latest Collections
          </h2>
          <div className="w-16 h-[2px] bg-[#c5a880] mx-auto mt-3" />
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
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
                { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1' },
                { img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2' },
                { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3' }
              ]
            },
            {
              title: 'pearl-fectly SILVER',
              subtitle: 'Timeless pearls meet everyday sterling silver.',
              tag: 'CLASSIC ESSENTIALS',
              bg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800',
              bgColor: 'bg-[#1f242e]',
              products: [
                { img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1' },
                { img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2' },
                { img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3' }
              ]
            },
            {
              title: 'ROYAL GOLD',
              subtitle: 'Exquisite 18K solid gold masterworks.',
              tag: 'ROYALTY',
              bg: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800',
              bgColor: 'bg-[#2b1f13]',
              products: [
                { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1' },
                { img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2' },
                { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3' }
              ]
            },
            {
              title: 'DIAMOND VAULT',
              subtitle: 'Brilliant conflict-free diamonds handcrafted to shine.',
              tag: 'FOREVER FINE',
              bg: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800',
              bgColor: 'bg-[#182126]',
              products: [
                { img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-1' },
                { img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-2' },
                { img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200', link: '/product/asset-pack-47843966978-example-product-3' }
              ]
            }
          ].map((col, cIdx) => (
            <SwiperSlide key={cIdx}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`relative overflow-hidden group rounded-[28px] border border-[#e6c89c]/15 shadow-sm h-[400px] flex flex-col justify-between p-6 ${col.bgColor}`}
              >
                {/* Background image overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-[2s] ease-out group-hover:scale-108"
                  style={{ backgroundImage: `url(${col.bg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0" />

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
                    <motion.div
                      key={pIdx}
                      whileHover={{ y: -4, scale: 1.05 }}
                      className="flex-shrink-0"
                    >
                      <Link
                        to={prod.link}
                        className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl overflow-hidden border border-[#e6c89c]/20 p-1 flex items-center justify-center shadow-lg block transition-all hover:border-[#c5a880]"
                      >
                        <img src={prod.img} alt="Product thumb" className="w-full h-full object-cover rounded-xl" />
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/collection/frontpage"
                      className="w-10 h-10 md:w-12 md:h-12 bg-[#b39359] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#0f2e24] transition-colors duration-300 shadow-lg font-bold"
                    >
                      ➔
                    </Link>
                  </motion.div>
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
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wider text-[#0f2e24]">
                The New Arrivals
              </h2>
            </div>
            <Link
              to="/collection/asset-pack-47843966978-example-products"
              className="group flex items-center gap-1 text-xs font-semibold tracking-wider text-[#0f2e24] hover:text-[#c5a880] transition-colors duration-300"
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
          <div className="absolute inset-0 bg-[#0f2e24]/15" />
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
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#0f2e24] leading-tight">
            Designed to Last <br />A Lifetime
          </h2>
          <p className="text-sm tracking-wider text-gray-600 leading-relaxed font-light">
            Every Aurelia creation is handcrafted with extreme precision and devotion. We use only sustainably sourced 18K solid gold, conflict-free fine diamonds, and carefully selected natural gemstones.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="h-6 w-6 text-[#c5a880] flex-shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#0f2e24]">100% Certified</h4>
                <p className="text-[11px] text-gray-500 mt-1">Hallmarked & certified precious metals.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Gem className="h-6 w-6 text-[#c5a880] flex-shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#0f2e24]">Fine Cut Diamonds</h4>
                <p className="text-[11px] text-gray-500 mt-1">Exquisite quality cuts with certification.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. Gifting Store Banner */}
      <section className="bg-[#0f2e24] text-[#faf9f6] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1920')] bg-cover bg-center mix-blend-overlay opacity-15" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <Sparkles className="h-8 w-8 text-[#e6c89c] mx-auto animate-pulse" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wider text-[#e6c89c]">
            The Aurelia Gift Experience
          </h2>
          <p className="text-xs sm:text-sm tracking-widest text-gray-300 max-w-lg mx-auto font-light leading-relaxed">
            Beautifully boxed with customizable handwritten cards and premium velvet bags. Make your gift memorable.
          </p>
          <div className="pt-4">
            <Link
              to="/collection/asset-pack-47843966978-example-products"
              className="inline-block bg-[#e6c89c] text-[#0f2e24] font-semibold text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-white transition-colors duration-300"
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
          <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0f2e24]">
            Shared Love
          </h2>
          <div className="w-16 h-[2px] bg-[#c5a880] mx-auto mt-3" />
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
              quote: "I bought the gold minimalist hoop earrings. They are very lightweight and perfect for everyday styling. Aurelia is my new go-to store.",
              author: "Meera Sen",
              role: "Verified Buyer"
            }
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e6c89c]/20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="flex gap-1 text-[#c5a880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed font-light">
                "{t.quote}"
              </p>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#0f2e24]">{t.author}</h4>
                <span className="text-[10px] tracking-wider text-gray-400 uppercase">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#0f2e24]">
          Join The Aurelia Club
        </h2>
        <p className="text-xs tracking-wider text-gray-500 max-w-md mx-auto font-light">
          Subscribe to receive preview access to new collections, exclusive vault offers, and fine jewellery guidance.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            required
            className="flex-1 bg-white border border-[#e6c89c]/40 text-xs px-5 py-3 rounded-full focus:outline-none focus:border-[#0f2e24] tracking-widest font-sans"
          />
          <button
            type="submit"
            className="bg-[#0f2e24] text-[#faf9f6] font-semibold text-xs tracking-widest px-8 py-3 rounded-full hover:bg-[#c5a880] transition-colors duration-300"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>
    </div>
  );
};
export default Home;
