import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { PRODUCTS } from '../data/productsData';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const toggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 2) {
          const removed = prev[0];
          showToast('Updated compare list (maximum 2 items)');
          return [prev[1], id];
        }
        showToast('Added to compare list');
        return [...prev, id];
      }
    });
  };

  const isComparing = (id) => compareIds.includes(id);

  const clearCompare = () => {
    setCompareIds([]);
    setIsModalOpen(false);
  };

  const comparedProducts = compareIds.map(id => PRODUCTS.find(p => p.id === Number(id))).filter(Boolean);

  return (
    <CompareContext.Provider value={{
      compareIds,
      comparedProducts,
      isComparing,
      toggleCompare,
      clearCompare,
      isModalOpen,
      setIsModalOpen
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}

