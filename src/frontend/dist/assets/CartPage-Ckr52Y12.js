import { w as useCart, j as reactExports, q as jsxRuntimeExports, t as motion, E as ShoppingBag, L as Link } from "./index-BlbegTaj.js";
function CartPage() {
  const { setIsOpen, totalCount } = useCart();
  reactExports.useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen pt-28 flex items-center justify-center px-4",
      "data-ocid": "cart.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          className: "text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 64, className: "text-luxe-cyan mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-black text-foreground mb-2", children: "Your Cart" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: totalCount > 0 ? `${totalCount} item${totalCount > 1 ? "s" : ""} in your cart` : "Your cart is currently open in the drawer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "btn-primary",
                "data-ocid": "cart.primary_button",
                children: "Continue Shopping"
              }
            ) })
          ]
        }
      )
    }
  );
}
export {
  CartPage as default
};
