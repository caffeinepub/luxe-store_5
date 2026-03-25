import type { Product } from "../backend.d";

const CATEGORY_IMAGES: Record<string, string> = {
  Electronics: "/assets/generated/category-electronics.dim_600x400.jpg",
  Fashion: "/assets/generated/category-fashion.dim_600x400.jpg",
  Home: "/assets/generated/category-home.dim_600x400.jpg",
  Sports: "/assets/generated/category-sports.dim_600x400.jpg",
  Beauty: "/assets/generated/category-beauty.dim_600x400.jpg",
};

const PRODUCT_IMAGES: Record<string, string> = {
  "1": "/assets/generated/product-sneakers-1.dim_600x600.jpg",
  "2": "/assets/generated/product-headphones.dim_600x600.jpg",
  "3": "/assets/generated/product-jacket-1.dim_600x600.jpg",
  "4": "/assets/generated/product-watch.dim_600x600.jpg",
  "5": "/assets/generated/product-sofa.dim_600x600.jpg",
  "6": "/assets/generated/product-beauty.dim_600x600.jpg",
  "7": "/assets/generated/product-jacket-2.dim_600x600.jpg",
  "8": "/assets/generated/product-lamp.dim_600x600.jpg",
  "9": "/assets/generated/product-sneakers-2.dim_600x600.jpg",
  "10": "/assets/generated/product-laptop.dim_600x600.jpg",
  "11": "/assets/generated/product-fitness.dim_600x600.jpg",
  "12": "/assets/generated/product-skincare.dim_600x600.jpg",
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
    image: "/assets/generated/category-electronics.dim_600x400.jpg",
  },
  {
    name: "Fashion",
    icon: "👟",
    image: "/assets/generated/category-fashion.dim_600x400.jpg",
  },
  {
    name: "Home",
    icon: "🏠",
    image: "/assets/generated/category-home.dim_600x400.jpg",
  },
  {
    name: "Sports",
    icon: "⚡",
    image: "/assets/generated/category-sports.dim_600x400.jpg",
  },
  {
    name: "Beauty",
    icon: "✨",
    image: "/assets/generated/category-beauty.dim_600x400.jpg",
  },
];
