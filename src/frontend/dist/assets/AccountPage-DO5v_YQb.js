import { c as createLucideIcon, G as useInternetIdentity, j as reactExports, q as jsxRuntimeExports, t as motion, H as Heart, I as Input, K as Button, L as Link, F as ue } from "./index-CI9PTUwd.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-RH9bR2DW.js";
import "./index-CPJgGOVB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
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
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function AccountPage() {
  const { login, clear, loginStatus, identity, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity == null ? void 0 : identity.getPrincipal().toString();
  const [displayName, setDisplayName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const handleSaveProfile = () => {
    ue.success("Profile saved!");
  };
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pt-28 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        className: "w-full max-w-md",
        "data-ocid": "account.panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-luxe-cyan/20 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28, className: "text-luxe-cyan" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-black text-foreground", children: "Welcome Back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Sign in to access your account" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "login", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full glass-card border border-border/50 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: "login",
                  className: "flex-1",
                  "data-ocid": "account.tab",
                  children: "Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: "signup",
                  className: "flex-1",
                  "data-ocid": "account.tab",
                  children: "Sign Up"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "We use Internet Identity for secure, passwordless authentication." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  onClick: login,
                  disabled: isLoggingIn,
                  className: "w-full btn-primary flex items-center justify-center gap-2",
                  "data-ocid": "account.primary_button",
                  children: [
                    isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 18 }),
                    isLoggingIn ? "Signing in..." : "Sign In"
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Create a new Internet Identity to get started." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  onClick: login,
                  disabled: isLoggingIn,
                  className: "w-full btn-primary flex items-center justify-center gap-2",
                  "data-ocid": "account.primary_button",
                  children: "Create Account"
                }
              )
            ] }) })
          ] })
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pt-28 px-4 pb-16", "data-ocid": "account.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-black uppercase text-foreground", children: "My Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 font-mono text-xs", children: principal })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "glass-card border border-border/50 p-1 rounded-xl h-auto flex-wrap gap-1 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "profile",
            className: "flex items-center gap-2 rounded-lg",
            "data-ocid": "account.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }),
              " Profile"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "orders",
            className: "flex items-center gap-2 rounded-lg",
            "data-ocid": "account.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14 }),
              " Orders"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "wishlist",
            className: "flex items-center gap-2 rounded-lg",
            "data-ocid": "account.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 14 }),
              " Wishlist"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card rounded-2xl p-6 max-w-lg space-y-4",
          "data-ocid": "account.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Profile Settings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "acc-dname",
                  className: "block text-sm font-semibold text-foreground mb-1.5",
                  children: "Display Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "acc-dname",
                  value: displayName,
                  onChange: (e) => setDisplayName(e.target.value),
                  placeholder: "Your name",
                  className: "bg-white/5 border-border/50",
                  "data-ocid": "account.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "acc-email",
                  className: "block text-sm font-semibold text-foreground mb-1.5",
                  children: "Email"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "acc-email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  type: "email",
                  placeholder: "your@email.com",
                  className: "bg-white/5 border-border/50",
                  "data-ocid": "account.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSaveProfile,
                className: "btn-primary",
                "data-ocid": "account.save_button",
                children: "Save Changes"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 glass-card rounded-2xl",
          "data-ocid": "account.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Package,
              {
                size: 48,
                className: "text-muted-foreground/30 mx-auto mb-4"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No orders yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "mt-4 btn-primary",
                "data-ocid": "account.primary_button",
                children: "Start Shopping"
              }
            ) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "wishlist", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 glass-card rounded-2xl",
          "data-ocid": "account.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heart,
              {
                size: 48,
                className: "text-muted-foreground/30 mx-auto mb-4"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "View your wishlist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/wishlist", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "mt-4 btn-primary",
                "data-ocid": "account.primary_button",
                children: "Go to Wishlist"
              }
            ) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: clear,
        className: "flex items-center gap-2 mt-8 text-sm text-destructive/70 hover:text-destructive transition-colors",
        "data-ocid": "account.delete_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
          " Sign Out"
        ]
      }
    )
  ] }) });
}
export {
  AccountPage as default
};
