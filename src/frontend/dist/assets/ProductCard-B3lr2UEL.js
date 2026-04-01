import { j as reactExports, w as useCart, x as useWishlist, q as jsxRuntimeExports, t as motion, L as Link, H as Heart, S as ShoppingCart } from "./index-BlbegTaj.js";
import { b as getProductImageForColor, S as Star } from "./imageUtils-DlqhExmW.js";
const STARS = [0, 1, 2, 3, 4];
function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = reactExports.useState(false);
  const [hoveredColor, setHoveredColor] = reactExports.useState(null);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.id);
  const displayColor = hoveredColor ?? product.colors[0];
  const image = getProductImageForColor(product, displayColor);
  const discount = Math.round(
    (product.originalPrice - product.price) / product.originalPrice * 100
  );
  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image,
      size: product.sizes[0] ?? "One Size",
      color: displayColor ?? "#000000"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      whileHover: {
        scale: 1.03,
        y: -6,
        transition: { type: "spring", stiffness: 800, damping: 60 }
      },
      transition: {
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20
      },
      className: "group product-card-hover neon-border-card",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative rounded-2xl overflow-hidden bg-card border border-border/50 transition-all duration-300 cursor-pointer",
          style: {
            boxShadow: hovered ? "0 0 30px rgba(0,255,255,0.35), 0 0 60px rgba(255,0,255,0.15)" : "0 2px 8px rgba(0,0,0,0.12)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: image,
                  alt: product.title,
                  className: "absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  style: {
                    background: "linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.12) 50%, transparent 100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none",
                  style: {
                    boxShadow: "inset 0 0 0 1.5px rgba(0,255,255,0.7), 0 0 30px rgba(0,255,255,0.35)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-col gap-1", children: [
                product.isFlashSale && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.span,
                  {
                    animate: { scale: [1, 1.08, 1] },
                    transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
                    className: "px-2 py-0.5 rounded-full text-black text-xs font-bold uppercase tracking-wide",
                    style: {
                      background: "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
                      boxShadow: "0 0 10px rgba(0,255,255,0.5)"
                    },
                    children: [
                      "Sale ",
                      discount,
                      "% OFF"
                    ]
                  }
                ),
                product.isTrending && !product.isFlashSale && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    animate: { scale: [1, 1.08, 1] },
                    transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
                    className: "px-2 py-0.5 rounded-full text-white text-xs font-bold uppercase tracking-wide",
                    style: {
                      background: "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)",
                      boxShadow: "0 0 10px rgba(255,0,255,0.5)"
                    },
                    children: "Trending"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  onClick: (e) => {
                    e.preventDefault();
                    toggle(product.id, product.title);
                  },
                  whileHover: {
                    scale: 1.2,
                    rotate: 10,
                    transition: { type: "spring", stiffness: 400, damping: 12 }
                  },
                  whileTap: { scale: 0.8 },
                  className: "absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all",
                  style: {
                    background: "rgba(0, 0, 0, 0.55)",
                    borderColor: "rgba(255, 255, 255, 0.25)"
                  },
                  "aria-label": "Toggle wishlist",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      size: 16,
                      className: isWishlisted ? "fill-red-500 text-red-500" : "text-white"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: handleAddToCart,
                  initial: { y: 20, opacity: 0 },
                  animate: { y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 },
                  transition: { duration: 0 },
                  className: "absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 py-2.5 rounded-xl backdrop-blur-md text-white text-sm font-semibold transition-all",
                  style: {
                    background: "rgba(0,20,30,0.75)",
                    border: "1px solid rgba(0,255,255,0.4)",
                    boxShadow: "0 0 15px rgba(0,255,255,0.25)"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #00ccff 0%, #ff00ff 100%)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(255,0,255,0.3)";
                    e.currentTarget.style.border = "1px solid rgba(0,255,255,0.8)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "rgba(0,20,30,0.75)";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,255,0.25)";
                    e.currentTarget.style.border = "1px solid rgba(0,255,255,0.4)";
                  },
                  "data-ocid": `products.item.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 14 }),
                    "Quick Add"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-1", children: product.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-1", children: product.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mt-1.5 h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-14",
                  style: {
                    background: "linear-gradient(90deg, #00ffff, #ff00ff)"
                  }
                }
              ),
              product.colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center gap-1.5 mt-2",
                  onMouseLeave: () => setHoveredColor(null),
                  children: product.colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": color,
                      onMouseEnter: (e) => {
                        e.preventDefault();
                        setHoveredColor(color);
                      },
                      onClick: (e) => e.preventDefault(),
                      className: "w-4 h-4 rounded-full transition-all duration-150 flex-shrink-0",
                      style: {
                        backgroundColor: color,
                        boxShadow: hoveredColor === color ? `0 0 0 2px #000, 0 0 0 3.5px ${color}, 0 0 8px ${color}88` : "0 0 0 1.5px rgba(255,255,255,0.25)",
                        transform: hoveredColor === color ? "scale(1.3)" : "scale(1)"
                      }
                    },
                    color
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
                STARS.map((starIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 11,
                    className: starIdx < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                  },
                  starIdx
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                  product.rating,
                  " (",
                  Number(product.reviewCount),
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.span,
                  {
                    whileHover: { scale: 1.12 },
                    transition: { type: "spring", stiffness: 500, damping: 10 },
                    className: "font-bold gradient-text",
                    children: [
                      "$",
                      product.price.toFixed(2)
                    ]
                  }
                ),
                product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                  "$",
                  product.originalPrice.toFixed(2)
                ] })
              ] })
            ] })
          ]
        }
      ) })
    }
  );
}
export {
  ProductCard as P
};
