import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  Calendar,
  ShoppingBag,
  Users,
  Tag,
  Ticket,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  BarChart3,
  QrCode,
  Settings,
  User,
  Bell
} from 'lucide-react';

export const GlobalSearchInput = ({
  placeholder = 'Cari event, order, attendee...',
  value: controlledValue,
  onChange: controlledOnChange,
  style = {},
  className = ''
}) => {
  const navigate = useNavigate();
  const {
    events = [],
    orders = [],
    attendees = [],
    promoCodes = [],
    ticketTypes = []
  } = useApp();

  const [localQuery, setLocalQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Sync if controlled
  const query = controlledValue !== undefined ? controlledValue : localQuery;

  const handleQueryChange = (val) => {
    if (controlledOnChange) {
      controlledOnChange({ target: { value: val } });
    }
    setLocalQuery(val);
    if (val.trim()) {
      setIsOpen(true);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Static Navigation Screens
  const screens = [
    { label: 'Overview Dashboard', path: '/', category: 'Halaman', icon: LayoutDashboard },
    { label: 'Semua Event & Konser', path: '/events', category: 'Halaman', icon: Calendar },
    { label: 'Analytics & Tren Penjualan', path: '/analytics', category: 'Halaman', icon: BarChart3 },
    { label: 'Daftar Order & Transaksi', path: '/orders', category: 'Halaman', icon: ShoppingBag },
    { label: 'Semua Peserta (Attendees)', path: '/attendees', category: 'Halaman', icon: Users },
    { label: 'Check-in Terminal Hari-H', path: '/checkin', category: 'Halaman', icon: QrCode },
    { label: 'Kode Promo Diskon', path: '/promo-codes', category: 'Halaman', icon: Tag },
    { label: 'Kategori & Tipe Tiket', path: '/tickets', category: 'Halaman', icon: Ticket },
    { label: 'Pengaturan Organisasi & Tim', path: '/settings', category: 'Halaman', icon: Settings },
    { label: 'Akun & Sesi Pengguna', path: '/account', category: 'Halaman', icon: User },
    { label: 'Notifikasi & Pengumuman', path: '/notifications', category: 'Halaman', icon: Bell }
  ];

  const q = (query || '').toLowerCase().trim();

  // 1. Filter Events
  const matchedEvents = q
    ? events
        .filter(
          (e) =>
            (e.title && e.title.toLowerCase().includes(q)) ||
            (e.category && e.category.toLowerCase().includes(q)) ||
            (e.venue && e.venue.toLowerCase().includes(q)) ||
            (e.venue_name && e.venue_name.toLowerCase().includes(q))
        )
        .slice(0, 3)
    : [];

  // 2. Filter Orders
  const matchedOrders = q
    ? orders
        .filter(
          (o) =>
            (o.id && o.id.toLowerCase().includes(q)) ||
            (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
            (o.customer_email && o.customer_email.toLowerCase().includes(q)) ||
            (o.ticket_name && o.ticket_name.toLowerCase().includes(q))
        )
        .slice(0, 3)
    : [];

  // 3. Filter Attendees
  const matchedAttendees = q
    ? attendees
        .filter(
          (a) =>
            (a.name && a.name.toLowerCase().includes(q)) ||
            (a.email && a.email.toLowerCase().includes(q)) ||
            (a.ticket_code && a.ticket_code.toLowerCase().includes(q)) ||
            (a.ticket_type && a.ticket_type.toLowerCase().includes(q))
        )
        .slice(0, 3)
    : [];

  // 4. Filter Promo Codes
  const matchedPromos = q
    ? promoCodes
        .filter(
          (p) =>
            (p.code && p.code.toLowerCase().includes(q)) ||
            (p.discountType && p.discountType.toLowerCase().includes(q)) ||
            (p.value && p.value.toLowerCase().includes(q))
        )
        .slice(0, 3)
    : [];

  // 5. Filter Screens
  const matchedScreens = q
    ? screens.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const totalMatches =
    matchedEvents.length +
    matchedOrders.length +
    matchedAttendees.length +
    matchedPromos.length +
    matchedScreens.length;

  const handleSelect = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div
      ref={wrapperRef}
      className={`page-header-search ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '260px',
        ...style
      }}
    >
      <Search
        size={16}
        style={{
          position: 'absolute',
          left: '12px',
          color: '#717680',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        onFocus={() => {
          if (query.trim()) setIsOpen(true);
        }}
        style={{
          width: '100%',
          height: '40px',
          padding: '0 32px 0 36px',
          fontSize: '13px',
          color: '#181D27',
          backgroundColor: '#FFFFFF',
          border: isOpen ? '1px solid #FF7A00' : '1px solid #E9EAEB',
          borderRadius: '8px',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(255, 122, 0, 0.12)' : 'none',
          transition: 'all 0.15s ease'
        }}
      />

      {query && (
        <button
          type="button"
          onClick={() => handleQueryChange('')}
          style={{
            position: 'absolute',
            right: '10px',
            background: 'none',
            border: 'none',
            color: '#717680',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <X size={14} />
        </button>
      )}

      {/* Apple Spotlight Style Global Search Dropdown */}
      {isOpen && q && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: 'min(420px, 92vw)',
            maxHeight: '400px',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E9EAEB',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.14)',
            zIndex: 1000,
            padding: '8px',
            animation: 'appleScaleUp 0.15s ease-out'
          }}
        >
          {totalMatches === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#717680', fontSize: '13px' }}>
              <Search size={22} style={{ margin: '0 auto 8px', color: '#A4A7AE' }} />
              <div>Tidak ditemukan hasil untuk <strong>"{query}"</strong></div>
              <div style={{ fontSize: '11px', color: '#A4A7AE', marginTop: '4px' }}>
                Coba cari nama event, nomor order, email peserta, atau kode promo
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Group 1: Events */}
              {matchedEvents.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#717680',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '4px 8px'
                    }}
                  >
                    Event & Konser ({matchedEvents.length})
                  </div>
                  {matchedEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => handleSelect(`/events/${evt.id}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.12s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF4ED')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            backgroundColor: '#FFF4ED',
                            color: '#FF7A00',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Calendar size={14} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: '600',
                              color: '#181D27',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {evt.title}
                          </div>
                          <div style={{ fontSize: '11px', color: '#717680' }}>
                            {evt.category || 'Event'} • {evt.date || '2026'}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={13} color="#FF7A00" style={{ flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Group 2: Orders */}
              {matchedOrders.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#717680',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '4px 8px'
                    }}
                  >
                    Order Transaksi ({matchedOrders.length})
                  </div>
                  {matchedOrders.map((ord) => (
                    <div
                      key={ord.id}
                      onClick={() => handleSelect('/orders')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.12s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EFF8FF')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            backgroundColor: '#EFF8FF',
                            color: '#006BFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <ShoppingBag size={14} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#181D27' }}>
                            {ord.id} · {ord.customer_name || ord.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#717680' }}>
                            {ord.ticket_name || 'Tiket'} • {ord.amount}
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '600',
                          padding: '2px 6px',
                          borderRadius: '9999px',
                          backgroundColor: ord.status === 'Lunas' || ord.status === 'success' ? '#ECFDF3' : '#FFFAEB',
                          color: ord.status === 'Lunas' || ord.status === 'success' ? '#079455' : '#B54708',
                          flexShrink: 0
                        }}
                      >
                        {ord.status || 'Lunas'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Group 3: Attendees */}
              {matchedAttendees.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#717680',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '4px 8px'
                    }}
                  >
                    Peserta (Attendees) ({matchedAttendees.length})
                  </div>
                  {matchedAttendees.map((att) => (
                    <div
                      key={att.id}
                      onClick={() => handleSelect('/attendees')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.12s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F4F3FF')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            backgroundColor: '#F4F3FF',
                            color: '#7A5AF8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Users size={14} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#181D27' }}>
                            {att.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#717680' }}>
                            {att.email} • {att.ticket_type || 'General'}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={13} color="#7A5AF8" style={{ flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Group 4: Promo Codes */}
              {matchedPromos.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#717680',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '4px 8px'
                    }}
                  >
                    Kode Promo ({matchedPromos.length})
                  </div>
                  {matchedPromos.map((prm) => (
                    <div
                      key={prm.id}
                      onClick={() => handleSelect('/promo-codes')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.12s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF6EE')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            backgroundColor: '#FEF6EE',
                            color: '#E04F16',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Tag size={14} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                            {prm.code}
                          </div>
                          <div style={{ fontSize: '11px', color: '#717680' }}>
                            Diskon {prm.value || `${prm.discount_value}%`} • {prm.status || 'Aktif'}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={13} color="#E04F16" style={{ flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Group 5: Navigation Screens */}
              {matchedScreens.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#717680',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '4px 8px'
                    }}
                  >
                    Menu Navigasi ({matchedScreens.length})
                  </div>
                  {matchedScreens.map((scr, idx) => {
                    const Icon = scr.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelect(scr.path)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.12s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F9FA')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              backgroundColor: '#F2F4F7',
                              color: '#475467',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <Icon size={14} />
                          </div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#181D27' }}>
                            {scr.label}
                          </div>
                        </div>
                        <ArrowRight size={13} color="#717680" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
