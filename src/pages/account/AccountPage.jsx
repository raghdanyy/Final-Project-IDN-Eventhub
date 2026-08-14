import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Plus, LogIn, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSwitchAccount = () => {
    showToast('Mengarahkan ke halaman login akun lain...', 'info');
    navigate('/login');
  };

  const handleSignOut = () => {
    showToast('Anda telah keluar dari sesi dashboard.', 'info');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-family-text)' }}>
      
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
            Account
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Sesi akun dan akses masuk ke dashboard
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Box */}
          <div
            className="page-header-search"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              width: '260px'
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                color: '#717680',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Cari event, order, attendee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                padding: '0 12px 0 36px',
                fontSize: '13px',
                color: '#181D27',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9EAEB',
                borderRadius: '8px',
                outline: 'none'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
              onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
            />
          </div>

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

      {/* 2. Main Content Grid (Left: Akun Aktif, Right: Sesi) */}
      <div
        className="account-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '16px',
          alignItems: 'stretch'
        }}
      >
        {/* Left Card: Akun Aktif */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27', marginBottom: '20px' }}>
              Akun aktif
            </h2>

            {/* Profile Info Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#D0E2FF',
                  color: '#0043CE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '700'
                }}
              >
                A
              </div>

              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#181D27', lineHeight: 1.2 }}>
                  Alex Pratama
                </div>
                <div style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
                  alex@nusantaraevent.id
                </div>
                <div style={{ fontSize: '12px', color: '#717680', marginTop: '2px' }}>
                  Owner · Nusantara Event Co.
                </div>
              </div>
            </div>
          </div>

          {/* Active Session Status Box */}
          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid #F8F9FA',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: '#717680'
            }}
          >
            <ShieldCheck size={16} color="#079455" style={{ flexShrink: 0 }} />
            <span>Sesi ini aktif di perangkat saat ini. Keluar bila memakai perangkat bersama.</span>
          </div>
        </div>

        {/* Right Card: Sesi */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27', marginBottom: '16px' }}>
            Sesi
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Option 1: Sign in ke akun lain */}
            <div
              onClick={handleSwitchAccount}
              style={{
                padding: '14px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9EAEB',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D5D7DA';
                e.currentTarget.style.backgroundColor = '#F8F9FA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E9EAEB';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LogIn size={16} color="#181D27" />
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#181D27' }}>
                  Sign in ke akun lain
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#717680' }}>
                Buka halaman
              </span>
            </div>

            {/* Option 2: Sign out dari dashboard */}
            <div
              onClick={handleSignOut}
              style={{
                padding: '14px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #FECDCA',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEF3F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LogOut size={16} color="#D92D21" />
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#D92D21' }}>
                  Sign out dari dashboard
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#D92D21' }}>
                Akhiri sesi
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
