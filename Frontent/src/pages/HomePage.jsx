import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import FreeShippingBar from '../components/marketplace/FreeShippingBar';
import PromoHeroBanner from '../components/marketplace/PromoHeroBanner';
import CategoryPills from '../components/marketplace/CategoryPills';
import ProductCard from '../components/marketplace/ProductCard';
import { PRODUCTS, STARTER_BUNDLE_WEEK } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const SEARCH_TAGS = ["Dutch Oven", "Chef Knife", "Spice Jars", "Linen Apron", "Acacia Bowl"];

export default function HomePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, updateAddress } = useAuth();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(user?.addresses?.[0]?.street || "124 Riverside Terrace, Apt 4B");

  const activeAddress = user?.addresses?.[0] || {
    street: "124 Riverside Terrace, Apt 4B"
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/catalog?search=${encodeURIComponent(tag)}`);
  };

  const handleSaveAddress = () => {
    updateAddress({
      ...activeAddress,
      street: addressInput
    });
    setIsEditingAddress(false);
    showToast(`Delivery destination updated`);
  };

  const handleClaimStarterBundle = () => {
    addToCart({
      id: 99,
      title: STARTER_BUNDLE_WEEK.title,
      price: STARTER_BUNDLE_WEEK.price,
      images: [STARTER_BUNDLE_WEEK.image]
    }, 1);
  };

  // 4 Trending Products from the catalog
  const trendingProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <Header title="The Casa Basics" subtitle="Home" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-margin pt-20 pb-28">
        <div className="flex flex-col gap-space-lg">
          
          {/* Greeting & Destination Bar */}
          <section className="flex flex-col gap-space-2xs pt-space-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                  Morning In The Kitchen
                </span>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center gap-space-2xs">
                  Hello, Welcome to Casa! <span className="inline-block animate-pulse">👋</span>
                </h1>
              </div>
              <div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-1.5 rounded-full shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  eco
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  100% Carbon Neutral
                </span>
              </div>
            </div>

            {/* Delivery Address Selector Pill */}
            {!isEditingAddress ? (
              <button 
                type="button"
                onClick={() => setIsEditingAddress(true)}
                className="self-start flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors py-1 group"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">location_on</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Deliver to: <strong className="text-on-surface font-semibold">{activeAddress.street}</strong>
                </span>
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:translate-y-0.5 transition-transform">
                  edit
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2 mt-1 bg-surface-container-low p-2 rounded-xl">
                <input 
                  type="text" 
                  value={addressInput} 
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="flex-1 bg-surface-container-lowest px-3 py-1.5 rounded-lg text-body-sm text-on-surface outline-none"
                  placeholder="Enter street address..."
                />
                <button 
                  type="button" 
                  onClick={handleSaveAddress}
                  className="px-3 py-1.5 bg-primary text-on-primary text-label-sm font-semibold rounded-lg"
                >
                  Save
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditingAddress(false)}
                  className="px-2 py-1.5 text-tertiary text-label-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </section>

          {/* Search & Instant Quick-Query Pills */}
          <section className="flex flex-col gap-space-sm">
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              <span className="material-symbols-outlined absolute left-space-md text-outline text-[22px] pointer-events-none">
                search
              </span>
              <input 
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your perfect kitchen essential..."
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm transition-all border border-surface-container/60"
              />
              <button 
                type="button"
                onClick={() => navigate('/catalog')}
                aria-label="Filter or Tune"
                className="absolute right-space-sm w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </form>

            {/* Quick Filter Suggestion Chips */}
            <div className="flex items-center gap-space-2xs overflow-x-auto no-scrollbar py-0.5">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider whitespace-nowrap pl-1 pr-1.5 font-semibold">
                Popular:
              </span>
              {SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="search-tag px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md whitespace-nowrap hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors border border-surface-container/40"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          {/* Free Shipping Progress Tracker */}
          <FreeShippingBar />

          {/* Hero Promo Banner */}
          <PromoHeroBanner />

          {/* Category Navigation Pills */}
          <CategoryPills />

          {/* Trending Products Header & 2-Column Responsive Grid */}
          <section className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Trending Essentials</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Cookbook-tested favorites this week</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                  Hot
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Curated Smart Bundle Card */}
          <section className="rounded-2xl bg-secondary-fixed/50 p-space-md shadow-sm relative overflow-hidden flex flex-col gap-space-sm border border-secondary-fixed">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">dataset</span>
                <span className="font-label-sm text-label-sm text-on-secondary-fixed uppercase tracking-wider font-bold">
                  Bundle Of The Week
                </span>
              </div>
              <span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                Save ${STARTER_BUNDLE_WEEK.savings}
              </span>
            </div>

            <div className="z-10 flex flex-col gap-1">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {STARTER_BUNDLE_WEEK.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {STARTER_BUNDLE_WEEK.description}
              </p>
            </div>

            <div className="z-10 flex items-center justify-between pt-1">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  ${STARTER_BUNDLE_WEEK.price}
                </span>
                <span className="font-body-md text-body-md text-outline line-through">
                  ${STARTER_BUNDLE_WEEK.origPrice}
                </span>
              </div>
              <button 
                type="button"
                onClick={handleClaimStarterBundle}
                className="px-space-md py-2.5 rounded-xl bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-md text-label-md font-semibold shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                <span>Claim Bundle</span>
              </button>
            </div>
          </section>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

