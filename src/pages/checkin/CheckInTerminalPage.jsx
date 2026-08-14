import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearchInput } from '../../components/common/GlobalSearchInput';
import { Plus, Scan, CheckCircle2, QrCode, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckInTerminalPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketInput, setTicketInput] = useState('EVH-8823-PQ');

  // Check-in activities state matching the Figma screenshot
  const [activities, setActivities] = useState([
    {
      id: 'att-01',
      name: 'Maya Rahmadani',
      ticketCode: 'EVH-8821-KX',
      ticketTier: 'Regular',
      isCheckedIn: true,
      checkInTime: '08:42'
    },
    {
      id: 'att-02',
      name: 'Rizky Adi',
      ticketCode: 'EVH-8822-LM',
      ticketTier: 'VIP Front Row',
      isCheckedIn: true,
      checkInTime: '08:47'
    },
    {
      id: 'att-03',
      name: 'Clara Wijaya',
      ticketCode: 'EVH-8823-PQ',
      ticketTier: 'Regular',
      isCheckedIn: false,
      checkInTime: null
    },
    {
      id: 'att-04',
      name: 'Ella Kurnia',
      ticketCode: 'EVH-8824-ZR',
      ticketTier: 'VIP Front Row',
      isCheckedIn: false,
      checkInTime: null
    },
    {
      id: 'att-05',
      name: 'Dimas Prakoso',
      ticketCode: 'EVH-8825-TT',
      ticketTier: 'Community Pass',
      isCheckedIn: true,
      checkInTime: '18:31'
    },
    {
      id: 'att-06',
      name: 'Fajar Nugroho',
      ticketCode: 'EVH-8826-QW',
      ticketTier: 'Early Bird',
      isCheckedIn: false,
      checkInTime: null
    }
  ]);

  // Dynamic KPI calculations
  const totalCount = activities.length;
  const checkedInCount = activities.filter((a) => a.isCheckedIn).length;
  const notCheckedInCount = totalCount - checkedInCount;

  const handleCheckIn = (e) => {
    e?.preventDefault();
    if (!ticketInput.trim()) {
      showToast('Masukkan kode tiket peserta', 'error');
      return;
    }

    const code = ticketInput.trim().toUpperCase();
    const found = activities.find(
      (a) => a.ticketCode.toUpperCase() === code || a.name.toLowerCase().includes(code.toLowerCase())
    );

    if (!found) {
      showToast(`Tiket ${code} tidak ditemukan!`, 'error');
      return;
    }

    if (found.isCheckedIn) {
      showToast(`Tiket ${found.ticketCode} sudah pernah check-in pada pukul ${found.checkInTime}!`, 'warning');
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setActivities((prev) =>
      prev.map((a) => (a.id === found.id ? { ...a, isCheckedIn: true, checkInTime: timeStr } : a))
    );

    // Confetti animation on successful scan
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF7A00', '#079455', '#006BFF']
    });

    showToast(`✅ Check-in berhasil untuk ${found.name} (${found.ticketTier})!`, 'success');
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
            Check-in
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Mode hari-H — validasi tiket peserta
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

      {/* 2. Three Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Card 1: Sudah Masuk */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Sudah masuk
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            {checkedInCount}
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            dari {totalCount} peserta
          </div>
        </div>

        {/* Card 2: Belum Hadir */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Belum hadir
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            {notCheckedInCount}
          </div>
        </div>

        {/* Card 3: Kecepatan Scan */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Kecepatan scan
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            1,8 detik
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            rata-rata per tiket
          </div>
        </div>
      </div>

      {/* 3. Row 2: Scan Tiket (Left) & Aktivitas Check-in (Right) */}
      <div
        className="checkin-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)',
          gap: '16px',
          alignItems: 'start'
        }}
      >
        {/* Left: Scan Tiket Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px'
          }}
        >
          <h2
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#181D27',
              marginBottom: '20px'
            }}
          >
            Scan tiket
          </h2>

          <form onSubmit={handleCheckIn} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Input Box with Scan Icon */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Scan
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  color: '#717680',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                placeholder="Masukkan kode tiket..."
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px 0 44px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  fontWeight: '600',
                  color: '#181D27',
                  backgroundColor: '#F8F9FA',
                  border: '1px solid #E9EAEB',
                  borderRadius: '8px',
                  outline: 'none',
                  letterSpacing: '0.04em'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FF7A00';
                  e.target.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E9EAEB';
                  e.target.style.backgroundColor = '#F8F9FA';
                }}
              />
            </div>

            {/* Check-in Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                height: '44px',
                backgroundColor: '#FF7A00',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
            >
              Check-in peserta
            </button>

            {/* Helper Caption */}
            <p style={{ fontSize: '12px', color: '#717680', marginTop: '2px', lineHeight: 1.4 }}>
              Gunakan kode dari e-ticket peserta. Contoh: <code>EVH-8823-PQ</code>
            </p>
          </form>
        </div>

        {/* Right: Aktivitas Check-in Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px'
          }}
        >
          <h2
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#181D27',
              marginBottom: '16px'
            }}
          >
            Aktivitas check-in
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {activities.map((act) => (
              <div
                key={act.id}
                onClick={() => setTicketInput(act.ticketCode)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid #F8F9FA',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Klik untuk mengisi kode ke form scan"
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27', lineHeight: 1.3 }}>
                    {act.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                    {act.ticketCode} · {act.ticketTier}
                  </div>
                </div>

                <div>
                  {act.isCheckedIn ? (
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#079455' }}>
                      Hadir {act.checkInTime}
                    </span>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#717680' }}>
                      Menunggu
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
