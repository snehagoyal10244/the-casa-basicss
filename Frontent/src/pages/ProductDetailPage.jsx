import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import QuantityStepper from '../components/common/QuantityStepper';
import { PRODUCTS } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "Sage Mist");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || product.sizes?.[0] || { name: "Standard", price: product.price, orig: product.origPrice });
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('specs'); // 'specs' | 'care' | 'origin'

  const isFavorited = isInWishlist(product.id);
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const currentPrice = selectedSize?.price || product.price;
  const currentOrigPrice = selectedSize?.orig || product.origPrice;

  const handleAddToCart = () => {
    addToCart(product, qty, {
      color: selectedColor,
      size: selectedSize?.name,
      price: currentPrice
    });
  };

  const handleInstantCheckout = () => {
    addToCart(product, qty, {
      color: selectedColor,
      size: selectedSize?.name,
      price: currentPrice
    });
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <Header title="Product Detail" subtitle="The Casa Basics" showBack={true} />

      <main className="flex-1 w-full max-w-2xl mx-auto pt-16 pb-36">
        <div className="flex flex-col w-full">
          
          {/* Top Gallery Section */}
          <section className="relative w-full px-margin pt-space-xs">
            {/* Main Display Frame */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low shadow-sm border border-surface-container">
              <img 
                src={galleryImages[activeImgIndex] || galleryImages[0]} 
                alt={product.title} 
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Badges Overlay */}
              <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-2xs pointer-events-none">
                {product.badge && (
                  <span className="inline-flex items-center gap-1 px-space-xs py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider shadow-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      award_star
                    </span>
                    {product.badge}
                  </span>
                )}
                {product.discountTag && (
                  <span className="inline-flex items-center px-space-xs py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider shadow-sm font-semibold">
                    {product.discountTag}
                  </span>
                )}
              </div>

              {/* Quick Favorite Toggle */}
              <button 
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label="Save to Wishlist"
                className={`absolute top-space-sm right-space-sm w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
                  isFavorited ? 'text-secondary' : 'text-on-surface hover:text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}>
                  favorite
                </span>
              </button>

              {/* Progress Dots */}
              <div className="absolute bottom-space-sm left-1/2 -translate-x-1/2 px-space-xs py-1 rounded-full bg-inverse-surface/60 backdrop-blur-md flex items-center gap-1.5">
                {galleryImages.map((_, idx) => (
                  <span 
                    key={idx}
                    className={`thumb-dot rounded-full transition-all ${
                      activeImgIndex === idx ? 'w-2 h-2 bg-surface-container-lowest' : 'w-1.5 h-1.5 bg-surface-container-lowest/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-space-xs mt-space-xs">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-surface-container-low transition-all border ${
                      activeImgIndex === idx ? 'ring-2 ring-primary border-transparent' : 'opacity-70 hover:opacity-100 border-surface-container'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Product Title & Social Proof */}
          <section className="px-margin pt-space-md">
            <div className="flex items-center gap-space-2xs text-secondary mb-1">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                Free Express Shipping &amp; 30-Day Home Trial
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-snug font-bold">
              {product.title}
            </h1>

            {/* Ratings & Verification Bar */}
            <div className="flex items-center flex-wrap gap-x-space-sm gap-y-1 mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-1">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold ml-0.5">
                  {product.rating}
                </span>
                <span className="font-body-sm text-tertiary">
                  ({product.reviewCount || 512} reviews)
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="text-primary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                98% Recommend
              </span>
            </div>

            {/* Pricing Unit */}
            <div className="flex items-baseline gap-space-xs mt-space-sm">
              <span className="font-headline-xl text-2xl font-bold text-on-surface">
                ${currentPrice}.00
              </span>
              {currentOrigPrice && (
                <span className="font-body-lg text-body-lg text-tertiary line-through">
                  ${currentOrigPrice}.00
                </span>
              )}
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                Save ${currentOrigPrice ? currentOrigPrice - currentPrice : 30} Today
              </span>
            </div>
          </section>

          {/* Colorway Choice */}
          {product.colors && product.colors.length > 0 && (
            <section className="px-margin pt-space-lg">
              <div className="flex justify-between items-center mb-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                  Colourway
                </span>
                <span className="font-label-md text-label-md text-primary font-semibold">
                  {selectedColor}
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      style={{ backgroundColor: color.hex }}
                      className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm ${
                        isSelected ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[18px] text-white font-bold drop-shadow">
                          check
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Volume & Capacity Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <section className="px-margin pt-space-md">
              <div className="flex justify-between items-center mb-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                  Volume &amp; Capacity
                </span>
                <span className="font-body-sm text-body-sm text-primary font-medium">
                  {selectedSize.capacity}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-space-xs">
                {product.sizes.map((sz) => {
                  const active = selectedSize.name === sz.name;
                  return (
                    <button
                      key={sz.name}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`relative flex flex-col items-center justify-center py-2.5 px-space-xs rounded-xl transition-all border ${
                        active 
                          ? 'bg-primary-fixed text-on-primary-fixed font-bold shadow-sm border-primary' 
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container'
                      }`}
                    >
                      {sz.tag && (
                        <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-primary text-on-primary font-label-sm text-[9px] uppercase font-bold">
                          {sz.tag}
                        </span>
                      )}
                      <span className="font-label-md text-label-md font-bold">{sz.name}</span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">{sz.capacity}</span>
                      <span className={`font-label-sm text-label-sm font-semibold mt-1 ${active ? 'text-primary' : 'text-tertiary'}`}>
                        ${sz.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Key Material & Culinary Highlights Bento-Lite */}
          <section className="px-margin pt-space-lg">
            <div className="grid grid-cols-2 gap-space-xs">
              {(product.features || [
                { title: "Chip-Proof Vitreous", desc: "Smooth micro-porous glaze resists cracking & acid staining." },
                { title: "Multi-Stove Heat Ready", desc: "Oven safe up to 500°F (260°C), compatible with induction & gas." },
                { title: "Self-Basting Lid", desc: "Continuous internal droplet system redistributes natural flavors." },
                { title: "Ergonomic Brass Knob", desc: "Solid brushed satin brass hardware designed for safe oven mitt grip." }
              ]).map((feat, idx) => (
                <div key={idx} className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container/60">
                  <span className="material-symbols-outlined text-[24px] text-primary">
                    {idx === 0 ? 'shield' : idx === 1 ? 'heat' : idx === 2 ? 'water_drop' : 'hardware'}
                  </span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    {feat.title}
                  </span>
                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Collapsible Accordions (Specs, Care, Provenance) */}
          <section className="px-margin pt-space-lg space-y-space-xs">
            {/* Specs Accordion */}
            <div className="rounded-xl bg-surface-container-low overflow-hidden border border-surface-container/60">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                className="w-full p-space-sm flex items-center justify-between text-left font-label-md text-label-md font-semibold text-on-surface"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">format_list_bulleted</span>
                  <span>Technical Specifications</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-outline">
                  {openAccordion === 'specs' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'specs' && (
                <div className="px-space-sm pb-space-sm text-xs space-y-1.5 border-t border-surface-container-high/60 pt-2">
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-surface-container-high/40 last:border-0">
                        <span className="text-on-surface-variant font-medium">{key}</span>
                        <span className="text-on-surface font-semibold text-right">{val}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-on-surface-variant">Heirloom Japanese-Nordic artisanal kitchen grade.</p>
                  )}
                </div>
              )}
            </div>

            {/* Care Guide Accordion */}
            <div className="rounded-xl bg-surface-container-low overflow-hidden border border-surface-container/60">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                className="w-full p-space-sm flex items-center justify-between text-left font-label-md text-label-md font-semibold text-on-surface"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">cleaning_services</span>
                  <span>Care &amp; Cleaning Guide</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-outline">
                  {openAccordion === 'care' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'care' && (
                <div className="px-space-sm pb-space-sm text-xs space-y-1 text-on-surface-variant border-t border-surface-container-high/60 pt-2 leading-relaxed">
                  <p>• Cool completely before washing to avoid thermal shock.</p>
                  <p>• Clean with warm water, mild soap, and a natural plant-based sponge.</p>
                  <p>• Avoid metallic scrubbers to preserve the vitreous luster.</p>
                  <p>• Store in dry, well-ventilated cupboards with lid propped slightly ajar.</p>
                </div>
              )}
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="px-margin pt-space-xl">
            <div className="flex items-center justify-between mb-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Customer Reviews</h3>
              <button 
                type="button"
                onClick={() => showToast('Review modal will open after verification')}
                className="font-label-md text-label-md text-primary font-semibold hover:underline"
              >
                Write a Review
              </button>
            </div>

            {/* Scorecard */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex items-center gap-space-md border border-surface-container">
              <div className="flex flex-col items-center justify-center text-center pr-space-md border-r border-surface-container-high">
                <span className="font-headline-xl text-3xl font-bold text-on-surface">4.9</span>
                <div className="flex text-secondary mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <span className="font-label-sm text-[11px] text-tertiary mt-1">512 Reviews</span>
              </div>

              {/* Progress bars */}
              <div className="flex-1 space-y-1 text-xs">
                {[
                  { star: "5★", pct: "88%" },
                  { star: "4★", pct: "9%" },
                  { star: "3★", pct: "2%" },
                  { star: "2★", pct: "1%" },
                  { star: "1★", pct: "0%" }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2">
                    <span className="w-5 text-tertiary">{row.star}</span>
                    <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: row.pct }}></div>
                    </div>
                    <span className="w-7 text-right text-tertiary">{row.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Review Sample Card */}
            <div className="mt-space-sm p-space-sm rounded-xl bg-surface-container-lowest border border-surface-container space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                    EL
                  </span>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">Elena L.</span>
                    <span className="font-label-sm text-[10px] text-primary ml-1.5 bg-primary-fixed/50 px-1.5 py-0.2 rounded font-medium">Verified Buyer</span>
                  </div>
                </div>
                <span className="font-label-sm text-tertiary">3 days ago</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                "The heat distribution on sourdough crusts is unbelievable. The brass knob stays comfortable to lift even when turning the boule, and clean-up took seconds with warm water. Truly heirloom quality."
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Sticky Bottom Buy Bar */}
      <div className="fixed bottom-0 w-full z-40 pb-safe bg-surface/95 backdrop-blur-xl border-t border-surface-container-high shadow-2xl">
        <div className="max-w-2xl mx-auto px-margin py-space-sm flex items-center justify-between gap-space-sm">
          
          <div className="flex items-center gap-space-xs">
            <QuantityStepper 
              value={qty} 
              onMinus={() => setQty(q => Math.max(1, q - 1))} 
              onPlus={() => setQty(q => q + 1)} 
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                ${currentPrice * qty}
              </span>
              <span className="font-label-sm text-[10px] text-primary">In Stock</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <button 
              type="button"
              onClick={handleAddToCart}
              className="flex-1 max-w-[130px] h-11 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Add to Bag</span>
            </button>

            <button 
              type="button"
              onClick={handleInstantCheckout}
              className="flex-1 max-w-[150px] h-11 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
            >
              <span>Instant Buy</span>
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

