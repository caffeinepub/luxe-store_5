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
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group product-card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to="/products/$id" params={{ id: product.id }}>
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <motion.img
              src={image}
              alt={product.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-50"}`}
            />

            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.isFlashSale && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-wide">
                  Sale {discount}% OFF
                </span>
              )}
              {product.isTrending && !product.isFlashSale && (
                <span className="px-2 py-0.5 rounded-full bg-luxe-cyan/90 text-[#0a0f14] text-xs font-bold uppercase tracking-wide">
                  Trending
                </span>
              )}
            </div>

            <motion.button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggle(product.id, product.title);
              }}
              whileTap={{ scale: 0.8 }}
              className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-black/30 border border-white/10 transition-all hover:bg-black/50"
              aria-label="Toggle wishlist"
            >
              <Heart
                size={16}
                className={
                  isWishlisted ? "fill-red-500 text-red-500" : "text-white"
                }
              />
            </motion.button>

            <motion.button
              type="button"
              onClick={handleAddToCart}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 py-2.5 rounded-xl backdrop-blur-md bg-black/60 border border-white/20 text-white text-sm font-semibold hover:bg-luxe-cyan/90 hover:text-[#0a0f14] transition-colors"
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
            <div className="flex items-center gap-1 mt-1.5">
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
              <span className="font-bold text-luxe-cyan">
                ${product.price.toFixed(2)}
              </span>
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
