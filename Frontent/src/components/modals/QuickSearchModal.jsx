import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/productsData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function QuickSearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setSelectedTag('All');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularTags = [
    { label: 'All', query: '' },
    { label: 'Cast Iron', query: 'Cast Iron' },
    { label: 'Santoku Knife', query: 'Santoku' },
    { label: 'Ceramics', query: 'Ceramic' },
    { label: 'Spice Jars', query: 'Spice' },
    { label: 'French Linen', query: 'Linen' }
  ];

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesQuery = 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.material && item.material.toLowerCase().includes(query.toLowerCase()));
    
    if (selectedTag === 'All') return matchesQuery;
    return matchesQuery && (item.category.toLowerCase().includes(selectedTag.toLowerCase()) || item.title.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  const handleProductClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.title} to bag`);
  };

  const handleViewAllCatalog = () => {
    onClose();
    navigate('/catalog');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2B24]/45 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-[0_25px_60px_-15px_rgba(37,61,50,0.3)] border border-[#E8E2D5] overflow-hidden z-10 animate-fade-in-down flex flex-col max-h-[82vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D5] bg-[#FAF8F5] flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF3EC] text-[#253D32] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kitchenware, Damascus steel, Dutch ovens..."
            className="flex-1 bg-transparent text-[#253D32] placeholder-[#8A958F] text-base md:text-lg font-medium focus:outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-8 h-8 rounded-full bg-[#EFECE6] text-[#6F7570] hover:text-[#253D32] flex items-center justify-center transition-colors"
              title="Clear input"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-[#EFECE6] hover:bg-[#E2DDD3] text-[#253D32] text-xs font-semibold tracking-wide transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Tag Pills */}
        <div className="px-5 py-2.5 bg-[#F5F2EB]/60 border-b border-[#E8E2D5] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F7570] flex-shrink-0 mr-1">
            Trending:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => {
                setSelectedTag(tag.label);
                if (tag.query) setQuery(tag.query);
                else setQuery('');
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag.label
                  ? 'bg-[#253D32] text-[#FAF8F5] shadow-xs'
                  : 'bg-white text-[#4A544E] hover:bg-[#EBF3EC] hover:text-[#253D32] border border-[#E8E2D5]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {filteredProducts.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#6F7570] px-1 pb-1">
                <span>Found {filteredProducts.length} curated pieces</span>
                <span className="text-[11px]">Free delivery over $150</span>
              </div>

              {filteredProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white hover:bg-[#EBF3EC]/50 border border-[#E8E2D5] transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-[#F5F2EB] flex-shrink-0 border border-[#E8E2D5] group-hover:scale-105 transition-transform"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A16207] bg-[#FEF9C3] px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-semibold text-[#365747]">
                          • {product.badge}
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-sm text-[#253D32] truncate mt-0.5 group-hover:text-[#365747] transition-colors">
                      {product.title}
                    </h5>
                    <p className="text-xs text-[#6F7570] truncate">
                      {product.subtitle || product.material}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-sm font-bold text-[#253D32]">
                      ${product.price}
                    </span>
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="px-2.5 py-1 rounded-full bg-[#253D32] text-white hover:bg-[#365747] text-[11px] font-bold flex items-center gap-1 transition-all active:scale-95 shadow-xs"
                      title="Quick Add"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FFF0EB] text-[#F08466] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[24px]">search_off</span>
              </div>
              <h4 className="font-bold text-base text-[#253D32]">
                No matching kitchenware found
              </h4>
              <p className="text-xs text-[#6F7570] max-w-xs mx-auto">
                Try searching for "Cast Iron", "Knife", "Dutch Oven", or browse our curated catalog.
              </p>
              <button
                onClick={handleViewAllCatalog}
                className="mt-2 px-4 py-2 rounded-full bg-[#253D32] text-white text-xs font-semibold hover:bg-[#365747] transition-colors"
              >
                Browse Full Catalog
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3.5 bg-[#F5F2EB] border-t border-[#E8E2D5] flex items-center justify-between text-xs text-[#6F7570] px-5">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E8E2D5] text-[10px] font-mono">ESC</kbd> to exit</span>
          <button
            onClick={handleViewAllCatalog}
            className="font-bold text-[#253D32] hover:text-[#365747] flex items-center gap-1 transition-colors"
          >
            <span>View All Products</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
