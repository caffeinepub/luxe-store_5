import { c as createLucideIcon } from "./index-DDabS7r8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const CATEGORY_IMAGES = {
  Electronics: "/assets/generated/category-electronics.dim_600x400.jpg",
  Fashion: "/assets/generated/category-fashion.dim_600x400.jpg",
  Home: "/assets/generated/category-home.dim_600x400.jpg",
  Sports: "/assets/generated/category-sports.dim_600x400.jpg",
  Beauty: "/assets/generated/category-beauty.dim_600x400.jpg"
};
const PRODUCT_IMAGES = {
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
  "12": "/assets/generated/product-foundation-light.dim_600x600.jpg"
};
const PRODUCT_COLOR_IMAGES = {
  "1": {
    "#000000": "/assets/generated/product-airmax-black.dim_600x600.jpg",
    "#FFFFFF": "/assets/generated/product-airmax-white.dim_600x600.jpg",
    "#2FD4FF": "/assets/generated/product-airmax-cyan.dim_600x600.jpg"
  },
  "2": {
    "#1a1a1a": "/assets/generated/product-headphones-black.dim_600x600.jpg",
    "#C0C0C0": "/assets/generated/product-headphones-silver.dim_600x600.jpg",
    "#8B4513": "/assets/generated/product-headphones-brown.dim_600x600.jpg"
  },
  "3": {
    "#1a1a1a": "/assets/generated/product-jacket-black.dim_600x600.jpg",
    "#2d4a6e": "/assets/generated/product-jacket-navy.dim_600x600.jpg",
    "#8B4513": "/assets/generated/product-jacket-brown.dim_600x600.jpg"
  },
  "4": {
    "#1a1a1a": "/assets/generated/product-watch-black.dim_600x600.jpg",
    "#C0C0C0": "/assets/generated/product-watch-silver.dim_600x600.jpg",
    "#FFD700": "/assets/generated/product-watch-gold.dim_600x600.jpg"
  },
  "5": {
    "#8B7355": "/assets/generated/product-sofa-tan.dim_600x600.jpg",
    "#2F4F4F": "/assets/generated/product-sofa-teal.dim_600x600.jpg",
    "#1a1a1a": "/assets/generated/product-sofa-black.dim_600x600.jpg"
  },
  "6": {
    "#FFD700": "/assets/generated/product-beauty-gold.dim_600x600.jpg",
    "#FFC0CB": "/assets/generated/product-beauty-pink.dim_600x600.jpg",
    "#FFFFFF": "/assets/generated/product-beauty-white.dim_600x600.jpg"
  },
  "7": {
    "#FF4500": "/assets/generated/product-running-orange.dim_600x600.jpg",
    "#1a1a1a": "/assets/generated/product-running-black.dim_600x600.jpg",
    "#00CED1": "/assets/generated/product-running-teal.dim_600x600.jpg"
  },
  "8": {
    "#FFD700": "/assets/generated/product-lamp-gold.dim_600x600.jpg",
    "#1a1a1a": "/assets/generated/product-lamp-black.dim_600x600.jpg",
    "#FFFFFF": "/assets/generated/product-lamp-white.dim_600x600.jpg"
  },
  "9": {
    "#FFFFFF": "/assets/generated/product-sneaker-white.dim_600x600.jpg",
    "#000000": "/assets/generated/product-sneaker-black.dim_600x600.jpg",
    "#8B4513": "/assets/generated/product-sneaker-brown.dim_600x600.jpg"
  },
  "10": {
    "#1a1a1a": "/assets/generated/product-monitor-black.dim_600x600.jpg"
  },
  "11": {
    "#000000": "/assets/generated/product-yoga-black.dim_600x600.jpg",
    "#8B0000": "/assets/generated/product-yoga-red.dim_600x600.jpg",
    "#2F4F4F": "/assets/generated/product-yoga-teal.dim_600x600.jpg"
  },
  "12": {
    "#F5CBA7": "/assets/generated/product-foundation-light.dim_600x600.jpg",
    "#DC9F79": "/assets/generated/product-foundation-medium.dim_600x600.jpg",
    "#A0522D": "/assets/generated/product-foundation-deep.dim_600x600.jpg"
  }
};
function getProductColorGallery(product) {
  const colorMap = PRODUCT_COLOR_IMAGES[product.id] ?? {};
  return product.colors.map((color) => ({
    color,
    image: colorMap[color] ?? PRODUCT_IMAGES[product.id] ?? CATEGORY_IMAGES[product.category] ?? CATEGORY_IMAGES.Electronics
  }));
}
function getProductImageForColor(product, color) {
  if (color) {
    const colorMap = PRODUCT_COLOR_IMAGES[product.id] ?? {};
    if (colorMap[color]) return colorMap[color];
  }
  return getProductImage(product);
}
function getProductImage(product) {
  return PRODUCT_IMAGES[product.id] ?? CATEGORY_IMAGES[product.category] ?? CATEGORY_IMAGES.Electronics;
}
const CATEGORY_LIST = [
  {
    name: "Electronics",
    icon: "💻",
    image: "/assets/generated/category-electronics.dim_600x400.jpg"
  },
  {
    name: "Fashion",
    icon: "👟",
    image: "/assets/generated/category-fashion.dim_600x400.jpg"
  },
  {
    name: "Home",
    icon: "🏠",
    image: "/assets/generated/category-home.dim_600x400.jpg"
  },
  {
    name: "Sports",
    icon: "⚡",
    image: "/assets/generated/category-sports.dim_600x400.jpg"
  },
  {
    name: "Beauty",
    icon: "✨",
    image: "/assets/generated/category-beauty.dim_600x400.jpg"
  }
];
export {
  CATEGORY_LIST as C,
  Star as S,
  getProductColorGallery as a,
  getProductImageForColor as b,
  getProductImage as g
};
