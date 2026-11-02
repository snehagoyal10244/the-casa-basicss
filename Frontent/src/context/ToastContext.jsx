import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2800);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
      {/* Global Toast Component */}
      <div 
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transform transition-all duration-300 ease-out flex items-center gap-2.5 px-space-md py-2.5 rounded-full shadow-2xl pointer-events-none ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        } bg-inverse-surface text-inverse-on-surface`}
      >
        <span className="material-symbols-outlined text-primary-fixed text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {toast.type === 'error' ? 'error' : 'check_circle'}
        </span>
        <span className="font-body-sm text-body-sm font-medium tracking-wide">
          {toast.message}
        </span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

