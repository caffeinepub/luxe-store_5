import type { Product } from "../backend.d";

const CATEGORY_IMAGES: Record<string, string> = {
  Electronics: "/assets/generated/category-electronics.dim_600x400.jpg",
  Fashion: "/assets/generated/category-fashion.dim_600x400.jpg",
  Home: "/assets/generated/category-home.dim_600x400.jpg",
  Sports: "/assets/generated/category-sports.dim_600x400.jpg",
  Beauty: "/assets/generated/category-beauty.dim_600x400.jpg",
  Footwear: "/assets/generated/category-fashion.dim_600x400.jpg",
  Clothing: "/assets/generated/category-fashion.dim_600x400.jpg",
};

// Default product images keyed by backend product IDs
const PRODUCT_IMAGES: Record<string, string> = {
  // Legacy numeric IDs (kept for backwards compat)
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
  // Backend seeded product IDs
  "prod-001": "/assets/generated/product-airmax-black.dim_600x600.jpg",
  "prod-002": "/assets/generated/product-running-black.dim_600x600.jpg",
  "prod-003": "/assets/generated/product-sneaker-black.dim_600x600.jpg",
  "prod-004": "/assets/generated/product-watch-black.dim_600x600.jpg",
  "prod-005": "/assets/generated/product-headphones-black.dim_600x600.jpg",
  "prod-006": "/assets/generated/product-laptop.dim_600x600.jpg",
  "prod-007": "/assets/generated/product-monitor-black.dim_600x600.jpg",
  "prod-008": "/assets/generated/product-jacket-black.dim_600x600.jpg",
  "prod-009": "/assets/generated/product-yoga-black.dim_600x600.jpg",
  "prod-010": "/assets/generated/product-skincare.dim_600x600.jpg",
  "prod-011": "/assets/generated/product-foundation-light.dim_600x600.jpg",
  "prod-012": "/assets/generated/product-beauty-gold.dim_600x600.jpg",
  "prod-013": "/assets/generated/product-sofa-black.dim_600x600.jpg",
  "prod-014": "/assets/generated/product-lamp-black.dim_600x600.jpg",
  "prod-015": "/assets/generated/product-fitness.dim_600x600.jpg",
};

// Color-variant images: productId -> colorName -> image path
export const PRODUCT_COLOR_IMAGES: Record<string, Record<string, string>> = {
  // Legacy numeric IDs
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
  // Backend seeded product IDs with color name keys
  "prod-001": {
    Black: "/assets/generated/product-airmax-black.dim_600x600.jpg",
    Cyan: "/assets/generated/product-airmax-cyan.dim_600x600.jpg",
    White: "/assets/generated/product-airmax-white.dim_600x600.jpg",
  },
  "prod-002": {
    Black: "/assets/generated/product-running-black.dim_600x600.jpg",
    Orange: "/assets/generated/product-running-orange.dim_600x600.jpg",
    Teal: "/assets/generated/product-running-teal.dim_600x600.jpg",
  },
  "prod-003": {
    Black: "/assets/generated/product-sneaker-black.dim_600x600.jpg",
    White: "/assets/generated/product-sneaker-white.dim_600x600.jpg",
    Brown: "/assets/generated/product-sneaker-brown.dim_600x600.jpg",
  },
  "prod-004": {
    Black: "/assets/generated/product-watch-black.dim_600x600.jpg",
    Gold: "/assets/generated/product-watch-gold.dim_600x600.jpg",
    Silver: "/assets/generated/product-watch-silver.dim_600x600.jpg",
  },
  "prod-005": {
    Black: "/assets/generated/product-headphones-black.dim_600x600.jpg",
    Silver: "/assets/generated/product-headphones-silver.dim_600x600.jpg",
    Brown: "/assets/generated/product-headphones-brown.dim_600x600.jpg",
  },
  "prod-006": {
    Black: "/assets/generated/product-laptop.dim_600x600.jpg",
  },
  "prod-007": {
    Black: "/assets/generated/product-monitor-black.dim_600x600.jpg",
  },
  "prod-008": {
    Black: "/assets/generated/product-jacket-black.dim_600x600.jpg",
    Navy: "/assets/generated/product-jacket-navy.dim_600x600.jpg",
    Brown: "/assets/generated/product-jacket-brown.dim_600x600.jpg",
  },
  "prod-009": {
    Black: "/assets/generated/product-yoga-black.dim_600x600.jpg",
    Red: "/assets/generated/product-yoga-red.dim_600x600.jpg",
    Teal: "/assets/generated/product-yoga-teal.dim_600x600.jpg",
  },
  "prod-010": {
    Default: "/assets/generated/product-skincare.dim_600x600.jpg",
  },
  "prod-011": {
    Light: "/assets/generated/product-foundation-light.dim_600x600.jpg",
    Medium: "/assets/generated/product-foundation-medium.dim_600x600.jpg",
    Deep: "/assets/generated/product-foundation-deep.dim_600x600.jpg",
  },
  "prod-012": {
    Gold: "/assets/generated/product-beauty-gold.dim_600x600.jpg",
    Pink: "/assets/generated/product-beauty-pink.dim_600x600.jpg",
    White: "/assets/generated/product-beauty-white.dim_600x600.jpg",
  },
  "prod-013": {
    Black: "/assets/generated/product-sofa-black.dim_600x600.jpg",
    Tan: "/assets/generated/product-sofa-tan.dim_600x600.jpg",
    Teal: "/assets/generated/product-sofa-teal.dim_600x600.jpg",
  },
  "prod-014": {
    Black: "/assets/generated/product-lamp-black.dim_600x600.jpg",
    Gold: "/assets/generated/product-lamp-gold.dim_600x600.jpg",
    White: "/assets/generated/product-lamp-white.dim_600x600.jpg",
  },
  "prod-015": {
    Default: "/assets/generated/product-fitness.dim_600x600.jpg",
  },
};

/**
 * ALL image paths that must be preserved by the build pruner.
 * Any image referenced only from backend data or used as fallback
 * MUST appear here as a string literal so the pruner sees it in compiled JS.
 */
export const ALL_PRODUCT_IMAGES = [
  // Hero shoe images
  "/assets/generated/hero-shoe-1.dim_600x600.jpg",
  "/assets/generated/hero-shoe-2.dim_600x600.jpg",
  "/assets/generated/hero-shoe-3.dim_600x600.jpg",
  // Hero mini card images
  "/assets/generated/product-watch.dim_600x600.jpg",
  "/assets/generated/product-beauty.dim_600x600.jpg",
  "/assets/generated/product-headphones.dim_600x600.jpg",
  // Testimonial avatars
  "/assets/generated/testimonial-avatar-1.dim_200x200.jpg",
  "/assets/generated/testimonial-avatar-2.dim_200x200.jpg",
  "/assets/generated/testimonial-avatar-3.dim_200x200.jpg",
  // Extra product variants
  "/assets/generated/product-jacket-1.dim_600x600.jpg",
  "/assets/generated/product-jacket-2.dim_600x600.jpg",
  "/assets/generated/product-sneakers-1.dim_600x600.jpg",
  "/assets/generated/product-sneakers-2.dim_600x600.jpg",
  "/assets/generated/product-sofa.dim_600x600.jpg",
  "/assets/generated/product-lamp.dim_600x600.jpg",
  // All category images
  "/assets/generated/category-electronics.dim_600x400.jpg",
  "/assets/generated/category-fashion.dim_600x400.jpg",
  "/assets/generated/category-home.dim_600x400.jpg",
  "/assets/generated/category-sports.dim_600x400.jpg",
  "/assets/generated/category-beauty.dim_600x400.jpg",
  // All product images - EVERY SINGLE ONE must be listed here as a literal string
  "/assets/generated/product-airmax-black.dim_600x600.jpg",
  "/assets/generated/product-airmax-cyan.dim_600x600.jpg",
  "/assets/generated/product-airmax-white.dim_600x600.jpg",
  "/assets/generated/product-beauty-gold.dim_600x600.jpg",
  "/assets/generated/product-beauty-pink.dim_600x600.jpg",
  "/assets/generated/product-beauty-white.dim_600x600.jpg",
  "/assets/generated/product-fitness.dim_600x600.jpg",
  "/assets/generated/product-foundation-deep.dim_600x600.jpg",
  "/assets/generated/product-foundation-light.dim_600x600.jpg",
  "/assets/generated/product-foundation-medium.dim_600x600.jpg",
  "/assets/generated/product-headphones-black.dim_600x600.jpg",
  "/assets/generated/product-headphones-brown.dim_600x600.jpg",
  "/assets/generated/product-headphones-silver.dim_600x600.jpg",
  "/assets/generated/product-jacket-black.dim_600x600.jpg",
  "/assets/generated/product-jacket-brown.dim_600x600.jpg",
  "/assets/generated/product-jacket-navy.dim_600x600.jpg",
  "/assets/generated/product-lamp-black.dim_600x600.jpg",
  "/assets/generated/product-lamp-gold.dim_600x600.jpg",
  "/assets/generated/product-lamp-white.dim_600x600.jpg",
  "/assets/generated/product-laptop.dim_600x600.jpg",
  "/assets/generated/product-monitor-black.dim_600x600.jpg",
  "/assets/generated/product-running-black.dim_600x600.jpg",
  "/assets/generated/product-running-orange.dim_600x600.jpg",
  "/assets/generated/product-running-teal.dim_600x600.jpg",
  "/assets/generated/product-skincare.dim_600x600.jpg",
  "/assets/generated/product-sneaker-black.dim_600x600.jpg",
  "/assets/generated/product-sneaker-brown.dim_600x600.jpg",
  "/assets/generated/product-sneaker-white.dim_600x600.jpg",
  "/assets/generated/product-sofa-black.dim_600x600.jpg",
  "/assets/generated/product-sofa-tan.dim_600x600.jpg",
  "/assets/generated/product-sofa-teal.dim_600x600.jpg",
  "/assets/generated/product-watch-black.dim_600x600.jpg",
  "/assets/generated/product-watch-gold.dim_600x600.jpg",
  "/assets/generated/product-watch-silver.dim_600x600.jpg",
  "/assets/generated/product-yoga-black.dim_600x600.jpg",
  "/assets/generated/product-yoga-red.dim_600x600.jpg",
  "/assets/generated/product-yoga-teal.dim_600x600.jpg",
];

/**
 * Enriches a product from backend with correct images if its images array is empty.
 * This handles the case where old backend data has empty images arrays.
 */
export function enrichProductWithImages(product: Product): Product {
  if (product.images && product.images.length > 0) return product;
  const colorMap = PRODUCT_COLOR_IMAGES[product.id];
  if (colorMap) {
    const imgs = product.colors
      .map((c) => colorMap[c])
      .filter(Boolean) as string[];
    if (imgs.length > 0) return { ...product, images: imgs };
  }
  const fallback =
    PRODUCT_IMAGES[product.id] ??
    CATEGORY_IMAGES[product.category] ??
    "/assets/generated/product-airmax-black.dim_600x600.jpg";
  return { ...product, images: [fallback] };
}

/**
 * Enriches an array of products from backend with correct images.
 */
export function enrichProductsWithImages(products: Product[]): Product[] {
  return products.map(enrichProductWithImages);
}

/**
 * Get all color-variant images for a product as a gallery array.
 * Returns [{color, image}] ordered by the product's colors array.
 */
export function getProductColorGallery(
  product: Product,
): Array<{ color: string; image: string }> {
  const enriched = enrichProductWithImages(product);
  // If product has its own uploaded images, map them to colors
  if (enriched.images && enriched.images.length > 0) {
    return enriched.colors.map((color, idx) => ({
      color,
      image: enriched.images[idx] ?? enriched.images[0],
    }));
  }
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
    // If product has its own images, try to find one for this color index
    if (product.images && product.images.length > 0) {
      const colorIdx = product.colors.indexOf(color);
      if (colorIdx >= 0 && product.images[colorIdx])
        return product.images[colorIdx];
      return product.images[0];
    }
    const colorMap = PRODUCT_COLOR_IMAGES[product.id] ?? {};
    if (colorMap[color]) return colorMap[color];
  }
  return getProductImage(product);
}

export function getProductImage(product: Product): string {
  if (product.images && product.images.length > 0) return product.images[0];
  // Fallback: use hardcoded map by product ID
  return (
    PRODUCT_IMAGES[product.id] ??
    CATEGORY_IMAGES[product.category] ??
    "/assets/generated/product-airmax-black.dim_600x600.jpg"
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
