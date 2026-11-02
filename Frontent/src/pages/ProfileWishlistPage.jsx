import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProfileWishlistPage() {
  const navigate = useNavigate();
  const { user, logout, openAuthDrawer } = useAuth();
  const { wishlistItems, wishlistCount, removeFromWishlist, moveToCart, moveAllToCart } = useWishlist();
  const { showToast } = useToast();

  const handleSignOut = () => {
    logout();
    showToast('Signed out of The Casa Basics');
    navigate('/home');
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <Header title="User Settings" subtitle="The Casa Basics" showBack={true} />

      <main className="flex-1 w-full max-w-2xl mx-auto pt-16 pb-28">
        <div className="flex flex-col w-full pb-8">
          
          {/* Profile & Loyalty Header Card */}
          <section className="px-margin pt-space-md">
            <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm relative overflow-hidden border border-surface-container/60">
              {/* Decorative Arc SVG */}
              <svg className="absolute -right-12 -top-12 w-48 h-48 text-primary/5 pointer-events-none" fill="currentColor" viewBox="0 0 200 200">
                <path d="M45.5,-59.2C58.3,-50.7,67.6,-36.8,71.2,-21.4C74.8,-6,72.7,10.9,65.6,25.4C58.4,39.9,46.2,52,32.2,60.1C18.2,68.2,2.3,72.3,-14.2,70.5C-30.8,68.8,-48,61.2,-59.5,48.2C-71,35.2,-76.8,16.8,-75,-0.9C-73.2,-18.6,-63.9,-35.6,-50.8,-44.4C-37.7,-53.2,-20.9,-53.8,-3.2,-49.6C14.5,-45.4,32.7,-67.7,45.5,-59.2Z" transform="translate(100 100)" />
              </svg>

              <div className="flex items-center gap-space-md relative z-10">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name || "Maya Lin"} 
                    className="w-[72px] h-[72px] rounded-full object-cover shadow-sm bg-surface-container ring-2 ring-primary/20"
                  />
                  <button 
                    type="button"
                    onClick={() => showToast('Avatar update modal')}
                    aria-label="Edit Profile Avatar"
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary text-on-primary rounded-full flex items-center justify-center shadow hover:opacity-90 active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                  </button>
                </div>

                {/* Name & Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-space-2xs">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                      {user?.name || "Maya Lin"}
                    </h2>
                    <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                    {user?.email || "maya.lin@example.com"}
                  </p>
                  <div className="mt-space-2xs flex items-center gap-space-2xs">
                    <span className="inline-flex items-center px-space-xs py-0.5 rounded-full font-label-sm text-[11px] bg-secondary-fixed text-on-secondary-fixed font-bold">
                      {user?.tier || "Casa Club Gold"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Loyalty Perk Banner */}
              <div className="mt-space-md bg-surface-container rounded-lg p-space-sm flex items-center justify-between gap-space-xs border border-surface-container-high/60">
                <div className="flex items-center gap-space-xs min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>loyalty</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md text-on-surface truncate font-semibold">Enjoy 10% off all kitchenware</p>
                    <p className="font-body-sm text-[11px] text-tertiary">Gold tier perk automatically applied</p>
                  </div>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold shrink-0">
                  {user?.points || 840} pts
                </span>
              </div>
            </div>
          </section>

          {/* Quick Metrics Bar */}
          <section className="px-margin pt-space-md">
            <div className="grid grid-cols-4 gap-space-xs bg-surface-container-lowest rounded-xl p-space-sm shadow-sm border border-surface-container/60">
              <div onClick={() => navigate('/orders')} className="flex flex-col items-center text-center p-space-2xs cursor-pointer hover:bg-surface-container-low rounded-lg transition-colors">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">12</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Orders</span>
              </div>
              <div className="flex flex-col items-center text-center p-space-2xs">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">{wishlistCount}</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Wishlist</span>
              </div>
              <div className="flex flex-col items-center text-center p-space-2xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">3</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Addresses</span>
              </div>
              <div className="flex flex-col items-center text-center p-space-2xs">
                <span className="font-headline-sm text-headline-sm text-secondary font-bold">{user?.points || 840}</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Points</span>
              </div>
            </div>
          </section>

          {/* Wishlist Section */}
          <section className="pt-space-xl">
            <div className="px-margin flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Wishlist</h3>
                <span className="font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed px-space-xs py-0.5 rounded-full font-bold">
                  {wishlistCount} items
                </span>
              </div>

              {wishlistCount > 0 && (
                <button 
                  type="button"
                  onClick={moveAllToCart}
                  className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1 active:scale-95 font-semibold"
                >
                  <span>Move all to Cart</span>
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                </button>
              )}
            </div>

            {/* Wishlist Cards Stack */}
            <div className="px-margin flex flex-col gap-space-sm">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                  <article 
                    key={item.id}
                    className="wishlist-card bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex gap-space-sm items-center transition-all duration-300 border border-surface-container/60 hover:shadow-md"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-24 rounded-lg object-cover bg-surface-container shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-space-2xs">
                        <h4 className="font-label-md text-label-md text-on-surface line-clamp-1 font-semibold">
                          {item.title}
                        </h4>
                        <button 
                          type="button"
                          onClick={() => removeFromWishlist(item.id, item.title)}
                          aria-label="Remove item" 
                          className="text-outline hover:text-error transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-space-xs mt-1">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          ${item.price}
                        </span>
                        <span className={`font-label-sm text-[10px] px-space-2xs py-0.5 rounded font-medium ${
                          item.badgeType === 'secondary' ? 'bg-secondary-fixed text-secondary font-bold' : 'bg-primary-fixed/60 text-primary'
                        }`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="mt-space-xs flex items-center justify-between">
                        <span className="font-body-sm text-[11px] text-tertiary">{item.tag}</span>
                        <button 
                          type="button"
                          onClick={() => moveToCart(item)}
                          className="px-space-sm py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1 shadow-sm font-semibold"
                        >
                          <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="p-space-xl bg-surface-container-lowest rounded-xl text-center border border-surface-container">
                  <span className="material-symbols-outlined text-[32px] text-tertiary">favorite_border</span>
                  <p className="font-body-md text-on-surface font-semibold mt-1">Your wishlist is empty</p>
                  <p className="font-body-sm text-tertiary text-xs mt-0.5">Explore our kitchen catalog to save timeless pieces.</p>
                  <button 
                    type="button"
                    onClick={() => navigate('/catalog')}
                    className="mt-3 px-4 py-2 bg-primary text-on-primary rounded-lg text-label-sm font-semibold"
                  >
                    Browse Essentials
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Settings & Account Navigation Menu */}
          <section className="px-margin pt-space-xl space-y-2">
            <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Account Options</h4>
            
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container/60 divide-y divide-surface-container">
              <button 
                type="button"
                onClick={() => navigate('/orders')}
                className="w-full p-space-sm flex items-center justify-between hover:bg-surface-container-low transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">My Orders &amp; Live Tracking</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
              </button>

              <button 
                type="button"
                onClick={() => showToast('Shipping addresses management')}
                className="w-full p-space-sm flex items-center justify-between hover:bg-surface-container-low transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">Delivery Addresses (3 Saved)</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
              </button>

              <button 
                type="button"
                onClick={() => showToast('Payment methods management')}
                className="w-full p-space-sm flex items-center justify-between hover:bg-surface-container-low transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">credit_card</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">Payment Methods</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
              </button>

              <button 
                type="button"
                onClick={() => showToast('Notifications preferences')}
                className="w-full p-space-sm flex items-center justify-between hover:bg-surface-container-low transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">Notification Preferences</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
              </button>

              <button 
                type="button"
                onClick={handleSignOut}
                className="w-full p-space-sm flex items-center justify-between hover:bg-surface-container-low transition-colors text-left text-error"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-error text-[20px]">logout</span>
                  <span className="font-body-md text-body-md font-semibold">Sign Out</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
              </button>
            </div>
          </section>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

