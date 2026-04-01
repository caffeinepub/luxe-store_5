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
import {
  ImagePlus,
  Loader2,
  Lock,
  Pencil,
  Plus,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useAllProducts, useCreateOrUpdateProduct } from "../hooks/useQueries";

const ADMIN_PASSWORD = "Devang@947638";
const SESSION_KEY = "luxe_admin_auth";

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

// ─── Password Gate ────────────────────────────────────────────────────────────

function AdminPasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "true");
        onAuth();
      } else {
        setError("Incorrect password. Access denied.");
        setPassword("");
      }
      setChecking(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-luxe-cyan/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-luxe-magenta/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card rounded-3xl p-10 w-full max-w-md relative z-10"
        style={{ border: "1px solid rgba(47, 212, 255, 0.25)" }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(47,212,255,0.2), rgba(255,0,255,0.2))",
              border: "1px solid rgba(47,212,255,0.4)",
              boxShadow: "0 0 24px rgba(47,212,255,0.3)",
            }}
          >
            <Shield className="w-8 h-8 text-luxe-cyan" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-black text-center mb-1">
          Admin <span className="gradient-text">Access</span>
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-8">
          Enter your admin password to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-widest">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                className="pl-10 bg-white/5 border-white/10 focus:border-luxe-cyan/60 focus:ring-0 transition-colors"
                autoFocus
                data-ocid="admin.gate.input"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-red-400 text-sm flex items-center gap-2"
                data-ocid="admin.gate.error_state"
              >
                <X className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            disabled={checking || !password}
            className="w-full font-semibold h-11"
            style={{
              background: "linear-gradient(135deg, #2FD4FF, #FF00FF)",
              color: "#000",
            }}
            data-ocid="admin.gate.submit_button"
          >
            {checking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Enter Admin Panel"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Image Upload Section ─────────────────────────────────────────────────────

function ImageUploadSection({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImageUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onChange([...images, trimmed]);
    setUrlInput("");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    const results: string[] = [];
    for (const file of files) {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      results.push(dataUrl);
    }
    onChange([...images, ...results]);
    setUploading(false);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="col-span-2 space-y-3">
      <Label className="text-muted-foreground text-xs uppercase tracking-wider">
        Product Images
      </Label>

      {/* Upload Area */}
      <label
        className="rounded-xl border-2 border-dashed border-luxe-cyan/40 hover:border-luxe-cyan/70 transition-colors cursor-pointer relative overflow-hidden block"
        style={{ background: "rgba(47,212,255,0.04)" }}
        data-ocid="admin.product.dropzone"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          data-ocid="admin.product.upload_button"
        />
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-luxe-cyan animate-spin" />
              <p className="text-sm text-luxe-cyan">Uploading images...</p>
            </>
          ) : (
            <>
              <ImagePlus className="w-8 h-8 text-luxe-cyan/60" />
              <p className="text-sm font-medium text-luxe-cyan/80">
                Click to upload images
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP supported
              </p>
            </>
          )}
        </div>
      </label>

      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addImageUrl();
            }
          }}
          placeholder="Or paste image URL..."
          className="bg-white/5 border-white/10 flex-1"
          data-ocid="admin.product.input"
        />
        <Button
          type="button"
          onClick={addImageUrl}
          disabled={!urlInput.trim()}
          variant="outline"
          className="border-luxe-cyan/40 text-luxe-cyan hover:bg-luxe-cyan/10"
          data-ocid="admin.product.secondary_button"
        >
          Add URL
        </Button>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <div
              key={`${img.slice(0, 40)}-${idx}`}
              className="relative group rounded-lg overflow-hidden aspect-square"
            >
              <img
                src={img}
                alt={`Preview ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                  data-ocid={`admin.product.delete_button.${idx + 1}`}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              {idx === 0 && (
                <span className="absolute top-1 left-1 text-[10px] bg-luxe-cyan text-black font-bold px-1.5 py-0.5 rounded">
                  MAIN
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Form Modal ───────────────────────────────────────────────────────

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

          {/* Image Upload */}
          <ImageUploadSection
            images={form.images}
            onChange={(imgs) => set("images", imgs)}
          />

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

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard() {
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const mutation = useCreateOrUpdateProduct();

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | undefined>();

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
                    Image
                  </TableHead>
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
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            No img
                          </div>
                        )}
                      </div>
                    </TableCell>
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

// ─── Page Entry ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );

  if (!authenticated) {
    return <AdminPasswordGate onAuth={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}
