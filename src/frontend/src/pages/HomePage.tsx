import { Link } from "@tanstack/react-router";
import { ArrowDown, ChevronLeft, ChevronRight, Star, Zap } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useAllProducts } from "../hooks/useQueries";
import { CATEGORY_LIST, getProductImage } from "../lib/imageUtils";
import { mockProducts, testimonials } from "../lib/mockData";

function CountdownTimer() {
  const endTime = useRef(Date.now() + 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTime.current - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {[
        ["h", timeLeft.h],
        ["m", timeLeft.m],
        ["s", timeLeft.s],
      ].map(([label, val]) => (
        <div key={label as string} className="text-center">
          <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={val as number}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-display text-2xl font-black text-luxe-cyan"
              >
                {String(val as number).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            {label as string}
          </p>
        </div>
      ))}
    </div>
  );
}

function HeroSection() {
  const heroImage =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=90";
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, #050508 0%, #0d0520 25%, #130a2e 50%, #0d0520 75%, #050508 100%)",
        }}
      />
      {/* Radial glow orbs */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl animate-pulse"
        style={{
          background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/4 bottom-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #d946ef 0%, transparent 70%)",
          animation: "orbFloat 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-0 top-1/3 w-72 h-72 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, #6d28d9 0%, transparent 70%)",
          animation: "orbFloat 12s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute left-1/2 top-1/4 w-64 h-64 rounded-full opacity-20 blur-2xl"
        style={{
          background: "radial-gradient(circle, #e879f9 0%, transparent 70%)",
          animation: "orbFloat 7s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-luxe-cyan/30 text-luxe-cyan text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Zap size={12} className="fill-luxe-cyan" />
              New Collection 2026
            </motion.div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-foreground mb-6">
              DISCOVER <span className="gradient-text">PREMIUM</span>
              <br />
              PRODUCTS
              <br />
              <span className="text-foreground/70 text-4xl md:text-5xl">
                DESIGNED FOR YOU
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Curated collections of elite products crafted for those who demand
              the extraordinary. Quality meets innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="btn-primary text-sm font-bold uppercase tracking-widest"
                  data-ocid="hero.primary_button"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="btn-outline text-sm font-bold uppercase tracking-widest"
                  data-ocid="hero.secondary_button"
                >
                  Explore Collection
                </motion.button>
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-border/30">
              {[
                ["50K+", "Happy Customers"],
                ["500+", "Premium Products"],
                ["4.9", "Star Rating"],
              ].map(([num, label]) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <p className="font-display text-2xl font-black text-foreground">
                    {num}
                  </p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Product showcase */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block animate-float"
          >
            <div
              className="relative rounded-3xl overflow-hidden cyan-glow"
              style={{
                transform: "perspective(1000px) rotateY(-8deg) rotateX(3deg)",
              }}
            >
              <img
                src={heroImage}
                alt="Featured Product"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Floating price tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  y: {
                    delay: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2.5,
                    ease: "easeInOut",
                  },
                }}
                className="absolute bottom-6 left-6 glass-card rounded-2xl p-4 min-w-[160px]"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  AirMax Pro Elite
                </p>
                <p className="text-xl font-display font-black text-luxe-cyan mt-1">
                  $179.99
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={10}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    4.9
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1,
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
        >
          <ArrowDown size={16} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CategoriesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth / 4;
    scrollRef.current.scrollBy({
      left: dir === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
            Browse by Category
          </p>
          <h2 className="font-display text-4xl font-black uppercase text-foreground mb-3">
            Featured Categories
          </h2>
          {/* Decorative gradient line */}
          <div
            className="h-[3px] w-40 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #a855f7 0%, #d946ef 60%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Scroll arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex gap-2"
        >
          <motion.button
            type="button"
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="p-3 rounded-full glass-card border border-border/50 hover:border-purple-500/60 transition-all"
            data-ocid="categories.pagination_prev"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="p-3 rounded-full glass-card border border-border/50 hover:border-purple-500/60 transition-all"
            data-ocid="categories.pagination_next"
          >
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {CATEGORY_LIST.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 22,
              delay: i * 0.07,
            }}
            className="flex-shrink-0 w-[calc(25%-15px)] min-w-[200px]"
          >
            <Link to="/products" data-ocid={`categories.item.${i + 1}`}>
              <motion.div
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "2/3" }}
              >
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Base gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Purple shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168,85,247,0.25) 0%, rgba(217,70,239,0.15) 50%, transparent 100%)",
                  }}
                />

                {/* Animated shimmer sweep */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                    animation: "none",
                  }}
                />

                {/* Glowing border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1.5px rgba(168,85,247,0.7), 0 0 30px rgba(168,85,247,0.35)",
                  }}
                />

                {/* Text block */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center">
                  <p className="font-display font-black text-white uppercase tracking-[0.15em] text-base leading-tight">
                    {cat.name}
                  </p>
                  {/* Purple accent underline */}
                  <div
                    className="mt-2 h-[2px] w-10 rounded-full transition-all duration-300 group-hover:w-16"
                    style={{
                      background: "linear-gradient(90deg, #a855f7, #d946ef)",
                    }}
                  />
                  {/* Shop Now — fades in on hover */}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-purple-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now →
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrendingSection({ products }: { products: typeof mockProducts }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const trending = products.filter((p) => p.isTrending);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #06000f 0%, #0f0530 100%)",
      }}
    >
      {/* Floating orbs */}
      <div
        className="orb-purple"
        style={{
          width: 400,
          height: 400,
          top: "10%",
          left: "-5%",
          opacity: 0.25,
        }}
      />
      <div
        className="orb-pink"
        style={{
          width: 300,
          height: 300,
          bottom: "10%",
          right: "-3%",
          opacity: 0.2,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
              Hot Right Now
            </p>
            <h2 className="font-display text-4xl font-black uppercase text-foreground">
              Trending Now
            </h2>
          </motion.div>
          <div className="flex gap-2">
            <motion.button
              type="button"
              onClick={() => scroll("left")}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="p-3 rounded-full glass-card border border-border/50 hover:border-luxe-cyan/50 transition-all"
              data-ocid="trending.pagination_prev"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scroll("right")}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="p-3 rounded-full glass-card border border-border/50 hover:border-luxe-cyan/50 transition-all"
              data-ocid="trending.pagination_next"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {trending.map((product, i) => (
            <div key={product.id} className="flex-shrink-0 w-72">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlashSaleSection({ products }: { products: typeof mockProducts }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const saleProducts = products.filter((p) => p.isFlashSale);
  const { addItem } = useCart();

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div
        className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #080015 0%, #1a0845 40%, #2d0a6e 60%, #080015 100%)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #a855f7, transparent)",
          }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="flex items-center gap-3 mb-2">
              <Zap size={20} className="text-yellow-400 fill-yellow-400" />
              <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold">
                Limited Time Offer
              </p>
            </div>
            <h2 className="font-display text-4xl font-black uppercase text-foreground">
              Flash Sale
            </h2>
            <p className="text-muted-foreground mt-1">Deals end in:</p>
          </motion.div>
          <CountdownTimer />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {saleProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                delay: i * 0.1,
              }}
              className="group rounded-2xl overflow-hidden border border-border/50 bg-white/5 hover:border-luxe-cyan/40"
              data-ocid={`flashsale.item.${i + 1}`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={getProductImage(product)}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-foreground line-clamp-1">
                  {product.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-luxe-cyan">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold">
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      image: getProductImage(product),
                      size: product.sizes[0] ?? "One Size",
                      color: product.colors[0] ?? "#000",
                    })
                  }
                  className="w-full mt-3 py-2 rounded-xl bg-luxe-cyan/10 border border-luxe-cyan/30 text-luxe-cyan text-xs font-bold hover:bg-luxe-cyan hover:text-white transition-all duration-300"
                  data-ocid={`flashsale.primary_button.${i + 1}`}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #06000f 0%, #0f0530 100%)",
      }}
    >
      {/* Floating orbs */}
      <div
        className="orb-purple"
        style={{
          width: 400,
          height: 400,
          top: "10%",
          left: "-5%",
          opacity: 0.25,
        }}
      />
      <div
        className="orb-pink"
        style={{
          width: 300,
          height: 300,
          bottom: "10%",
          right: "-3%",
          opacity: 0.2,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
            What People Say
          </p>
          <h2 className="font-display text-4xl font-black uppercase gradient-text-vivid">
            Customer Stories
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: i * 0.1,
              }}
              className="glass-card rounded-2xl p-6"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {[0, 1, 2, 3, 4].slice(0, t.rating).map((starIdx) => (
                  <Star
                    key={starIdx}
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-luxe-cyan/20 flex items-center justify-center text-luxe-cyan font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const brands = [
    "Apple",
    "Samsung",
    "Nike",
    "Adidas",
    "Sony",
    "Bose",
    "Dyson",
  ];

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-center text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-8"
      >
        Trusted Brands We Carry
      </motion.p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {brands.map((brand, i) => (
          <motion.span
            key={brand}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            whileHover={{ scale: 1.15, y: -3 }}
            transition={{
              opacity: { delay: i * 0.05 },
              scale: { type: "spring", stiffness: 400, damping: 12 },
              y: { type: "spring", stiffness: 400, damping: 12 },
            }}
            className="font-display font-black text-xl text-muted-foreground/40 hover:text-muted-foreground/80 transition-colors uppercase tracking-widest cursor-default"
          >
            {brand}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const { data: backendProducts } = useAllProducts();
  const products = backendProducts?.length ? backendProducts : mockProducts;

  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <TrendingSection products={products} />
      <FlashSaleSection products={products} />
      <TestimonialsSection />
      <BrandsSection />
    </div>
  );
}
