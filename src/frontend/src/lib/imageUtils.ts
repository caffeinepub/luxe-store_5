import type { Product } from "../backend.d";

const CATEGORY_IMAGES: Record<string, string> = {
  Electronics: "/assets/generated/category-electronics.dim_600x400.jpg",
  Fashion: "/assets/generated/category-fashion.dim_600x400.jpg",
  Home: "/assets/generated/category-home.dim_600x400.jpg",
  Sports: "/assets/generated/category-sports.dim_600x400.jpg",
  Beauty: "/assets/generated/category-beauty.dim_600x400.jpg",
};

// Default product images (used as fallback and first gallery image)
const PRODUCT_IMAGES: Record<string, string> = {
  "1": "/assets/generated/product-airmax-black.dim_600x600.jpg",
  "2": "/assets/generated/product-headphones-black.dim_600x600.jpg",
  "3": "/assets/generated/product-jacket-black.dim_600x600.jpg",
  "4": "/assets/generated/product-watch-black.dim_600x600.jpg",
  "5": "/assets/generated/product-sofa-tan.dim_600x600.jpg",
  "6": "/assets/generated/product-beauty-gold.dim_600x600.jpg",
  "7": "/assets/generated/product-running-orange.dim_600x600.jpg",
  "8": "/assets/generated/product-lamp-gold.dim_600x600.jpg",
  "9": "/assets/generated/product-sneaker-white.dim_600x600.jpg",
  "10": "/assets/generated/product-monitor-black.dim_600x600.jpg",
  "11": "/assets/generated/product-yoga-black.dim_600x600.jpg",
  "12": "/assets/generated/product-foundation-light.dim_600x600.jpg",
};

// Color-variant images: productId -> colorHex -> image path
export const PRODUCT_COLOR_IMAGES: Record<string, Record<string, string>> = {
  "1": {
    "#000000": "/assets/generated/product-airmax-black.dim_600x600.jpg",
    "#FFFFFF": "/assets/generated/product-airmax-white.dim_600x600.jpg",
    "#2FD4FF": "/assets/generated/product-airmax-cyan.dim_600x600.jpg",
  },
  "2": {
    "#1a1a1a": "/assets/generated/product-headphones-black.dim_600x600.jpg",
    "#C0C0C0": "/assets/generated/product-headphones-silver.dim_600x600.jpg",
    "#8B4513": "/assets/generated/product-headphones-brown.dim_600x600.jpg",
  },
  "3": {
    "#1a1a1a": "/assets/generated/product-jacket-black.dim_600x600.jpg",
    "#2d4a6e": "/assets/generated/product-jacket-navy.dim_600x600.jpg",
    "#8B4513": "/assets/generated/product-jacket-brown.dim_600x600.jpg",
  },
  "4": {
    "#1a1a1a": "/assets/generated/product-watch-black.dim_600x600.jpg",
    "#C0C0C0": "/assets/generated/product-watch-silver.dim_600x600.jpg",
    "#FFD700": "/assets/generated/product-watch-gold.dim_600x600.jpg",
  },
  "5": {
    "#8B7355": "/assets/generated/product-sofa-tan.dim_600x600.jpg",
    "#2F4F4F": "/assets/generated/product-sofa-teal.dim_600x600.jpg",
    "#1a1a1a": "/assets/generated/product-sofa-black.dim_600x600.jpg",
  },
  "6": {
    "#FFD700": "/assets/generated/product-beauty-gold.dim_600x600.jpg",
    "#FFC0CB": "/assets/generated/product-beauty-pink.dim_600x600.jpg",
    "#FFFFFF": "/assets/generated/product-beauty-white.dim_600x600.jpg",
  },
  "7": {
    "#FF4500": "/assets/generated/product-running-orange.dim_600x600.jpg",
    "#1a1a1a": "/assets/generated/product-running-black.dim_600x600.jpg",
    "#00CED1": "/assets/generated/product-running-teal.dim_600x600.jpg",
  },
  "8": {
    "#FFD700": "/assets/generated/product-lamp-gold.dim_600x600.jpg",
    "#1a1a1a": "/assets/generated/product-lamp-black.dim_600x600.jpg",
    "#FFFFFF": "/assets/generated/product-lamp-white.dim_600x600.jpg",
  },
  "9": {
    "#FFFFFF": "/assets/generated/product-sneaker-white.dim_600x600.jpg",
    "#000000": "/assets/generated/product-sneaker-black.dim_600x600.jpg",
    "#8B4513": "/assets/generated/product-sneaker-brown.dim_600x600.jpg",
  },
  "10": {
    "#1a1a1a": "/assets/generated/product-monitor-black.dim_600x600.jpg",
  },
  "11": {
    "#000000": "/assets/generated/product-yoga-black.dim_600x600.jpg",
    "#8B0000": "/assets/generated/product-yoga-red.dim_600x600.jpg",
    "#2F4F4F": "/assets/generated/product-yoga-teal.dim_600x600.jpg",
  },
  "12": {
    "#F5CBA7": "/assets/generated/product-foundation-light.dim_600x600.jpg",
    "#DC9F79": "/assets/generated/product-foundation-medium.dim_600x600.jpg",
    "#A0522D": "/assets/generated/product-foundation-deep.dim_600x600.jpg",
  },
};

/**
 * Get all color-variant images for a product as a gallery array.
 * Returns [{color, image}] ordered by the product's colors array.
 */
export function getProductColorGallery(
  product: Product,
): Array<{ color: string; image: string }> {
  const colorMap = PRODUCT_COLOR_IMAGES[product.id] ?? {};
  return product.colors.map((color) => ({
    color,
    image:
      colorMap[color] ??
      PRODUCT_IMAGES[product.id] ??
      CATEGORY_IMAGES[product.category] ??
      CATEGORY_IMAGES.Electronics,
  }));
}

/**
 * Get the image for a specific color variant of a product.
 */
export function getProductImageForColor(
  product: Product,
  color?: string,
): string {
  if (color) {
    const colorMap = PRODUCT_COLOR_IMAGES[product.id] ?? {};
    if (colorMap[color]) return colorMap[color];
  }
  return getProductImage(product);
}

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
