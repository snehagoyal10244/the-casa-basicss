import React from 'react';
import { useNavigate } from 'react-router-dom';

const HOME_CATEGORIES = [
  { id: 'cookware', name: 'Cookware', icon: 'skillet', count: '48 items', color: 'bg-primary-fixed text-primary' },
  { id: 'prep', name: 'Utensils', icon: 'flatware', count: '36 items', color: 'bg-secondary-fixed text-secondary' },
  { id: 'pantry', name: 'Storage', icon: 'kitchen', count: '52 items', color: 'bg-tertiary-fixed text-tertiary' },
  { id: 'dining', name: 'Dining', icon: 'table_bar', count: '28 items', color: 'bg-surface-container-high text-on-surface-variant' },
  { id: 'bakeware', name: 'Bakeware', icon: 'bakery_dining', count: '19 items', color: 'bg-surface-container-high text-on-surface-variant' },
  { id: 'eco', name: 'Smart Tech', icon: 'smart_toy', count: '15 items', color: 'bg-primary-fixed-dim/40 text-primary' }
];

export default function CategoryPills() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Explore Kitchenry</h3>
        <button 
          type="button"
          onClick={() => navigate('/catalog')}
          className="font-label-md text-label-md text-primary hover:underline font-semibold flex items-center gap-0.5"
        >
          <span>All Rooms</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-space-xs">
        {HOME_CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            type="button"
            onClick={() => navigate(`/catalog?category=${cat.id}`)}
            className="cat-pill group flex flex-col items-center p-space-sm rounded-xl bg-surface-container-lowest hover:bg-primary-fixed/20 shadow-sm transition-all text-center border border-surface-container/30"
          >
            <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5`}>
              <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-semibold truncate w-full">
              {cat.name}
            </span>
            <span className="font-label-sm text-label-sm text-outline">
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

