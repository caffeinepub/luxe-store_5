import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAllProducts } from "../hooks/useQueries";
import { CATEGORY_LIST, getProductImage } from "../lib/imageUtils";
import { mockProducts, testimonials } from "../lib/mockData";

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999]"
      data-ocid="scroll.progress"
    >
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)",
        }}
      />
    </motion.div>
  );
}

// ─── Marquee Strip ─────────────────────────────────────────────────────────────
const MARQUEE_TEXT =
  "LUXE STORE • PREMIUM QUALITY • FREE SHIPPING • NEW ARRIVALS • EXCLUSIVE DEALS • FLASH SALE • SHOP NOW • ";

const MARQUEE_WORDS = MARQUEE_TEXT.split(" ").filter(Boolean);

function MarqueeWordList() {
  return (
    <>
      {MARQUEE_WORDS.map((word, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static marquee
          key={i}
          className="inline-block text-xs font-bold uppercase tracking-[0.25em] mr-4"
          style={{
            color: i % 2 === 0 ? "rgba(0,255,255,0.9)" : "rgba(255,0,255,0.85)",
            textShadow: i % 2 === 0 ? "0 0 8px #00ffff" : "0 0 8px #ff00ff",
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

function MarqueeStrip() {
  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "rgba(2,2,8,0.98)",
        borderTop: "1px solid rgba(0,255,255,0.35)",
        borderBottom: "1px solid rgba(0,255,255,0.35)",
      }}
    >
      <div className="marquee-track whitespace-nowrap">
        <MarqueeWordList />
        <MarqueeWordList />
      </div>
    </div>
  );
}

// ─── Animated Word Heading ─────────────────────────────────────────────────────
function AnimatedWordHeading({
  text,
  className,
}: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isGlitching, setIsGlitching] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 600);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <h2
      ref={ref}
      className={`${className ?? ""}${isGlitching ? " heading-glitch" : ""}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: static text words
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

// ─── Countdown Timer ────────────────────────────────────────────────────────────
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
      {(["h", "m", "s"] as const).map((label) => (
        <div key={label} className="text-center">
          <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={timeLeft[label]}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-display text-2xl font-black text-luxe-cyan"
              >
                {String(timeLeft[label]).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Hero Right Panel ──────────────────────────────────────────────────────────
const SHOE_IMAGES = [
  "/assets/generated/hero-shoe-1.dim_600x600.jpg",
  "/assets/generated/hero-shoe-2.dim_600x600.jpg",
  "/assets/generated/hero-shoe-3.dim_600x600.jpg",
];

const MINI_CARDS = [
  {
    image: "/assets/generated/product-watch.dim_600x600.jpg",
    label: "Watch Pro",
    price: "$249",
    style: { top: "5%", right: "0%" },
    delay: 0,
  },
  {
    image: "/assets/generated/product-beauty.dim_600x600.jpg",
    label: "Luxe Scent",
    price: "$89",
    style: { top: "42%", right: "-5%" },
    delay: 1.2,
  },
  {
    image: "/assets/generated/product-headphones.dim_600x600.jpg",
    label: "AirPods Max",
    price: "$179",
    style: { bottom: "8%", right: "2%" },
    delay: 2.4,
  },
];

// Inject shoe glitch keyframes once
if (
  typeof document !== "undefined" &&
  !document.getElementById("shoe-glitch-style")
) {
  const s = document.createElement("style");
  s.id = "shoe-glitch-style";
  s.textContent = `
    @keyframes shoeGlitch {
      0%   { transform: translate(0); filter: brightness(1) saturate(1); clip-path: inset(0 0 0 0); opacity: 1; }
      5%   { clip-path: inset(10% 0 80% 0); transform: translate(-8px, 0); filter: brightness(2) saturate(3) hue-rotate(90deg); opacity: 0.9; }
      10%  { clip-path: inset(60% 0 10% 0); transform: translate(8px, 0); filter: brightness(0.5) hue-rotate(-90deg); opacity: 1; }
      15%  { clip-path: inset(30% 0 50% 0); transform: translate(-5px, 3px) skewX(8deg); filter: brightness(1.8) hue-rotate(180deg); }
      20%  { clip-path: inset(0 0 0 0); transform: translate(6px, -3px) skewX(-6deg); filter: brightness(1.2) saturate(2); }
      25%  { clip-path: inset(45% 0 25% 0); transform: translate(-10px, 0); filter: brightness(2.5) hue-rotate(270deg); opacity: 0.7; }
      30%  { clip-path: inset(0 0 0 0); transform: translate(0); filter: brightness(1); opacity: 1; }
      35%  { clip-path: inset(70% 0 5% 0); transform: translate(4px, 0) skewX(3deg); filter: brightness(1.5) hue-rotate(45deg); }
      40%  { clip-path: inset(0 0 0 0); transform: translate(-3px, 1px); filter: brightness(0.9); }
      50%  { transform: translate(2px, -1px); filter: brightness(1.1); clip-path: inset(0 0 0 0); }
      60%  { transform: translate(-2px, 0); filter: brightness(1); }
      100% { transform: translate(0); filter: brightness(1) saturate(1); clip-path: inset(0 0 0 0); opacity: 1; }
    }
    @keyframes shoeGlitchOverlay {
      0%   { opacity: 0; }
      5%   { opacity: 0.6; background: rgba(0,255,255,0.3); }
      10%  { opacity: 0.4; background: rgba(255,0,255,0.3); }
      15%  { opacity: 0.7; background: rgba(0,255,255,0.2); }
      20%  { opacity: 0; }
      25%  { opacity: 0.5; background: rgba(255,0,255,0.25); }
      30%  { opacity: 0; }
      100% { opacity: 0; }
    }
    .shoe-glitch { animation: shoeGlitch 0.5s steps(1) forwards; }
    .shoe-glitch-overlay { animation: shoeGlitchOverlay 0.5s steps(1) forwards; }
  `;
  document.head.appendChild(s);
}

function HeroRightPanel() {
  const [activeShoe, setActiveShoe] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const { theme } = useTheme();
  const isDark = theme !== "light";

  // Preload all shoe images on mount so transitions are instant
  useEffect(() => {
    for (const src of SHOE_IMAGES) {
      const img = new Image();
      img.src = src;
    }
  }, []);

  // Auto-rotate shoes every 3 seconds with glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setActiveShoe((prev) => (prev + 1) % SHOE_IMAGES.length);
      }, 150);
      setTimeout(() => setGlitching(false), 550);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden lg:flex items-center justify-center"
      style={{ width: "100%", height: 580 }}
    >
      {/* Color orbs behind */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          top: "5%",
          left: "5%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,255,0.45) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 150,
          height: 150,
          bottom: "10%",
          right: "8%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,0,255,0.45) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* Glowing platform disc - CSS animated */}
      <div
        className="absolute"
        style={{
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(255,0,255,0.18) 40%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />
      {/* Orbital rings */}
      {/* Outer ring - CSS animated for performance */}
      <div
        className="absolute"
        style={{
          width: 520,
          height: 520,
          borderRadius: "50%",
          border: "1.5px dashed rgba(0,255,255,0.6)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          animation: "spin 40s linear infinite",
          willChange: "transform",
        }}
      />
      {/* Middle ring - CSS animated for performance */}
      <div
        className="absolute"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px dotted rgba(255,0,255,0.5)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          animation: "spin-reverse 28s linear infinite",
          willChange: "transform",
        }}
      />
      {/* Main shoe image */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          animation: "float 5s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <div style={{ position: "relative", width: 340, height: 260 }}>
          <AnimatePresence mode="sync">
            <motion.img
              key={activeShoe}
              src={SHOE_IMAGES[activeShoe]}
              alt="Featured Shoe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={glitching ? "shoe-glitch" : ""}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 340,
                height: 260,
                objectFit: "cover",
                borderRadius: 20,
                willChange: "opacity, transform",
              }}
            />
          </AnimatePresence>
          {glitching && (
            <div
              className="shoe-glitch-overlay"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 20,
                pointerEvents: "none",
                zIndex: 20,
                willChange: "opacity",
              }}
            />
          )}
        </div>

        {/* NEW ARRIVAL badge - CSS animated */}
        <div
          style={{
            position: "absolute",
            top: -14,
            left: -10,
            background: "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            transform: "rotate(-2deg)",
            boxShadow: "0 4px 18px rgba(168,85,247,0.6)",
            zIndex: 20,
          }}
        >
          New Arrival
        </div>
      </div>
      {/* Mini product cards - CSS animated */}
      {MINI_CARDS.map((card) => (
        <div
          key={card.label}
          style={{
            position: "absolute",
            ...card.style,
            zIndex: 15,
            animation: `float 5s ease-in-out ${card.delay}s infinite`,
            willChange: "transform",
          }}
        >
          <div
            style={{
              width: 112,
              background: isDark
                ? "rgba(15,5,30,0.85)"
                : "rgba(255,255,255,0.9)",

              border: isDark
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              padding: 8,
            }}
          >
            <img
              src={card.image}
              alt={card.label}
              style={{
                width: "100%",
                height: 64,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
            <p
              style={{
                color: isDark ? "#e9d5ff" : "#1a0030",
                fontWeight: 700,
                fontSize: 11,
                marginTop: 6,
                textAlign: "center",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                color: isDark ? "#d946ef" : "#9b059b",
                fontWeight: 900,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {card.price}
            </p>
          </div>
        </div>
      ))}{" "}
    </motion.div>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────────
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [heroGlitch, setHeroGlitch] = useState(false);

  // Periodic hero headline glitch every 5-7 seconds
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 5000 + Math.random() * 2000;
      timeoutId = setTimeout(() => {
        setHeroGlitch(true);
        setTimeout(() => {
          setHeroGlitch(false);
          schedule();
        }, 400);
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden scanline-overlay"
    >
      {/* Aurora background blobs */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-bg)" }}
      />
      {/* Grid dot background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          zIndex: 0,
        }}
      />
      <div
        className="aurora-blob absolute"
        style={{
          width: 600,
          height: 600,
          top: "-10%",
          right: "-5%",
          background:
            "radial-gradient(ellipse, rgba(0,255,255,0.35) 0%, rgba(0,180,255,0.15) 50%, transparent 70%)",
          animationDelay: "0s",
          animationDuration: "14s",
        }}
      />
      <div
        className="aurora-blob absolute"
        style={{
          width: 500,
          height: 500,
          bottom: "-5%",
          left: "-8%",
          background:
            "radial-gradient(ellipse, rgba(255,0,255,0.3) 0%, rgba(180,0,255,0.12) 50%, transparent 70%)",
          animationDelay: "-5s",
          animationDuration: "18s",
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-luxe-cyan/40 text-luxe-cyan text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Zap size={12} className="fill-luxe-cyan" />
              New Collection 2026
            </motion.div>

            {/* Word-level headline (perf: 3 motion.spans vs 24) */}
            <h1
              className={`font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-foreground mb-6${heroGlitch ? " hero-glitch" : ""}`}
              aria-label="DISCOVER PREMIUM PRODUCTS"
            >
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "block" }}
              >
                DISCOVER
              </motion.span>
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "block" }}
              >
                PREMIUM
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "block" }}
              >
                PRODUCTS
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md"
            >
              Curated collections of elite products crafted for those who demand
              the extraordinary. Quality meets innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  className="btn-primary text-sm font-bold uppercase tracking-widest neon-pulse"
                  data-ocid="hero.primary_button"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  className="btn-outline text-sm font-bold uppercase tracking-widest"
                  data-ocid="hero.secondary_button"
                >
                  Explore Collection
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border/30"
            >
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
            </motion.div>
          </motion.div>

          {/* Right - Premium 3D Product Showcase */}
          <HeroRightPanel />
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

// ─── Categories Section ──────────────────────────────────────────────────────────
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
      <div className="flex items-end justify-between mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
            Browse by Category
          </p>
          <AnimatedWordHeading
            text="Featured Categories"
            className="font-display text-4xl font-black uppercase text-foreground mb-3"
          />
          <div
            className="h-[3px] w-40 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #00ffff 0%, #ff00ff 60%, transparent 100%)",
            }}
          />
        </motion.div>
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
            className="p-3 rounded-full glass-card border border-border/50 hover:border-cyan-400/60 transition-all"
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
            className="p-3 rounded-full glass-card border border-border/50 hover:border-cyan-400/60 transition-all"
            data-ocid="categories.pagination_next"
          >
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingLeft: "12px",
          paddingRight: "12px",
          marginTop: "-20px",
          marginLeft: "-12px",
          marginRight: "-12px",
        }}
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
              <TiltCard>
                <motion.div
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ type: "spring", stiffness: 800, damping: 60 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "3/2" }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.12) 50%, transparent 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1.5px rgba(0,255,255,0.7), 0 0 30px rgba(0,255,255,0.35)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center">
                    <p className="font-display font-black text-white uppercase tracking-[0.15em] text-base leading-tight">
                      {cat.name}
                    </p>
                    <div
                      className="mt-2 h-[2px] w-10 rounded-full transition-all duration-300 group-hover:w-16"
                      style={{
                        background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                      }}
                    />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-purple-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Shop Now →
                    </p>
                  </div>
                </motion.div>
              </TiltCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Tilt Card wrapper ────────────────────────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
    ref.current.style.transition = "transform 0.1s ease";
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg)";
    ref.current.style.transition = "transform 0.4s ease";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// ─── Trending Section ──────────────────────────────────────────────────────────────
function TrendingSection({ products }: { products: typeof mockProducts }) {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const trending = products.filter((p) => p.isTrending).slice(0, 6);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "var(--section-alt-bg)" }}
    >
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
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
              Hot Right Now
            </p>
            <AnimatedWordHeading
              text="Trending Now"
              className="font-display text-4xl font-black uppercase text-foreground"
            />
          </motion.div>
          <motion.a
            href="/products"
            initial={{ opacity: 0, x: 20 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#00ffff" }}
            data-ocid="trending.link"
          >
            View All
            <span
              className="inline-block text-lg"
              style={{ filter: "drop-shadow(0 0 6px #00ffff)" }}
            >
              →
            </span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending.map((product, i) => (
            <TrendingCard
              key={product.id}
              product={product}
              index={i}
              onAddToCart={() =>
                addItem({
                  productId: product.id,
                  title: product.title,
                  price: product.price,
                  image: getProductImage(product),
                  size: product.sizes[0] ?? "One Size",
                  color: product.colors[0] ?? "#000",
                })
              }
              isWishlisted={has(product.id)}
              onWishlistToggle={() => toggle(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingCard({
  product,
  index,
  onAddToCart,
  isWishlisted,
  onWishlistToggle,
}: {
  product: (typeof mockProducts)[0];
  index: number;
  onAddToCart: () => void;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      className="group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-200 hover:scale-[1.02] dark:hover:border-cyan-400/60 dark:hover:shadow-[0_0_0_1.5px_#00ffff,0_0_24px_rgba(0,255,255,0.3)]"
      style={{
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.08)",
        willChange: "transform",
      }}
      data-ocid={`trending.item.${index + 1}`}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <img
          src={getProductImage(product)}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,255,255,0.15) 0%, rgba(168,85,247,0.1) 100%)",
          }}
        />
        <span
          className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center rounded-full text-xs font-black"
          style={{
            background: "linear-gradient(135deg, #00ffff 0%, #a855f7 100%)",
            boxShadow: "0 0 10px rgba(0,255,255,0.6)",
            color: "#000",
          }}
        >
          #{index + 1}
        </span>
        <button
          type="button"
          onClick={onWishlistToggle}
          className="absolute top-3 right-3 p-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.45)" }}
          data-ocid={`trending.toggle.${index + 1}`}
        >
          <Heart
            size={14}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-white"
            }
          />
        </button>
      </div>

      <div className="p-3">
        <p className="text-xs text-luxe-cyan font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <p className="font-bold text-foreground line-clamp-1 text-base">
          {product.title}
        </p>
        <div
          className="mt-2 h-[2px] w-10 rounded-full transition-all duration-300 group-hover:w-16"
          style={{ background: "linear-gradient(90deg, #00ffff, #ff00ff)" }}
        />
        <p
          className="mt-1 text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          style={{ color: isDark ? "#d8b4fe" : "#7c3aed" }}
        >
          Shop Now →
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-luxe-cyan text-base">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={onAddToCart}
          className="w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all duration-300"
          style={{
            background: isDark
              ? "rgba(0,255,255,0.08)"
              : "linear-gradient(135deg, #00cccc 0%, #a855f7 100%)",
            border: isDark ? "1px solid rgba(0,255,255,0.3)" : "none",
            color: isDark ? "#00ffff" : "#fff",
            boxShadow: isDark ? "none" : "0 2px 12px rgba(0,200,200,0.3)",
          }}
          data-ocid={`trending.submit_button.${index + 1}`}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Flash Sale Section ──────────────────────────────────────────────────────────
function FlashSaleSection({ products }: { products: typeof mockProducts }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const saleProducts = products.filter((p) => p.isFlashSale);
  const { addItem } = useCart();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div
        className="rounded-3xl p-8 md:p-12 relative"
        style={{
          background: "var(--flash-sale-bg)",
          border: "1px solid rgba(0, 255, 255, 0.2)",
          overflow: "visible",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00ffff, transparent)",
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
            {/* ClipPath reveal heading */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              <h2 className="font-display text-4xl font-black uppercase text-foreground">
                Flash Sale
              </h2>
            </motion.div>
            <p className="text-muted-foreground mt-1">Deals end in:</p>
          </motion.div>
          <CountdownTimer />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ overflow: "visible" }}
        >
          {saleProducts.map((product, i) => {
            const isHovered = hoveredId === product.id;
            const discount = Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100,
            );

            return (
              <TiltCard key={product.id}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 1 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 350,
                        damping: 20,
                        delay: i * 0.1,
                      },
                    },
                    hover: {
                      scale: 1.07,
                      y: -12,
                      zIndex: 20,
                      transition: {
                        type: "spring",
                        stiffness: 700,
                        damping: 28,
                        mass: 0.5,
                      },
                    },
                  }}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover="hover"
                  onHoverStart={() => setHoveredId(product.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="group rounded-2xl overflow-hidden border border-border/50 bg-white/5 cursor-pointer"
                  style={{
                    position: "relative",
                    boxShadow: isHovered
                      ? "0 0 40px rgba(168,85,247,0.7), 0 0 80px rgba(217,70,239,0.4), 0 20px 60px rgba(0,0,0,0.6)"
                      : "0 4px 20px rgba(0,0,0,0.3)",
                    borderColor: isHovered
                      ? "rgba(168,85,247,0.8)"
                      : "rgba(255,255,255,0.08)",
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  data-ocid={`flashsale.item.${i + 1}`}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <motion.img
                      src={getProductImage(product)}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered ? 1.12 : 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                      loading="lazy"
                    />
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(217,70,239,0.15) 100%)",
                      }}
                    />
                    <motion.span
                      className="absolute top-2 right-2 text-xs text-white px-2 py-1 rounded-full font-black"
                      style={{
                        background:
                          "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
                        boxShadow:
                          "0 0 12px rgba(0,255,255,0.5), 0 0 24px rgba(255,0,255,0.3)",
                      }}
                      animate={
                        isHovered
                          ? {
                              scale: [1, 1.2, 0.95, 1.1, 1],
                              rotate: [-2, 3, -2, 2, 0],
                            }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      -{discount}%
                    </motion.span>
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
                    </div>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      animate={isHovered ? { scale: 1.04 } : { scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
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
                      className="w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all duration-300"
                      style={{
                        background: isHovered
                          ? "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)"
                          : "rgba(0,255,255,0.08)",
                        border: isHovered
                          ? "1px solid rgba(0,255,255,0.9)"
                          : "1px solid rgba(0,255,255,0.3)",
                        color: isHovered ? "#fff" : "#00ffff",
                        boxShadow: isHovered
                          ? "0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(255,0,255,0.3)"
                          : "none",
                      }}
                      data-ocid={`flashsale.primary_button.${i + 1}`}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ──────────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: "var(--section-alt-bg)" }}
    >
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
          <AnimatedWordHeading
            text="Customer Stories"
            className="font-display text-4xl font-black uppercase gradient-text-vivid"
          />
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
              className="glass-card rounded-2xl p-6 testimonial-shimmer-card"
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

// ─── Brands Section ──────────────────────────────────────────────────────────────
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

// ─── Page Root ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: backendProducts } = useAllProducts();
  const products = backendProducts?.length ? backendProducts : mockProducts;

  return (
    <div>
      <ScrollProgressBar />
      <HeroSection />
      <MarqueeStrip />
      <CategoriesSection />
      <TrendingSection products={products} />
      <FlashSaleSection products={products} />
      <TestimonialsSection />
      <BrandsSection />
    </div>
  );
}
