import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface WishlistContextValue {
  items: string[];
  toggle: (productId: string, title?: string) => void;
  has: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  // Load wishlist from backend when actor + identity become available
  useEffect(() => {
    if (!actor || !isLoggedIn) return;
    actor
      .getCallerWishlist()
      .then((result) => {
        if (result) setItems(result);
      })
      .catch(() => {});
  }, [actor, isLoggedIn]);

  const toggle = useCallback(
    (productId: string, title?: string) => {
      setItems((prev) => {
        if (prev.includes(productId)) {
          toast.info("Removed from wishlist", { duration: 1500 });
          if (actor && isLoggedIn) {
            actor.removeFromWishlist(productId).catch(() => {});
          }
          return prev.filter((id) => id !== productId);
        }
        toast.success(title ? `${title} saved!` : "Added to wishlist", {
          duration: 1500,
        });
        if (actor && isLoggedIn) {
          actor.addToWishlist(productId).catch(() => {});
        }
        return [...prev, productId];
      });
    },
    [actor, isLoggedIn],
  );

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
