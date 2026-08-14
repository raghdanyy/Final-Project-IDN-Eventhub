import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'tinted' | 'ghost' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  pill = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const variantClass = {
    primary: 'apple-btn-primary',
    secondary: 'apple-btn-secondary',
    tinted: 'apple-btn-tinted',
    ghost: 'apple-btn-ghost',
    danger: 'apple-btn-danger'
  }[variant] || 'apple-btn-primary';

  const sizeClass = {
    sm: 'apple-btn-sm',
    md: '',
    lg: 'apple-btn-lg'
  }[size] || '';

  const pillClass = pill ? 'apple-btn-pill' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`apple-btn ${variantClass} ${sizeClass} ${pillClass} ${className}`.trim()}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
    </button>
  );
};
