import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleSwitcher } from './RoleSwitcher';
import {
  Bell,
  Search,
  Calendar,
  ChevronDown,
  CheckCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Topbar = () => {
  const {
    currentUser,
    events,
    selectedEventId,
    setSelectedEventId,
    activeEvent,
    notifications,
    showToast
  } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--color-border-secondary)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}
    >
      {/* 1. Left: Active Event Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            background: '#FFFFFF',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--shadow-apple-subtle)'
          }}
        >
          <Calendar size={14} color="var(--color-brand-primary)" />
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
            Event Aktif:
          </span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-display)',
              cursor: 'pointer',
              outline: 'none',
              maxWidth: 240,
              textOverflow: 'ellipsis'
            }}
          >
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title} ({evt.status.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {activeEvent && (
          <button
            type="button"
            onClick={() => navigate(`/events/${activeEvent.id}`)}
            className="apple-btn apple-btn-ghost apple-btn-sm"
            style={{ fontSize: '12px', color: 'var(--color-brand-primary)' }}
          >
            <span>Overview Event</span>
            <ExternalLink size={12} />
          </button>
        )}
      </div>

      {/* 2. Right: Role Switcher, Notifications, User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Interactive Role Switcher for PRD permission testing */}
        <RoleSwitcher />

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--color-border-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              color: 'var(--color-text-secondary)'
            }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-brand-primary)',
                  boxShadow: '0 0 0 2px #FFFFFF'
                }}
              />
            )}
          </button>

          {/* Notification Popover (Feature 12) */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: 44,
                right: 0,
                width: 320,
                background: '#FFFFFF',
                border: '1px solid var(--color-border-secondary)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-apple-float)',
                padding: '12px',
                zIndex: 1000
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 8,
                  borderBottom: '1px solid var(--color-border-subtle)',
                  marginBottom: 8
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-display)' }}>
                  Notifikasi ({unreadCount} Baru)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Semua notifikasi ditandai telah dibaca', 'info');
                    setShowNotifications(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '11px',
                    color: 'var(--color-brand-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                  }}
                >
                  <CheckCheck size={12} />
                  <span>Tandai Baca</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 280, overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: n.read ? 'transparent' : 'var(--color-bg-secondary)',
                      border: n.read ? 'none' : '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                      {n.message}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-placeholder)', marginTop: 4 }}>
                      {n.time_ago}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={currentUser.avatar_url}
            alt={currentUser.full_name}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #FFFFFF',
              boxShadow: 'var(--shadow-apple-subtle)'
            }}
          />
          <div style={{ display: 'none', md: 'block' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-display)', lineHeight: 1.2 }}>
              {currentUser.full_name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
              {currentUser.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
