import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BRAND_EMBLEM_URL } from '../data/productsData';
import { useAuth } from '../context/AuthContext';
import AuthDrawer from '../components/modals/AuthDrawer';

const CAROUSEL_SLIDES = [
  {
    step: "01 • CURATED ESSENTIALS",
    title: "Curated Kitchen Essentials",
    icon: "skillet",
    badge: "Craftsmen Grade",
    badgeIcon: "verified",
    badgeColor: "text-secondary",
    desc: "Artisanal seasoned cast iron, Japanese steel cutlery, and sustainably harvested teak wood tools built to endure decades of shared family meals.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAK_iSnDm0KZb_ZO2obgFlTa-pwInoMYKiVtWyKqqe7AaSvCg8XEq9IjutEXRIlDFKtPBWt3fHDQacwF3jaZ4uW72NoJ9xr5Ncl7eP_rKgZGnfmwmfEgSipPZJRzv3Tx8jQknDI7OB2JVl1qjdIPVsk5aFP_JKxKJ79hSPExsTw4lkWSDsRyJOo0Ksu9aDKuXdsMDjEz2NJjsMQ0AFLiJMZdzrtxdw_A7hbgvPMHo"
  },
  {
    step: "02 • SMART COOKING",
    title: "Smart AI Kitchen Helper",
    icon: "psychology",
    badge: "Intelligent Pantry",
    badgeIcon: "auto_awesome",
    badgeColor: "text-primary",
    desc: "Effortless recipe utensil matching, seasonal pantry budgeting, and bespoke kitchen storage workflows tailored to your culinary repertoire.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmFwE1IZgA8ZpqN97bxwE7yNAhVOZEOyP0HLi2A3cMtqozgdIWpBxcANTlPIHJXzBvZcwII9EVicSW1nPEz4CuPqZ4i6BszOH11wik9XuSCW1UJlCgUL1Ji7taR0lhvL2s4KBD6X4XV6I2UQFuHUnS1A4KCBa1XoiPvNTha4oH5MDek5st0KTfnvjF3FLkqCLeDWzZ6E465I6jPvk4I-X8XJ207UKbzVb2OcLciSE"
  },
  {
    step: "03 • WHITE GLOVE CARE",
    title: "White Glove Delivery",
    icon: "inventory_2",
    badge: "Carbon Neutral",
    badgeIcon: "local_shipping",
    badgeColor: "text-secondary",
    desc: "100% biodegradable zero-plastic packaging with guaranteed next-day dispatch and optional personalized kitchenware seasoning service.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFngtPo9jaQYYG456a_Yb2TsQ8UBvv5RRIuV_u4Zcg8kPOp65W8VT1aP5uDI7DgeziBFbMRtBxSjXTqADOHtp-sSXFMw7cINIrRiTpVBNhi_Y2Odr-oqLtsk1gx3kQEXOjYQSaFRy9Wfm5BQL5OdnUOhG9UBwElSi-iMyBOxY6jEAqNITkwV6ZkS1lSDV3EAwBWV1ksYvC5n5TaB9GJ7aK3VeXwCLm9mfCBKJHQ1A"
  }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { openAuthDrawer } = useAuth();

  const [stage, setStage] = useState('splash'); // 'splash' | 'carousel'
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNextSlide = () => {
    if (slideIndex < CAROUSEL_SLIDES.length - 1) {
      setSlideIndex(prev => prev + 1);
    } else {
      navigate('/home');
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(prev => prev - 1);
    } else {
      setStage('splash');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between max-w-lg mx-auto w-full select-none pt-safe pb-safe">
      
      {/* Top Header / Nav */}
      <header className="w-full flex items-center justify-between px-margin pt-space-md pb-space-sm z-20">
        <button 
          onClick={handlePrevSlide}
          disabled={stage === 'splash'}
          className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface transition-all duration-300 active:scale-95 ${
            stage === 'splash' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-space-2xs py-1 px-space-xs rounded-full bg-surface-container-high/80 backdrop-blur-md">
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${stage === 'splash' || slideIndex === 0 ? 'bg-primary w-4' : 'bg-surface-variant'}`}></div>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${stage === 'carousel' && slideIndex === 1 ? 'bg-primary w-4' : 'bg-surface-variant'}`}></div>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${stage === 'carousel' && slideIndex === 2 ? 'bg-primary w-4' : 'bg-surface-variant'}`}></div>
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="font-label-md text-label-md text-on-surface-variant px-space-xs py-1.5 rounded-full hover:bg-surface-container transition-colors"
        >
          Skip
        </button>
      </header>

      {/* STAGE 1: Splash Mode */}
      {stage === 'splash' ? (
        <section className="w-full flex flex-col items-center justify-between px-margin pb-space-xl flex-1 animate-fade-in">
          {/* Top Brand Presentation */}
          <div className="flex flex-col items-center text-center pt-space-xs">
            <div className="relative w-24 h-24 mb-space-md rounded-2xl bg-surface-container-lowest shadow-md flex items-center justify-center p-3 border border-surface-container">
              <img src={BRAND_EMBLEM_URL} alt="The Casa Basics Emblem" className="w-full h-full object-contain" />
              <div className="absolute -bottom-1.5 -right-1.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-label-sm px-2 py-0.5 rounded-full shadow-sm font-semibold">
                Nordic Est.
              </div>
            </div>

            <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">
              The Casa Basics
            </h1>
            <p className="font-body-md text-body-md text-tertiary mt-1">
              Make Every Meal Special
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed-variant font-label-sm text-label-sm mt-space-sm font-medium">
              <span className="material-symbols-outlined text-[14px]">eco</span>
              <span>Crafted for Mindful Living</span>
            </div>
          </div>

          {/* Atmospheric Visual Card */}
          <div className="w-full my-space-md relative rounded-3xl overflow-hidden shadow-sm aspect-[4/3] bg-surface-container-low border border-surface-container/40">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQYLKarmvIGRx-APLSsGNVeFb0Bw1BT425aSElgVeYlD4nwdCqraCOXE22WDPcxbf89smCkLvhDFUDjrNIMI52YWjsLEjrxRRHlfiEpVg-oUqqJwisx0oLT1dFkQv-j9y4ubzB8D01g3-JjjFQ_hu6TN4GvBKO4tf0J4DWXpN7dpsKaOsPaOrdHoPzgHr8kofQoKngVN4JL4KjqI0g5vzquuTw3-OHr1OvrXffAb8" 
              alt="Scandinavian Kitchen Atmosphere" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent flex flex-col justify-end p-margin text-on-primary">
              <span className="font-label-sm text-label-sm tracking-wider uppercase opacity-90 text-primary-fixed">The Season 04 Collection</span>
              <p className="font-headline-sm text-headline-sm font-medium mt-0.5">Quiet luxury for daily home cooks.</p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="w-full flex flex-col gap-space-xs">
            <button 
              type="button"
              onClick={() => setStage('carousel')}
              className="w-full h-12 bg-secondary hover:bg-secondary-container text-on-secondary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] font-semibold"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button 
              type="button"
              onClick={openAuthDrawer}
              className="w-full h-12 bg-surface-container-high hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md flex items-center justify-center transition-all active:scale-[0.98] font-medium"
            >
              Sign In to Your Kitchen
            </button>
          </div>
        </section>
      ) : (
        /* STAGE 2: 3-Slide Interactive Carousel */
        <section className="w-full flex flex-col px-margin pb-space-xl flex-1 justify-between animate-fade-in">
          <div className="relative w-full overflow-hidden rounded-3xl bg-surface-container-low shadow-sm border border-surface-container/50">
            <div className="w-full aspect-[4/3] relative">
              <img 
                src={CAROUSEL_SLIDES[slideIndex].image} 
                alt={CAROUSEL_SLIDES[slideIndex].title} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
                <span className={`material-symbols-outlined text-[14px] ${CAROUSEL_SLIDES[slideIndex].badgeColor}`}>
                  {CAROUSEL_SLIDES[slideIndex].badgeIcon}
                </span>
                <span>{CAROUSEL_SLIDES[slideIndex].badge}</span>
              </div>
            </div>

            <div className="p-space-lg flex flex-col">
              <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px]">{CAROUSEL_SLIDES[slideIndex].icon}</span>
                <span>{CAROUSEL_SLIDES[slideIndex].step}</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-bold">
                {CAROUSEL_SLIDES[slideIndex].title}
              </h2>
              <p className="font-body-md text-body-md text-tertiary mt-2 leading-relaxed">
                {CAROUSEL_SLIDES[slideIndex].desc}
              </p>
            </div>
          </div>

          {/* Slide Indicator Bar */}
          <div className="w-full flex items-center justify-between mt-space-md mb-space-lg px-2">
            <div className="flex items-center gap-2">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    slideIndex === idx ? 'w-6 bg-primary' : 'w-2 bg-surface-container-highest'
                  }`}
                />
              ))}
            </div>
            <span className="font-label-sm text-label-sm text-tertiary">
              {slideIndex + 1} of {CAROUSEL_SLIDES.length}
            </span>
          </div>

          {/* Carousel Bottom CTA Buttons */}
          <div className="w-full flex items-center gap-space-xs">
            <button 
              type="button"
              disabled={slideIndex === 0}
              onClick={() => setSlideIndex(prev => Math.max(0, prev - 1))}
              className={`h-12 px-4 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center transition-all active:scale-95 ${
                slideIndex === 0 ? 'opacity-40 pointer-events-none' : 'hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button 
              type="button"
              onClick={handleNextSlide}
              className="flex-1 h-12 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm font-semibold"
            >
              <span>{slideIndex === CAROUSEL_SLIDES.length - 1 ? 'Enter The Casa Basics' : 'Continue'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>
      )}

      {/* Global Auth Modal Drawer */}
      <AuthDrawer />

    </div>
  );
}

