import { c as createLucideIcon, j as reactExports, q as jsxRuntimeExports, t as motion, H as Heart } from "./index-DDabS7r8.js";
import { u as useInView, Z as Zap } from "./use-in-view-CoGttMw0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode);
const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    desc: "LUXE was founded with a vision to curate the world's finest products in one premium destination."
  },
  {
    year: "2020",
    title: "Going Global",
    desc: "Expanded to 30+ countries, bringing premium products to discerning shoppers worldwide."
  },
  {
    year: "2022",
    title: "1 Million Customers",
    desc: "Reached our first million customers milestone. A testament to our commitment to quality and service."
  },
  {
    year: "2024",
    title: "Tech Revolution",
    desc: "Launched AI-powered personalization, making product discovery smarter and more intuitive than ever."
  },
  {
    year: "2026",
    title: "The Future",
    desc: "Pioneering the next era of premium commerce with immersive shopping experiences and AR technology."
  }
];
const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Every product is vetted against our rigorous quality standards before it reaches your door."
  },
  {
    icon: Heart,
    title: "Customer First",
    desc: "Your satisfaction drives every decision we make. We're here for you, always."
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Premium products from around the world, delivered to your doorstep with care."
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Constantly pushing boundaries with technology and design to enhance your experience."
  }
];
function AboutPage() {
  const heroRef = reactExports.useRef(null);
  const timelineRef = reactExports.useRef(null);
  const valuesRef = reactExports.useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px"
  });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "about.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroRef,
        className: "relative min-h-[60vh] flex items-center overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #050508 0%, #0d0520 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                background: "radial-gradient(ellipse at 30% 60%, rgba(168,85,247,0.1) 0%, transparent 60%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: heroInView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.8 },
              className: "max-w-3xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-4", children: "Our Story" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-6xl font-black uppercase leading-[0.9] text-foreground mb-6", children: [
                  "BORN FROM A",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "PASSION" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "FOR QUALITY"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xl leading-relaxed", children: "LUXE was built on a simple belief: everyone deserves access to premium products that enhance their life. We scour the globe to bring you the extraordinary." })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: timelineRef,
        className: "max-w-4xl mx-auto px-4 sm:px-6 py-20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: timelineInView ? { opacity: 1, y: 0 } : {},
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "Our Journey" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-black uppercase text-foreground", children: "Milestones" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-luxe-cyan/50 to-transparent" }),
            milestones.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                animate: timelineInView ? { opacity: 1, x: 0 } : {},
                transition: { delay: i * 0.15 },
                className: `relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`,
                "data-ocid": `about.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl font-black text-luxe-cyan/20", children: m.year }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-black text-foreground", children: m.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-muted-foreground text-sm mt-1 max-w-xs ${i % 2 === 0 ? "ml-auto" : ""}`,
                            children: m.desc
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-luxe-cyan border-4 border-background" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" })
                ]
              },
              m.year
            ))
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        ref: valuesRef,
        className: "py-20",
        style: {
          background: "linear-gradient(180deg, #06000f 0%, #0f0530 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: valuesInView ? { opacity: 1, y: 0 } : {},
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "What We Stand For" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-black uppercase text-foreground", children: "Our Values" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: valuesInView ? { opacity: 1, y: 0 } : {},
              transition: { delay: i * 0.1 },
              className: "glass-card rounded-2xl p-6",
              "data-ocid": `about.card.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-luxe-cyan/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { size: 22, className: "text-luxe-cyan" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: v.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.desc })
              ]
            },
            v.title
          )) })
        ] })
      }
    )
  ] });
}
export {
  AboutPage as default
};
