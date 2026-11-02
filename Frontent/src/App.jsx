import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

// Pages
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartCheckoutPage from './pages/CartCheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfileWishlistPage from './pages/ProfileWishlistPage';
import ChefAIPage from './pages/ChefAIPage';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <BrowserRouter>
                <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
                  <Routes>
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartCheckoutPage />} />
                    <Route path="/orders" element={<OrderTrackingPage />} />
                    <Route path="/profile" element={<ProfileWishlistPage />} />
                    <Route path="/wishlist" element={<ProfileWishlistPage />} />
                    <Route path="/chef-ai" element={<ChefAIPage />} />
                    
                    {/* Default root path goes to HomePage */}
                    <Route path="/" element={<HomePage />} />
                    {/* Wildcard redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
