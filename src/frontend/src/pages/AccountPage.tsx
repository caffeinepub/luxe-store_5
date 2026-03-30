import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { Heart, Loader2, LogIn, LogOut, Package, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Variant_shipped_pending_delivered_processing } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useSaveUserProfile,
  useUserOrders,
  useUserProfile,
} from "../hooks/useQueries";

function StatusBadge({
  status,
}: { status: Variant_shipped_pending_delivered_processing }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  };
  const label = String(status);
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors[label] ?? "bg-muted text-muted-foreground"}`}
    >
      {label}
    </span>
  );
}

export default function AccountPage() {
  const { login, clear, loginStatus, identity, isLoggingIn } =
    useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal();
  const principalStr = principal?.toString();

  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const saveProfile = useSaveUserProfile();
  const { data: orders = [], isLoading: ordersLoading } =
    useUserOrders(principal);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  // Pre-fill from backend profile
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? "");
      setEmail(profile.email ?? "");
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      await saveProfile.mutateAsync({ displayName, email });
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
          data-ocid="account.panel"
        >
          <div className="glass-card rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-luxe-cyan/20 flex items-center justify-center mx-auto mb-4">
                <User size={28} className="text-luxe-cyan" />
              </div>
              <h1 className="font-display text-3xl font-black text-foreground">
                Welcome to LUXE
              </h1>
              <p className="text-muted-foreground mt-1">
                Sign in or create an account to continue
              </p>
            </div>

            <Tabs defaultValue="login">
              <TabsList className="w-full glass-card border border-border/50 mb-6">
                <TabsTrigger
                  value="login"
                  className="flex-1"
                  data-ocid="account.tab"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="flex-1"
                  data-ocid="account.tab"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <div className="space-y-4">
                  <div className="rounded-xl bg-luxe-cyan/5 border border-luxe-cyan/20 p-4">
                    <p className="text-sm text-foreground/80 text-center font-medium">
                      Sign in with your existing Internet Identity
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Secure, passwordless authentication — no email required
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={login}
                    disabled={isLoggingIn}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    data-ocid="account.primary_button"
                  >
                    {isLoggingIn ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <LogIn size={18} />
                    )}
                    {isLoggingIn
                      ? "Signing in..."
                      : "Sign In with Internet Identity"}
                  </motion.button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="space-y-4">
                  <div className="rounded-xl bg-luxe-magenta/5 border border-luxe-magenta/20 p-4">
                    <p className="text-sm text-foreground/80 text-center font-medium">
                      Create a new Internet Identity — this acts as your account
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Your identity is cryptographically secured and fully
                      private
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={login}
                    disabled={isLoggingIn}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    data-ocid="account.primary_button"
                  >
                    {isLoggingIn ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <User size={18} />
                    )}
                    {isLoggingIn ? "Creating..." : "Create New Account"}
                  </motion.button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 pb-16" data-ocid="account.page">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-black uppercase text-foreground">
            My Account
          </h1>
          <p className="text-muted-foreground mt-1 font-mono text-xs">
            {principalStr}
          </p>
        </motion.div>

        <Tabs defaultValue="profile">
          <TabsList className="glass-card border border-border/50 p-1 rounded-xl h-auto flex-wrap gap-1 mb-8">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 rounded-lg"
              data-ocid="account.tab"
            >
              <User size={14} /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 rounded-lg"
              data-ocid="account.tab"
            >
              <Package size={14} /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="flex items-center gap-2 rounded-lg"
              data-ocid="account.tab"
            >
              <Heart size={14} /> Wishlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div
              className="glass-card rounded-2xl p-6 max-w-lg space-y-4"
              data-ocid="account.panel"
            >
              <h2 className="font-display text-xl font-bold text-foreground">
                Profile Settings
              </h2>
              {profileLoading ? (
                <div className="space-y-3" data-ocid="account.loading_state">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="acc-dname"
                      className="block text-sm font-semibold text-foreground mb-1.5"
                    >
                      Display Name
                    </label>
                    <Input
                      id="acc-dname"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      className="bg-white/5 border-border/50"
                      data-ocid="account.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="acc-email"
                      className="block text-sm font-semibold text-foreground mb-1.5"
                    >
                      Email
                    </label>
                    <Input
                      id="acc-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white/5 border-border/50"
                      data-ocid="account.input"
                    />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saveProfile.isPending}
                    className="btn-primary"
                    data-ocid="account.save_button"
                  >
                    {saveProfile.isPending ? (
                      <>
                        <Loader2 size={14} className="animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            {ordersLoading ? (
              <div className="space-y-3" data-ocid="account.loading_state">
                {[1, 2, 3].map((n) => (
                  <Skeleton key={n} className="h-20 w-full rounded-2xl" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div
                className="text-center py-16 glass-card rounded-2xl"
                data-ocid="account.empty_state"
              >
                <Package
                  size={48}
                  className="text-muted-foreground/30 mx-auto mb-4"
                />
                <p className="text-muted-foreground">No orders yet</p>
                <Link to="/products">
                  <Button
                    className="mt-4 btn-primary"
                    data-ocid="account.primary_button"
                  >
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order, i) => (
                  <div
                    key={order.id}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4"
                    data-ocid={`account.item.${i + 1}`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs text-muted-foreground">
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className="text-sm text-foreground font-semibold">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <StatusBadge status={order.status} />
                    <span className="font-bold text-luxe-cyan">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="wishlist">
            <div
              className="text-center py-16 glass-card rounded-2xl"
              data-ocid="account.empty_state"
            >
              <Heart
                size={48}
                className="text-muted-foreground/30 mx-auto mb-4"
              />
              <p className="text-muted-foreground">View your wishlist</p>
              <Link to="/wishlist">
                <Button
                  className="mt-4 btn-primary"
                  data-ocid="account.primary_button"
                >
                  Go to Wishlist
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-2 mt-8 text-sm text-destructive/70 hover:text-destructive transition-colors"
          data-ocid="account.delete_button"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
