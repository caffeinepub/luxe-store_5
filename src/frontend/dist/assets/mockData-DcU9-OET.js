import { c as createLucideIcon } from "./index-CRxZQlXD.js";
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
const mockProducts = [
  {
    id: "1",
    title: "AirMax Pro Elite",
    originalPrice: 249.99,
    price: 179.99,
    description: "Next-generation athletic footwear engineered for peak performance. Features responsive cushioning technology, breathable mesh upper, and carbon fiber reinforced sole for maximum energy return.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 50n,
    category: "Sports",
    rating: 4.9,
    colors: ["#000000", "#FFFFFF", "#2FD4FF"],
    reviewCount: 342n,
    isFlashSale: true,
    isTrending: true,
    images: []
  },
  {
    id: "2",
    title: "Wireless Pro Headphones X7",
    originalPrice: 399.99,
    price: 299.99,
    description: "Studio-grade wireless headphones with 40-hour battery life, active noise cancellation, and Hi-Res Audio certification. Premium leather earcups for all-day comfort.",
    sizes: ["One Size"],
    stock: 30n,
    category: "Electronics",
    rating: 4.8,
    colors: ["#1a1a1a", "#C0C0C0", "#8B4513"],
    reviewCount: 289n,
    isFlashSale: true,
    isTrending: true,
    images: []
  },
  {
    id: "3",
    title: "Urban Street Jacket",
    originalPrice: 189.99,
    price: 149.99,
    description: "Premium waterproof street jacket with tech fabric blend. Features concealed hood, magnetic closures, and reflective piping for night visibility.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 45n,
    category: "Fashion",
    rating: 4.7,
    colors: ["#1a1a1a", "#2d4a6e", "#8B4513"],
    reviewCount: 156n,
    isFlashSale: false,
    isTrending: true,
    images: []
  },
  {
    id: "4",
    title: "Smart Watch Ultra Series 5",
    originalPrice: 549.99,
    price: 449.99,
    description: "The most advanced smartwatch ever. Always-on AMOLED display, health monitoring suite, GPS, and titanium case. Tracks 100+ workout types.",
    sizes: ["40mm", "44mm", "49mm"],
    stock: 20n,
    category: "Electronics",
    rating: 4.9,
    colors: ["#1a1a1a", "#C0C0C0", "#FFD700"],
    reviewCount: 521n,
    isFlashSale: false,
    isTrending: true,
    images: []
  },
  {
    id: "5",
    title: "Luxury Sofa Collection - Oslo",
    originalPrice: 2499.99,
    price: 1899.99,
    description: "Scandinavian-inspired modular sofa with premium full-grain leather upholstery. Deep seat cushions with memory foam, solid oak legs, and whisper-quiet reclining mechanism.",
    sizes: ["2-Seater", "3-Seater", "L-Shape"],
    stock: 8n,
    category: "Home",
    rating: 4.8,
    colors: ["#8B7355", "#2F4F4F", "#1a1a1a"],
    reviewCount: 89n,
    isFlashSale: false,
    isTrending: false,
    images: []
  },
  {
    id: "6",
    title: "Glow Serum Radiance Kit",
    originalPrice: 129.99,
    price: 89.99,
    description: "Celebrity-endorsed skincare collection with vitamin C brightening serum, hyaluronic acid moisturizer, and retinol night cream. Clinically tested for all skin types.",
    sizes: ["30ml", "50ml", "Kit"],
    stock: 100n,
    category: "Beauty",
    rating: 4.6,
    colors: ["#FFD700", "#FFC0CB", "#FFFFFF"],
    reviewCount: 423n,
    isFlashSale: true,
    isTrending: true,
    images: []
  },
  {
    id: "7",
    title: "Carbon Pro Running Shoes",
    originalPrice: 219.99,
    price: 169.99,
    description: "Professional marathon shoes with carbon fiber plate technology. Delivers 40% more energy return with each stride. Used by elite runners worldwide.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 60n,
    category: "Sports",
    rating: 4.8,
    colors: ["#FF4500", "#1a1a1a", "#00CED1"],
    reviewCount: 267n,
    isFlashSale: true,
    isTrending: false,
    images: []
  },
  {
    id: "8",
    title: "Architect Table Lamp - Noir",
    originalPrice: 189.99,
    price: 159.99,
    description: "Minimalist architectural desk lamp with adjustable articulating arm, dimmer control, and warm/cool light modes. Premium brushed brass finish.",
    sizes: ["Standard"],
    stock: 35n,
    category: "Home",
    rating: 4.7,
    colors: ["#FFD700", "#1a1a1a", "#FFFFFF"],
    reviewCount: 112n,
    isFlashSale: false,
    isTrending: true,
    images: []
  },
  {
    id: "9",
    title: "Premium Leather Sneaker",
    originalPrice: 299.99,
    price: 249.99,
    description: "Handcrafted Italian leather sneaker with vintage-inspired silhouette. Full-grain leather upper, cushioned insole, and vulcanized rubber outsole.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 25n,
    category: "Fashion",
    rating: 4.9,
    colors: ["#FFFFFF", "#000000", "#8B4513"],
    reviewCount: 198n,
    isFlashSale: false,
    isTrending: true,
    images: []
  },
  {
    id: "10",
    title: '4K OLED Monitor 32"',
    originalPrice: 1299.99,
    price: 999.99,
    description: "Professional 32-inch OLED display with 4K resolution, 120Hz refresh rate, and 99% DCI-P3 color coverage. Perfect for creative professionals and gamers.",
    sizes: ['27"', '32"'],
    stock: 15n,
    category: "Electronics",
    rating: 4.9,
    colors: ["#1a1a1a"],
    reviewCount: 387n,
    isFlashSale: true,
    isTrending: false,
    images: []
  },
  {
    id: "11",
    title: "Yoga Performance Set",
    originalPrice: 119.99,
    price: 89.99,
    description: "High-performance yoga set with moisture-wicking leggings and sports bra. Four-way stretch fabric maintains shape through any pose. Pockets included.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 80n,
    category: "Sports",
    rating: 4.6,
    colors: ["#000000", "#8B0000", "#2F4F4F"],
    reviewCount: 315n,
    isFlashSale: false,
    isTrending: true,
    images: []
  },
  {
    id: "12",
    title: "Hydra Luminous Foundation",
    originalPrice: 79.99,
    price: 59.99,
    description: "Long-wear luminous foundation with SPF 30 and hydrating hyaluronic acid complex. 40 inclusive shades, 24-hour wear without touch-ups.",
    sizes: ["N10", "N20", "N30", "N40"],
    stock: 120n,
    category: "Beauty",
    rating: 4.5,
    colors: ["#F5CBA7", "#DC9F79", "#A0522D"],
    reviewCount: 634n,
    isFlashSale: false,
    isTrending: false,
    images: []
  }
];
const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Fashion Designer",
    avatar: "SM",
    rating: 5,
    quote: "LUXE has completely transformed my shopping experience. The quality of every product I've ordered has exceeded my expectations. Fast delivery, premium packaging."
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Fitness Coach",
    avatar: "JR",
    rating: 5,
    quote: "The AirMax Pro Elite sneakers are absolutely incredible. I wear them for every training session and they still look and feel brand new after 6 months of intense use."
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Tech Entrepreneur",
    avatar: "PS",
    rating: 5,
    quote: "Finally, a store that understands premium quality. The Smart Watch Ultra has become my most used device. Customer service is outstanding as well."
  }
];
export {
  CATEGORY_LIST as C,
  Star as S,
  getProductColorGallery as a,
  getProductImageForColor as b,
  getProductImage as g,
  mockProducts as m,
  testimonials as t
};
