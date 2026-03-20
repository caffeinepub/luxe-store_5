import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";

interface WishlistContextValue {
  items: string[];
  toggle: (productId: string, title?: string) => void;
  has: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>(["2", "4", "9"]);

  const toggle = useCallback((productId: string, title?: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) {
        toast.info("Removed from wishlist", { duration: 1500 });
        return prev.filter((id) => id !== productId);
      }
      toast.success(title ? `${title} saved!` : "Added to wishlist", {
        duration: 1500,
      });
      return [...prev, productId];
    });
  }, []);

  const has = useCallback(
    (productId: string) => items.includes(productId),
    [items],
  );

  return (
    <WishlistContext.Provider value={{ items, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
