import { useState } from 'react';
import './index.css';

export const InputField = ({ onChangeCallback, label, type, error, value }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    onChangeCallback(value);
  };

  return (
    <div className='input__wrapper'>
      <label><strong>{label}</strong></label>
      <div className='input__field'>
        <input type={type} onChange={handleInputChange} value={value} />
      </div>
      {error && <span className='error'>{error}</span>}
    </div>
  );
};