import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

const WishlistContext = createContext(null);

const INITIAL_WISHLIST_ITEMS = [
  {
    id: 'item-1',
    productId: 6,
    title: "Handcrafted Olive Wood Salad Servers",
    price: 34,
    badge: "In Stock",
    badgeType: "primary",
    tag: "Natural matte finish",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1OXH5zJRanqB0fBnp5JR46Jhe9_rwSexkcKfFnxGwJKcxXmYpZQpjeGQg_L-0GXhIcU4y7TPeInE6JleTCmsJLsmjkXL0o-x8wvLjEF_waLYUL31I0VsMWLWLQGDTv1ahNboADhX-X63uOQ3ARqkMwb9uE9iO90yox53rj70Df8W_4BcMEYzNFmTNt6jgKSq0a3rfz4rH4QFz88o2vLb-QJBaVECIuqRqUV2vxbg"
  },
  {
    id: 'item-2',
    productId: 5,
    title: "Ceramic Pour-Over Coffee Set",
    price: 46,
    badge: "Price dropped by $8!",
    badgeType: "secondary",
    tag: "Oatmeal speckled glaze",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOuPpxAGOogEIt5EjOyKHGVUEQQKq8FXrKSqjW3xa2Hdd3IbbUuuMcMtBNUFvy98jRHMAPyd4jJ2n1coHhV7UTitTpBQlGQZRf5oCcAkVkuE5Nw94DhV0AwLHxp-R24iT6RXr9G80qOXsb0zt7S5DSnyxD-ksc_EVT6SkzWB_ZnD4GeLye2XO_s_leWBziC-DNisaic0xTF3IGa1ogJLaN39j39lj1VHV7g9WvYb0"
  },
  {
    id: 'item-3',
    productId: 2,
    title: "Japanese Deba Kitchen Knife",
    price: 72,
    badge: "In Stock",
    badgeType: "primary",
    tag: "Forged carbon steel",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATA0_amluDs9gCDv8U7vt9sb0tIdHjMQ90uZYmahPj6S-1erCJTWuZrmFRxZIGaxxIw5rkY2eSW0yRSjydN5SWSyoeDtaImSNUcP6Vcv0ZQxwD-dRfI4FtJRBBYVLFNRRTeoLkAcZA7P6AB6qm0ConbpFBdFfoLHvo35hdIGhoWlYwr5WOJedpzvDG67TPpyChWAThrb5hMaX4-gWX3o3--RSOLlCOm6xVD5nMCnM"
  },
  {
    id: 'item-4',
    productId: 1,
    title: "Nordic Cast Iron Dutch Oven",
    price: 89,
    badge: "Best Seller",
    badgeType: "primary",
    tag: "Sage Mist • 5.5 Qt",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcvwfZqXqBzTYKmdBu7VuNItqcLb-ExlTOIE0pok4chB_TCWp1kesN3_mtsTJDT9eOZ2v6V7bhyDmUhtc1IZr8NCRR7qmr0pTGH2F4GCrqxo7H9Hvk7VmSwS9gJcTStjlO5QMMID3DymCzfEvlBXHyyxp0SqBrApJDSpDNUWvhx7UtHbOk0wyoUXJuxB4vHOJaHgvdS7KB-8KVpY8usOgwTNdvY7lKqCFRLxm75Ko"
  }
];

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST_ITEMS);
  const { showToast } = useToast();
  const { addToCart } = useCart();

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId || item.id === productId);
  };

  const toggleWishlist = (product) => {
    const existing = wishlistItems.find(item => item.productId === product.id || item.id === product.id);
    if (existing) {
      setWishlistItems(prev => prev.filter(item => item !== existing));
      showToast('Removed from Wishlist');
    } else {
      const newItem = {
        id: `wish-${product.id}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        badge: "In Stock",
        badgeType: "primary",
        tag: product.subtitle || "Mindful Craft",
        image: product.images?.[0] || product.image
      };
      setWishlistItems(prev => [newItem, ...prev]);
      showToast('Saved to your Wishlist ❤️');
    }
  };

  const removeFromWishlist = (id, title) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    showToast(`Removed "${title || 'item'}" from Wishlist`);
  };

  const moveToCart = (item) => {
    addToCart({
      id: item.productId || item.id,
      title: item.title,
      price: item.price,
      images: [item.image]
    }, 1);
    removeFromWishlist(item.id, item.title);
  };

  const moveAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach(item => {
      addToCart({
        id: item.productId || item.id,
        title: item.title,
        price: item.price,
        images: [item.image]
      }, 1);
    });
    setWishlistItems([]);
    showToast('All items moved to your bag 🎉');
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      moveToCart,
      moveAllToCart
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

