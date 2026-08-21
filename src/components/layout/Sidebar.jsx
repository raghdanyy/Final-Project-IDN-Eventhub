import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutGrid,
  Calendar,
  Ticket,
  FileText,
  Percent,
  Users,
  Scan,
  BarChart2,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout, showToast } = useApp();

  const navSections = [
    {
      title: 'Overview',
      items: [
        {
          to: '/dashboard',
          label: 'Overview',
          icon: LayoutGrid
        },
        {
          to: '/events',
          label: 'My Event',
          icon: Calendar
        }
      ]
    },
    {
      title: 'Event Management',
      items: [
        {
          to: '/events',
          label: 'My Events',
          icon: Calendar
        },
        {
          to: '/tickets',
          label: 'Tickets',
          icon: Ticket
        }
      ]
    },
    {
      title: 'Ticketing',
      items: [
        {
          to: '/orders',
          label: 'Orders',
          icon: FileText
        },
        {
          to: '/promo-codes',
          label: 'Promo Codes',
          icon: Percent
        }
      ]
    },
    {
      title: 'Attendees',
      items: [
        {
          to: '/attendees',
          label: 'All Attendees',
          icon: Users
        },
        {
          to: '/checkin',
          label: 'Check-in',
          icon: Scan
        }
      ]
    },
    {
      title: 'Insight',
      items: [
        {
          to: '/analytics',
          label: 'Analytics',
          icon: BarChart2
        },
        {
          to: '/notifications',
          label: 'Notifications',
          icon: Bell
        },
        {
          to: '/settings',
          label: 'Settings',
          icon: Settings
        },
        {
          to: '/account',
          label: 'Account',
          icon: UserCircle
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="mobile-sidebar-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 998
          }}
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`app-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: '240px',
          minWidth: '240px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E9EAEB',
          display: 'flex',
          flexDirection: 'column',
          userSelect: 'none',
          zIndex: 999,
          fontFamily: 'var(--font-family-text)'
        }}
      >
        {/* 1. Brand Header */}
        <div
          style={{
            padding: '20px 20px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#181D27',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '16px',
                fontFamily: 'var(--font-family-display)'
              }}
            >
              E
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#181D27', lineHeight: 1.2 }}>
                EventHub
              </div>
              <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                Nusantara Event Co.
              </div>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="mobile-close-btn"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #E9EAEB',
              backgroundColor: '#FFFFFF',
              display: 'none', // Shown on mobile via CSS
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#717680'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* 2. Navigation Sections */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 12px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  color: '#717680',
                  padding: '0 8px 4px'
                }}
              >
                {sec.title}
              </div>

              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: isActive ? '600' : '500',
                      color: isActive ? '#FF7A00' : '#414651',
                      backgroundColor: isActive ? '#FFF4ED' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={16} color={isActive ? '#FF7A00' : '#717680'} strokeWidth={isActive ? 2.5 : 2} />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* 3. Bottom User Profile & Sign Out */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid #E9EAEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div
            onClick={() => {
              if (onClose) onClose();
              navigate('/account');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              flex: 1,
              padding: '4px',
              borderRadius: '8px',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#D0E2FF',
                color: '#0043CE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '700'
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27', lineHeight: 1.2 }}>
                Alex Pratama
              </div>
              <div style={{ fontSize: '11px', color: '#717680' }}>
                Owner
              </div>
            </div>
          </div>

          <button
            type="button"
            title="Sign Out ke Landing Page"
            onClick={() => {
              if (onClose) onClose();
              logout();
              showToast('Anda telah keluar dari sesi dashboard. Mengalihkan ke Halaman Utama...', 'info');
              navigate('/');
            }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #E9EAEB',
              backgroundColor: '#FFFFFF',
              color: '#717680',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FEF3F2';
              e.currentTarget.style.color = '#D92D20';
              e.currentTarget.style.borderColor = '#FDA29B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#717680';
              e.currentTarget.style.borderColor = '#E9EAEB';
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
};
