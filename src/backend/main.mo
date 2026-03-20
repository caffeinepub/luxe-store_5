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

  // ======================= AUTHORIZATION SYSTEM =======================
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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
  public shared ({ caller }) func createOrUpdateProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create or update products");
    };
    products.add(product.id, product);
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
      total = 0; // For simplicity, total is 0
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
