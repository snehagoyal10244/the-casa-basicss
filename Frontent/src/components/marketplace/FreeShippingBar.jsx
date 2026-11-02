import React from 'react';
import { useCart } from '../../context/CartContext';

export default function FreeShippingBar() {
  const { subtotal, freeShippingThreshold, shippingProgress, remainingForFreeShipping } = useCart();
  const isUnlocked = subtotal >= freeShippingThreshold;

  return (
    <section className="bg-primary-fixed/30 rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs border border-primary-fixed/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">
            local_shipping
          </span>
          <span className="font-body-md text-body-md text-on-surface font-medium truncate">
            {isUnlocked ? (
              <span>🎉 You unlocked <strong className="text-primary font-bold">Free Express Delivery!</strong></span>
            ) : (
              <span>Add <strong className="text-secondary font-semibold">${remainingForFreeShipping.toFixed(0)} more</strong> for Free Express Delivery!</span>
            )}
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-bold flex-shrink-0 ml-2">
          {shippingProgress}%
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-700 ease-out" 
          style={{ width: `${shippingProgress}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-0.5">
        <span>Standard $4.95</span>
        <span className="text-primary font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">bolt</span> Express Unlocks at $85
        </span>
      </div>
    </section>
  );
}

