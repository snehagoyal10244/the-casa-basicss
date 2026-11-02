import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function BottomNav() {
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  // Hide on onboarding if desired, or show everywhere
  if (location.pathname === '/onboarding') {
    return null;
  }

  const navItems = [
    { path: '/home', label: 'Home', icon: 'roofing' },
    { path: '/catalog', label: 'Browse', icon: 'space_dashboard' },
    { path: '/chef-ai', label: 'Chef AI', icon: 'auto_awesome' },
    { path: '/profile', label: 'Saved', icon: 'favorite', badge: wishlistCount > 0 ? wishlistCount : null },
    { path: '/cart', label: 'Bag', icon: 'shopping_bag', badge: totalItemCount > 0 ? totalItemCount : null }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(34,36,38,0.06)] border-t border-surface-container-high/60">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16 px-space-xs">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center gap-0.5 w-14 h-14 rounded-xl transition-all duration-200
              ${isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'}
            `}
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              
              {item.badge !== null && item.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 min-w-[16px] h-4 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] leading-none flex items-center justify-center font-bold shadow-[0_2px_4px_rgba(156,67,40,0.3)]">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="font-label-sm text-[11px] tracking-tight">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

