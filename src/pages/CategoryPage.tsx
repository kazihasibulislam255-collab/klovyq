import { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { SortOption, FilterState } from '@/types';
import ProductGrid from '@/components/ui/ProductGrid';

const ALL_SIZES = ['One Size', 'S', 'M', 'L', 'XL', 'XXL', '40', '41', '42', '43', '44', '45'];
const ALL_COLORS = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Brown', hex: '#6b4423' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'White', hex: '#f0f0f0' },
  { name: 'Olive', hex: '#5e6e3e' },
  { name: 'Tan', hex: '#c4a062' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'discount', label: 'Biggest Discount' },
];

const DEFAULT_FILTERS: FilterState = {
  search: '',
  minPrice: 0,
  maxPrice: 5000,
  sizes: [],
  colors: [],
  minDiscount: 0,
  minRating: 0,
  inStockOnly: false,
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { products } = useStore();
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    search: searchParams.get('search') ?? '',
  });
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) ?? 'newest'
  );
  const [showFilters, setShowFilters] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('price');

  useEffect(() => {
    setFilters(prev => ({ ...prev, search: searchParams.get('search') ?? '' }));
  }, [searchParams]);

  const categoryName = useMemo(() => {
    if (!slug || slug === 'all') return 'All Products';
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  }, [slug]);

  const categoryProducts = useMemo(() => {
    if (!slug || slug === 'all') return products;
    if (slug === 'new-arrivals') return products.filter(p => p.isNewArrival);
    if (slug === 'stock-clearance') return products.filter(p => p.isStockClearance);
    return products.filter(p => p.category === slug);
  }, [products, slug]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    if (filters.minPrice > 0) result = result.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice < 5000) result = result.filter(p => p.price <= filters.maxPrice);
    if (filters.sizes.length > 0) {
      result = result.filter(p => p.variants.sizes.some(s => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      result = result.filter(p => p.variants.colors.some(c => filters.colors.includes(c.name)));
    }
    if (filters.minDiscount > 0) {
      result = result.filter(p => {
        const d = ((p.previousPrice - p.price) / p.previousPrice) * 100;
        return d >= filters.minDiscount;
      });
    }
    if (filters.minRating > 0) result = result.filter(p => p.rating >= filters.minRating);
    if (filters.inStockOnly) result = result.filter(p => p.inStock);

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'popularity': result.sort((a, b) => b.popularity - a.popularity); break;
      case 'discount':
        result.sort((a, b) => {
          const da = (a.previousPrice - a.price) / a.previousPrice;
          const db = (b.previousPrice - b.price) / b.previousPrice;
          return db - da;
        });
        break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [categoryProducts, filters, sort]);

  const toggleSize = (size: string) => {
    setFilters(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size],
    }));
  };

  const toggleColor = (color: string) => {
    setFilters(f => ({
      ...f,
      colors: f.colors.includes(color) ? f.colors.filter(c => c !== color) : [...f.colors, color],
    }));
  };

  const resetFilters = () => setFilters({ ...DEFAULT_FILTERS, search: searchParams.get('search') ?? '' });

  const activeFilterCount =
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 5000 ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-1">
      {/* Price */}
      <div className="border-b border-ink-50">
        <button
          onClick={() => setOpenSection(openSection === 'price' ? null : 'price')}
          className="w-full flex items-center justify-between py-3 text-sm font-semibold text-ink-900"
        >
          Price Range
          <ChevronDown size={16} className={`transition-transform ${openSection === 'price' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'price' && (
          <div className="pb-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.minPrice}
                onChange={e => setFilters(f => ({ ...f, minPrice: Number(e.target.value) }))}
                placeholder="Min"
                className="w-full px-3 py-2 rounded-lg border border-ink-200 text-sm focus:outline-none focus:border-ink-400"
              />
              <span className="text-ink-300">—</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
                placeholder="Max"
                className="w-full px-3 py-2 rounded-lg border border-ink-200 text-sm focus:outline-none focus:border-ink-400"
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.maxPrice}
              onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
              className="w-full accent-ink-900"
            />
            <p className="text-xs text-ink-400">Up to ৳{filters.maxPrice.toLocaleString()}</p>
          </div>
        )}
      </div>

      {/* Size */}
      <div className="border-b border-ink-50">
        <button
          onClick={() => setOpenSection(openSection === 'size' ? null : 'size')}
          className="w-full flex items-center justify-between py-3 text-sm font-semibold text-ink-900"
        >
          Size
          <ChevronDown size={16} className={`transition-transform ${openSection === 'size' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'size' && (
          <div className="pb-4 flex flex-wrap gap-2">
            {ALL_SIZES.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  filters.sizes.includes(size)
                    ? 'border-ink-900 bg-ink-900 text-white'
                    : 'border-ink-200 text-ink-600 hover:border-ink-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="border-b border-ink-50">
        <button
          onClick={() => setOpenSection(openSection === 'color' ? null : 'color')}
          className="w-full flex items-center justify-between py-3 text-sm font-semibold text-ink-900"
        >
          Color
          <ChevronDown size={16} className={`transition-transform ${openSection === 'color' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'color' && (
          <div className="pb-4 flex flex-wrap gap-2">
            {ALL_COLORS.map(color => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                title={color.name}
                className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                  filters.colors.includes(color.name) ? 'border-ink-900 ring-2 ring-ink-200' : 'border-ink-200'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {filters.colors.includes(color.name) && (
                  <Check size={14} className={color.name === 'White' ? 'text-ink-900' : 'text-white'} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Discount */}
      <div className="border-b border-ink-50">
        <button
          onClick={() => setOpenSection(openSection === 'discount' ? null : 'discount')}
          className="w-full flex items-center justify-between py-3 text-sm font-semibold text-ink-900"
        >
          Discount
          <ChevronDown size={16} className={`transition-transform ${openSection === 'discount' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'discount' && (
          <div className="pb-4 space-y-2">
            {[0, 10, 20, 30, 40, 50].map(d => (
              <label key={d} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="discount"
                  checked={filters.minDiscount === d}
                  onChange={() => setFilters(f => ({ ...f, minDiscount: d }))}
                  className="accent-ink-900"
                />
                <span className="text-sm text-ink-600">{d === 0 ? 'All discounts' : `${d}% or more`}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="border-b border-ink-50">
        <button
          onClick={() => setOpenSection(openSection === 'rating' ? null : 'rating')}
          className="w-full flex items-center justify-between py-3 text-sm font-semibold text-ink-900"
        >
          Rating
          <ChevronDown size={16} className={`transition-transform ${openSection === 'rating' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'rating' && (
          <div className="pb-4 space-y-2">
            {[0, 3, 4, 4.5].map(r => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === r}
                  onChange={() => setFilters(f => ({ ...f, minRating: r }))}
                  className="accent-ink-900"
                />
                <span className="text-sm text-ink-600">{r === 0 ? 'All ratings' : `${r}★ & above`}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-2 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e => setFilters(f => ({ ...f, inStockOnly: e.target.checked }))}
            className="accent-ink-900 w-4 h-4"
          />
          <span className="text-sm font-semibold text-ink-900">In Stock Only</span>
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 text-sm font-medium text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pb-20 lg:pb-0">
      {/* Page header */}
      <div className="bg-ink-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-ink-900 capitalize">{categoryName}</h1>
          <p className="text-sm text-ink-400 mt-1">{filteredProducts.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-ink-900">Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-xs text-danger-600 font-medium">Clear</button>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4 gap-3">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ink-200 text-sm font-medium text-ink-700"
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-ink-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-ink-400 hidden sm:inline">Sort by:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortOption)}
                  className="px-3 py-2.5 rounded-xl border border-ink-200 text-sm font-medium text-ink-700 focus:outline-none focus:border-ink-400 cursor-pointer"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowFilters(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-ink-100 sticky top-0 bg-white">
              <h3 className="font-semibold text-ink-900">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="w-10 h-10 rounded-full hover:bg-ink-50 flex items-center justify-center">
                <X size={22} />
              </button>
            </div>
            <div className="p-5">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-ink-100 p-4">
              <button onClick={() => setShowFilters(false)} className="w-full btn-primary">
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
