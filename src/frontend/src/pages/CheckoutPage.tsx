import {
  Check,
  ChevronRight,
  CreditCard,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateOrder } from "../hooks/useQueries";
import { getProductImage } from "../lib/imageUtils";

const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: ShoppingBag },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      {STEPS.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{ scale: active ? 1.1 : 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  done
                    ? "bg-luxe-cyan border-luxe-cyan"
                    : active
                      ? "border-luxe-cyan"
                      : "border-border/50"
                }`}
              >
                {done ? (
                  <Check size={16} className="text-white" />
                ) : (
                  <step.icon
                    size={16}
                    className={
                      active ? "text-luxe-cyan" : "text-muted-foreground"
                    }
                  />
                )}
              </motion.div>
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${active ? "text-luxe-cyan" : done ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 h-px mt-0 mb-5 transition-all ${done ? "bg-luxe-cyan" : "bg-border/30"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const { identity } = useInternetIdentity();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingFields = [
    { key: "name", label: "Full Name", placeholder: "John Doe" },
    { key: "address", label: "Street Address", placeholder: "123 Main Street" },
    { key: "city", label: "City", placeholder: "New York" },
    { key: "zip", label: "ZIP Code", placeholder: "10001" },
    { key: "country", label: "Country", placeholder: "United States" },
  ];

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);
    try {
      const orderId = crypto.randomUUID();
      const shippingAddress = JSON.stringify(shipping);
      if (identity) {
        await createOrder.mutateAsync({ orderId, shippingAddress });
      }
      setOrderPlaced(true);
      clearCart();
      toast.success("Order placed successfully!", {
        description: "Your order will arrive in 3-5 business days.",
      });
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
          data-ocid="checkout.success_state"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-luxe-cyan/20 border-2 border-luxe-cyan flex items-center justify-center mx-auto mb-6"
          >
            <Check size={40} className="text-luxe-cyan" />
          </motion.div>
          <h1 className="font-display text-4xl font-black text-foreground mb-2">
            Order Placed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order will arrive in 3-5 business
            days.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 pb-16" data-ocid="checkout.page">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-black uppercase text-foreground">
            Checkout
          </h1>
        </motion.div>

        <StepIndicator current={step} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                  data-ocid="checkout.panel"
                >
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    Shipping Information
                  </h2>
                  {shippingFields.map((f) => (
                    <div key={f.key}>
                      <label
                        htmlFor={`sf-${f.key}`}
                        className="block text-sm font-semibold text-foreground mb-1.5"
                      >
                        {f.label}
                      </label>
                      <input
                        value={shipping[f.key as keyof typeof shipping]}
                        onChange={(e) =>
                          setShipping((p) => ({
                            ...p,
                            [f.key]: e.target.value,
                          }))
                        }
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors"
                        data-ocid="checkout.input"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full btn-primary mt-4 flex items-center justify-center gap-2"
                    data-ocid="checkout.primary_button"
                  >
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                  data-ocid="checkout.panel"
                >
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    Payment Method
                  </h2>
                  {/* Payment selector */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {["card", "upi", "paypal"].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPayment((p) => ({ ...p, method }))}
                        className={`py-3 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all ${
                          payment.method === method
                            ? "border-luxe-cyan bg-luxe-cyan/10 text-luxe-cyan"
                            : "border-border/50 text-muted-foreground hover:border-luxe-cyan/30"
                        }`}
                        data-ocid="checkout.toggle"
                      >
                        {method === "card"
                          ? "💳 Card"
                          : method === "upi"
                            ? "📱 UPI"
                            : "🅿 PayPal"}
                      </button>
                    ))}
                  </div>
                  {payment.method === "card" && (
                    <div className="space-y-3">
                      <input
                        value={payment.cardNumber}
                        onChange={(e) =>
                          setPayment((p) => ({
                            ...p,
                            cardNumber: e.target.value,
                          }))
                        }
                        placeholder="Card Number (16 digits)"
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors"
                        data-ocid="checkout.input"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          placeholder="MM/YY"
                          value={payment.expiry}
                          onChange={(e) =>
                            setPayment((p) => ({
                              ...p,
                              expiry: e.target.value,
                            }))
                          }
                          className="px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors"
                          data-ocid="checkout.input"
                        />
                        <input
                          placeholder="CVV"
                          value={payment.cvv}
                          onChange={(e) =>
                            setPayment((p) => ({ ...p, cvv: e.target.value }))
                          }
                          className="px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors"
                          data-ocid="checkout.input"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 btn-outline"
                      data-ocid="checkout.secondary_button"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 btn-primary"
                      data-ocid="checkout.primary_button"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                  data-ocid="checkout.panel"
                >
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    Review Your Order
                  </h2>
                  <div className="glass-card rounded-2xl p-4 space-y-3">
                    {items.map((item, itemIdx) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3"
                        data-ocid={`checkout.item.${itemIdx + 1}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-luxe-cyan">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 btn-outline"
                      data-ocid="checkout.secondary_button"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                      data-ocid="checkout.submit_button"
                    >
                      {isPlacingOrder ? (
                        <>
                          <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                          Placing Order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="glass-card rounded-2xl p-5 h-fit">
            <h3 className="font-display font-bold text-foreground mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground truncate flex-1">
                    {item.title} ×{item.quantity}
                  </span>
                  <span className="text-foreground ml-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border/30 pt-3 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-luxe-cyan text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
