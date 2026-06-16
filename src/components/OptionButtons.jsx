import { useState } from 'react';
import { useSound } from '../context/SoundContext';

export default function OptionButtons({ options, onSelect, disabled, selectedIndex }) {
  const { play } = useSound();

  return (
    <div className="options-grid">
      {options.map((option, index) => (
        <button
          key={index}
          className={`option-btn ${selectedIndex === index ? 'selected' : ''}`}
          onClick={() => {
            play('select');
            onSelect(index);
          }}
          onMouseEnter={() => play('hover')}
          disabled={disabled}
        >
          <span className="option-key">{index + 1}</span>
          <span className="option-text">{option}</span>
        </button>
      ))}
    </div>
  );
}
