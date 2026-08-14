import React from 'react';

export const SegmentedControl = ({
  options = [], // array of { value, label, count } or string
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={`apple-segmented-control ${className}`.trim()}>
      {options.map((opt) => {
        const optValue = typeof opt === 'object' ? opt.value : opt;
        const optLabel = typeof opt === 'object' ? opt.label : opt;
        const optCount = typeof opt === 'object' ? opt.count : null;
        const isActive = value === optValue;

        return (
          <button
            key={optValue}
            type="button"
            onClick={() => onChange(optValue)}
            className={`apple-segment-item ${isActive ? 'active' : ''}`}
          >
            <span>{optLabel}</span>
            {optCount !== null && optCount !== undefined && (
              <span
                style={{
                  marginLeft: 6,
                  padding: '1px 6px',
                  borderRadius: 9999,
                  fontSize: '11px',
                  background: isActive ? 'var(--color-bg-secondary)' : 'rgba(0,0,0,0.06)',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)'
                }}
              >
                {optCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
