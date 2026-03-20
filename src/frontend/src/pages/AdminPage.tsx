import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Loader2, Pencil, Plus, ShieldAlert, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllProducts,
  useClaimAdmin,
  useCreateOrUpdateProduct,
  useIsAdmin,
} from "../hooks/useQueries";

const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Beauty"];

const emptyForm = (): Omit<Product, "id"> => ({
  title: "",
  category: "Electronics",
  price: 0,
  originalPrice: 0,
  description: "",
  sizes: [],
  stock: 0n,
  colors: [],
  rating: 0,
  reviewCount: 0n,
  isFlashSale: false,
  isTrending: false,
  images: [],
});

interface FormState {
  id: string;
  title: string;
  category: string;
  price: string;
  originalPrice: string;
  description: string;
  sizes: string;
  stock: string;
  colors: string;
  rating: number;
  reviewCount: bigint;
  isFlashSale: boolean;
  isTrending: boolean;
  images: string[];
}

const productToForm = (p: Product): FormState => ({
  id: p.id,
  title: p.title,
  category: p.category,
  price: String(p.price),
  originalPrice: String(p.originalPrice),
  description: p.description,
  sizes: p.sizes.join(", "),
  stock: String(p.stock),
  colors: p.colors.join(", "),
  rating: p.rating,
  reviewCount: p.reviewCount,
  isFlashSale: p.isFlashSale,
  isTrending: p.isTrending,
  images: p.images,
});

const formToProduct = (form: FormState): Product => ({
  id: form.id,
  title: form.title,
  category: form.category,
  price: Number.parseFloat(form.price) || 0,
  originalPrice: Number.parseFloat(form.originalPrice) || 0,
  description: form.description,
  sizes: form.sizes
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  stock: BigInt(Number.parseInt(form.stock) || 0),
  colors: form.colors
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean),
  rating: form.rating,
  reviewCount: form.reviewCount,
  isFlashSale: form.isFlashSale,
  isTrending: form.isTrending,
  images: form.images,
});

function ProductFormModal({
  open,
  onClose,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  initial?: Product;
}) {
  const mutation = useCreateOrUpdateProduct();
  const [form, setForm] = useState<FormState>(() =>
    initial
      ? productToForm(initial)
      : {
          id: "",
          ...emptyForm(),
          price: "0",
          originalPrice: "0",
          stock: "0",
          sizes: "",
          colors: "",
        },
  );

  const set = (field: keyof FormState, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Product title is required");
      return;
    }
    const product = formToProduct({
      ...form,
      id: form.id || crypto.randomUUID(),
    });
    try {
      await mutation.mutateAsync(product);
      toast.success(initial ? "Product updated!" : "Product created!");
      onClose();
    } catch {
      toast.error("Failed to save product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(5, 2, 15, 0.97)",
          border: "1px solid rgba(42,54,68,0.8)",
        }}
        data-ocid="admin.product.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl gradient-text">
            {initial ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div className="col-span-2 space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Title *
            </Label>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Product title"
              className="bg-white/5 border-white/10"
              data-ocid="admin.product.input"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Category
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v)}
            >
              <SelectTrigger
                className="bg-white/5 border-white/10"
                data-ocid="admin.product.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "rgba(5, 2, 15, 0.97)",
                  border: "1px solid rgba(42,54,68,0.8)",
                }}
              >
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Stock
            </Label>
            <Input
              type="number"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              className="bg-white/5 border-white/10"
              data-ocid="admin.product.input"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Price ($)
            </Label>
            <Input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="bg-white/5 border-white/10"
              data-ocid="admin.product.input"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Original Price ($)
            </Label>
            <Input
              type="number"
              step="0.01"
              value={form.originalPrice}
              onChange={(e) => set("originalPrice", e.target.value)}
              className="bg-white/5 border-white/10"
              data-ocid="admin.product.input"
            />
          </div>

          <div className="col-span-2 space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Description
            </Label>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Product description"
              className="bg-white/5 border-white/10 resize-none"
              data-ocid="admin.product.textarea"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Sizes (comma-separated)
            </Label>
            <Input
              value={form.sizes}
              onChange={(e) => set("sizes", e.target.value)}
              placeholder="S, M, L, XL"
              className="bg-white/5 border-white/10"
              data-ocid="admin.product.input"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Colors (comma-separated hex)
            </Label>
            <Input
              value={form.colors}
              onChange={(e) => set("colors", e.target.value)}
              placeholder="#FF0000, #00FF00"
              className="bg-white/5 border-white/10"
              data-ocid="admin.product.input"
            />
          </div>

          <div className="flex items-center gap-6 col-span-2 pt-2">
            <div className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={form.isFlashSale}
                onCheckedChange={(v) => set("isFlashSale", !!v)}
                className="border-luxe-cyan data-[state=checked]:bg-luxe-cyan"
                data-ocid="admin.product.checkbox"
              />
              <span className="text-sm font-medium">Flash Sale</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={form.isTrending}
                onCheckedChange={(v) => set("isTrending", !!v)}
                className="border-luxe-cyan data-[state=checked]:bg-luxe-cyan"
                data-ocid="admin.product.checkbox"
              />
              <span className="text-sm font-medium">Trending</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20"
            data-ocid="admin.product.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="bg-luxe-cyan text-black hover:bg-luxe-cyan/90 font-semibold"
            data-ocid="admin.product.submit_button"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : initial ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminPage() {
  const { identity, isInitializing, login, isLoggingIn } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const mutation = useCreateOrUpdateProduct();
  const claimAdmin = useClaimAdmin();

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | undefined>();
  const [adminToken, setAdminToken] = useState("");

  const openAdd = () => {
    setEditProduct(undefined);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setModalOpen(true);
  };

  const handleDelete = async (p: Product) => {
    try {
      await mutation.mutateAsync({ ...p, stock: 0n });
      toast.success(`"${p.title}" removed from stock`);
    } catch {
      toast.error("Failed to remove product");
    }
  };

  const handleClaimAdmin = async () => {
    try {
      await claimAdmin.mutateAsync(adminToken);
      toast.success("Admin access granted!");
      setAdminToken("");
    } catch {
      toast.error("Invalid token or admin already assigned.");
    }
  };

  if (isInitializing || adminLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-8 w-8 animate-spin text-luxe-cyan" />
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-10 max-w-md w-full text-center space-y-6"
          data-ocid="admin.login_state"
        >
          <ShieldAlert className="mx-auto h-12 w-12 text-luxe-cyan" />
          <h2 className="font-display text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">
            Please log in to access the admin panel.
          </p>
          <Button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="bg-luxe-cyan text-black hover:bg-luxe-cyan/90 w-full font-semibold"
            data-ocid="admin.login_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-10 max-w-md w-full space-y-6"
          data-ocid="admin.setup.panel"
        >
          <div className="text-center space-y-3">
            <ShieldAlert className="mx-auto h-12 w-12 text-luxe-cyan" />
            <h2 className="font-display text-2xl font-bold">Admin Setup</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enter your admin secret token to claim admin access. This is set
              once – the first person to use the correct token becomes the store
              admin.
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Secret Token
            </Label>
            <Input
              type="password"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              placeholder="Enter admin secret token"
              className="bg-white/5 border-white/10"
              onKeyDown={(e) => e.key === "Enter" && handleClaimAdmin()}
              data-ocid="admin.setup.input"
            />
          </div>

          <Button
            onClick={handleClaimAdmin}
            disabled={claimAdmin.isPending || !adminToken.trim()}
            className="bg-luxe-cyan text-black hover:bg-luxe-cyan/90 font-semibold w-full"
            data-ocid="admin.setup.primary_button"
          >
            {claimAdmin.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Claiming...
              </>
            ) : (
              "Claim Admin Access"
            )}
          </Button>

          <Link to="/" className="block">
            <Button
              variant="outline"
              className="border-white/20 w-full"
              data-ocid="admin.setup.cancel_button"
            >
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
              Dashboard
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-black">
              Admin <span className="gradient-text">Panel</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your product catalog
            </p>
          </div>
          <Button
            onClick={openAdd}
            className="bg-luxe-cyan text-black hover:bg-luxe-cyan/90 font-semibold flex items-center gap-2 self-start md:self-auto"
            data-ocid="admin.product.open_modal_button"
          >
            <Plus size={16} />
            Add Product
          </Button>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-7xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Total Products",
            value: products?.length ?? 0,
            color: "text-luxe-cyan",
          },
          {
            label: "Flash Sale",
            value: products?.filter((p) => p.isFlashSale).length ?? 0,
            color: "text-orange-400",
          },
          {
            label: "Trending",
            value: products?.filter((p) => p.isTrending).length ?? 0,
            color: "text-purple-400",
          },
          {
            label: "Low Stock",
            value: products?.filter((p) => p.stock < 10n).length ?? 0,
            color: "text-red-400",
          },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className={`font-display text-3xl font-black ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </motion.section>

      {/* Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        <div className="glass-card rounded-3xl overflow-hidden">
          {productsLoading ? (
            <div
              className="flex items-center justify-center py-20"
              data-ocid="admin.products.loading_state"
            >
              <Loader2 className="h-8 w-8 animate-spin text-luxe-cyan" />
            </div>
          ) : !products?.length ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="admin.products.empty_state"
            >
              <p className="text-lg font-medium">No products yet</p>
              <p className="text-sm mt-1">
                Add your first product to get started
              </p>
            </div>
          ) : (
            <Table data-ocid="admin.products.table">
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Title
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Category
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Price
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Stock
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Tags
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, idx) => (
                  <TableRow
                    key={product.id}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                    data-ocid={`admin.products.row.${idx + 1}`}
                  >
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-white/20 text-muted-foreground text-xs"
                      >
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-luxe-cyan font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-muted-foreground line-through text-xs ml-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          product.stock < 10n
                            ? "text-red-400"
                            : "text-green-400"
                        }
                      >
                        {String(product.stock)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {product.isFlashSale && (
                          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-[10px]">
                            Flash
                          </Badge>
                        )}
                        {product.isTrending && (
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]">
                            Trending
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(product)}
                          className="h-8 w-8 p-0 hover:bg-luxe-cyan/20 hover:text-luxe-cyan"
                          data-ocid={`admin.products.edit_button.${idx + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(product)}
                          disabled={mutation.isPending}
                          className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
                          data-ocid={`admin.products.delete_button.${idx + 1}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </motion.section>

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editProduct}
      />
    </div>
  );
}
