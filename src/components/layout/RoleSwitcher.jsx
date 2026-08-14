import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentRole, setCurrentRole, showToast } = useApp();

  const roles = [
    { key: 'owner', label: 'Owner', desc: 'Akses Penuh' },
    { key: 'event_manager', label: 'Event Mgr', desc: 'Event & Content' },
    { key: 'finance', label: 'Finance', desc: 'Orders & Payout' },
    { key: 'checkin_staff', label: 'Staff Check-in', desc: 'Hari-H Scan' }
  ];

  const handleRoleChange = (e) => {
    const nextRole = e.target.value;
    setCurrentRole(nextRole);
    showToast(`Role diubah ke: ${roles.find((r) => r.key === nextRole)?.label}`, 'info');
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-primary)',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '12px'
      }}
      title="Uji coba tampilan berdasarkan Role & Permission (PRD Sec. 22)"
    >
      <ShieldCheck size={14} color="var(--color-brand-primary)" />
      <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Role View:</span>
      <select
        value={currentRole}
        onChange={handleRoleChange}
        style={{
          border: 'none',
          background: 'transparent',
          fontWeight: 600,
          color: 'var(--color-brand-primary)',
          cursor: 'pointer',
          outline: 'none',
          fontSize: '12px'
        }}
      >
        {roles.map((r) => (
          <option key={r.key} value={r.key}>
            {r.label} ({r.desc})
          </option>
        ))}
      </select>
    </div>
  );
};
