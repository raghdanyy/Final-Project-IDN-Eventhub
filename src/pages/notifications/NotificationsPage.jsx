import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearchInput } from '../../components/common/GlobalSearchInput';
import { Plus, CheckCheck, Bell } from 'lucide-react';

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // 4 notifications matching Figma screenshot
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Pembayaran diterima',
      description: 'ORD-24081 — Rp1.500.000 dari Maya Rahmadani',
      time: '2 menit lalu',
      isUnread: true,
      link: '/orders'
    },
    {
      id: 'notif-2',
      title: 'Tiket hampir habis',
      description: 'Regular (Jakarta Tech Summit 2026) tersisa 188 dari 700',
      time: '1 jam lalu',
      isUnread: true,
      link: '/tickets'
    },
    {
      id: 'notif-3',
      title: 'Settlement dikirim',
      description: 'Rp48.250.000 dijadwalkan cair 12 Agustus 2026',
      time: '6 jam lalu',
      isUnread: false,
      link: '/overview'
    },
    {
      id: 'notif-4',
      title: 'Anggota tim baru',
      description: 'Tania Putri menerima undangan sebagai Marketing',
      time: 'Kemarin',
      isUnread: false,
      link: '/settings'
    }
  ]);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    showToast('Semua notifikasi telah ditandai dibaca', 'success');
  };

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: !n.isUnread } : n))
    );
  };

  // Filter based on search query
  const filteredNotifications = notifications.filter((n) => {
    return (
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-family-text)' }}>
      
      {/* 1. Top Header Area */}
      <div
        className="page-header-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            Notifications
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Universal Global Search Box */}
          <GlobalSearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Create Event Button */}
          <button
            type="button"
            className="page-header-btn"
            onClick={() => navigate('/events/new')}
            style={{
              height: '40px',
              padding: '0 16px',
              backgroundColor: '#FF7A00',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* 2. Main Notifications Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EAEB',
          borderRadius: '12px',
          padding: '24px'
        }}
      >
        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#181D27' }}>
            Semua notifikasi
          </h2>

          <button
            type="button"
            onClick={markAllAsRead}
            style={{
              padding: '6px 14px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5D7DA',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#181D27',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F9FA')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            Tandai semua dibaca
          </button>
        </div>

        {/* Notification List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => toggleReadStatus(notif.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: '1px solid #F8F9FA',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              title="Klik untuk mengubah status baca"
            >
              {/* Left Side: Dot + Title + Description */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: notif.isUnread ? '#006BFF' : '#D5D7DA',
                    marginTop: '5px',
                    flexShrink: 0
                  }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27', lineHeight: 1.3 }}>
                    {notif.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#717680', marginTop: '2px' }}>
                    {notif.description}
                  </div>
                </div>
              </div>

              {/* Right Side: Timestamp */}
              <div style={{ fontSize: '12px', color: '#717680', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                {notif.time}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
