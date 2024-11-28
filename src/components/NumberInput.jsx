import React from 'react';

export const NumberInput = ({ value, onChange, min, max, step = 1, className = '' }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className={`brutalist-input ${className}`}
    />
  );
};