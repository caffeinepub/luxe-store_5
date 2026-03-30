import { C as useParams, w as useCart, x as useWishlist, j as reactExports, q as jsxRuntimeExports, L as Link, A as AnimatePresence, t as motion, D as Minus, P as Plus, S as ShoppingCart, H as Heart } from "./index-DDabS7r8.js";
import { S as Skeleton } from "./skeleton--kdkQyYE.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Di8fAUIS.js";
import { P as ProductCard } from "./ProductCard-DCgIImZm.js";
import { a as useProduct, b as useProductReviews } from "./useQueries-IIm3-WqB.js";
import { a as getProductColorGallery, b as getProductImageForColor, S as Star } from "./imageUtils-S0xlRkFt.js";
import { m as mockProducts } from "./mockData-CqnB23QV.js";
import { u as useInView, Z as Zap } from "./use-in-view-CoGttMw0.js";
import "./index-0adkBbqm.js";
function ProductDetailPage() {
  var _a, _b;
  const { id } = useParams({ from: "/products/$id" });
  const { data: backendProduct, isLoading } = useProduct(id);
  const product = backendProduct ?? mockProducts.find((p) => p.id === id) ?? mockProducts[0];
  const { data: reviews = [] } = useProductReviews(id);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [selectedSize, setSelectedSize] = reactExports.useState(((_a = product == null ? void 0 : product.sizes) == null ? void 0 : _a[0]) ?? "");
  const [selectedColor, setSelectedColor] = reactExports.useState(
    ((_b = product == null ? void 0 : product.colors) == null ? void 0 : _b[0]) ?? ""
  );
  const [qty, setQty] = reactExports.useState(1);
  const [stickyVisible, setStickyVisible] = reactExports.useState(false);
  const productRef = reactExports.useRef(null);
  const reviewsRef = reactExports.useRef(null);
  const reviewsInView = useInView(reviewsRef, { once: true });
  const colorGallery = product ? getProductColorGallery(product) : [];
  const mainImage = product ? getProductImageForColor(product, selectedColor) : "";
  const relatedProducts = mockProducts.filter((p) => p.category === (product == null ? void 0 : product.category) && p.id !== (product == null ? void 0 : product.id)).slice(0, 4);
  const isWishlisted = product ? has(product.id) : false;
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
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
      quantity: qty
    });
  };
  if (isLoading || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen pt-28 max-w-7xl mx-auto px-4 sm:px-6",
        "data-ocid": "product.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, i)) })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products",
            className: "hover:text-foreground transition-colors",
            children: "Products"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: product.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: productRef, className: "grid lg:grid-cols-2 gap-12 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-3xl overflow-hidden bg-card border border-border/50 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.img,
              {
                initial: { opacity: 0, scale: 1.05 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.97 },
                transition: { duration: 0.35 },
                src: mainImage,
                alt: product.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              },
              mainImage
            ) }),
            product.isFlashSale && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase", children: "Flash Sale" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: colorGallery.map(({ color, image }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedColor(color),
              className: "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200",
              style: {
                borderColor: selectedColor === color ? "#00ffff" : "rgba(255,255,255,0.15)",
                boxShadow: selectedColor === color ? "0 0 12px rgba(0,255,255,0.5)" : "none"
              },
              "aria-label": `Select color ${color}`,
              "data-ocid": "product.toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: image,
                    alt: color,
                    className: "w-full h-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-white/60 shadow",
                    style: { backgroundColor: color }
                  }
                )
              ]
            },
            color
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: product.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-black text-foreground", children: product.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
              [0, 1, 2, 3, 4].map((starIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  size: 16,
                  className: starIdx < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                },
                starIdx
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                product.rating,
                " · ",
                Number(product.reviewCount),
                " reviews"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-4xl font-black text-luxe-cyan", children: [
              "$",
              product.price.toFixed(2)
            ] }),
            product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl text-muted-foreground line-through", children: [
              "$",
              product.originalPrice.toFixed(2)
            ] }),
            product.isFlashSale && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold", children: [
              "-",
              Math.round(
                (product.originalPrice - product.price) / product.originalPrice * 100
              ),
              "% OFF"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.description }),
          product.sizes.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3 uppercase tracking-widest", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedSize(size),
                className: `px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${selectedSize === size ? "bg-luxe-cyan text-white border-transparent" : "border-border/50 text-muted-foreground hover:border-luxe-cyan/50"}`,
                "data-ocid": "product.toggle",
                children: size
              },
              size
            )) })
          ] }),
          product.colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 uppercase tracking-widest", children: [
              "Color",
              selectedColor && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "ml-2 inline-block w-3 h-3 rounded-full border border-white/40 align-middle",
                  style: { backgroundColor: selectedColor }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: product.colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedColor(color),
                className: "relative w-8 h-8 rounded-full border-2 transition-all",
                style: {
                  backgroundColor: color,
                  borderColor: selectedColor === color ? "#00ffff" : "rgba(255,255,255,0.2)",
                  boxShadow: selectedColor === color ? `0 0 0 2px #000, 0 0 0 4px #00ffff, 0 0 12px ${color}88` : "none",
                  transform: selectedColor === color ? "scale(1.15)" : "scale(1)"
                },
                "aria-label": color,
                "data-ocid": "product.toggle"
              },
              color
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground uppercase tracking-widest", children: "Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 glass-card rounded-xl px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setQty(Math.max(1, qty - 1)),
                  className: "text-muted-foreground hover:text-foreground transition-colors",
                  "data-ocid": "product.secondary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground w-6 text-center", children: qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setQty(qty + 1),
                  className: "text-muted-foreground hover:text-foreground transition-colors",
                  "data-ocid": "product.secondary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: handleAddToCart,
                className: "flex-1 btn-primary flex items-center justify-center gap-2",
                "data-ocid": "product.primary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 18 }),
                  " Add to Cart"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                className: "flex-1 btn-outline flex items-center justify-center gap-2",
                "data-ocid": "product.secondary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18 }),
                  " Buy Now"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                whileTap: { scale: 0.9 },
                onClick: () => toggle(product.id, product.title),
                className: "p-4 rounded-full border border-border/50 hover:border-red-500/50 text-muted-foreground hover:text-red-500 transition-all",
                "data-ocid": "product.toggle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    size: 20,
                    className: isWishlisted ? "fill-red-500 text-red-500" : ""
                  }
                )
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "description", className: "mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "glass-card border border-border/50 p-1 rounded-xl h-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "description",
              className: "rounded-lg",
              "data-ocid": "product.tab",
              children: "Description"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "reviews",
              className: "rounded-lg",
              "data-ocid": "product.tab",
              children: [
                "Reviews (",
                reviews.length || Number(product.reviewCount),
                ")"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "description", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.description }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reviews", ref: reviewsRef, className: "mt-6", children: reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-card rounded-2xl p-8 text-center",
            "data-ocid": "product.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No reviews yet. Be the first to review this product!" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: reviews.map((r, reviewIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: reviewsInView ? { opacity: 1, y: 0 } : {},
            transition: { delay: reviewIdx * 0.1 },
            className: "glass-card rounded-2xl p-5",
            "data-ocid": `reviews.item.${reviewIdx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: [0, 1, 2, 3, 4].slice(0, Number(r.rating)).map((starIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  size: 12,
                  className: "fill-yellow-400 text-yellow-400"
                },
                starIdx
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: r.comment })
            ]
          },
          `${r.productId}-${reviewIdx}`
        )) }) })
      ] }),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black uppercase text-foreground mb-6", children: "Related Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5", children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: stickyVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { y: 100 },
        animate: { y: 0 },
        exit: { y: 100 },
        className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 px-4 py-4",
        style: {
          background: "rgba(5, 2, 15, 0.97)",
          backdropFilter: "blur(20px)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: product.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-luxe-cyan font-bold", children: [
              "$",
              product.price.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              whileHover: { scale: 1.03 },
              whileTap: { scale: 0.97 },
              onClick: handleAddToCart,
              className: "btn-primary",
              "data-ocid": "product.primary_button",
              children: "Add to Cart"
            }
          )
        ] })
      }
    ) })
  ] });
}
export {
  ProductDetailPage as default
};
