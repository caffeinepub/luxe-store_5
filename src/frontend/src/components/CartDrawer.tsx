import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQty,
    totalPrice,
    totalCount,
    isOpen,
    setIsOpen,
  } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "luxe20") {
      setDiscount(0.2);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const finalPrice = totalPrice * (1 - discount);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{
              background: "rgba(5, 2, 15, 0.98)",
              borderLeft: "1px solid rgba(120, 60, 200, 0.4)",
            }}
            data-ocid="cart.panel"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-luxe-cyan" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  Your Cart
                </h2>
                {totalCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-luxe-cyan/20 text-luxe-cyan text-xs font-bold">
                    {totalCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                data-ocid="cart.close_button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                    data-ocid="cart.empty_state"
                  >
                    <ShoppingBag
                      size={48}
                      className="text-muted-foreground/30 mb-4"
                    />
                    <p className="text-muted-foreground font-medium">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-muted-foreground/60 mt-1">
                      Add some products to get started
                    </p>
                    <Link to="/products" onClick={() => setIsOpen(false)}>
                      <Button
                        className="mt-4 btn-primary"
                        data-ocid="cart.primary_button"
                      >
                        Browse Products
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item, idx) => (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-3 rounded-2xl border border-border/50 bg-white/5"
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.size} · {item.color}
                        </p>
                        <p className="text-luxe-cyan font-bold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(
                                item.productId,
                                item.size,
                                item.color,
                                item.quantity - 1,
                              )
                            }
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                            data-ocid={`cart.secondary_button.${idx + 1}`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(
                                item.productId,
                                item.size,
                                item.color,
                                item.quantity + 1,
                              )
                            }
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                            data-ocid={`cart.secondary_button.${idx + 1}`}
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.productId, item.size, item.color)
                            }
                            className="ml-auto p-1 rounded-lg text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all"
                            data-ocid={`cart.delete_button.${idx + 1}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code (LUXE20)"
                    className="text-sm bg-white/5 border-border/50"
                    data-ocid="cart.input"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyCoupon}
                    variant="outline"
                    size="sm"
                    className="border-luxe-cyan/50 text-luxe-cyan hover:bg-luxe-cyan/10 whitespace-nowrap"
                    data-ocid="cart.secondary_button"
                  >
                    Apply
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-sm text-green-400">
                    ✓ 20% discount applied!
                  </p>
                )}
                <div className="space-y-1">
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-green-400">
                        -${(totalPrice * discount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-lg font-bold text-foreground">
                      ${finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                  <button
                    type="button"
                    className="w-full btn-primary text-center"
                    data-ocid="cart.primary_button"
                  >
                    Proceed to Checkout →
                  </button>
                </Link>
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="cart.link"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
