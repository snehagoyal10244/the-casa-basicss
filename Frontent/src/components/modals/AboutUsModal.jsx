import React from 'react';
import { BRAND_NAME, BRAND_EMBLEM_URL } from '../../data/productsData';

export default function AboutUsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2B24]/40 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-[0_25px_60px_-15px_rgba(37,61,50,0.25)] border border-[#E8E2D5] overflow-hidden z-10 animate-fade-in-down max-h-[90vh] flex flex-col">
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-[#253D32] via-[#355346] to-[#456956] text-[#FAF8F5] px-6 py-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5]/15 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/20">
                <img src={BRAND_EMBLEM_URL} alt="Emblem" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <div>
                <span className="font-label-sm text-[11px] font-semibold tracking-widest text-[#FDE68A] uppercase">
                  Design Philosophy • MBA E-Commerce Showcase
                </span>
                <h3 className="font-headline-lg text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                  {BRAND_NAME}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF9C3]/20 border border-[#FEF9C3]/40 text-[#FEF9C3] text-[11px] font-medium">
              <span className="text-[12px]">✨</span> Gen Z × Scandinavian Living
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 text-[#D8E6DB] text-[11px] font-medium">
              Copenhagen & Tokyo
            </span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#253D32]">
          {/* Brand Manifesto */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#365747]">
              The Story
            </h4>
            <p className="text-sm md:text-base leading-relaxed text-[#4A544E]">
              <strong className="text-[#253D32]">THE CASA BASICS</strong> was founded at the intersection of Scandinavian minimalist aesthetics and Japanese culinary discipline. We believe cookware shouldn't just be functional—it should elevate daily rituals, live gracefully on open shelving, and withstand decades of deliberate cooking.
            </p>
          </div>

          {/* Three Core Brand Pillars (Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#EBF3EC] border border-[#D8E6DB] flex flex-col gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#253D32] text-white flex items-center justify-center text-sm font-bold">
                <span className="material-symbols-outlined text-[18px]">eco</span>
              </div>
              <h5 className="font-bold text-sm text-[#253D32]">100% Circular</h5>
              <p className="text-xs text-[#55635B] leading-relaxed">
                Zero-plastic packaging, recycled cast iron, and organic French flax textiles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF0EB] border border-[#FDE8E1] flex flex-col gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#F08466] text-white flex items-center justify-center text-sm font-bold">
                <span className="material-symbols-outlined text-[18px]">architecture</span>
              </div>
              <h5 className="font-bold text-sm text-[#253D32]">Heirloom Craft</h5>
              <p className="text-xs text-[#55635B] leading-relaxed">
                67-layer Japanese Damascus steel and hand-enameled vitreous Dutch ovens.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FEF9C3] border border-[#FDE68A] flex flex-col gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#D97706] text-white flex items-center justify-center text-sm font-bold">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </div>
              <h5 className="font-bold text-sm text-[#253D32]">AI Curated</h5>
              <p className="text-xs text-[#55635B] leading-relaxed">
                Smart kitchen assistants and dynamic bundle builders that save up to 20%.
              </p>
            </div>
          </div>

          {/* MBA E-Commerce Academic Project Context */}
          <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E7E2D8] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#365747] text-white flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div className="space-y-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#253D32]">
                MBA Project Note • Omnichannel Direct-to-Consumer Strategy
              </h5>
              <p className="text-xs text-[#55635B] leading-relaxed">
                This project represents a prototype modern culinary direct-to-consumer brand. Features like interactive AI recipe pairing, algorithmic bundle discounts, and real-time gamified shipping thresholds illustrate customer acquisition cost (CAC) reduction and average order value (AOV) expansion.
              </p>
            </div>
          </div>

          {/* Sizing & Sustainability Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E8E2D5] text-xs text-[#6F7570]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#365747]"></span>
              <span>Designed in Copenhagen</span>
              <span className="text-stone-300">•</span>
              <span>Artisanal Forged in Seki & Alsace</span>
            </div>
            <span className="font-semibold text-[#253D32]">The Casa Basics © 2024–2026</span>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-[#F5F2EB]/60 border-t border-[#E8E2D5] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#253D32] hover:bg-[#1E2B24] text-white text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95"
          >
            Explore The Collection
          </button>
        </div>
      </div>
    </div>
  );
}
