import type { Product } from "../backend.d";

const CATEGORY_IMAGES: Record<string, string> = {
  Electronics:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  Fashion:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  Home: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  Sports:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  Beauty:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
};

const PRODUCT_IMAGES: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  "2": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  "3": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  "4": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "5": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  "6": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
  "7": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
  "8": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
  "9": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
  "10": "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80",
  "11": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
  "12": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
};

export function getProductImage(product: Product): string {
  return (
    PRODUCT_IMAGES[product.id] ??
    CATEGORY_IMAGES[product.category] ??
    CATEGORY_IMAGES.Electronics
  );
}

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES.Electronics;
}

export const CATEGORY_LIST = [
  {
    name: "Electronics",
    icon: "💻",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    name: "Fashion",
    icon: "👟",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
  {
    name: "Home",
    icon: "🏠",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
  },
  {
    name: "Sports",
    icon: "⚡",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
  },
  {
    name: "Beauty",
    icon: "✨",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
  },
];
