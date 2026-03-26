import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductListingPage,
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: ProductDetailPage,
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});
const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: WishlistPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  accountRoute,
  wishlistRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <CartProvider>
        <WishlistProvider>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <RouterProvider router={router} />
          </Suspense>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
