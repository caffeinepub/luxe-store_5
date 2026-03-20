import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { Heart, LogIn, LogOut, Package, Settings, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function AccountPage() {
  const { login, clear, loginStatus, identity, isLoggingIn } =
    useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal().toString();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const handleSaveProfile = () => {
    toast.success("Profile saved!");
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
                Welcome Back
              </h1>
              <p className="text-muted-foreground mt-1">
                Sign in to access your account
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
                  <p className="text-sm text-muted-foreground text-center">
                    We use Internet Identity for secure, passwordless
                    authentication.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={login}
                    disabled={isLoggingIn}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    data-ocid="account.primary_button"
                  >
                    {isLoggingIn ? (
                      <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                    ) : (
                      <LogIn size={18} />
                    )}
                    {isLoggingIn ? "Signing in..." : "Sign In"}
                  </motion.button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Create a new Internet Identity to get started.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={login}
                    disabled={isLoggingIn}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    data-ocid="account.primary_button"
                  >
                    Create Account
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
            {principal}
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
                className="btn-primary"
                data-ocid="account.save_button"
              >
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="orders">
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
