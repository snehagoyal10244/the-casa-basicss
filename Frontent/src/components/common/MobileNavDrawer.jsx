import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BRAND_NAME, BRAND_EMBLEM_URL, USER_PROFILE_AVATAR } from '../../data/productsData';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function MobileNavDrawer({ isOpen, onClose, onOpenAbout, onOpenSearch }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  if (!isOpen) return null;

  const handleNavClick = (path) => {
    onClose();
    navigate(path);
  };

  const categoryLinks = [
    { name: "Cast Iron Cookware", filter: "cookware", icon: "skillet" },
    { name: "Damascus Cutlery & Prep", filter: "prep", icon: "flatware" },
    { name: "Pantry & Spice Storage", filter: "pantry", icon: "kitchen" },
    { name: "Ceramic Dining Sets", filter: "dining", icon: "table_bar" },
    { name: "Organic Table Linens", filter: "eco", icon: "eco" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2B24]/40 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF8F5] h-full shadow-[0_0_50px_rgba(37,61,50,0.2)] border-l border-[#E8E2D5] flex flex-col z-10 animate-slide-in-right overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D5] bg-[#FAF8F5] flex items-center justify-between">
          <div 
            onClick={() => handleNavClick('/home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#EBF3EC] to-[#FFF0EB] p-1 flex items-center justify-center border border-[#D8E6DB]">
              <img src={BRAND_EMBLEM_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-headline-lg text-sm font-bold tracking-[0.14em] text-[#253D32] uppercase leading-none">
                {BRAND_NAME}
              </h3>
              <span className="text-[9px] font-bold tracking-widest text-[#A16207] uppercase">
                Nordic Culinary Studio
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-[#EFECE6] hover:bg-[#E2DDD3] text-[#253D32] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Bar Input inside Mobile Menu */}
        <div className="p-4 border-b border-[#E8E2D5] bg-[#F5F2EB]/50">
          <div 
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full py-2.5 px-3.5 rounded-2xl bg-white border border-[#E8E2D5] flex items-center gap-2.5 text-xs text-[#6F7570] cursor-pointer hover:border-[#365747] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-[#253D32]">search</span>
            <span className="flex-1 font-medium">Search pots, knives, ceramics...</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF8F5] text-[#253D32] border border-[#E8E2D5]">
              FIND
            </span>
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 text-[#253D32]">
          
          <button
            onClick={() => handleNavClick('/home')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-[#EBF3EC] transition-colors text-left group"
          >
            <span className="w-8 h-8 rounded-xl bg-[#EBF3EC] group-hover:bg-[#D8E6DB] text-[#253D32] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[18px]">roofing</span>
            </span>
            <span className="font-semibold text-sm flex-1">Home</span>
            <span className="material-symbols-outlined text-[16px] text-[#8A958F]">chevron_right</span>
          </button>

          <button
            onClick={() => handleNavClick('/catalog')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-[#EBF3EC] transition-colors text-left group"
          >
            <span className="w-8 h-8 rounded-xl bg-[#FFF0EB] group-hover:bg-[#FDE8E1] text-[#F08466] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </span>
            <span className="font-semibold text-sm flex-1">Shop All Products</span>
            <span className="material-symbols-outlined text-[16px] text-[#8A958F]">chevron_right</span>
          </button>

          {/* Categories Accordion */}
          <div className="rounded-2xl border border-[#E8E2D5] overflow-hidden bg-white">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="w-full flex items-center justify-between p-3 text-left font-semibold text-sm hover:bg-[#F5F2EB] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#EBF3EC] text-[#253D32] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">category</span>
                </span>
                <span>Categories</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-[#8A958F] transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {categoriesOpen && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-[#FAF8F5]/50 border-t border-[#E8E2D5]">
                {categoryLinks.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      onClose();
                      navigate(`/catalog?category=${cat.filter}`);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#4A544E] hover:text-[#253D32] hover:bg-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#365747]">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Kitchen Assistant & Bundle Builder */}
          <button
            onClick={() => handleNavClick('/chef-ai')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#EBF3EC] to-[#FEF9C3] border border-[#D8E6DB] text-left group shadow-xs"
          >
            <span className="w-8 h-8 rounded-xl bg-[#253D32] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[#253D32]">Chef AI & Bundles</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#D97706] text-white text-[9px] font-bold">
                  SAVE 20%
                </span>
              </div>
              <span className="text-[10px] text-[#55635B]">Interactive recipe and utensil sets</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#253D32]">chevron_right</span>
          </button>

          {/* Track Active Order */}
          <button
            onClick={() => handleNavClick('/orders')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-[#EBF3EC] transition-colors text-left group"
          >
            <span className="w-8 h-8 rounded-xl bg-[#FEF9C3] text-[#A16207] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </span>
            <span className="font-semibold text-sm flex-1">Order Tracking</span>
            <span className="material-symbols-outlined text-[16px] text-[#8A958F]">chevron_right</span>
          </button>

          {/* About The Casa Basics Modal Trigger */}
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-[#EBF3EC] transition-colors text-left group"
          >
            <span className="w-8 h-8 rounded-xl bg-[#F5F2EB] text-[#253D32] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">info</span>
            </span>
            <div className="flex-1">
              <span className="font-semibold text-sm block">About Us</span>
              <span className="text-[10px] text-[#8A958F]">Scandinavian & Japanese Story</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8A958F]">chevron_right</span>
          </button>

        </div>

        {/* Quick User & Actions Footer */}
        <div className="p-4 border-t border-[#E8E2D5] bg-[#F5F2EB]/80 space-y-3">
          
          {/* User Row */}
          <div 
            onClick={() => handleNavClick('/profile')}
            className="flex items-center justify-between p-2 rounded-2xl bg-white border border-[#E8E2D5] cursor-pointer hover:border-[#365747] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <img 
                src={user?.avatar || USER_PROFILE_AVATAR} 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#365747]/20"
              />
              <div>
                <h5 className="font-bold text-xs text-[#253D32] leading-tight">
                  {user?.name || "Maya Lin"}
                </h5>
                <span className="text-[10px] text-[#A16207] font-semibold">
                  {user?.tier || "Casa Club Gold"} • {user?.points || 840} pts
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8A958F]">arrow_forward</span>
          </div>

          {/* Quick Wishlist & Cart Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('/profile')}
              className="py-2.5 px-3 rounded-xl bg-white border border-[#E8E2D5] hover:bg-[#FFF0EB] transition-colors flex items-center justify-center gap-2 text-xs font-bold text-[#253D32]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#F08466]">favorite</span>
              <span>Wishlist ({wishlistCount})</span>
            </button>

            <button
              onClick={() => handleNavClick('/cart')}
              className="py-2.5 px-3 rounded-xl bg-[#253D32] text-white hover:bg-[#1E2B24] transition-colors flex items-center justify-center gap-2 text-xs font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FEF9C3]">shopping_bag</span>
              <span>Bag ({totalItemCount})</span>
            </button>
          </div>

          {/* Carbon Neutral Banner */}
          <div className="text-center">
            <span className="text-[10px] font-medium text-[#6F7570]">
              🌱 100% Carbon-Neutral Delivery • Free Over $150
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
