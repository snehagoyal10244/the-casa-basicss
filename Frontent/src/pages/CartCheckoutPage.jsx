import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import QuantityStepper from '../components/common/QuantityStepper';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function CartCheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    totalAmount,
    promoCode,
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    updateQty,
    removeFromCart,
    restoreSampleItems,
    applyPromo,
    removePromo,
    executeOrder,
    latestOrder
  } = useCart();

  const { user, updateAddress } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); // 1: Cart | 2: Checkout | 3: Complete
  const [promoInput, setPromoInput] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(
    user?.addresses?.[0] || {
      name: "Maya Lin",
      street: "124 Riverside Terrace, Apt 4B",
      city: "New York, NY 10025",
      phone: "+1 (555) 234-8902"
    }
  );

  const handleApplyPromo = (e) => {
    e?.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoInput('');
    }
  };

  const handleApplySuggested = (code) => {
    applyPromo(code);
  };

  const handleSaveAddress = () => {
    updateAddress(addressForm);
    setIsEditingAddress(false);
    showToast("Shipping address updated");
  };

  const handlePlaceOrder = () => {
    const order = executeOrder({
      address: addressForm
    });
    setStep(3);
    showToast(`Order ${order.orderId} placed successfully! 🎉`);
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <Header title="Checkout Flow" subtitle="The Casa Basics" showBack={true} />

      <main className="flex-1 w-full max-w-2xl mx-auto px-margin pt-20 pb-28">
        <div className="flex flex-col space-y-space-md">
          
          {/* Progress Stepper Header */}
          <div className="w-full bg-surface-container-low rounded-xl p-space-sm shadow-sm border border-surface-container">
            <div className="flex items-center justify-between relative max-w-sm mx-auto">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-surface-container-highest -z-0"></div>
              <div 
                className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-primary -z-0 transition-all duration-300"
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
              ></div>

              {/* Step 1 Button */}
              <button 
                type="button"
                onClick={() => step > 1 && setStep(1)}
                className="relative z-10 flex flex-col items-center gap-space-2xs focus:outline-none"
              >
                <span className={`w-8 h-8 rounded-full font-label-md text-label-md flex items-center justify-center shadow-sm transition-all ${
                  step >= 1 ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  1
                </span>
                <span className={`font-label-sm text-label-sm ${step === 1 ? 'text-primary font-semibold' : 'text-on-surface-variant'}`}>
                  Cart
                </span>
              </button>

              {/* Step 2 Button */}
              <button 
                type="button"
                onClick={() => cartItems.length > 0 && setStep(2)}
                className="relative z-10 flex flex-col items-center gap-space-2xs focus:outline-none"
              >
                <span className={`w-8 h-8 rounded-full font-label-md text-label-md flex items-center justify-center transition-all ${
                  step >= 2 ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  2
                </span>
                <span className={`font-label-sm text-label-sm ${step === 2 ? 'text-primary font-semibold' : 'text-on-surface-variant'}`}>
                  Checkout
                </span>
              </button>

              {/* Step 3 Button */}
              <button 
                type="button"
                className="relative z-10 flex flex-col items-center gap-space-2xs cursor-default"
              >
                <span className={`w-8 h-8 rounded-full font-label-md text-label-md flex items-center justify-center transition-all ${
                  step === 3 ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  3
                </span>
                <span className={`font-label-sm text-label-sm ${step === 3 ? 'text-primary font-semibold' : 'text-on-surface-variant'}`}>
                  Complete
                </span>
              </button>
            </div>
          </div>

          {/* STEP 1: SHOPPING CART */}
          {step === 1 && (
            <div className="flex flex-col space-y-space-md animate-fade-in">
              {/* Free Shipping Unlocked Banner */}
              <div className="w-full bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex items-start gap-space-sm border border-surface-container/60">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_shipping
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-space-2xs">
                    <span className="font-label-md text-label-md text-primary font-semibold">Special Benefit Unlocked</span>
                    <span className="font-label-sm text-label-sm px-space-2xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                      Free
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    🎉 Congratulations! You have unlocked <span className="font-semibold text-on-surface">Free Express Shipping</span> for this order.
                  </p>
                </div>
              </div>

              {/* Cart Items List */}
              {cartItems.length > 0 ? (
                <div className="flex flex-col space-y-space-sm">
                  {cartItems.map((item) => (
                    <div 
                      key={`${item.id}-${item.color || ''}-${item.size || ''}`}
                      className="w-full bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex gap-space-sm relative transition-all border border-surface-container/40"
                    >
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-space-2xs">
                          <div className="min-w-0">
                            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                              {item.category || "Artisan Kitchen"}
                            </span>
                            <h2 className="font-headline-sm text-sm font-semibold text-on-surface truncate">
                              {item.title}
                            </h2>
                            <p className="font-body-sm text-xs text-on-surface-variant">
                              {item.subtitle || `${item.color || ''} • ${item.size || ''}`}
                            </p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.title}`}
                            className="text-tertiary hover:text-error transition-colors p-1 -mr-1"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-space-xs">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                          <QuantityStepper 
                            value={item.qty} 
                            onMinus={() => updateQty(item.id, -1)} 
                            onPlus={() => updateQty(item.id, 1)} 
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="w-full bg-surface-container-lowest rounded-xl p-space-xl text-center shadow-sm flex flex-col items-center border border-surface-container">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-tertiary mb-space-sm">
                    <span className="material-symbols-outlined text-[32px]">shopping_basket</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Your bag is tranquil &amp; empty</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs">
                    Explore handcrafted essentials curated for timeless everyday living.
                  </p>
                  <button 
                    type="button"
                    onClick={restoreSampleItems}
                    className="mt-space-md px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container transition-all"
                  >
                    Restore Sample Items
                  </button>
                </div>
              )}

              {/* Promotional Code Box */}
              {cartItems.length > 0 && (
                <div className="w-full bg-surface-container-lowest rounded-xl p-space-sm shadow-sm space-y-space-xs border border-surface-container/60">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">sell</span>
                      Voucher or Gift Code
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleApplySuggested('WELCOME10')}
                      className="font-label-sm text-label-sm text-primary hover:underline font-medium"
                    >
                      Apply WELCOME10 (-10%)
                    </button>
                  </div>

                  <form onSubmit={handleApplyPromo} className="flex gap-space-2xs">
                    <input 
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try 'CASA15' or 'WELCOME10'"
                      className="w-full h-11 bg-surface-container-low rounded-lg px-space-sm font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface uppercase"
                    />
                    <button 
                      type="submit"
                      className="px-space-md h-11 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center font-semibold"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Active Promo Tag */}
                  {promoCode && (
                    <div className="flex items-center justify-between bg-primary-fixed/40 rounded-lg px-space-sm py-1.5 mt-space-2xs">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                        <span className="font-label-sm text-label-sm text-on-primary-fixed-variant font-medium">
                          Coupon {promoCode.code} Active ({(promoCode.discountPercent * 100)}% off)
                        </span>
                      </div>
                      <button 
                        type="button"
                        onClick={removePromo}
                        className="text-tertiary hover:text-error font-label-sm text-label-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Order Summary Card */}
              {cartItems.length > 0 && (
                <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm border border-surface-container/60">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Order Summary</h3>
                  
                  <div className="space-y-space-xs font-body-sm text-body-sm">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Cart Subtotal</span>
                      <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-secondary">
                        <span>Special Savings</span>
                        <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-on-surface-variant">
                      <span>Express Delivery</span>
                      <span className="font-medium text-primary">
                        {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-on-surface-variant">
                      <span>Estimated Sales Tax (8.875%)</span>
                      <span className="font-medium text-on-surface">${taxAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-space-xs flex justify-between items-baseline bg-surface-container-low rounded-lg p-space-sm">
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Total Amount</span>
                      <p className="font-label-sm text-[11px] text-on-surface-variant">Includes all municipal import taxes</p>
                    </div>
                    <span className="font-headline-xl text-xl text-primary font-bold">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full h-12 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-2xs shadow-sm hover:opacity-95 active:scale-[0.98] transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: STREAMLINED CHECKOUT */}
          {step === 2 && (
            <div className="flex flex-col space-y-space-md animate-fade-in">
              {/* Shipping Address Box */}
              <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-xs border border-surface-container/60">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                    Shipping Address
                  </span>
                  <button 
                    type="button"
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="font-label-sm text-label-sm text-primary hover:underline font-medium"
                  >
                    {isEditingAddress ? 'Cancel' : 'Edit / Change'}
                  </button>
                </div>

                {!isEditingAddress ? (
                  <div className="bg-surface-container-low rounded-lg p-space-sm flex items-start justify-between">
                    <div className="space-y-0.5">
                      <p className="font-body-md text-body-md font-semibold text-on-surface">{addressForm.name}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{addressForm.street}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{addressForm.city}</p>
                      <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 pt-1 font-medium">
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        {addressForm.phone} • Default Residence
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                ) : (
                  <div className="bg-surface-container-low rounded-lg p-space-sm space-y-space-xs">
                    <input 
                      type="text" 
                      value={addressForm.name}
                      onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full h-10 px-3 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface outline-none"
                    />
                    <input 
                      type="text" 
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      placeholder="Street Address"
                      className="w-full h-10 px-3 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface outline-none"
                    />
                    <input 
                      type="text" 
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      placeholder="City, State, Zip"
                      className="w-full h-10 px-3 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface outline-none"
                    />
                    <button 
                      type="button" 
                      onClick={handleSaveAddress}
                      className="w-full h-9 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold"
                    >
                      Update Address
                    </button>
                  </div>
                )}
              </div>

              {/* Delivery Speed Selection */}
              <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-xs border border-surface-container/60">
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                  Delivery Method
                </span>
                
                <div className="grid grid-cols-1 gap-space-xs">
                  {/* Standard */}
                  <label 
                    onClick={() => setDeliveryMethod('standard')}
                    className={`cursor-pointer relative flex items-center justify-between p-space-sm rounded-lg transition-all border ${
                      deliveryMethod === 'standard' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        checked={deliveryMethod === 'standard'} 
                        onChange={() => setDeliveryMethod('standard')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <div>
                        <p className="font-body-md text-body-md text-on-surface font-semibold">Standard Shipping</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">Arrival in 3–4 business days</p>
                      </div>
                    </div>
                    <span className="font-label-md text-label-md text-primary font-bold uppercase">Free</span>
                  </label>

                  {/* Express White Glove */}
                  <label 
                    onClick={() => setDeliveryMethod('express')}
                    className={`cursor-pointer relative flex items-center justify-between p-space-sm rounded-lg transition-all border ${
                      deliveryMethod === 'express' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        checked={deliveryMethod === 'express'} 
                        onChange={() => setDeliveryMethod('express')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-body-md text-body-md text-on-surface font-semibold">Express White Glove</p>
                          <span className="font-label-sm text-[10px] bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded-full font-bold">Next Day</span>
                        </div>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">Guaranteed delivery by 12:00 PM</p>
                      </div>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">+$8.00</span>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-xs border border-surface-container/60">
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">credit_card</span>
                  Payment Selection
                </span>
                
                <div className="space-y-space-xs">
                  {/* UPI / One Tap */}
                  <label 
                    onClick={() => setPaymentMethod('wallet')}
                    className={`cursor-pointer flex items-center justify-between p-space-sm rounded-lg transition-all border ${
                      paymentMethod === 'wallet' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'wallet'} 
                        onChange={() => setPaymentMethod('wallet')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <div>
                        <p className="font-body-md text-body-md text-on-surface font-semibold">Instant UPI / One-Tap Pay</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">Google Pay, Apple Pay • Fast confirmation</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">contactless</span>
                  </label>

                  {/* Card */}
                  <label 
                    onClick={() => setPaymentMethod('card')}
                    className={`cursor-pointer flex items-center justify-between p-space-sm rounded-lg transition-all border ${
                      paymentMethod === 'card' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <div>
                        <p className="font-body-md text-body-md text-on-surface font-semibold">Credit or Debit Card</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">Saved Visa ending in <span className="font-mono text-on-surface font-bold">4242</span></p>
                      </div>
                    </div>
                    <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-surface-container-highest font-mono text-on-surface font-bold">VISA</span>
                  </label>

                  {/* Cash on Delivery */}
                  <label 
                    onClick={() => setPaymentMethod('cod')}
                    className={`cursor-pointer flex items-center justify-between p-space-sm rounded-lg transition-all border ${
                      paymentMethod === 'cod' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <div>
                        <p className="font-body-md text-body-md text-on-surface font-semibold">Pay on Delivery</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">Cash or mobile contactless at doorstep</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">payments</span>
                  </label>
                </div>
              </div>

              {/* Order Placement CTA */}
              <div className="pt-space-xs space-y-space-xs">
                <button 
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full h-14 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-2xs shadow-md active:scale-[0.98] transition-all"
                >
                  <span>Place Order (${totalAmount.toFixed(2)})</span>
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center py-2 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface"
                >
                  ← Return to edit items
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS / CONFIRMATION */}
          {step === 3 && (
            <div className="flex flex-col space-y-space-lg text-center items-center py-space-sm animate-fade-in">
              {/* Pulse Circle */}
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg">
                    <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 max-w-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                  Transaction Successful
                </span>
                <h2 className="font-headline-xl text-2xl font-bold text-on-surface">Order Confirmed!</h2>
                <p className="font-label-md text-label-md text-tertiary font-mono">
                  Invoice Reference: {latestOrder?.orderId || "#CB-84920"}
                </p>
              </div>

              <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm text-left space-y-2 border border-surface-container">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-sm text-tertiary uppercase">Delivery Address</span>
                  <span className="font-label-sm text-primary font-semibold">Standard Verified</span>
                </div>
                <p className="font-body-md text-on-surface font-semibold">{latestOrder?.address?.name || "Maya Lin"}</p>
                <p className="font-body-sm text-on-surface-variant">{latestOrder?.address?.street || "124 Riverside Terrace, Apt 4B"}</p>
                <p className="font-body-sm text-on-surface-variant">{latestOrder?.address?.city || "New York, NY 10025"}</p>
              </div>

              <div className="w-full space-y-2 pt-2">
                <button 
                  type="button"
                  onClick={() => navigate('/orders')}
                  className="w-full h-12 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-primary-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>Track Live Package</span>
                </button>
                <button 
                  type="button"
                  onClick={() => navigate('/home')}
                  className="w-full h-12 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
                >
                  Continue Curating
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

