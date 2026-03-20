import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAllProducts } from "../hooks/useQueries";
import { mockProducts } from "../lib/mockData";

const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Beauty"];
const RATING_OPTIONS = [0, 3, 4, 4.5];

function ProductSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-card border border-border/50"
      data-ocid="products.loading_state"
    >
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
}

export default function ProductListingPage() {
  const { data: backendProducts, isLoading } = useAllProducts();
  const products = backendProducts?.length ? backendProducts : mockProducts;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const filtered = products
    .filter(
      (p) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category),
    )
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter((p) => p.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen pt-24">
      <div
        className="py-12 px-4 sm:px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #050508 0%, #0d0520 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
              Our Collection
            </p>
            <h1 className="font-display text-5xl font-black uppercase text-foreground">
              All Products
            </h1>
            <p className="text-muted-foreground mt-2">
              {filtered.length} products found
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-8">
          <aside
            className="hidden lg:block w-64 flex-shrink-0"
            data-ocid="products.panel"
          >
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm text-foreground mb-4">
                  Categories
                </h3>
                <div className="space-y-2.5">
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center gap-3">
                      <Checkbox
                        id={`cat-${cat}`}
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                        className="border-border/50 data-[state=checked]:bg-luxe-cyan data-[state=checked]:border-luxe-cyan"
                        data-ocid="products.checkbox"
                      />
                      <label
                        htmlFor={`cat-${cat}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm text-foreground mb-4">
                  Price Range
                </h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={2500}
                  step={10}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm text-foreground mb-4">
                  Min Rating
                </h3>
                <div className="flex gap-2">
                  {RATING_OPTIONS.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        minRating === r
                          ? "bg-luxe-cyan text-white border-transparent"
                          : "border-border/50 text-muted-foreground hover:border-luxe-cyan/50"
                      }`}
                      data-ocid="products.toggle"
                    >
                      {r === 0 ? "All" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedCategories.length > 0 || minRating > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategories([]);
                    setMinRating(0);
                  }}
                  className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors"
                  data-ocid="products.secondary_button"
                >
                  <X size={14} /> Clear Filters
                </button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                type="button"
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-border/50 text-sm text-foreground"
                data-ocid="products.toggle"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger
                  className="w-48 glass-card border-border/50"
                  data-ocid="products.select"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <ProductSkeleton key={id} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-20"
                data-ocid="products.empty_state"
              >
                <p className="text-muted-foreground">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
