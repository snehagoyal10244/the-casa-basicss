import React, { useState } from 'react';

export default function SupportChatModal({ isOpen, onClose, courier }) {
  const [messages, setMessages] = useState([
    { sender: 'driver', text: "Hi Maya! I'm Leo with EcoExpress EV Cargo. I'm about 8 stops away and expected between 2:00 PM – 4:00 PM." },
    { sender: 'driver', text: "Do you have any specific gate or doorstep instructions for the delivery?" }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'driver', text: "Got it! I will place your handcrafted parcel safely at the front porch. Thank you!" }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md h-[550px] shadow-2xl flex flex-col overflow-hidden border border-surface-container">
        
        {/* Header */}
        <div className="bg-surface-container p-space-sm flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="relative">
              <img src={courier?.avatar} alt={courier?.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface"></span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm font-semibold text-on-surface">{courier?.name || "Leo K."}</h4>
              <p className="font-body-sm text-[11px] text-tertiary">EcoExpress Electric Courier • Active</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-space-sm overflow-y-auto space-y-space-sm bg-surface">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-body-sm font-body-sm shadow-xs ${
                m.sender === 'user' 
                  ? 'bg-primary text-on-primary rounded-tr-xs' 
                  : 'bg-surface-container-lowest text-on-surface rounded-tl-xs border border-surface-container/60'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-space-sm bg-surface-container flex items-center gap-2 border-t border-surface-container-high">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type instructions for Leo..."
            className="flex-1 bg-surface-container-lowest h-10 px-3 rounded-xl text-body-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
          />
          <button 
            type="submit"
            className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>

      </div>
    </div>
  );
}

