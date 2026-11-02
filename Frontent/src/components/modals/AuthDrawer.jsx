
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BRAND_EMBLEM_URL } from '../../data/productsData';

export default function AuthDrawer() {
  const {
    isAuthDrawerOpen,
    closeAuthDrawer,
    login,
    signup,
    loginAsGuest
  } = useAuth();

  const { showToast } = useToast();

  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAuthDrawerOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      if (mode === 'signin') {
        await login(email, password);
        showToast('Welcome back to The Casa Basics!');
      } else {
        await signup(name, email, password);
        showToast('Account created! Welcome to Casa Club.');
      }

      setPassword('');
    } catch (error) {
      showToast(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await loginAsGuest();
      showToast('Exploring The Casa Basics as Guest');
    } catch (error) {
      showToast(error.message || 'Guest login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = () => {
    showToast('Social login is coming soon!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">

      {/* Backdrop */}
      <div
        onClick={closeAuthDrawer}
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Card */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-t-3xl shadow-2xl px-margin pt-space-sm pb-space-xl z-10 transition-transform duration-300 ease-out animate-slide-up">

        {/* Handle Bar */}
        <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-space-sm"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center p-1">
              <img
                src={BRAND_EMBLEM_URL}
                alt="The Casa Basics Emblem"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              The Casa Basics
            </span>
          </div>

          <button
            type="button"
            onClick={closeAuthDrawer}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              close
            </span>
          </button>
        </div>

        {/* Tabs */}
        <div className="w-full bg-surface-container-low p-1 rounded-xl flex items-center mb-space-md">

          <button
            type="button"
            disabled={loading}
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all duration-200 ${mode === 'signin'
              ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
              }`}
          >
            Sign In
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all duration-200 ${mode === 'signup'
              ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
              }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-space-sm"
        >

          {mode === 'signup' && (
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-tertiary">
                Full Name
              </label>

              <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-2.5">
                <span className="material-symbols-outlined text-[18px] text-tertiary mr-2">
                  person
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline-variant outline-none"
                  required
                  minLength={2}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-tertiary">
              Email Address
            </label>

            <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-2.5">
              <span className="material-symbols-outlined text-[18px] text-tertiary mr-2">
                mail
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@thecasabasics.com"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline-variant outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">

            <div className="flex items-center justify-between">
              <label className="font-label-sm text-label-sm text-tertiary">
                Password
              </label>

              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => showToast('Password reset is coming soon.')}
                  className="font-label-sm text-label-sm text-secondary hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>

            <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-2.5">
              <span className="material-symbols-outlined text-[18px] text-tertiary mr-2">
                lock
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline-variant outline-none pr-8"
                required
                minLength={6}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-tertiary hover:text-on-surface flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-space-xs h-12 bg-secondary hover:bg-secondary-container text-on-secondary font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <span>
              {loading
                ? 'Please wait...'
                : mode === 'signin'
                  ? 'Enter Your Kitchen'
                  : 'Join The Casa Basics'}
            </span>

            {!loading && (
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-space-md">
          <div className="flex-1 h-[1px] bg-surface-variant"></div>

          <span className="font-label-sm text-label-sm text-tertiary">
            or continue with
          </span>

          <div className="flex-1 h-[1px] bg-surface-variant"></div>
        </div>

        {/* Social Login - Not integrated yet */}
        <div className="grid grid-cols-2 gap-space-xs">

          <button
            type="button"
            onClick={handleSocialLogin}
            className="h-11 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors active:scale-95"
          >
            <span className="font-bold text-blue-500">G</span>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={handleSocialLogin}
            className="h-11 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">apple</span>
            <span>Apple</span>
          </button>
        </div>

        {/* Guest Access */}
        <div className="mt-space-md text-center">
          <button
            type="button"
            onClick={handleGuest}
            disabled={loading}
            className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors inline-flex items-center gap-1.5 disabled:opacity-60"
          >
            <span>Explore Collection as Guest</span>

            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
