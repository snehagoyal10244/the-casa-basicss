import React, { useState, useEffect, useRef } from 'react';
import AuthDrawer from '../modals/AuthDrawer';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BRAND_NAME, BRAND_EMBLEM_URL, USER_PROFILE_AVATAR } from '../../data/productsData';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import CategoryMegaMenu from './CategoryMegaMenu';
import MobileNavDrawer from './MobileNavDrawer';
import QuickSearchModal from '../modals/QuickSearchModal';
import AboutUsModal from '../modals/AboutUsModal';

export default function Header({ title = "The Casa Basics", subtitle = "", showBack = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, openAuthDrawer } = useAuth();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPromoBar, setShowPromoBar] = useState(true);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const profileRef = useRef(null);
  const megaMenuTimeoutRef = useRef(null);

  // Scroll detection for sticky header compression & elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mega menu hover delay helpers
  const handleMegaMenuMouseEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  const isCurrentActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
        
        {/* Top Micro Announcement Ticker */}
        {showPromoBar && (
          <div className="bg-[#253D32] text-[#FAF8F5] text-[11px] font-medium tracking-wide py-1.5 px-4 transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Left announcement text */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C445] animate-pulse"></span>
                <span>Warm Nordic Culinary Essentials • Handcrafted For Everyday Living</span>
              </div>

              {/* Center Gen Z promo chip */}
              <div className="mx-auto sm:mx-0 flex items-center gap-2">
                <span className="font-bold text-[#FDE68A]">✨ CODE: CASA15</span>
                <span className="text-[#D8E6DB]">• Free Shipping Over $150</span>
              </div>

              {/* Right utility links */}
              <div className="hidden md:flex items-center gap-3 text-[#D8E6DB]">
                <button 
                  onClick={() => navigate('/orders')} 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                  <span>Track Order</span>
                </button>
                <span className="text-white/20">|</span>
                <button 
                  onClick={() => setIsAboutOpen(true)} 
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={() => setShowPromoBar(false)} 
                  className="ml-1 text-white/60 hover:text-white transition-colors"
                  title="Dismiss banner"
                  aria-label="Dismiss banner"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Main Sticky Navigation Bar */}
        <div 
          className={`w-full transition-all duration-200 ${
            isScrolled
              ? 'bg-[#FAF8F5]/95 backdrop-blur-2xl shadow-[0_8px_30px_rgba(37,61,50,0.07)] border-b border-[#E8E2D5] py-2.5'
              : 'bg-[#FAF8F5]/88 backdrop-blur-xl border-b border-[#E8E2D5]/70 py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 relative">
            
            {/* Left Section: Back Button + Prominent Brand Logo */}
            <div className="flex items-center gap-3 min-w-0">
              {showBack && (
                <button 
                  onClick={() => navigate(-1)} 
                  aria-label="Go back"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EB] text-[#253D32] hover:bg-[#EBF3EC] transition-all active:scale-95 flex-shrink-0"
                  title="Previous page"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
              )}

              {/* Brand Logo & Editorial Wordmark */}
              <div 
                onClick={() => navigate('/home')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                {/* Emblem with Gen Z pastel gradient glow container */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#EBF3EC] via-[#FAF8F5] to-[#FFF0EB] p-1.5 flex items-center justify-center border border-[#D8E6DB] shadow-xs group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                  <img 
                    src={BRAND_EMBLEM_URL} 
                    alt="The Casa Basics Emblem" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Editorial Typography */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-lg text-[16px] sm:text-[18px] md:text-[20px] font-bold text-[#253D32] tracking-[0.12em] uppercase leading-none truncate group-hover:text-[#365747] transition-colors">
                      {BRAND_NAME}
                    </span>
                    <span className="hidden lg:inline-flex text-[#D97706] text-[11px] leading-none" title="Heirloom Quality">
                      ✦
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-[#365747] leading-none truncate">
                      Nordic Culinary Living
                    </span>
                    {subtitle && (
                      <span className="hidden sm:inline-flex text-[9px] font-medium text-[#8A958F] uppercase tracking-wider">
                        • {subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              
              {/* Home */}
              <Link
                to="/home"
                className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isCurrentActive('/home')
                    ? 'bg-[#EBF3EC] text-[#253D32] shadow-xs'
                    : 'text-[#4A544E] hover:text-[#253D32] hover:bg-[#F5F2EB]'
                }`}
              >
                Home
              </Link>

              {/* Shop All */}
              <Link
                to="/catalog"
                className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isCurrentActive('/catalog') && !isMegaMenuOpen
                    ? 'bg-[#EBF3EC] text-[#253D32] shadow-xs'
                    : 'text-[#4A544E] hover:text-[#253D32] hover:bg-[#F5F2EB]'
                }`}
              >
                Shop
              </Link>

              {/* Categories with Mega Menu Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleMegaMenuMouseEnter}
                onMouseLeave={handleMegaMenuMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1 ${
                    isMegaMenuOpen
                      ? 'bg-[#253D32] text-white shadow-xs'
                      : 'text-[#4A544E] hover:text-[#253D32] hover:bg-[#F5F2EB]'
                  }`}
                >
                  <span>Categories</span>
                  <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Dropdown Mega Menu Component */}
                <CategoryMegaMenu 
                  isOpen={isMegaMenuOpen} 
                  onClose={() => setIsMegaMenuOpen(false)} 
                />
              </div>

              {/* AI Kitchen (Hero Feature) with Gen Z badge */}
              <Link
                to="/chef-ai"
                className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  isCurrentActive('/chef-ai')
                    ? 'bg-[#253D32] text-white shadow-xs'
                    : 'bg-gradient-to-r from-[#EBF3EC] to-[#FEF9C3] text-[#253D32] hover:shadow-xs border border-[#D8E6DB]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-[#D97706]">auto_awesome</span>
                <span>AI Kitchen</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#D97706] text-white text-[9px] font-bold">
                  20% OFF
                </span>
              </Link>

              {/* About Us Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsAboutOpen(true)}
                className="px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide text-[#4A544E] hover:text-[#253D32] hover:bg-[#F5F2EB] transition-all"
              >
                About Us
              </button>

            </nav>

            {/* Right Section: Search, Wishlist, Cart, Profile & Mobile Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              
              {/* Quick Search Button (Desktop Pill) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F5F2EB] hover:bg-[#EBF3EC] text-[#55635B] hover:text-[#253D32] border border-[#E8E2D5] transition-all text-xs font-medium cursor-pointer shadow-xs active:scale-95"
                title="Search (Click or Esc)"
              >
                <span className="material-symbols-outlined text-[18px] text-[#253D32]">search</span>
                <span className="hidden xl:inline text-[#8A958F]">Search cookware...</span>
                <kbd className="hidden lg:inline-flex text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8E2D5] text-[#6F7570]">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search Products"
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EB] text-[#253D32] hover:bg-[#EBF3EC] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>

              {/* Wishlist Button with Peach Accent Badge */}
              <button 
                onClick={() => navigate('/profile')}
                aria-label="Saved Wishlist"
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#F5F2EB] text-[#253D32] hover:bg-[#FFF0EB] hover:text-[#F08466] transition-all active:scale-95 border border-transparent hover:border-[#FDE8E1]"
                title="Wishlist & Saved Items"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-4 rounded-full bg-[#F08466] text-white text-[10px] font-bold leading-none flex items-center justify-center shadow-xs animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag with Butter-Gold Accent Badge */}
              <button 
                onClick={() => navigate('/cart')}
                aria-label="Shopping Bag"
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#F5F2EB] text-[#253D32] hover:bg-[#FEF9C3] hover:text-[#253D32] transition-all active:scale-95 border border-transparent hover:border-[#FDE68A]"
                title="Shopping Bag"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-4 rounded-full bg-[#F6C445] text-[#253D32] text-[10px] font-bold leading-none flex items-center justify-center shadow-xs">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* User Profile Avatar & Interactive Flyout Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  aria-label="Account Settings"
                  className="relative flex items-center justify-center rounded-full p-0.5 hover:ring-2 hover:ring-[#365747] transition-all active:scale-95 ml-0.5"
                  title="Account Profile"
                >
                  <img 
                    src={user?.avatar || USER_PROFILE_AVATAR} 
                    alt="User Profile" 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-[#D8E6DB]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#253D32] ring-2 ring-white"></span>
                </button>

                {/* Profile Flyout Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#FAF8F5] rounded-3xl shadow-[0_20px_50px_rgba(37,61,50,0.18)] border border-[#E8E2D5] p-3 animate-fade-in-down z-50">
                    <div className="p-3 border-b border-[#E8E2D5] bg-[#F5F2EB]/60 rounded-2xl mb-2">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={user?.avatar || USER_PROFILE_AVATAR} 
                          alt="Avatar" 
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#365747]/30"
                        />
                        <div className="min-w-0">
                          <h5 className="font-bold text-sm text-[#253D32] truncate">
                            {user?.name || "Maya Lin"}
                          </h5>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A16207] bg-[#FEF9C3] px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {user?.tier || "Casa Club Gold"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-[#E8E2D5] flex items-center justify-between text-xs text-[#55635B]">
                        <span>Points Balance</span>
                        <strong className="text-[#253D32]">{user?.points || 840} pts</strong>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#253D32] hover:bg-[#EBF3EC] transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#365747]">account_circle</span>
                        <span>Account & Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          navigate('/orders');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#253D32] hover:bg-[#EBF3EC] transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#365747]">local_shipping</span>
                        <span>Order Tracking</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#253D32] hover:bg-[#FFF0EB] text-left transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#F08466]">favorite</span>
                        <span>Wishlist ({wishlistCount})</span>
                      </button>

                      <div className="pt-1 border-t border-[#E8E2D5]">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            openAuthDrawer();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#8A958F] hover:text-[#253D32] hover:bg-[#F5F2EB] transition-colors text-left"
                        >
                          <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                          <span>Switch Account / Sign In</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Menu Button (Gen Z Chic Animated Icon) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center rounded-2xl bg-[#F5F2EB] text-[#253D32] hover:bg-[#EBF3EC] transition-all active:scale-95 gap-1 ml-1"
              >
                <span className={`w-4 h-0.5 bg-[#253D32] rounded-full transition-all duration-200 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`w-4 h-0.5 bg-[#253D32] rounded-full transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-4 h-0.5 bg-[#253D32] rounded-full transition-all duration-200 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </button>

            </div>

          </div>
        </div>

      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* About Us Brand Story Modal */}
      <AboutUsModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
<AuthDrawer />
    </>
  );
}