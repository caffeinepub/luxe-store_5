import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { getProductImage } from "../lib/imageUtils";

const STARS = [0, 1, 2, 3, 4];

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.id);
  const image = getProductImage(product);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image,
      size: product.sizes[0] ?? "One Size",
      color: product.colors[0] ?? "#000000",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: { type: "spring", stiffness: 800, damping: 60 },
      }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group product-card-hover neon-border-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to="/products/$id" params={{ id: product.id }}>
        <div
          className="relative rounded-2xl overflow-hidden bg-card border border-border/50 transition-all duration-300 cursor-pointer"
          style={{
            boxShadow: hovered
              ? "0 0 30px rgba(0,255,255,0.35), 0 0 60px rgba(255,0,255,0.15)"
              : "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {/* Image — scales on hover like FeaturedCategories */}
            <img
              src={image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Cyan/magenta overlay on hover — same as FeaturedCategories */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.12) 50%, transparent 100%)",
              }}
            />

            {/* Glowing inset border on hover — same as FeaturedCategories */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 0 0 1.5px rgba(0,255,255,0.7), 0 0 30px rgba(0,255,255,0.35)",
              }}
            />

            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.isFlashSale && (
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="px-2 py-0.5 rounded-full text-black text-xs font-bold uppercase tracking-wide"
                  style={{
                    background:
                      "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
                    boxShadow: "0 0 10px rgba(0,255,255,0.5)",
                  }}
                >
                  Sale {discount}% OFF
                </motion.span>
              )}
              {product.isTrending && !product.isFlashSale && (
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="px-2 py-0.5 rounded-full text-white text-xs font-bold uppercase tracking-wide"
                  style={{
                    background:
                      "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
                    boxShadow: "0 0 10px rgba(255,0,255,0.5)",
                  }}
                >
                  Trending
                </motion.span>
              )}
            </div>

            {/* Wishlist button */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggle(product.id, product.title);
              }}
              whileHover={{
                scale: 1.2,
                rotate: 10,
                transition: { type: "spring", stiffness: 400, damping: 12 },
              }}
              whileTap={{ scale: 0.8 }}
              className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all"
              style={{
                background: "rgba(0, 0, 0, 0.55)",
                borderColor: "rgba(255, 255, 255, 0.25)",
              }}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={16}
                className={
                  isWishlisted ? "fill-red-500 text-red-500" : "text-white"
                }
              />
            </motion.button>

            {/* Quick Add button — appears instantly on hover */}
            <motion.button
              type="button"
              onClick={handleAddToCart}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0 }}
              className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 py-2.5 rounded-xl backdrop-blur-md text-white text-sm font-semibold transition-all"
              style={{
                background: "rgba(0,20,30,0.75)",
                border: "1px solid rgba(0,255,255,0.4)",
                boxShadow: "0 0 15px rgba(0,255,255,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(255,0,255,0.3)";
                (e.currentTarget as HTMLButtonElement).style.border =
                  "1px solid rgba(0,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(0,20,30,0.75)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 15px rgba(0,255,255,0.25)";
                (e.currentTarget as HTMLButtonElement).style.border =
                  "1px solid rgba(0,255,255,0.4)";
              }}
              data-ocid={`products.item.${index + 1}`}
            >
              <ShoppingCart size={14} />
              Quick Add
            </motion.button>
          </div>

          <div className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              {product.category}
            </p>
            <h3 className="font-display font-semibold text-sm text-foreground line-clamp-1">
              {product.title}
            </h3>

            {/* Expanding gradient line — same as FeaturedCategories */}
            <div
              className="mt-1.5 h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-14"
              style={{
                background: "linear-gradient(90deg, #00ffff, #ff00ff)",
              }}
            />

            <div className="flex items-center gap-1 mt-2">
              {STARS.map((starIdx) => (
                <Star
                  key={starIdx}
                  size={11}
                  className={
                    starIdx < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  }
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                {product.rating} ({Number(product.reviewCount)})
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <motion.span
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
                className="font-bold gradient-text"
              >
                ${product.price.toFixed(2)}
              </motion.span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
