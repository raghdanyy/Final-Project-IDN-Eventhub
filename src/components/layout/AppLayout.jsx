import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Toast } from '../common/Toast';
import { useApp } from '../../context/AppContext';
import { Menu, Plus, Bell, ArrowRight } from 'lucide-react';

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications, setNotifications, showToast } = useApp();

  const unreadCount = notifications ? notifications.filter((n) => n.isUnread).length : 0;

  // Close notif popover on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    if (setNotifications) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
      showToast('Semua notifikasi telah ditandai dibaca!', 'success');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      {/* 1. Left Sidebar Navigation (Desktop Sticky + Mobile Drawer) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        
        {/* Desktop & Mobile Top Header Bar */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E9EAEB',
            padding: '0 24px',
            display: 'flex',
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
                  backgroundColor: '#FF7A00',
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

          {/* Right Action Icons: Notification Bell & Quick Create */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Notification Bell Dropdown Button */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsNotifOpen((prev) => !prev)}
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
                  color: '#414651',
                  position: 'relative'
                }}
                title="Notifikasi"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#D92D21',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #FFFFFF'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotifOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 'min(360px, 92vw)',
                    maxHeight: '440px',
                    overflowY: 'auto',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E9EAEB',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.16)',
                    zIndex: 1000,
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>
                      Notifikasi ({unreadCount} Baru)
                    </h4>
                    <button
                      type="button"
                      onClick={markAllRead}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#FF7A00',
                        cursor: 'pointer'
                      }}
                    >
                      Tandai Dibaca
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(notifications || []).slice(0, 5).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setIsNotifOpen(false);
                          if (n.link) navigate(n.link);
                        }}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          backgroundColor: n.isUnread ? '#FFF4ED' : '#F8F9FA',
                          border: '1px solid #E9EAEB',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: '700', color: '#181D27' }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                            {n.description}
                          </div>
                          <span style={{ fontSize: '10px', color: '#98A2B3', marginTop: '4px', display: 'block' }}>
                            {n.time}
                          </span>
                        </div>
                        <ArrowRight size={14} color="#FF7A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNotifOpen(false);
                      navigate('/notifications');
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '12px',
                      borderRadius: '6px',
                      backgroundColor: '#F2F4F7',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#414651',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    Lihat Semua Notifikasi
                  </button>
                </div>
              )}
            </div>

            {/* Quick Create Event Button */}
            <button
              type="button"
              onClick={() => navigate('/events/new')}
              style={{
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                backgroundColor: '#FF7A00',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)'
              }}
              title="Buat Event Baru"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span className="hide-on-mobile">Buat Event</span>
            </button>
          </div>
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
