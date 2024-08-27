import React from 'react';

const InputField = ({ label, type = "text", name, value, onChange, placeholder }) => {
    return (
      <div className="input-field">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="input"
        />
      </div>
    );
  };

export default InputField;