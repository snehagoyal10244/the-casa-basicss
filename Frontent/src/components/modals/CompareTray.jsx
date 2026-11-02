import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';

export default function CompareTray() {
  const { compareIds, comparedProducts, clearCompare, isModalOpen, setIsModalOpen } = useCompare();
  const { addToCart } = useCart();

  if (compareIds.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-20 left-4 right-4 max-w-lg mx-auto z-40 transition-all duration-300 transform translate-y-0">
        <div className="bg-inverse-surface text-inverse-on-surface p-space-sm rounded-2xl shadow-2xl flex items-center justify-between gap-space-xs border border-white/10">
          
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Avatars */}
            <div className="flex -space-x-2 shrink-0">
              {comparedProducts.map((p, idx) => (
                <div key={p.id} className="w-9 h-9 rounded-full overflow-hidden border-2 border-inverse-surface bg-surface-container shadow">
                  <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
              ))}
              {comparedProducts.length === 1 && (
                <div className="w-9 h-9 rounded-full border-2 border-dashed border-white/40 bg-white/5 flex items-center justify-center text-xs text-white/70">
                  +1
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-semibold truncate text-white">
                {comparedProducts.length === 1 ? 'Select 1 more item' : '2 pieces ready to compare'}
              </span>
              <span className="font-body-sm text-[11px] text-white/70 truncate">
                {comparedProducts.map(p => p.title).join(' vs ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              type="button"
              onClick={clearCompare}
              className="px-2 py-1.5 rounded-lg text-white/70 hover:text-white font-label-sm text-label-sm transition-colors"
            >
              Clear
            </button>
            <button 
              type="button"
              disabled={comparedProducts.length < 2}
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
            >
              Compare
            </button>
          </div>

        </div>
      </div>

      {/* Side-by-side Comparison Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-space-md shadow-2xl flex flex-col gap-space-sm border border-surface-container">
            
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">balance</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Side-by-Side Comparison</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Compare Table */}
            <div className="grid grid-cols-2 gap-space-sm pt-2">
              {comparedProducts.map((p) => (
                <div key={p.id} className="flex flex-col bg-surface-container-low rounded-xl p-space-sm">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-surface-container">
                    <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-headline-sm text-sm text-on-surface font-semibold line-clamp-2 h-10">{p.title}</h4>
                  <div className="text-primary font-headline-sm font-bold mt-1">${p.price}</div>
                  
                  <div className="mt-3 space-y-2 text-xs border-t border-surface-container-high/60 pt-2">
                    <div>
                      <span className="text-on-surface-variant font-medium">Material: </span>
                      <span className="text-on-surface font-semibold">{p.material}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant font-medium">Rating: </span>
                      <span className="text-secondary font-semibold">★ {p.rating} ({p.reviewCount})</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant font-medium">Badge: </span>
                      <span className="text-on-surface">{p.badge || 'Essential'}</span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => addToCart(p, 1)}
                    className="mt-4 w-full h-9 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}

