import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral', // 'published' | 'draft' | 'paid' | 'pending' | 'refunded' | 'active' | 'brand' | 'success' | 'warning' | 'error'
  dot = true,
  className = '',
  ...props
}) => {
  const variantClass = `apple-badge-${variant.toLowerCase()}`;

  return (
    <span className={`apple-badge ${variantClass} ${className}`.trim()} {...props}>
      {dot && <span className="apple-badge-dot" />}
      {children}
    </span>
  );
};
