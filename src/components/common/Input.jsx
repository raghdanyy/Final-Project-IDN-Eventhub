import React from 'react';
import { Search, X } from 'lucide-react';

export const Input = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`apple-input-group ${className}`.trim()}>
      {label && <label htmlFor={id} className="apple-label">{label}</label>}
      <input
        id={id}
        className={`apple-input ${error ? 'apple-input-error' : ''}`}
        {...props}
      />
      {error && <span style={{ color: 'var(--color-error-text)', fontSize: '12px' }}>{error}</span>}
      {helperText && !error && <span style={{ color: 'var(--color-text-tertiary)', fontSize: '12px' }}>{helperText}</span>}
    </div>
  );
};

export const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  ...props
}) => {
  return (
    <div className={`apple-search-box ${className}`.trim()}>
      <Search size={16} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="apple-input"
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-tertiary)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
