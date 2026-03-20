import { Link } from "@tanstack/react-router";
import { Heart, Menu, Moon, Search, ShoppingCart, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const { totalCount, setIsOpen: setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Admin", to: "/admin" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`w-full max-w-6xl transition-all duration-500 rounded-pill px-6 py-3 flex items-center justify-between ${
            scrolled
              ? "backdrop-blur-2xl shadow-glass border"
              : "backdrop-blur-md"
          }`}
          style={{
            background: scrolled
              ? "rgba(5, 2, 15, 0.92)"
              : "rgba(5, 2, 15, 0.6)",
            borderColor: scrolled ? "rgba(120, 60, 200, 0.5)" : "transparent",
          }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <span className="font-display text-2xl font-black tracking-wider text-foreground">
              LU<span className="gradient-text">XE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                data-ocid="nav.link"
                activeProps={{ className: "text-luxe-cyan" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxe-cyan group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              data-ocid="nav.search_input"
              aria-label="Search"
            >
              <Search size={18} />
            </motion.button>

            <Link
              to="/wishlist"
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              data-ocid="nav.link"
            >
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-luxe-cyan text-[10px] font-bold text-white flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              data-ocid="nav.button"
              aria-label="Open cart"
            >
              <ShoppingCart size={18} />
              {totalCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-luxe-cyan text-[10px] font-bold text-white flex items-center justify-center"
                >
                  {totalCount}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              data-ocid="nav.toggle"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              data-ocid="nav.button"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
          >
            <div className="glass-card rounded-2xl p-4">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
                data-ocid="search.search_input"
              />
              {searchQuery && (
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to search for &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-4 right-4 z-40 glass-card rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-foreground hover:bg-white/10 transition-colors font-medium"
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-foreground hover:bg-white/10 transition-colors font-medium"
                data-ocid="nav.link"
              >
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
        />
      )}
    </>
  );
}
