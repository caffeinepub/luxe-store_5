import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    title: string;
    originalPrice: number;
    description: string;
    sizes: Array<string>;
    stock: bigint;
    category: string;
    rating: number;
    colors: Array<string>;
    price: number;
    reviewCount: bigint;
    isFlashSale: boolean;
    isTrending: boolean;
    images: Array<string>;
}
export interface OrderType {
    id: string;
    status: Variant_shipped_pending_delivered_processing;
    total: number;
    userId: Principal;
    shippingAddress: string;
    items: Array<CartItem>;
}
export interface CartItem {
    color?: string;
    size?: string;
    productId: string;
    quantity: bigint;
}
export interface UserProfile {
    displayName: string;
    email: string;
}
export interface Review {
    userId: Principal;
    productId: string;
    comment: string;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_shipped_pending_delivered_processing {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export interface backendInterface {
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    addReview(productId: string, rating: bigint, comment: string): Promise<void>;
    addToCart(item: CartItem): Promise<void>;
    addToWishlist(productId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCoupon(code: string, discountPercent: bigint): Promise<void>;
    createOrUpdateProduct(product: Product): Promise<void>;
    createOrder(orderId: string, shippingAddress: string): Promise<void>;
    filterProductsByCategory(category: string): Promise<Array<Product>>;
    filterProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Array<Product>>;
    getAllOrders(): Promise<Array<OrderType>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllReviews(): Promise<Array<Review>>;
    getCallerCart(): Promise<Array<CartItem> | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCallerWishlist(): Promise<Array<string> | null>;
    getCart(user: Principal): Promise<Array<CartItem> | null>;
    getOrder(id: string): Promise<OrderType | null>;
    getProduct(id: string): Promise<Product>;
    getProductReviews(productId: string): Promise<Array<Review>>;
    getUserOrders(user: Principal): Promise<Array<OrderType>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(user: Principal): Promise<Array<string> | null>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: string): Promise<void>;
    removeFromWishlist(productId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCartItem(productId: string, quantity: bigint): Promise<void>;
    updateOrderStatus(orderId: string, status: Variant_shipped_pending_delivered_processing): Promise<void>;
    validateCoupon(code: string): Promise<bigint | null>;
}
