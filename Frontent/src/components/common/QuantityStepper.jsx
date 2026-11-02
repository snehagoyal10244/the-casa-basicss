import React from 'react';

export default function QuantityStepper({ value, onMinus, onPlus, min = 1, size = "md" }) {
  const isSm = size === "sm";

  return (
    <div className={`flex items-center bg-surface-container rounded-lg ${isSm ? 'px-1 py-0.5' : 'px-1.5 py-1'} shadow-inner`}>
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMinus();
        }}
        disabled={value <= min}
        className={`${isSm ? 'w-5 h-5 text-xs' : 'w-6 h-6 text-sm'} rounded flex items-center justify-center font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors disabled:opacity-30`}
      >
        -
      </button>
      <span className={`${isSm ? 'px-1.5 text-xs' : 'px-2 text-sm'} font-label-md text-on-surface font-semibold text-center select-none min-w-[20px]`}>
        {value}
      </span>
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPlus();
        }}
        className={`${isSm ? 'w-5 h-5 text-xs' : 'w-6 h-6 text-sm'} rounded flex items-center justify-center font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors`}
      >
        +
      </button>
    </div>
  );
}

