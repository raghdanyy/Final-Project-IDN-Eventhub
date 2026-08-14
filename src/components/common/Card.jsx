import React from 'react';

export const Card = ({
  children,
  glass = false,
  interactive = false,
  className = '',
  onClick,
  style = {},
  ...props
}) => {
  let baseClass = 'apple-card';
  if (glass) baseClass = 'apple-glass';
  if (interactive) baseClass = 'apple-card-interactive';

  return (
    <div
      onClick={onClick}
      style={style}
      className={`${baseClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};
