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

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQty: (
    productId: string,
    size: string,
    color: string,
    qty: number,
  ) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  // Load cart from backend when user logs in
  useEffect(() => {
    if (!actor || !isLoggedIn) return;
    actor
      .getCallerCart()
      .then((result) => {
        if (!result || result.length === 0) return;
        // Backend cart items don't have display info; we keep local items
        // and just sync quantities/products. For now we keep local state.
      })
      .catch(() => {});
  }, [actor, isLoggedIn]);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const key = `${newItem.productId}-${newItem.size}-${newItem.color}`;
        const existing = prev.find(
          (i) => `${i.productId}-${i.size}-${i.color}` === key,
        );
        if (existing) {
          return prev.map((i) =>
            `${i.productId}-${i.size}-${i.color}` === key
              ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
              : i,
          );
        }
        return [...prev, { ...newItem, quantity: newItem.quantity ?? 1 }];
      });
      toast.success("Added to cart!", {
        description: newItem.title,
        duration: 2000,
      });
      setIsOpen(true);
      // Sync to backend
      if (actor && isLoggedIn) {
        actor
          .addToCart({
            productId: newItem.productId,
            size: newItem.size ? newItem.size : undefined,
            color: newItem.color ? newItem.color : undefined,
            quantity: BigInt(newItem.quantity ?? 1),
          })
          .catch(() => {});
      }
    },
    [actor, isLoggedIn],
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.productId === productId &&
              i.size === size &&
              i.color === color
            ),
        ),
      );
      if (actor && isLoggedIn) {
        actor.removeFromCart(productId).catch(() => {});
      }
    },
    [actor, isLoggedIn],
  );

  const updateQty = useCallback(
    (productId: string, size: string, color: string, qty: number) => {
      if (qty <= 0) {
        setItems((prev) =>
          prev.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.size === size &&
                i.color === color
              ),
          ),
        );
        if (actor && isLoggedIn) {
          actor.removeFromCart(productId).catch(() => {});
        }
      } else {
        setItems((prev) =>
          prev.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: qty }
              : i,
          ),
        );
        if (actor && isLoggedIn) {
          actor.updateCartItem(productId, BigInt(qty)).catch(() => {});
        }
      }
    },
    [actor, isLoggedIn],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (actor && isLoggedIn) {
      actor.clearCart().catch(() => {});
    }
  }, [actor, isLoggedIn]);

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalPrice,
        totalCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
