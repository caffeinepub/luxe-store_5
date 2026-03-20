import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { setIsOpen, totalCount } = useCart();

  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <div
      className="min-h-screen pt-28 flex items-center justify-center px-4"
      data-ocid="cart.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <ShoppingBag size={64} className="text-luxe-cyan mx-auto mb-4" />
        <h1 className="font-display text-3xl font-black text-foreground mb-2">
          Your Cart
        </h1>
        <p className="text-muted-foreground mb-6">
          {totalCount > 0
            ? `${totalCount} item${totalCount > 1 ? "s" : ""} in your cart`
            : "Your cart is currently open in the drawer"}
        </p>
        <Link to="/products">
          <button
            type="button"
            className="btn-primary"
            data-ocid="cart.primary_button"
          >
            Continue Shopping
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
