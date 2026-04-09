import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import {
  useAllProducts,
  useProduct,
  useProductReviews,
} from "../hooks/useQueries";
import {
  getProductColorGallery,
  getProductImageForColor,
} from "../lib/imageUtils";

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: backendProduct, isLoading } = useProduct(id);
  const product = backendProduct ?? null;
  const { data: reviews = [] } = useProductReviews(id);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] ?? "",
  );
  const [qty, setQty] = useState(1);
  const [stickyVisible, setStickyVisible] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef(null);
  const reviewsInView = useInView(reviewsRef, { once: true });

  const colorGallery = product ? getProductColorGallery(product) : [];
  const mainImage = product
    ? getProductImageForColor(product, selectedColor)
    : "";
  const { data: allProducts = [] } = useAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  const isWishlisted = product ? has(product.id) : false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    if (productRef.current) observer.observe(productRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: mainImage,
      size: selectedSize,
      color: selectedColor,
      quantity: qty,
    });
  };

  if (isLoading || !product) {
    return (
      <div
        className="min-h-screen pt-28 max-w-7xl mx-auto px-4 sm:px-6"
        data-ocid="product.loading_state"
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-3xl" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/products"
            className="hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        {/* Product Section */}
        <div ref={productRef} className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border border-border/50 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
              {product.isFlashSale && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase">
                  Flash Sale
                </div>
              )}
            </div>

            {/* Color variant thumbnails */}
            <div className="flex gap-3 flex-wrap">
              {colorGallery.map(({ color, image }) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200"
                  style={{
                    borderColor:
                      selectedColor === color
                        ? "#00ffff"
                        : "rgba(255,255,255,0.15)",
                    boxShadow:
                      selectedColor === color
                        ? "0 0 12px rgba(0,255,255,0.5)"
                        : "none",
                  }}
                  aria-label={`Select color ${color}`}
                  data-ocid="product.toggle"
                >
                  <img
                    src={image}
                    alt={color}
                    className="w-full h-full object-cover"
                  />
                  {/* Color dot badge */}
                  <span
                    className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-white/60 shadow"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-4xl font-black text-foreground">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mt-3">
                {[0, 1, 2, 3, 4].map((starIdx) => (
                  <Star
                    key={starIdx}
                    size={16}
                    className={
                      starIdx < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }
                  />
                ))}
                <span className="text-sm text-muted-foreground">
                  {product.rating} · {Number(product.reviewCount)} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-display text-4xl font-black text-luxe-cyan">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.isFlashSale && (
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold">
                  -
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  % OFF
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes.length > 1 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 uppercase tracking-widest">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        selectedSize === size
                          ? "bg-luxe-cyan text-white border-transparent"
                          : "border-border/50 text-muted-foreground hover:border-luxe-cyan/50"
                      }`}
                      data-ocid="product.toggle"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 uppercase tracking-widest">
                  Color
                  {selectedColor && (
                    <span
                      className="ml-2 inline-block w-3 h-3 rounded-full border border-white/40 align-middle"
                      style={{ backgroundColor: selectedColor }}
                    />
                  )}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="relative w-8 h-8 rounded-full border-2 transition-all"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          selectedColor === color
                            ? "#00ffff"
                            : "rgba(255,255,255,0.2)",
                        boxShadow:
                          selectedColor === color
                            ? `0 0 0 2px #000, 0 0 0 4px #00ffff, 0 0 12px ${color}88`
                            : "none",
                        transform:
                          selectedColor === color ? "scale(1.15)" : "scale(1)",
                      }}
                      aria-label={color}
                      data-ocid="product.toggle"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-foreground uppercase tracking-widest">
                Qty
              </p>
              <div className="flex items-center gap-3 glass-card rounded-xl px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="product.secondary_button"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-foreground w-6 text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="product.secondary_button"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                data-ocid="product.primary_button"
              >
                <ShoppingCart size={18} /> Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 btn-outline flex items-center justify-center gap-2"
                data-ocid="product.secondary_button"
              >
                <Zap size={18} /> Buy Now
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggle(product.id, product.title)}
                className="p-4 rounded-full border border-border/50 hover:border-red-500/50 text-muted-foreground hover:text-red-500 transition-all"
                data-ocid="product.toggle"
              >
                <Heart
                  size={20}
                  className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Tabs: Description & Reviews */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="glass-card border border-border/50 p-1 rounded-xl h-auto">
            <TabsTrigger
              value="description"
              className="rounded-lg"
              data-ocid="product.tab"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-lg"
              data-ocid="product.tab"
            >
              Reviews ({reviews.length || Number(product.reviewCount)})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="glass-card rounded-2xl p-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" ref={reviewsRef} className="mt-6">
            {reviews.length === 0 ? (
              <div
                className="glass-card rounded-2xl p-8 text-center"
                data-ocid="product.empty_state"
              >
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((r, reviewIdx) => (
                  <motion.div
                    key={`${r.productId}-${reviewIdx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: reviewIdx * 0.1 }}
                    className="glass-card rounded-2xl p-5"
                    data-ocid={`reviews.item.${reviewIdx + 1}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {[0, 1, 2, 3, 4]
                        .slice(0, Number(r.rating))
                        .map((starIdx) => (
                          <Star
                            key={starIdx}
                            size={12}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                    </div>
                    <p className="text-muted-foreground text-sm">{r.comment}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-black uppercase text-foreground mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Buy Bar */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 px-4 py-4"
            style={{
              background: "rgba(5, 2, 15, 0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">{product.title}</p>
                <p className="text-luxe-cyan font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="btn-primary"
                data-ocid="product.primary_button"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
