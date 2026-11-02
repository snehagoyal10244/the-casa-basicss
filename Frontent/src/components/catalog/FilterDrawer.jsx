import React from 'react';

const MATERIAL_OPTIONS = [
  "Ceramic",
  "Olive Wood",
  "Cast Iron",
  "Borosilicate Glass",
  "Stainless Steel",
  "Acacia Hardwood",
  "Flax Linen"
];

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedMaterials,
  onToggleMaterial,
  maxPrice,
  onChangeMaxPrice,
  minRating,
  onChangeMinRating,
  inStockOnly,
  onToggleInStockOnly,
  onReset
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm" />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-t-3xl shadow-2xl p-margin max-h-[85vh] overflow-y-auto flex flex-col gap-space-md z-10 border-t border-surface-container">
        
        <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-1"></div>

        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Filter Collection</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface font-semibold">Max Price</span>
            <span className="font-headline-sm text-sm text-primary font-bold">${maxPrice}</span>
          </div>
          <input 
            type="range" 
            min="25" 
            max="150" 
            step="5"
            value={maxPrice} 
            onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-tertiary">
            <span>$25</span>
            <span>$150+</span>
          </div>
        </div>

        {/* Materials */}
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-label-md text-on-surface font-semibold">Craft Materials</span>
          <div className="flex flex-wrap gap-1.5">
            {MATERIAL_OPTIONS.map((mat) => {
              const active = selectedMaterials.includes(mat);
              return (
                <button
                  key={mat}
                  type="button"
                  onClick={() => onToggleMaterial(mat)}
                  className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${
                    active ? 'bg-primary text-on-primary font-semibold shadow-sm' : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {mat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-label-md text-on-surface font-semibold">Minimum Rating</span>
          <div className="grid grid-cols-3 gap-2">
            {[4.8, 4.5, 4.0].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onChangeMinRating(minRating === r ? 0 : r)}
                className={`py-2 px-1 rounded-lg text-center font-label-sm text-label-sm flex items-center justify-center gap-1 transition-all ${
                  minRating === r ? 'bg-primary-fixed text-on-primary-fixed font-semibold ring-1 ring-primary' : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{r}+ Stars</span>
              </button>
            ))}
          </div>
        </div>

        {/* In Stock Toggle */}
        <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low cursor-pointer">
          <span className="font-body-md text-body-md font-medium text-on-surface">In Stock Only</span>
          <input 
            type="checkbox" 
            checked={inStockOnly} 
            onChange={(e) => onToggleInStockOnly(e.target.checked)}
            className="w-5 h-5 rounded accent-primary cursor-pointer" 
          />
        </label>

        {/* Actions */}
        <div className="flex items-center gap-space-xs pt-2">
          <button 
            type="button"
            onClick={onReset}
            className="flex-1 h-12 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
          >
            Reset All
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 h-12 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all shadow-sm"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}

