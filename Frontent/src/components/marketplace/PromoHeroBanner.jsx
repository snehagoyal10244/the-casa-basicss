import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PromoHeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-md bg-surface-container-highest flex flex-col group">
      <div 
        className="w-full h-56 bg-cover bg-center relative transition-transform duration-700 group-hover:scale-102"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjW3BiaWytClXJjEXy8ABq5GkoWJn9nhVFP2rB8an-6tSztNRQRPUDnE2_n2vfJXEcKkPiwtNuTFjm3fVICJppvXy-nrX3LYh-wcOKtlESrKzSVrN8bszl5oRDsHvaQXKtGbsIslMguGANv4zH9cdVjI4I6GHI8cCoK98BNC1JZDG0m5YbU8brcLMgMoPgpLPlTBxYsfeOPAKXWngKp1NX7ciNEOBgA3l1VeiAULs')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-space-md left-space-md flex items-center gap-1.5 z-10">
          <span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold shadow-sm">
            Autumn Harvest
          </span>
          <span className="bg-surface/85 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-full font-medium shadow-sm">
            Limited Edition
          </span>
        </div>

        {/* Bottom Editorial Content */}
        <div className="absolute bottom-space-md left-space-md right-space-md flex flex-col gap-1 text-on-primary z-10">
          <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-medium">
            Seasonal Curations
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-primary leading-tight font-semibold">
            Up to 35% off Cast Iron &amp; Olive Wood
          </h2>
          <p className="font-body-sm text-body-sm text-surface-container-high line-clamp-1 opacity-90">
            Handcrafted heritage pieces designed for deliberate slow feasts.
          </p>

          <div className="flex items-center justify-between pt-space-xs">
            <button 
              type="button"
              onClick={() => navigate('/catalog')}
              className="px-space-md py-2.5 rounded-lg bg-surface text-on-surface font-label-md text-label-md hover:bg-primary-fixed hover:text-on-primary-fixed transition-transform active:scale-95 shadow-sm font-semibold flex items-center gap-1.5"
            >
              <span>Shop Collection</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <div className="flex items-center gap-1">
              <span className="w-4 h-1.5 rounded-full bg-primary-fixed"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-surface/50"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-surface/50"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

