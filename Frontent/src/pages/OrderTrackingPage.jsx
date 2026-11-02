import React, { useState } from 'react';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import SupportChatModal from '../components/modals/SupportChatModal';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function OrderTrackingPage() {
  const { latestOrder } = useCart();
  const { showToast } = useToast();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState('porch');

  const orderId = latestOrder?.orderId || "CB-84920";
  const courier = latestOrder?.courier || {
    name: "Leo K.",
    rating: 4.9,
    vehicle: "EcoExpress EV Cargo • 8 stops away",
    eta: "Thursday, Oct 24 • 2:00 PM – 4:00 PM",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu2JwfTIKEsKl9LFefkkP6I0Fy1DCAfW5-b260Ua24nvKLkRIBD1X3cuPlDGPJXYzf7OvqKXcNN4iFAk5F46-3C04UZ0crxJUneqh85TLglqKZA1MbSFPd1jr7oLic7Ezaz1NfFbNBa6nomYHH03NNsTRyTp7pIBQHZSwWfV7qi-IkboR2bio99Jz3dO4QCioLkJh5Hdg6GiwwSzh2Y4hjMiLc0FCxMI78rNAorY4"
  };

  const handleDownloadInvoice = () => {
    showToast(`Downloading Official Invoice #${orderId}.pdf`);
  };

  const handleCallCourier = () => {
    showToast(`Calling Leo K. (+1 555-019-8234)...`);
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <Header title="Order Tracking" subtitle="The Casa Basics" showBack={true} />

      <main className="flex-1 w-full max-w-2xl mx-auto pt-16 pb-28">
        <div className="flex flex-col w-full">
          
          {/* Sub-Header / Order Info Bar */}
          <div className="px-margin pt-space-sm pb-space-xs flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-2xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  Live Fulfillment
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                Order #{orderId}
              </h2>
            </div>

            <button 
              type="button"
              onClick={handleDownloadInvoice}
              className="flex items-center gap-space-2xs px-space-sm py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest active:scale-95 transition text-on-surface text-label-md font-label-md shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">receipt_long</span>
              <span>Invoice</span>
            </button>
          </div>

          <div className="p-margin space-y-space-md">
            
            {/* Live Map Snapshot & Courier Floating Widget */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-surface-container border border-surface-container">
              <div 
                className="w-full h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0xCNH340SWMniiN0vpUilpyPV5ZlgQKxDtMsKJkpZ_FIRlGwDTNSjzSfxmptMsQ4oD5wksO1qyZwUNiS7IRgOdEFKpoEIOKcqKJX5dE7q6aZUmaM-0rzFb7t_MRhRRyyDaoRsVdImdGGWGsyat9HWLw1Sk6h3pe081FBHE4wGx0HfbvrlEPDCgvL3NdLtB5eH_4x0FsS5WPNbm8MQk_PihntwaEHoAZgVen2AwMI')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent pointer-events-none"></div>

              {/* Courier Badge Overlay */}
              <div className="absolute bottom-space-sm left-space-sm right-space-sm bg-surface/95 backdrop-blur-md p-space-sm rounded-xl flex items-center justify-between shadow-sm border border-surface-container/60">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={courier.avatar} 
                      alt="Courier Driver" 
                      className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full ring-2 ring-surface"></span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-label-md text-label-md text-on-surface truncate font-semibold">{courier.name}</p>
                      <span className="flex items-center text-secondary font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {courier.rating}
                      </span>
                    </div>
                    <p className="font-body-sm text-[11px] text-tertiary truncate">{courier.vehicle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-space-2xs flex-shrink-0">
                  <button 
                    type="button"
                    onClick={handleCallCourier}
                    aria-label="Call Driver"
                    className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-primary active:scale-90 transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    aria-label="Message Driver"
                    className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container active:scale-90 transition shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Estimated Delivery Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm border border-surface-container/60">
              <div className="flex items-center justify-between gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  In Transit – Out for Delivery
                </span>
                <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">eco</span> Carbon Neutral
                </span>
              </div>

              <div className="pt-1">
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium uppercase tracking-wider">Estimated Arrival</p>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                  Arriving Thursday, Oct 24
                </h3>
                <p className="font-body-md text-body-md text-primary font-medium mt-0.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  Expected between 2:00 PM – 4:00 PM
                </p>
              </div>

              {/* Delivery Preferences */}
              <div className="pt-space-2xs flex items-center gap-space-xs overflow-x-auto no-scrollbar">
                <button 
                  type="button"
                  onClick={() => { setSelectedPreference('porch'); showToast('Preference updated: Leave at Front Porch'); }}
                  className={`flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg text-body-sm whitespace-nowrap active:scale-95 transition ${
                    selectedPreference === 'porch' ? 'bg-primary-fixed text-on-primary-fixed font-semibold' : 'bg-surface-container text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">door_front</span>
                  <span>Leave at Front Porch</span>
                </button>
                <button 
                  type="button"
                  onClick={() => { setSelectedPreference('nobell'); showToast('Preference updated: Do not ring bell'); }}
                  className={`flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg text-body-sm whitespace-nowrap active:scale-95 transition ${
                    selectedPreference === 'nobell' ? 'bg-primary-fixed text-on-primary-fixed font-semibold' : 'bg-surface-container text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">notifications_off</span>
                  <span>Don't Ring Bell</span>
                </button>
              </div>
            </div>

            {/* 5-Stage Live Step Tracker */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-sm">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Package Journey</h4>
                <span className="font-label-sm text-label-sm text-tertiary font-medium">Tracking: #CB-EXP-99214</span>
              </div>

              <div className="relative pl-6 space-y-space-md">
                <div className="absolute left-[11px] top-3 bottom-4 w-[2px] bg-primary-fixed"></div>

                {/* Step 1 */}
                <div className="relative flex items-start gap-space-sm">
                  <div className="absolute -left-6 mt-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm ring-4 ring-surface-container-lowest">
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="font-label-md text-label-md text-on-surface font-semibold">Order Placed</p>
                      <time className="font-body-sm text-[11px] text-tertiary">Oct 21, 10:30 AM</time>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">Payment confirmed &amp; sent to artisan studio.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-space-sm">
                  <div className="absolute -left-6 mt-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm ring-4 ring-surface-container-lowest">
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="font-label-md text-label-md text-on-surface font-semibold">Quality Inspection &amp; Packed</p>
                      <time className="font-body-sm text-[11px] text-tertiary">Oct 21, 3:15 PM</time>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">Hand-wrapped in 100% recyclable molded fiber.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-space-sm">
                  <div className="absolute -left-6 mt-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm ring-4 ring-surface-container-lowest">
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="font-label-md text-label-md text-on-surface font-semibold">Shipped from Central Depot</p>
                      <time className="font-body-sm text-[11px] text-tertiary">Oct 22, 08:45 AM</time>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">Departed Pacific Distribution Hub.</p>
                  </div>
                </div>

                {/* Step 4 (Active Pulse) */}
                <div className="relative flex items-start gap-space-sm">
                  <div className="absolute -left-6 mt-0.5 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md ring-4 ring-surface-container-lowest">
                    <span className="material-symbols-outlined text-[15px] animate-pulse">local_shipping</span>
                  </div>
                  <div className="flex-1 bg-surface-container-low p-space-sm rounded-lg border border-secondary-fixed/40">
                    <div className="flex items-baseline justify-between">
                      <p className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1">
                        Out for Delivery
                        <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                      </p>
                      <time className="font-body-sm text-[11px] text-secondary font-semibold">Today, 09:15 AM</time>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface mt-1">Courier Leo K. is en route with clean electric fleet.</p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-start gap-space-sm opacity-50">
                  <div className="absolute -left-6 mt-0.5 w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-outline shadow-sm ring-4 ring-surface-container-lowest">
                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-label-md text-label-md text-on-surface-variant font-semibold">Delivered to Residence</p>
                    <p className="font-body-sm text-[12px] text-tertiary">Estimated: Thursday by 4:00 PM</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Support Quick Contact */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container flex items-center justify-between">
              <div>
                <h5 className="font-label-md text-label-md font-semibold text-on-surface">Need help with your package?</h5>
                <p className="font-body-sm text-[12px] text-tertiary">Our studio concierge is active 7 days a week.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="px-space-md py-2 bg-surface-container-high hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold transition"
              >
                Contact Concierge
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Driver/Support Chat Modal */}
      <SupportChatModal 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        courier={courier}
      />

      <BottomNav />
    </div>
  );
}

