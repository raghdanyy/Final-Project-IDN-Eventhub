import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Toast } from '../common/Toast';
import { Menu, Plus } from 'lucide-react';

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      {/* 1. Left Sidebar Navigation (Desktop Sticky + Mobile Drawer) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        
        {/* Mobile Top App Bar (Visible on <= 768px via CSS) */}
        <header
          className="mobile-top-bar"
          style={{
            height: '60px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E9EAEB',
            padding: '0 16px',
            display: 'none', // Shown on mobile via CSS
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 90
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#F8F9FA',
                border: '1px solid #E9EAEB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#181D27'
              }}
              aria-label="Buka Menu"
            >
              <Menu size={18} />
            </button>

            {/* Brand Logo & Name */}
            <div
              onClick={() => navigate('/dashboard')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: '#181D27',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: '800',
                  fontSize: '14px'
                }}
              >
                E
              </div>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#181D27' }}>
                EventHub
              </span>
            </div>
          </div>

          {/* Quick Create Event Button on Mobile */}
          <button
            type="button"
            onClick={() => navigate('/events/new')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FF7A00',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)'
            }}
            title="Create Event"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </header>

        {/* 3. Main Outlet Container */}
        <main
          className="app-main-content"
          style={{
            flex: 1,
            padding: '32px 36px 64px',
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto'
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* 4. Global Floating Toast */}
      <Toast />
    </div>
  );
};
