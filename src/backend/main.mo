import Float "mo:core/Float";
import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Set "mo:core/Set";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // ======================= TYPES & COMPARISON LOGIC =======================
  type Product = {
    id : Text;
    title : Text;
    description : Text;
    price : Float;
    originalPrice : Float;
    category : Text;
    rating : Float;
    reviewCount : Nat;
    sizes : [Text];
    colors : [Text];
    images : [Text];
    isTrending : Bool;
    isFlashSale : Bool;
    stock : Nat;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.id, p2.id);
    };

    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      switch (Float.compare(p1.price, p2.price)) {
        case (#equal) { Text.compare(p1.id, p2.id) };
        case (order) { order };
      };
    };
  };

  type CartItem = {
    productId : Text;
    quantity : Nat;
    size : ?Text;
    color : ?Text;
  };

  module CartItem {
    public func compare(c1 : CartItem, c2 : CartItem) : Order.Order {
      switch (Text.compare(c1.productId, c2.productId)) {
        case (#equal) { Nat.compare(c1.quantity, c2.quantity) };
        case (order) { order };
      };
    };
  };

  type OrderType = {
    id : Text;
    userId : Principal;
    items : [CartItem];
    total : Float;
    shippingAddress : Text;
    status : { #pending; #processing; #shipped; #delivered };
  };

  module OrderType {
    public func compare(o1 : OrderType, o2 : OrderType) : Order.Order {
      Text.compare(o1.id, o2.id);
    };
  };

  type Review = {
    productId : Text;
    userId : Principal;
    rating : Nat;
    comment : Text;
  };

  module Review {
    public func compare(r1 : Review, r2 : Review) : Order.Order {
      Text.compare(r1.productId, r2.productId);
    };

    public func compareByRating(r1 : Review, r2 : Review) : Order.Order {
      switch (Nat.compare(r1.rating, r2.rating)) {
        case (#equal) { Text.compare(r1.productId, r2.productId) };
        case (order) { order };
      };
    };
  };

  public type UserProfile = {
    displayName : Text;
    email : Text;
  };

  let products = Map.empty<Text, Product>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let orders = Map.empty<Text, OrderType>();
  let wishlists = Map.empty<Principal, Set.Set<Text>>();
  let reviews = Map.empty<Text, List.List<Review>>();
  let coupons = Map.empty<Text, Nat>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // ======================= SEED PRODUCTS =======================
  let seedProducts : [Product] = [
    {
      id = "prod-001";
      title = "LUXE Air Max Pro";
      description = "Premium cyberpunk-inspired running shoes with advanced cushioning technology and neon accents. Perfect for athletes who demand both style and performance.";
      price = 189.99;
      originalPrice = 249.99;
      category = "Footwear";
      rating = 4.8;
      reviewCount = 342;
      sizes = ["6", "7", "8", "9", "10", "11", "12"];
      colors = ["Black", "Cyan", "White"];
      images = [
        "/assets/generated/product-airmax-black.dim_600x600.jpg",
        "/assets/generated/product-airmax-cyan.dim_600x600.jpg",
        "/assets/generated/product-airmax-white.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = true;
      stock = 45;
    },
    {
      id = "prod-002";
      title = "Phantom Running Elite";
      description = "High-performance running shoes engineered for speed and endurance. Lightweight construction with reactive foam sole technology.";
      price = 159.99;
      originalPrice = 199.99;
      category = "Footwear";
      rating = 4.7;
      reviewCount = 218;
      sizes = ["6", "7", "8", "9", "10", "11"];
      colors = ["Black", "Orange", "Teal"];
      images = [
        "/assets/generated/product-running-black.dim_600x600.jpg",
        "/assets/generated/product-running-orange.dim_600x600.jpg",
        "/assets/generated/product-running-teal.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = false;
      stock = 32;
    },
    {
      id = "prod-003";
      title = "LUXE Urban Sneaker";
      description = "Street-ready sneakers blending retro aesthetics with modern comfort. Features premium leather upper and memory foam insole.";
      price = 129.99;
      originalPrice = 169.99;
      category = "Footwear";
      rating = 4.6;
      reviewCount = 567;
      sizes = ["5", "6", "7", "8", "9", "10", "11", "12"];
      colors = ["Black", "White", "Brown"];
      images = [
        "/assets/generated/product-sneaker-black.dim_600x600.jpg",
        "/assets/generated/product-sneaker-white.dim_600x600.jpg",
        "/assets/generated/product-sneaker-brown.dim_600x600.jpg"
      ];
      isTrending = false;
      isFlashSale = true;
      stock = 78;
    },
    {
      id = "prod-004";
      title = "NeoChron Smartwatch";
      description = "Next-generation smartwatch with holographic display, health monitoring, and 7-day battery life. Your cyberpunk wrist companion.";
      price = 449.99;
      originalPrice = 599.99;
      category = "Electronics";
      rating = 4.9;
      reviewCount = 189;
      sizes = ["One Size"];
      colors = ["Black", "Gold", "Silver"];
      images = [
        "/assets/generated/product-watch-black.dim_600x600.jpg",
        "/assets/generated/product-watch-gold.dim_600x600.jpg",
        "/assets/generated/product-watch-silver.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = true;
      stock = 23;
    },
    {
      id = "prod-005";
      title = "SoundSphere Pro Headphones";
      description = "Audiophile-grade wireless headphones with active noise cancellation and 40-hour playtime. Crystal-clear sound meets futuristic design.";
      price = 299.99;
      originalPrice = 399.99;
      category = "Electronics";
      rating = 4.8;
      reviewCount = 412;
      sizes = ["One Size"];
      colors = ["Black", "Silver", "Brown"];
      images = [
        "/assets/generated/product-headphones-black.dim_600x600.jpg",
        "/assets/generated/product-headphones-silver.dim_600x600.jpg",
        "/assets/generated/product-headphones-brown.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = false;
      stock = 56;
    },
    {
      id = "prod-006";
      title = "CyberLux Laptop";
      description = "Ultra-thin performance laptop with OLED display, 32GB RAM, and all-day battery. Designed for creatives and professionals.";
      price = 1299.99;
      originalPrice = 1599.99;
      category = "Electronics";
      rating = 4.7;
      reviewCount = 98;
      sizes = ["One Size"];
      colors = ["Black"];
      images = [
        "/assets/generated/product-laptop.dim_600x600.jpg"
      ];
      isTrending = false;
      isFlashSale = true;
      stock = 12;
    },
    {
      id = "prod-007";
      title = "UltraView Monitor 4K";
      description = "32-inch 4K gaming monitor with 144Hz refresh rate, HDR support, and RGB edge lighting. Immerse yourself in every frame.";
      price = 549.99;
      originalPrice = 699.99;
      category = "Electronics";
      rating = 4.6;
      reviewCount = 145;
      sizes = ["32 inch"];
      colors = ["Black"];
      images = [
        "/assets/generated/product-monitor-black.dim_600x600.jpg"
      ];
      isTrending = false;
      isFlashSale = false;
      stock = 18;
    },
    {
      id = "prod-008";
      title = "NeoWave Jacket";
      description = "Premium cyberpunk-inspired jacket with reflective panels and smart pocket design. Water-resistant shell for urban adventurers.";
      price = 219.99;
      originalPrice = 289.99;
      category = "Clothing";
      rating = 4.7;
      reviewCount = 234;
      sizes = ["XS", "S", "M", "L", "XL", "XXL"];
      colors = ["Black", "Navy", "Brown"];
      images = [
        "/assets/generated/product-jacket-black.dim_600x600.jpg",
        "/assets/generated/product-jacket-navy.dim_600x600.jpg",
        "/assets/generated/product-jacket-brown.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = false;
      stock = 67;
    },
    {
      id = "prod-009";
      title = "FlexCore Yoga Set";
      description = "High-performance yoga and fitness wear made from sustainable fabric. 4-way stretch with moisture-wicking technology.";
      price = 89.99;
      originalPrice = 119.99;
      category = "Clothing";
      rating = 4.5;
      reviewCount = 389;
      sizes = ["XS", "S", "M", "L", "XL"];
      colors = ["Black", "Red", "Teal"];
      images = [
        "/assets/generated/product-yoga-black.dim_600x600.jpg",
        "/assets/generated/product-yoga-red.dim_600x600.jpg",
        "/assets/generated/product-yoga-teal.dim_600x600.jpg"
      ];
      isTrending = false;
      isFlashSale = true;
      stock = 112;
    },
    {
      id = "prod-010";
      title = "LuminaGlow Skincare Set";
      description = "Advanced skincare collection with neuropeptide technology and vitamin C complex. Clinically proven to reduce signs of aging in 4 weeks.";
      price = 149.99;
      originalPrice = 199.99;
      category = "Beauty";
      rating = 4.8;
      reviewCount = 621;
      sizes = ["One Size"];
      colors = ["Default"];
      images = [
        "/assets/generated/product-skincare.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = true;
      stock = 89;
    },
    {
      id = "prod-011";
      title = "GlowLux Foundation";
      description = "Full-coverage foundation with SPF 30 and 24-hour wear technology. Available in 30 inclusive shades for all skin tones.";
      price = 49.99;
      originalPrice = 64.99;
      category = "Beauty";
      rating = 4.6;
      reviewCount = 843;
      sizes = ["One Size"];
      colors = ["Light", "Medium", "Deep"];
      images = [
        "/assets/generated/product-foundation-light.dim_600x600.jpg",
        "/assets/generated/product-foundation-medium.dim_600x600.jpg",
        "/assets/generated/product-foundation-deep.dim_600x600.jpg"
      ];
      isTrending = false;
      isFlashSale = false;
      stock = 203;
    },
    {
      id = "prod-012";
      title = "NeoLux Beauty Kit";
      description = "Complete beauty kit with highlighter, contour, and blush palette. Professional-grade pigments for long-lasting looks.";
      price = 79.99;
      originalPrice = 109.99;
      category = "Beauty";
      rating = 4.7;
      reviewCount = 478;
      sizes = ["One Size"];
      colors = ["Gold", "Pink", "White"];
      images = [
        "/assets/generated/product-beauty-gold.dim_600x600.jpg",
        "/assets/generated/product-beauty-pink.dim_600x600.jpg",
        "/assets/generated/product-beauty-white.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = false;
      stock = 134;
    },
    {
      id = "prod-013";
      title = "Apex Sofa Collection";
      description = "Luxurious modular sofa with premium Italian leather and built-in USB charging ports. The centerpiece your living room deserves.";
      price = 1899.99;
      originalPrice = 2499.99;
      category = "Home";
      rating = 4.9;
      reviewCount = 67;
      sizes = ["2-Seater", "3-Seater", "L-Shape"];
      colors = ["Black", "Tan", "Teal"];
      images = [
        "/assets/generated/product-sofa-black.dim_600x600.jpg",
        "/assets/generated/product-sofa-tan.dim_600x600.jpg",
        "/assets/generated/product-sofa-teal.dim_600x600.jpg"
      ];
      isTrending = false;
      isFlashSale = true;
      stock = 8;
    },
    {
      id = "prod-014";
      title = "ArcLight Designer Lamp";
      description = "Sculptural floor lamp with adjustable color temperature and smart home integration. Illuminate your space with artistic flair.";
      price = 279.99;
      originalPrice = 349.99;
      category = "Home";
      rating = 4.6;
      reviewCount = 156;
      sizes = ["One Size"];
      colors = ["Black", "Gold", "White"];
      images = [
        "/assets/generated/product-lamp-black.dim_600x600.jpg",
        "/assets/generated/product-lamp-gold.dim_600x600.jpg",
        "/assets/generated/product-lamp-white.dim_600x600.jpg"
      ];
      isTrending = false;
      isFlashSale = false;
      stock = 41;
    },
    {
      id = "prod-015";
      title = "PowerCore Fitness Gear";
      description = "Complete home fitness kit including resistance bands, foam roller, and training guide. Build your ideal physique anywhere.";
      price = 119.99;
      originalPrice = 159.99;
      category = "Sports";
      rating = 4.5;
      reviewCount = 312;
      sizes = ["One Size"];
      colors = ["Default"];
      images = [
        "/assets/generated/product-fitness.dim_600x600.jpg"
      ];
      isTrending = true;
      isFlashSale = true;
      stock = 94;
    }
  ];

  // Seed products into the map on canister init
  for (p in seedProducts.vals()) {
    products.add(p.id, p);
  };

  // Seed coupon
  coupons.add("LUXE20", 20);

  // ======================= AUTHORIZATION SYSTEM =======================
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ======================= RESEED FUNCTION (fixes old data with missing images) =======================
  // Call this to force-refresh all seeded products with correct image paths
  public shared func reseedProducts() : async () {
    for (p in seedProducts.vals()) {
      products.add(p.id, p);
    };
    coupons.add("LUXE20", 20);
  };

  // ======================= USER PROFILE FUNCTIONS =======================
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ======================= PRODUCT CATALOG FUNCTIONS =======================
  public shared func createOrUpdateProduct(product : Product) : async () {
    products.add(product.id, product);
  };

  public shared func deleteProduct(id : Text) : async () {
    products.remove(id);
  };

  public query func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query func filterProductsByCategory(category : Text) : async [Product] {
    let filtered = products.values().toArray().filter(
      func(p) { p.category == category }
    );
    filtered.sort(Product.compareByPrice);
  };

  public query func filterProductsByPriceRange(minPrice : Float, maxPrice : Float) : async [Product] {
    let filtered = products.values().toArray().filter(
      func(p) { p.price >= minPrice and p.price <= maxPrice }
    );
    filtered.sort(Product.compareByPrice);
  };

  // ======================= CART FUNCTIONS =======================
  public shared ({ caller }) func addToCart(item : CartItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to cart");
    };

    let currentCart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    currentCart.add(item);
    carts.add(caller, currentCart);
  };

  public shared ({ caller }) func updateCartItem(productId : Text, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update cart items");
    };

    let currentCart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) { cart };
    };

    let newCart = currentCart.map<CartItem, CartItem>(
      func(item) {
        if (item.productId == productId) {
          { item with quantity };
        } else {
          item;
        };
      }
    );

    carts.add(caller, newCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from cart");
    };

    let currentCart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) { cart };
    };

    let newCart = currentCart.filter(
      func(item) { item.productId != productId }
    );

    carts.add(caller, newCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };
    carts.remove(caller);
  };

  public query ({ caller }) func getCallerCart() : async ?[CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access cart");
    };
    switch (carts.get(caller)) {
      case (null) { null };
      case (?list) { ?list.toArray() };
    };
  };

  public query ({ caller }) func getCart(user : Principal) : async ?[CartItem] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own cart");
    };
    switch (carts.get(user)) {
      case (null) { null };
      case (?list) { ?list.toArray() };
    };
  };

  // ======================= ORDER FUNCTIONS =======================
  public shared ({ caller }) func createOrder(orderId : Text, shippingAddress : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("No items in cart") };
      case (?cart) { cart };
    };

    let cartItems = cart.toArray();
    let order : OrderType = {
      id = orderId;
      userId = caller;
      items = cartItems;
      total = 0;
      shippingAddress;
      status = #pending;
    };

    orders.add(orderId, order);
    carts.remove(caller);
  };

  public query ({ caller }) func getOrder(id : Text) : async ?OrderType {
    let order = switch (orders.get(id)) {
      case (null) { return null };
      case (?o) { o };
    };

    if (caller != order.userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own orders");
    };

    ?order;
  };

  public query ({ caller }) func getUserOrders(user : Principal) : async [OrderType] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own orders");
    };
    orders.values().toArray().filter(func(order) { order.userId == user });
  };

  public query ({ caller }) func getAllOrders() : async [OrderType] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can get all orders");
    };
    orders.values().toArray().sort();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Text, status : { #pending; #processing; #shipped; #delivered }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update order status");
    };
    let order = switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
    let updatedOrder = { order with status };
    orders.add(orderId, updatedOrder);
  };

  // ======================= WISHLIST FUNCTIONS =======================
  public shared ({ caller }) func addToWishlist(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to wishlist");
    };

    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { Set.empty<Text>() };
      case (?existingWishlist) { existingWishlist };
    };

    currentWishlist.add(productId);
    wishlists.add(caller, currentWishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from wishlist");
    };

    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { Runtime.trap("Wishlist not found") };
      case (?existingWishlist) { existingWishlist };
    };

    currentWishlist.remove(productId);
    wishlists.add(caller, currentWishlist);
  };

  public query ({ caller }) func getCallerWishlist() : async ?[Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access wishlist");
    };
    switch (wishlists.get(caller)) {
      case (null) { null };
      case (?set) { ?set.toArray() };
    };
  };

  public query ({ caller }) func getWishlist(user : Principal) : async ?[Text] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wishlist");
    };
    switch (wishlists.get(user)) {
      case (null) { null };
      case (?set) { ?set.toArray() };
    };
  };

  // ======================= REVIEW FUNCTIONS =======================
  public shared ({ caller }) func addReview(productId : Text, rating : Nat, comment : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };

    if (rating < 1 or rating > 5) { Runtime.trap("Invalid rating") };

    let review : Review = {
      productId;
      userId = caller;
      rating;
      comment;
    };

    let currentReviews = switch (reviews.get(productId)) {
      case (null) { List.empty<Review>() };
      case (?existingReviews) { existingReviews };
    };

    currentReviews.add(review);
    reviews.add(productId, currentReviews);
  };

  public query func getProductReviews(productId : Text) : async [Review] {
    switch (reviews.get(productId)) {
      case (null) { [] };
      case (?list) { list.toArray().sort(Review.compareByRating) };
    };
  };

  public query func getAllReviews() : async [Review] {
    let allReviews = List.empty<Review>();
    for (r in reviews.values()) {
      let reviewsArray = r.toArray();
      for (review in reviewsArray.values()) {
        allReviews.add(review);
      };
    };
    allReviews.toArray();
  };

  // ======================= COUPON FUNCTIONS =======================
  public shared ({ caller }) func createCoupon(code : Text, discountPercent : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create coupons");
    };
    coupons.add(code, discountPercent);
  };

  public query func validateCoupon(code : Text) : async ?Nat {
    coupons.get(code);
  };
};
