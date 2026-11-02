import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import ProductCard from '../components/marketplace/ProductCard';
import FilterDrawer from '../components/catalog/FilterDrawer';
import CompareTray from '../components/modals/CompareTray';
import { PRODUCTS, CATEGORIES } from '../data/productsData';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'rating' | 'price-asc' | 'price-desc' | 'newest'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filters state
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [maxPrice, setMaxPrice] = useState(150);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedMaterials.length > 0) count += selectedMaterials.length;
    if (maxPrice < 150) count += 1;
    if (minRating > 0) count += 1;
    if (inStockOnly) count += 1;
    return count;
  }, [selectedMaterials, maxPrice, minRating, inStockOnly]);

  const handleToggleMaterial = (mat) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const handleResetFilters = () => {
    setSelectedMaterials([]);
    setMaxPrice(150);
    setMinRating(0);
    setInStockOnly(false);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'eco' && !item.discountTag?.includes('Eco') && item.category !== 'eco') {
          return false;
        } else if (selectedCategory !== 'eco' && item.category !== selectedCategory) {
          return false;
        }
      }

      // Search query
      if (urlSearch) {
        const q = urlSearch.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSub = item.subtitle?.toLowerCase().includes(q);
        const matchMat = item.material?.toLowerCase().includes(q);
        if (!matchTitle && !matchSub && !matchMat) return false;
      }

      // Price filter
      if (item.price > maxPrice) return false;

      // Rating filter
      if (minRating > 0 && item.rating < minRating) return false;

      // Material filter
      if (selectedMaterials.length > 0) {
        const matchesMat = selectedMaterials.some(m => 
          item.material?.toLowerCase().includes(m.toLowerCase())
        );
        if (!matchesMat) return false;
      }

      // Stock filter
      if (inStockOnly && item.stock?.includes("0")) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id - a.id;
      return 0; // featured default
    });
  }, [selectedCategory, urlSearch, sortBy, maxPrice, minRating, selectedMaterials, inStockOnly]);

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <Header title="The Casa Basics" subtitle="Categories" showBack={true} />

      <main className="flex-1 w-full max-w-2xl mx-auto px-margin pt-20 pb-32">
        <div className="flex flex-col w-full">
          
          {/* Subtitle Hero Ribbon */}
          <div className="flex flex-col gap-space-2xs py-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                Kitchen &amp; Tableware Essentials
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>{filteredProducts.length} Curated Pieces</span>
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Tactile everyday objects handcrafted with mindful materials, organic ceramic glazes, and heirloom woods.
            </p>
          </div>

          {/* Horizontal Category Filters (Edge Bleed Scroll) */}
          <div className="-mx-margin px-margin overflow-x-auto no-scrollbar py-space-2xs flex items-center gap-space-2xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchParams(cat.id === 'all' ? {} : { category: cat.id });
                }}
                className={`flex-shrink-0 px-space-md py-space-2xs rounded-lg font-label-md text-label-md transition-all duration-200 flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat.id === 'eco' && (
                  <span className="material-symbols-outlined text-[15px] text-primary">eco</span>
                )}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Active Search Notification */}
          {urlSearch && (
            <div className="mt-space-xs flex items-center justify-between bg-primary-fixed/40 px-3 py-1.5 rounded-lg">
              <span className="text-xs text-on-primary-fixed-variant">
                Filtered by: <strong>"{urlSearch}"</strong>
              </span>
              <button 
                onClick={() => setSearchParams({})}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Sort & Active Filters Toolbar */}
          <div className="flex items-center justify-between gap-space-xs mt-space-sm mb-space-xs bg-surface-container-low p-space-xs rounded-xl border border-surface-container/60">
            {/* Sort Selector Dropdown */}
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-1.5 px-space-xs py-1.5 bg-surface-container-lowest rounded-lg shadow-sm border border-surface-container/60">
                <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">sort</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent w-full text-on-surface font-label-md text-label-md focus:outline-none appearance-none cursor-pointer pr-4 truncate"
                >
                  <option value="featured">Sort: Best Selling</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] pointer-events-none -ml-4 flex-shrink-0">
                  expand_more
                </span>
              </div>
            </div>

            {/* Filter Drawer Trigger Button */}
            <button 
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="relative flex items-center gap-1.5 px-space-sm py-1.5 bg-surface-container-lowest text-on-surface rounded-lg font-label-md text-label-md shadow-sm active:scale-95 transition-transform flex-shrink-0 border border-surface-container/60"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-secondary text-on-secondary font-label-sm text-[9px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Product Grid: 2 Columns Dense Layout */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-space-xs mt-space-xs">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showCompare={true} />
              ))}
            </div>
          ) : (
            <div className="py-space-2xl text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-tertiary mb-space-sm">
                <span className="material-symbols-outlined text-[32px]">filter_alt_off</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">No matches found</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs">
                Try loosening your filter criteria or explore all items.
              </p>
              <button 
                type="button"
                onClick={handleResetFilters}
                className="mt-space-md px-space-lg py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Filter Drawer Component */}
      <FilterDrawer 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedMaterials={selectedMaterials}
        onToggleMaterial={handleToggleMaterial}
        maxPrice={maxPrice}
        onChangeMaxPrice={setMaxPrice}
        minRating={minRating}
        onChangeMinRating={setMinRating}
        inStockOnly={inStockOnly}
        onToggleInStockOnly={setInStockOnly}
        onReset={handleResetFilters}
      />

      {/* Side-by-Side Compare Tray */}
      <CompareTray />

      <BottomNav />
    </div>
  );
}

