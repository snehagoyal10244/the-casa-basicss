import React, { useState } from 'react';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import { BUNDLE_ITEMS, BUNDLE_PRESETS } from '../data/bundleData';
import { AI_INSPIRATION_PROMPTS } from '../data/aiPromptsData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ChefAIPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'bundle'

  // AI Chat State
  const [selectedPrompt, setSelectedPrompt] = useState(AI_INSPIRATION_PROMPTS[0]);
  const [budgetTier, setBudgetTier] = useState('essential'); // 'essential' | 'chef'
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'user',
      text: "Making Homemade Sourdough 🥖. I have basic flour and a starter, what tools and techniques do I need?"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Bundle Builder State
  const [activePreset, setActivePreset] = useState('baker');
  const [bundleSelections, setBundleSelections] = useState({
    1: { selected: false, qty: 1 },
    2: { selected: false, qty: 1 },
    3: { selected: false, qty: 1 },
    4: { selected: false, qty: 1 },
    5: { selected: true, qty: 1 },
    6: { selected: true, qty: 1 },
    7: { selected: true, qty: 1 }
  });

  // Calculate bundle summary
  const selectedCount = Object.values(bundleSelections).filter(s => s.selected).length;
  const bundleSubtotal = BUNDLE_ITEMS.reduce((sum, item) => {
    const sel = bundleSelections[item.id];
    if (sel && sel.selected) {
      return sum + (item.price * sel.qty);
    }
    return sum;
  }, 0);

  const qualifiesFor20Off = selectedCount >= 3;
  const bundleDiscount = qualifiesFor20Off ? bundleSubtotal * 0.20 : 0;
  const bundleTotal = Math.max(0, bundleSubtotal - bundleDiscount);

  const handleQuickPrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: prompt.label }
    ]);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: query }]);
    setChatInput('');

    // Simulate AI response based on query
    setTimeout(() => {
      const match = AI_INSPIRATION_PROMPTS.find(p => query.toLowerCase().includes(p.id)) || AI_INSPIRATION_PROMPTS[0];
      setSelectedPrompt(match);
      showToast(`Chef AI formulated custom kitchen advice`);
    }, 600);
  };

  const handleSimulateVoice = () => {
    setIsListening(true);
    showToast('Listening... Speak your recipe request');
    setTimeout(() => {
      setIsListening(false);
      setChatInput("How do I make artisanal fresh pasta with semolina?");
      showToast('Voice transcribed: "How do I make artisanal fresh pasta with semolina?"');
    }, 2000);
  };

  const handleExportToBundle = () => {
    setActiveTab('bundle');
    // Pre-select utensils from current recipe
    const newSelections = { ...bundleSelections };
    selectedPrompt.utensils.forEach(u => {
      if (newSelections[u.id]) {
        newSelections[u.id] = { selected: true, qty: 1 };
      }
    });
    setBundleSelections(newSelections);
    showToast('Recipe utensils exported to Bundle Builder!');
  };

  const handleApplyPreset = (presetId) => {
    setActivePreset(presetId);
    const preset = BUNDLE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    const next = {};
    BUNDLE_ITEMS.forEach(item => {
      next[item.id] = {
        selected: preset.selectedIds.includes(item.id),
        qty: 1
      };
    });
    setBundleSelections(next);
    showToast(`Applied preset: ${preset.name}`);
  };

  const handleToggleItem = (id) => {
    setBundleSelections(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        selected: !prev[id]?.selected
      }
    }));
  };

  const handleModifyQty = (id, delta) => {
    setBundleSelections(prev => {
      const current = prev[id] || { selected: true, qty: 1 };
      const nextQty = Math.max(1, current.qty + delta);
      return {
        ...prev,
        [id]: {
          ...current,
          qty: nextQty
        }
      };
    });
  };

  const handleAddCompleteBundle = () => {
    const selectedItems = BUNDLE_ITEMS.filter(item => bundleSelections[item.id]?.selected);
    if (selectedItems.length === 0) {
      showToast('Please select at least 1 item for your bundle', 'error');
      return;
    }

    selectedItems.forEach(item => {
      const qty = bundleSelections[item.id]?.qty || 1;
      const unitPrice = qualifiesFor20Off ? item.price * 0.8 : item.price;
      addToCart({
        id: item.id,
        title: item.title,
        price: Math.round(unitPrice * 100) / 100,
        images: [item.image]
      }, qty);
    });

    showToast(`Complete Custom Bundle (${selectedItems.length} items) added to bag! 🎉`);
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <Header title="The Casa Basics" subtitle="Ai Kitchen Assistant" />

      <main className="flex-1 w-full max-w-2xl mx-auto px-margin pt-20 pb-28">
        <div className="flex flex-col gap-space-md">
          
          {/* Mode Switcher Segmented Control */}
          <div className="w-full bg-surface-container rounded-xl p-1.5 flex items-center shadow-sm border border-surface-container-high/60">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 px-space-xs rounded-lg font-label-md text-label-md transition-all duration-200 flex items-center justify-center gap-space-2xs ${
                activeTab === 'chat'
                  ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>AI Recipe &amp; Matcher</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bundle')}
              className={`flex-1 py-2 px-space-xs rounded-lg font-label-md text-label-md transition-all duration-200 flex items-center justify-center gap-space-2xs ${
                activeTab === 'bundle'
                  ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Bundle Builder</span>
            </button>
          </div>

          {/* TAB 1: AI Recipe & Matcher */}
          {activeTab === 'chat' && (
            <div className="flex flex-col gap-space-md animate-fade-in">
              {/* Intro Card */}
              <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm border border-surface-container">
                <div className="flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-space-2xs">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Casa Smart Helper</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-[10px] font-bold">
                        v2.4 Active
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                      Hi Maya! What are you planning to cook today? Tell me a dish, dietary preference, or your kitchen challenge!
                    </p>
                  </div>
                </div>

                {/* Quick Prompts */}
                <div className="mt-space-sm pt-space-xs">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block mb-1.5 font-semibold">
                    Inspiration Prompts
                  </span>
                  <div className="flex gap-space-2xs overflow-x-auto pb-1 no-scrollbar">
                    {AI_INSPIRATION_PROMPTS.map((prompt) => (
                      <button
                        key={prompt.id}
                        type="button"
                        onClick={() => handleQuickPrompt(prompt)}
                        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-body-sm transition-all flex items-center gap-1 shadow-sm border ${
                          selectedPrompt.id === prompt.id
                            ? 'bg-primary text-on-primary border-primary font-semibold'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high border-surface-container-high'
                        }`}
                      >
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Stream Conversation */}
              <div className="flex flex-col gap-space-md">
                {/* User Query Demo Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-primary text-on-primary rounded-xl rounded-tr-sm p-3.5 shadow-sm font-body-md text-body-md">
                    {chatMessages[chatMessages.length - 1]?.text || "Making Homemade Sourdough 🥖. What tools do I need?"}
                  </div>
                </div>

                {/* AI Rich Response Card */}
                <div className="flex flex-col gap-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">oven_gen</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {selectedPrompt.title}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-semibold">
                      AI Recipe Guide
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {selectedPrompt.summary}
                  </p>

                  {/* Recipe Steps Minimal Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPrompt.steps.map((st, idx) => (
                      <div key={idx} className="bg-surface-container-low p-2.5 rounded-lg flex flex-col border border-surface-container/60">
                        <span className="font-label-sm text-[11px] text-secondary font-bold uppercase">{st.step}</span>
                        <span className="font-body-sm text-body-sm text-on-surface mt-0.5 font-medium">{st.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Budget Level Toggle */}
                  <div className="mt-space-xs bg-surface-container-high/60 p-2.5 rounded-lg flex items-center justify-between border border-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Budget Tier:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setBudgetTier('essential')}
                        className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm transition-all ${
                          budgetTier === 'essential'
                            ? 'bg-primary text-on-primary font-semibold shadow-xs'
                            : 'bg-surface-container-lowest text-on-surface'
                        }`}
                      >
                        {selectedPrompt.tiers?.essential?.label || "Essential ($49)"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setBudgetTier('chef')}
                        className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm transition-all ${
                          budgetTier === 'chef'
                            ? 'bg-primary text-on-primary font-semibold shadow-xs'
                            : 'bg-surface-container-lowest text-on-surface'
                        }`}
                      >
                        {selectedPrompt.tiers?.chef?.label || "Chef Grade ($119)"}
                      </button>
                    </div>
                  </div>

                  {/* Recommended Utensils */}
                  <div className="mt-2 flex flex-col gap-2">
                    <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">skillet</span>
                      Required Kitchen Utensils ({selectedPrompt.utensils.length} Items)
                    </span>

                    {selectedPrompt.utensils.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg border border-surface-container/60">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-11 h-11 rounded-md overflow-hidden flex-shrink-0 bg-surface-container">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-body-md text-body-md font-medium text-on-surface truncate">
                              {item.title}
                            </span>
                            <span className="font-body-sm text-body-sm text-primary font-semibold">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(item, 1)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary transition-all text-label-sm font-label-sm active:scale-95 shadow-sm font-semibold"
                        >
                          <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Match score & export button */}
                  <div className="mt-1 flex items-center justify-between pt-2 border-t border-surface-container">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Match score: <strong className="text-primary font-bold">{selectedPrompt.matchScore}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={handleExportToBundle}
                      className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>Export to Bundle Builder</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Input Field */}
              <div className="sticky bottom-20 z-20 bg-surface/90 backdrop-blur-md p-1 rounded-2xl shadow-lg border border-surface-container-high/60">
                <form onSubmit={handleSendChat} className="flex items-center gap-1.5 bg-surface-container-lowest rounded-xl p-1.5 border border-surface-container/60">
                  <button 
                    type="button"
                    onClick={handleSimulateVoice}
                    aria-label="Microphone"
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isListening ? 'text-secondary animate-pulse bg-secondary-fixed' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">mic</span>
                  </button>
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about ingredients, pans, setups..." 
                    className="flex-1 bg-transparent px-2 py-2 text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none min-w-0"
                  />
                  <button 
                    type="submit"
                    className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-transform active:scale-95 hover:bg-primary-container shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 2: Interactive Smart Bundle Builder */}
          {activeTab === 'bundle' && (
            <div className="flex flex-col gap-space-md animate-fade-in">
              {/* Header Banner */}
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-2xs shadow-sm border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Build Custom Starter Kit</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                    20% Bundle Perk
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Select presets or customize kitchen essentials. Bundles with 3+ items unlock our chef-level automatic 20% discount.
                </p>
              </div>

              {/* Kitchen Style Presets */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Kitchen Style Presets
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {BUNDLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyPreset(preset.id)}
                      className={`preset-btn whitespace-nowrap px-3 py-2 rounded-lg font-label-sm text-label-sm shadow-sm transition-all flex items-center gap-1.5 border ${
                        activePreset === preset.id
                          ? 'bg-primary text-on-primary border-primary font-semibold'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high border-surface-container-high'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{preset.icon}</span>
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bundle Items Checklist */}
              <div className="flex flex-col gap-space-xs">
                {BUNDLE_ITEMS.map((item) => {
                  const sel = bundleSelections[item.id] || { selected: false, qty: 1 };
                  return (
                    <div 
                      key={item.id}
                      className={`bundle-item bg-surface-container-lowest rounded-xl p-space-sm flex items-center justify-between gap-2 shadow-sm transition-all border ${
                        sel.selected ? 'border-primary/50 bg-primary-fixed/5' : 'border-surface-container/60'
                      }`}
                    >
                      <div className="flex items-center gap-space-xs min-w-0 flex-1">
                        <input 
                          type="checkbox" 
                          checked={sel.selected}
                          onChange={() => handleToggleItem(item.id)}
                          className="w-5 h-5 rounded accent-primary cursor-pointer flex-shrink-0"
                          id={`item-chk-${item.id}`}
                        />
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <label 
                            htmlFor={`item-chk-${item.id}`} 
                            className="font-body-md text-body-md font-semibold text-on-surface truncate cursor-pointer"
                          >
                            {item.title}
                          </label>
                          <span className="font-body-sm text-body-sm text-primary font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-surface-container-low rounded-lg p-1 gap-2 flex-shrink-0">
                        <button 
                          type="button"
                          onClick={() => handleModifyQty(item.id, -1)}
                          className="w-7 h-7 rounded bg-surface-container-lowest text-on-surface flex items-center justify-center font-bold text-label-md active:scale-95 shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-label-md text-label-md text-on-surface w-4 text-center font-bold">
                          {sel.qty}
                        </span>
                        <button 
                          type="button"
                          onClick={() => handleModifyQty(item.id, 1)}
                          className="w-7 h-7 rounded bg-surface-container-lowest text-on-surface flex items-center justify-center font-bold text-label-md active:scale-95 shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Dynamic Price Calculator Summary Card */}
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2.5 shadow-sm border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Price Breakdown</span>
                  <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                    qualifiesFor20Off ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-surface-container text-tertiary'
                  }`}>
                    {qualifiesFor20Off ? "20% Bundle Promo Applied!" : `Add ${Math.max(0, 3 - selectedCount)} more for 20% off`}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant">
                    <span>Regular Subtotal ({selectedCount} items)</span>
                    <span className="font-medium">${bundleSubtotal.toFixed(2)}</span>
                  </div>

                  {bundleDiscount > 0 && (
                    <div className="flex justify-between items-center font-body-sm text-body-sm text-secondary font-medium">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">loyalty</span>
                        <span>Bundle Discount (20% off)</span>
                      </span>
                      <span>-${bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 mt-1 border-t border-surface-container-high">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Live You Pay</span>
                      <span className="font-headline-lg text-2xl text-primary font-bold leading-tight">
                        ${bundleTotal.toFixed(2)}
                      </span>
                    </div>
                    {bundleDiscount > 0 && (
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                          Saves ${bundleDiscount.toFixed(2)}!
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Complete Bundle Button */}
                <button
                  type="button"
                  onClick={handleAddCompleteBundle}
                  className="w-full mt-2 h-12 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-headline-sm text-headline-sm font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Add Complete Bundle (${bundleTotal.toFixed(2)})</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      <BottomNav />
    </div>
  );
}

