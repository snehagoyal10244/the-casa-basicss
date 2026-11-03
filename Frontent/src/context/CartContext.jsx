import React, { createContext, useContext, useState, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    title: "Nordic Cast Iron Dutch Oven",
    subtitle: "Sage Mist • 5.5 Qt",
    category: "Heirloom Cookware",
    price: 89.00,
    qty: 1,
    color: "Sage Mist",
    size: "5.5 Qt",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcvwfZqXqBzTYKmdBu7VuNItqcLb-ExlTOIE0pok4chB_TCWp1kesN3_mtsTJDT9eOZ2v6V7bhyDmUhtc1IZr8NCRR7qmr0pTGH2F4GCrqxo7H9Hvk7VmSwS9gJcTStjlO5QMMID3DymCzfEvlBXHyyxp0SqBrApJDSpDNUWvhx7UtHbOk0wyoUXJuxB4vHOJaHgvdS7KB-8KVpY8usOgwTNdvY7lKqCFRLxm75Ko"
  },
  {
    id: 3,
    title: "Airtight Spice Jar Set",
    subtitle: "Borosilicate Glass • 12 pcs",
    category: "Pantry Organization",
    price: 38.00,
    qty: 2,
    color: "Natural Bamboo",
    size: "12 Jars",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ8ZSwFUE30H97YZgAWFwg_XPyGu25TN2OS8E6aWim1lOPIXqeAhcdSCby3yEBRtscsDZTtvfvfyvS-UJjKTVWISpgsa8DLT38Mtbs9O7sh7C_FC7dvm-ESCf73GFYhHzw3s0oh-dCEydRYRlMBUg0Cs_jslmH4bM0gS3LQAUUPkaxUbNM428ZEypl1ns40VEWkewnq6myxH2KWS4IoyC9a8taGmgpP25IdVnnHSU"
  },
  {
    id: 4,
    title: "Washed Flax Linen Apron",
    subtitle: "Terracotta • One Size",
    category: "Kitchen Linens",
    price: 32.00,
    qty: 1,
    color: "Terracotta",
    size: "One Size",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXnu1dZJ-ZXyq589GhYpGyJAa1cMtUH8OoWbyQ6BgXPj3lgtXdieB-OSG7dJLf_0q78F68qONs59V2qY9J6bTD0QD6VwNOiT-sBp8E8ijqrRvaj_Ge6DE3N1M3XRV0LsDQolD4rwjrb5UTC2KopH9GldMRSQ294kXJrAVNBfJEeJnuFcOFPtc67c_A2d2fn-BQhvMTd2pFPsNeLzaXpJ9bvHRKWfE51GvGgGuSuIY"
  }
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState(null); // { code: 'WELCOME10', discountPercent: 0.10 }
  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard' | 'express'
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // 'wallet' | 'card' | 'cod'
  const [latestOrder, setLatestOrder] = useState(null);
  const { showToast } = useToast();

  const freeShippingThreshold = 85;

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.qty, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!promoCode) return 0;
    return subtotal * promoCode.discountPercent;
  }, [subtotal, promoCode]);

  const shippingCost = useMemo(() => {
    if (deliveryMethod === 'express') return 8.00;
    if (subtotal >= freeShippingThreshold) return 0.00;
    return 4.95;
  }, [subtotal, deliveryMethod]);

  const taxAmount = useMemo(() => {
    const taxable = Math.max(0, subtotal - discountAmount);
    return Math.round(taxable * 0.08875 * 100) / 100;
  }, [subtotal, discountAmount]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost + taxAmount);
  }, [subtotal, discountAmount, shippingCost, taxAmount]);

  const shippingProgress = useMemo(() => {
    if (subtotal >= freeShippingThreshold) return 100;
    return Math.min(99, Math.round((subtotal / freeShippingThreshold) * 100));
  }, [subtotal]);

  const remainingForFreeShipping = useMemo(() => {
    return Math.max(0, freeShippingThreshold - subtotal);
  }, [subtotal]);

  const addToCart = (product, qty = 1, options = {}) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.color === (options.color || product.colors?.[0]?.name) &&
        item.size === (options.size || product.sizes?.[0]?.name)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          qty: next[existingIndex].qty + qty
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            subtitle: `${options.color || product.colors?.[0]?.name || ''} • ${options.size || product.sizes?.[0]?.name || ''}`.trim().replace(/^•|•$/g, ''),
            category: product.category || "Culinary Essential",
            price: options.price || product.price,
            qty: qty,
            color: options.color || product.colors?.[0]?.name || "Standard",
            size: options.size || product.sizes?.[0]?.name || "Standard",
            image: product.images?.[0] || product.image
          }
        ];
      }
    });
    showToast(`Added ${qty} × ${product.title} to your bag`);
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from your bag");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const restoreSampleItems = () => {
    setCartItems(INITIAL_CART_ITEMS);
    showToast("Sample items restored to bag");
  };

  const applyPromo = (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setPromoCode({ code: 'WELCOME10', discountPercent: 0.10, name: 'WELCOME10 (-10%)' });
      showToast("Coupon WELCOME10 applied! 10% off");
      return true;
    } else if (clean === 'CASA15') {
      setPromoCode({ code: 'CASA15', discountPercent: 0.15, name: 'CASA15 (-15%)' });
      showToast("Coupon CASA15 applied! 15% off");
      return true;
    } else {
      showToast("Invalid promo code. Try 'WELCOME10' or 'CASA15'", "error");
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode(null);
    showToast("Promo code removed");
  };

  const executeOrder = (orderDetails) => {
    const orderNumber = `CB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      subtotal,
      discountAmount,
      shippingCost,
      taxAmount,
      totalAmount,
      deliveryMethod,
      paymentMethod,
      address: orderDetails?.address || {
        name: "Maya Lin",
        street: "124 Riverside Terrace, Apt 4B",
        city: "New York, NY 10025"
      },
      status: "In Transit – Out for Delivery",
      courier: {
        name: "Leo K.",
        rating: 4.9,
        vehicle: "EcoExpress EV Cargo • 8 stops away",
        eta: "Thursday, Oct 24 • 2:00 PM – 4:00 PM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu2JwfTIKEsKl9LFefkkP6I0Fy1DCAfW5-b260Ua24nvKLkRIBD1X3cuPlDGPJXYzf7OvqKXcNN4iFAk5F46-3C04UZ0crxJUneqh85TLglqKZA1MbSFPd1jr7oLic7Ezaz1NfFbNBa6nomYHH03NNsTRyTp7pIBQHZSwWfV7qi-IkboR2bio99Jz3dO4QCioLkJh5Hdg6GiwwSzh2Y4hjMiLc0FCxMI78rNAorY4"
      }
    };
    setLatestOrder(newOrder);
    setCartItems([]);
    return newOrder;
  };

  const completeBackendOrder = (serverOrder) => {
    const newOrder = {
      orderId: serverOrder.orderNumber,
      date: new Date(serverOrder.createdAt || Date.now()).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      items: serverOrder.items.map((item) => ({
        ...item,
        id: item.legacyId || item.product,
        image: item.image,
        qty: item.qty
      })),
      subtotal: serverOrder.subtotal,
      discountAmount: serverOrder.discountAmount,
      shippingCost: serverOrder.shippingCost,
      taxAmount: serverOrder.taxAmount,
      totalAmount: serverOrder.totalAmount,
      deliveryMethod: serverOrder.deliveryMethod,
      paymentMethod: serverOrder.paymentMethod,
      address: serverOrder.shippingAddress,
      status: serverOrder.status,
      courier: serverOrder.courier
    };

    setLatestOrder(newOrder);
    setCartItems([]);
    return newOrder;
  };
  return (
    <CartContext.Provider value={{
      cartItems,
      totalItemCount,
      subtotal,
      discountAmount,
      shippingCost,
      taxAmount,
      totalAmount,
      shippingProgress,
      remainingForFreeShipping,
      freeShippingThreshold,
      promoCode,
      deliveryMethod,
      setDeliveryMethod,
      paymentMethod,
      setPaymentMethod,
      latestOrder,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      restoreSampleItems,
      applyPromo,
      removePromo,
      executeOrder,
      completeBackendOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

