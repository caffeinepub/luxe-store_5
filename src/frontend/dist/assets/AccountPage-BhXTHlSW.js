import { c as createLucideIcon, N as useInternetIdentity, j as reactExports, q as jsxRuntimeExports, t as motion, H as Heart, Q as Input, R as Button, L as Link, O as ue } from "./index-VzrNFl3C.js";
import { S as Skeleton } from "./skeleton-CHmu0y3F.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-jCdN7pr2.js";
import { d as useUserProfile, e as useSaveUserProfile, f as useUserOrders } from "./useQueries-CpDyxvt-.js";
import { L as LoaderCircle } from "./loader-circle-BGLcJ5AX.js";
import "./index-C8rsrnE9.js";
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
function StatusBadge({
  status
}) {
  const colors = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    delivered: "bg-green-500/20 text-green-400 border-green-500/30"
  };
  const label = String(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors[label] ?? "bg-muted text-muted-foreground"}`,
      children: label
    }
  );
}
function AccountPage() {
  const { login, clear, loginStatus, identity, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity == null ? void 0 : identity.getPrincipal();
  const principalStr = principal == null ? void 0 : principal.toString();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const saveProfile = useSaveUserProfile();
  const { data: orders = [], isLoading: ordersLoading } = useUserOrders(principal);
  const [displayName, setDisplayName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? "");
      setEmail(profile.email ?? "");
    }
  }, [profile]);
  const handleSaveProfile = async () => {
    try {
      await saveProfile.mutateAsync({ displayName, email });
      ue.success("Profile saved!");
    } catch {
      ue.error("Failed to save profile");
    }
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-black text-foreground", children: "Welcome to LUXE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Sign in or create an account to continue" })
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-luxe-cyan/5 border border-luxe-cyan/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 text-center font-medium", children: "Sign in with your existing Internet Identity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-1", children: "Secure, passwordless authentication — no email required" })
              ] }),
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
                    isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 18 }),
                    isLoggingIn ? "Signing in..." : "Sign In with Internet Identity"
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-luxe-magenta/5 border border-luxe-magenta/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 text-center font-medium", children: "Create a new Internet Identity — this acts as your account" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-1", children: "Your identity is cryptographically secured and fully private" })
              ] }),
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
                    isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }),
                    isLoggingIn ? "Creating..." : "Create New Account"
                  ]
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 font-mono text-xs", children: principalStr })
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
            profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "account.loading_state", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
                  disabled: saveProfile.isPending,
                  className: "btn-primary",
                  "data-ocid": "account.save_button",
                  children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
                    "Saving..."
                  ] }) : "Save Changes"
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "account.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-2xl" }, n)) }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card rounded-2xl p-4 flex items-center justify-between gap-4",
          "data-ocid": `account.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                "#",
                order.id.slice(0, 8)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground font-semibold", children: [
                order.items.length,
                " item",
                order.items.length !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-luxe-cyan", children: [
              "$",
              order.total.toFixed(2)
            ] })
          ]
        },
        order.id
      )) }) }),
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
