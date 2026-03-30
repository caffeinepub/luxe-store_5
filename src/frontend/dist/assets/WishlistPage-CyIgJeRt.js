import { x as useWishlist, w as useCart, q as jsxRuntimeExports, t as motion, H as Heart, L as Link, A as AnimatePresence, S as ShoppingCart } from "./index-DDabS7r8.js";
import { u as useAllProducts } from "./useQueries-IIm3-WqB.js";
import { g as getProductImage, S as Star } from "./imageUtils-S0xlRkFt.js";
const STARS = [0, 1, 2, 3, 4];
function WishlistPage() {
  const { items: wishlistIds, toggle } = useWishlist();
  const { addItem } = useCart();
  const { data: allProducts = [] } = useAllProducts();
  const wishlisted = allProducts.filter((p) => wishlistIds.includes(p.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pt-28 px-4 pb-16", "data-ocid": "wishlist.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "Saved Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-black uppercase text-foreground", children: "My Wishlist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
            wishlisted.length,
            " item",
            wishlisted.length !== 1 ? "s" : "",
            " saved"
          ] })
        ]
      }
    ),
    wishlisted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-24",
        "data-ocid": "wishlist.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              size: 64,
              className: "text-muted-foreground/20 mx-auto mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Your wishlist is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Save items you love to come back to them later" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "btn-primary",
              "data-ocid": "wishlist.primary_button",
              children: "Explore Products"
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: wishlisted.map((product, i) => {
      const image = getProductImage(product);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
          },
          transition: { delay: i * 0.05 },
          className: "glass-card rounded-2xl overflow-hidden group",
          "data-ocid": `wishlist.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: image,
                  alt: product.title,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-1", children: product.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground line-clamp-1 mb-2", children: product.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-3", children: [
                STARS.map((starIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 11,
                    className: starIdx < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                  },
                  starIdx
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: product.rating })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-luxe-cyan", children: [
                  "$",
                  product.price.toFixed(2)
                ] }),
                product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                  "$",
                  product.originalPrice.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => addItem({
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      image,
                      size: product.sizes[0] ?? "One Size",
                      color: product.colors[0] ?? "#000"
                    }),
                    className: "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-luxe-cyan/10 border border-luxe-cyan/30 text-luxe-cyan text-xs font-bold hover:bg-luxe-cyan hover:text-white transition-all",
                    "data-ocid": `wishlist.primary_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 13 }),
                      " Add to Cart"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggle(product.id),
                    className: "p-2 rounded-xl border border-border/50 text-red-400 hover:bg-red-500/10 transition-all",
                    "data-ocid": `wishlist.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 14, className: "fill-red-400" })
                  }
                )
              ] })
            ] })
          ]
        },
        product.id
      );
    }) }) })
  ] }) });
}
export {
  WishlistPage as default
};
