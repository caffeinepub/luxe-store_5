import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAllProducts } from "../hooks/useQueries";
import { getProductImage } from "../lib/imageUtils";

const STARS = [0, 1, 2, 3, 4];

export default function WishlistPage() {
  const { items: wishlistIds, toggle } = useWishlist();
  const { addItem } = useCart();
  const { data: allProducts = [] } = useAllProducts();
  const wishlisted = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen pt-28 px-4 pb-16" data-ocid="wishlist.page">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
            Saved Items
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-foreground">
            My Wishlist
          </h1>
          <p className="text-muted-foreground mt-1">
            {wishlisted.length} item{wishlisted.length !== 1 ? "s" : ""} saved
          </p>
        </motion.div>

        {wishlisted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
            data-ocid="wishlist.empty_state"
          >
            <Heart
              size={64}
              className="text-muted-foreground/20 mx-auto mb-4"
            />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to come back to them later
            </p>
            <Link to="/products">
              <button
                type="button"
                className="btn-primary"
                data-ocid="wishlist.primary_button"
              >
                Explore Products
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlisted.map((product, i) => {
                const image = getProductImage(product);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card rounded-2xl overflow-hidden group"
                    data-ocid={`wishlist.item.${i + 1}`}
                  >
                    <Link to="/products/$id" params={{ id: product.id }}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    </Link>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                        {product.category}
                      </p>
                      <p className="font-display font-semibold text-foreground line-clamp-1 mb-2">
                        {product.title}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
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
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-luxe-cyan">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            addItem({
                              productId: product.id,
                              title: product.title,
                              price: product.price,
                              image,
                              size: product.sizes[0] ?? "One Size",
                              color: product.colors[0] ?? "#000",
                            })
                          }
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-luxe-cyan/10 border border-luxe-cyan/30 text-luxe-cyan text-xs font-bold hover:bg-luxe-cyan hover:text-white transition-all"
                          data-ocid={`wishlist.primary_button.${i + 1}`}
                        >
                          <ShoppingCart size={13} /> Add to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => toggle(product.id)}
                          className="p-2 rounded-xl border border-border/50 text-red-400 hover:bg-red-500/10 transition-all"
                          data-ocid={`wishlist.delete_button.${i + 1}`}
                        >
                          <Heart size={14} className="fill-red-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
