import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import QuantityStepper from '../common/QuantityStepper';

export default function ProductCard({ product, showCompare = false }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare } = useCompare();

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || null);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const inCompare = isComparing(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, qty, { color: selectedColor });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <article 
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border border-surface-container/40"
    >
      {/* Top Left Badge */}
      {product.stock && product.stock.includes("left") && (
        <span className="absolute top-2 left-2 z-10 bg-secondary/90 text-on-secondary font-label-sm text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-wide uppercase shadow-sm">
          {product.stock}
        </span>
      )}
      {!product.stock?.includes("left") && product.discountTag && (
        <span className="absolute top-2 left-2 z-10 bg-secondary text-on-secondary font-label-sm text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm">
          {product.discountTag}
        </span>
      )}
      {!product.stock?.includes("left") && !product.discountTag && product.badge && (
        <span className="absolute top-2 left-2 z-10 bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] px-2 py-0.5 rounded-md font-semibold shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Top Right Wishlist Button */}
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label="Save to Wishlist" 
        className={`wishlist-btn absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm active:scale-90 ${
          isFavorited ? 'text-secondary' : 'text-outline hover:text-secondary'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[18px]" 
          style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
      </button>

      {/* Optional Compare Toggle Button */}
      {showCompare && (
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
          }}
          className={`absolute bottom-2 left-2 z-10 px-1.5 py-0.5 rounded-full font-label-sm text-[10px] flex items-center gap-1 shadow-sm backdrop-blur-md transition-all ${
            inCompare ? 'bg-primary text-on-primary' : 'bg-surface/90 text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[12px]">balance</span>
          <span>{inCompare ? 'Compared' : 'Compare'}</span>
        </button>
      )}

      {/* Product Image Frame */}
      <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
        <img 
          src={product.images?.[0] || product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Product Info Body */}
      <div className="p-space-sm flex flex-col flex-1 justify-between gap-space-xs">
        <div className="flex flex-col gap-1">
          {/* Swatches if available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-0.5">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span 
                  key={idx}
                  title={col.name}
                  style={{ backgroundColor: col.hex }}
                  className={`w-3 h-3 rounded-full shadow-xs ring-1 ${
                    selectedColor === col.name ? 'ring-primary ring-offset-1' : 'ring-surface'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col.name);
                  }}
                />
              ))}
              {product.colors.length > 1 && (
                <span className="font-label-sm text-[10px] text-outline ml-0.5">
                  {product.colors.length} colors
                </span>
              )}
            </div>
          )}

          <h4 className="font-body-md text-body-md font-semibold text-on-surface line-clamp-1 leading-snug">
            {product.title}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-label-sm text-[11px] font-semibold text-on-surface">
              {product.rating}
            </span>
            <span className="font-body-sm text-[10px] text-on-surface-variant">
              ({product.reviewCount || 120})
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              ${product.price}
            </span>
            {product.origPrice && (
              <span className="font-body-sm text-body-sm text-outline line-through">
                ${product.origPrice}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Counter + Add to Cart Button */}
        <div className="flex items-center gap-1.5 pt-1 mt-auto">
          <QuantityStepper 
            value={qty} 
            onMinus={() => setQty(q => Math.max(1, q - 1))} 
            onPlus={() => setQty(q => q + 1)} 
            size="sm"
          />

          <button 
            type="button"
            onClick={handleAddToCart}
            className={`add-to-cart-btn flex-1 h-8 rounded-lg font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm ${
              isAdded ? 'bg-primary-container text-on-primary-container' : 'bg-primary hover:bg-primary-container text-on-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAdded ? 'done' : 'add_shopping_cart'}
            </span>
            <span>{isAdded ? 'Added' : 'Add'}</span>
          </button>
        </div>

      </div>
    </article>
  );
}

