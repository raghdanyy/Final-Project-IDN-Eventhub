import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="var(--color-success-primary)" />,
    error: <XCircle size={18} color="var(--color-error-primary)" />,
    warning: <AlertCircle size={18} color="var(--color-warning-primary)" />,
    info: <Info size={18} color="var(--color-info-primary)" />
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        background: 'rgba(24, 29, 39, 0.95)',
        backdropFilter: 'blur(16px)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-apple-float)',
        fontSize: '14px',
        fontWeight: 500,
        animation: 'appleFadeIn 0.2s ease-out'
      }}
    >
      {icons[toast.type] || icons.info}
      <span>{toast.message}</span>
    </div>
  );
};
