import { c as createLucideIcon, w as useCart, F as useInternetIdentity, j as reactExports, q as jsxRuntimeExports, t as motion, A as AnimatePresence, G as ue, E as ShoppingBag } from "./index-DDabS7r8.js";
import { c as useCreateOrder } from "./useQueries-IIm3-WqB.js";
import { C as Check } from "./check-Bdwo2n7d.js";
import { C as ChevronRight } from "./chevron-right-BkfZGyDo.js";
import { M as MapPin } from "./map-pin-CJiL8K7l.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: ShoppingBag }
];
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4 mb-10", children: STEPS.map((step, i) => {
    const done = current > step.id;
    const active = current === step.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { scale: active ? 1.1 : 1 },
            className: `w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${done ? "bg-luxe-cyan border-luxe-cyan" : active ? "border-luxe-cyan" : "border-border/50"}`,
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16, className: "text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              step.icon,
              {
                size: 16,
                className: active ? "text-luxe-cyan" : "text-muted-foreground"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs font-semibold uppercase tracking-wider ${active ? "text-luxe-cyan" : done ? "text-foreground" : "text-muted-foreground"}`,
            children: step.label
          }
        )
      ] }),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-16 h-px mt-0 mb-5 transition-all ${done ? "bg-luxe-cyan" : "bg-border/30"}`
        }
      )
    ] }, step.id);
  }) });
}
function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const { identity } = useInternetIdentity();
  const [isPlacingOrder, setIsPlacingOrder] = reactExports.useState(false);
  const [step, setStep] = reactExports.useState(1);
  const [shipping, setShipping] = reactExports.useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: ""
  });
  const [payment, setPayment] = reactExports.useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [orderPlaced, setOrderPlaced] = reactExports.useState(false);
  const shippingFields = [
    { key: "name", label: "Full Name", placeholder: "John Doe" },
    { key: "address", label: "Street Address", placeholder: "123 Main Street" },
    { key: "city", label: "City", placeholder: "New York" },
    { key: "zip", label: "ZIP Code", placeholder: "10001" },
    { key: "country", label: "Country", placeholder: "United States" }
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
      ue.success("Order placed successfully!", {
        description: "Your order will arrive in 3-5 business days."
      });
    } catch {
      ue.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };
  if (orderPlaced) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pt-28 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center max-w-md",
        "data-ocid": "checkout.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { type: "spring", delay: 0.2 },
              className: "w-24 h-24 rounded-full bg-luxe-cyan/20 border-2 border-luxe-cyan flex items-center justify-center mx-auto mb-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 40, className: "text-luxe-cyan" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-black text-foreground mb-2", children: "Order Placed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Thank you for your purchase. Your order will arrive in 3-5 business days." })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pt-28 px-4 pb-16", "data-ocid": "checkout.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-black uppercase text-foreground", children: "Checkout" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -30 },
            className: "space-y-4",
            "data-ocid": "checkout.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Shipping Information" }),
              shippingFields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: `sf-${f.key}`,
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    children: f.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: shipping[f.key],
                    onChange: (e) => setShipping((p) => ({
                      ...p,
                      [f.key]: e.target.value
                    })),
                    placeholder: f.placeholder,
                    className: "w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors",
                    "data-ocid": "checkout.input"
                  }
                )
              ] }, f.key)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setStep(2),
                  className: "w-full btn-primary mt-4 flex items-center justify-center gap-2",
                  "data-ocid": "checkout.primary_button",
                  children: [
                    "Continue to Payment ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                  ]
                }
              )
            ]
          },
          "shipping"
        ),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -30 },
            className: "space-y-4",
            "data-ocid": "checkout.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Payment Method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: ["card", "upi", "paypal"].map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPayment((p) => ({ ...p, method })),
                  className: `py-3 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all ${payment.method === method ? "border-luxe-cyan bg-luxe-cyan/10 text-luxe-cyan" : "border-border/50 text-muted-foreground hover:border-luxe-cyan/30"}`,
                  "data-ocid": "checkout.toggle",
                  children: method === "card" ? "💳 Card" : method === "upi" ? "📱 UPI" : "🅿 PayPal"
                },
                method
              )) }),
              payment.method === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: payment.cardNumber,
                    onChange: (e) => setPayment((p) => ({
                      ...p,
                      cardNumber: e.target.value
                    })),
                    placeholder: "Card Number (16 digits)",
                    className: "w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors",
                    "data-ocid": "checkout.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      placeholder: "MM/YY",
                      value: payment.expiry,
                      onChange: (e) => setPayment((p) => ({
                        ...p,
                        expiry: e.target.value
                      })),
                      className: "px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors",
                      "data-ocid": "checkout.input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      placeholder: "CVV",
                      value: payment.cvv,
                      onChange: (e) => setPayment((p) => ({ ...p, cvv: e.target.value })),
                      className: "px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-luxe-cyan/50 transition-colors",
                      "data-ocid": "checkout.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep(1),
                    className: "flex-1 btn-outline",
                    "data-ocid": "checkout.secondary_button",
                    children: "Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep(3),
                    className: "flex-1 btn-primary",
                    "data-ocid": "checkout.primary_button",
                    children: "Review Order"
                  }
                )
              ] })
            ]
          },
          "payment"
        ),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -30 },
            className: "space-y-4",
            "data-ocid": "checkout.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Review Your Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl p-4 space-y-3", children: items.map((item, itemIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  "data-ocid": `checkout.item.${itemIdx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.image,
                        alt: item.title,
                        className: "w-14 h-14 rounded-xl object-cover"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: item.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-luxe-cyan", children: [
                      "$",
                      (item.price * item.quantity).toFixed(2)
                    ] })
                  ]
                },
                item.productId
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep(2),
                    className: "flex-1 btn-outline",
                    "data-ocid": "checkout.secondary_button",
                    children: "Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handlePlaceOrder,
                    disabled: isPlacingOrder,
                    className: "flex-1 btn-primary flex items-center justify-center gap-2",
                    "data-ocid": "checkout.submit_button",
                    children: isPlacingOrder ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" }),
                      "Placing Order..."
                    ] }) : "Place Order"
                  }
                )
              ] })
            ]
          },
          "review"
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate flex-1", children: [
                item.title,
                " ×",
                item.quantity
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground ml-2", children: [
                "$",
                (item.price * item.quantity).toFixed(2)
              ] })
            ]
          },
          item.productId
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/30 pt-3 flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-luxe-cyan text-lg", children: [
            "$",
            totalPrice.toFixed(2)
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  CheckoutPage as default
};
