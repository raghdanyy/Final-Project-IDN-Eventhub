import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearchInput } from '../../components/common/GlobalSearchInput';
import { Plus, X, QrCode, Mail, CheckCircle2, User, Ticket, Clock, Send } from 'lucide-react';

export const AttendeesListPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  // 6 attendees matching the Figma screenshot
  const [attendeesList, setAttendeesList] = useState([
    {
      id: 'att-01',
      name: 'Maya Rahmadani',
      email: 'maya@mail.com',
      phone: '+62 812-3456-7890',
      event: 'Jakarta Tech Summit 2026',
      ticketType: 'Regular',
      ticketCode: 'EVH-8821-KX',
      isCheckedIn: true,
      checkInTime: '08:42',
      seat: 'Row B - 14'
    },
    {
      id: 'att-02',
      name: 'Rizky Adi',
      email: 'rizky@mail.com',
      phone: '+62 813-9876-5432',
      event: 'Jakarta Tech Summit 2026',
      ticketType: 'VIP Front Row',
      ticketCode: 'EVH-8822-LM',
      isCheckedIn: true,
      checkInTime: '08:47',
      seat: 'VIP Table A'
    },
    {
      id: 'att-03',
      name: 'Clara Wijaya',
      email: 'clara@mail.com',
      phone: '+62 811-2233-4455',
      event: 'Jakarta Tech Summit 2026',
      ticketType: 'Regular',
      ticketCode: 'EVH-8823-PQ',
      isCheckedIn: false,
      checkInTime: null,
      seat: 'Row C - 08'
    },
    {
      id: 'att-04',
      name: 'Ella Kurnia',
      email: 'ella@mail.com',
      phone: '+62 815-6677-8899',
      event: 'Jakarta Tech Summit 2026',
      ticketType: 'VIP Front Row',
      ticketCode: 'EVH-8824-ZR',
      isCheckedIn: false,
      checkInTime: null,
      seat: 'VIP Table B'
    },
    {
      id: 'att-05',
      name: 'Dimas Prakoso',
      email: 'dimas@mail.com',
      phone: '+62 817-1122-3344',
      event: 'Product Craft Meetup #14',
      ticketType: 'Community Pass',
      ticketCode: 'EVH-8825-TT',
      isCheckedIn: true,
      checkInTime: '18:31',
      seat: 'General Hall'
    },
    {
      id: 'att-06',
      name: 'Fajar Nugroho',
      email: 'fajar@mail.com',
      phone: '+62 818-5566-7788',
      event: 'Jakarta Tech Summit 2026',
      ticketType: 'Early Bird',
      ticketCode: 'EVH-8826-QW',
      isCheckedIn: false,
      checkInTime: null,
      seat: 'Row E - 21'
    }
  ]);

  // Dynamic Metrics
  const totalAttendees = attendeesList.length;
  const checkedInCount = attendeesList.filter((a) => a.isCheckedIn).length;
  const notCheckedInCount = totalAttendees - checkedInCount;
  const attendanceRate = Math.round((checkedInCount / totalAttendees) * 100);

  // Filter based on search query
  const filteredAttendees = attendeesList.filter((att) => {
    return (
      att.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      att.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      att.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      att.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      att.ticketType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleManualCheckIn = (attId) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setAttendeesList((prev) =>
      prev.map((a) => {
        if (a.id === attId) {
          const newStatus = !a.isCheckedIn;
          if (newStatus) {
            showToast(`Check-in manual berhasil untuk ${a.name}!`, 'success');
          } else {
            showToast(`Check-in dibatalkan untuk ${a.name}.`, 'info');
          }
          return {
            ...a,
            isCheckedIn: newStatus,
            checkInTime: newStatus ? timeStr : null
          };
        }
        return a;
      })
    );

    if (selectedAttendee && selectedAttendee.id === attId) {
      setSelectedAttendee((prev) => ({
        ...prev,
        isCheckedIn: !prev.isCheckedIn,
        checkInTime: !prev.isCheckedIn ? timeStr : null
      }));
    }
  };

  const handleResendTicket = (att) => {
    showToast(`E-Ticket QR Code telah dikirim ulang ke email ${att.email}!`, 'success');
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
            All Attendees
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Data peserta seluruh event
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
        {/* Card 1: Total Peserta */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Total peserta
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
            {totalAttendees}
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            tiket terverifikasi
          </div>
        </div>

        {/* Card 2: Sudah Check-in */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Sudah check-in
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
            {notCheckedInCount} belum hadir
          </div>
        </div>

        {/* Card 3: Rasio Kehadiran */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Rasio kehadiran
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
            {attendanceRate}%
          </div>
        </div>
      </div>

      {/* 3. Main Attendees Table Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EAEB',
          borderRadius: '12px',
          padding: '20px 24px'
        }}
      >
        {/* Table Count Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>
            Daftar peserta
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            💡 Klik baris peserta untuk melihat e-ticket dan aksi check-in
          </div>
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  NAMA
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  EVENT
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  TIPE TIKET
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  KODE TIKET
                </th>
                <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  KEHADIRAN
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((att) => (
                <tr
                  key={att.id}
                  onClick={() => setSelectedAttendee(att)}
                  style={{
                    borderBottom: '1px solid #F8F9FA',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Nama Column */}
                  <td style={{ padding: '16px 12px 16px 0' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {att.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                      {att.email}
                    </div>
                  </td>

                  {/* Event Column */}
                  <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                    {att.event}
                  </td>

                  {/* Tipe Tiket Column */}
                  <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                    {att.ticketType}
                  </td>

                  {/* Kode Tiket Column */}
                  <td style={{ padding: '16px 12px', fontSize: '12px', fontFamily: 'monospace', fontWeight: '600', color: '#414651' }}>
                    {att.ticketCode}
                  </td>

                  {/* Kehadiran Column */}
                  <td style={{ padding: '16px 0 16px 12px' }}>
                    {att.isCheckedIn ? (
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#079455' }}>
                        Hadir · {att.checkInTime}
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#717680' }}>
                        Belum check-in
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Attendee Detail Modal Popup */}
      {selectedAttendee && (
        <div
          onClick={() => setSelectedAttendee(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E9EAEB',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.16)',
              overflow: 'hidden',
              animation: 'appleScaleUp 0.2s ease-out'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                backgroundColor: '#FAFAFA'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: selectedAttendee.isCheckedIn ? '#ECFDF3' : '#F2F4F7',
                      color: selectedAttendee.isCheckedIn ? '#079455' : '#475467'
                    }}
                  >
                    {selectedAttendee.isCheckedIn ? `Checked-in (${selectedAttendee.checkInTime})` : 'Belum Check-in'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#717680' }}>
                    {selectedAttendee.seat}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#181D27',
                    marginTop: '6px',
                    fontFamily: 'var(--font-family-display)'
                  }}
                >
                  {selectedAttendee.name}
                </h2>
                <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
                  {selectedAttendee.event} · {selectedAttendee.ticketType}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAttendee(null)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E9EAEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#717680'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Ticket QR & Code Card */}
              <div style={{ padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '12px', border: '1px solid #F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E9EAEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={28} color="#181D27" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#717680', fontWeight: '500' }}>
                      KODE TIKET MASUK
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'monospace', color: '#181D27', letterSpacing: '0.05em', marginTop: '2px' }}>
                      {selectedAttendee.ticketCode}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleResendTicket(selectedAttendee)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5D7DA',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#181D27',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={13} />
                  <span>Kirim QR</span>
                </button>
              </div>

              {/* Attendee Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Email Peserta</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedAttendee.email}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Nomor WhatsApp / HP</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedAttendee.phone}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Tipe Tiket</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedAttendee.ticketType}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
                  <span style={{ color: '#717680' }}>Status Pintu Gate</span>
                  <span style={{ fontWeight: '700', color: selectedAttendee.isCheckedIn ? '#079455' : '#717680' }}>
                    {selectedAttendee.isCheckedIn ? `Sudah Hadir (${selectedAttendee.checkInTime})` : 'Belum Hadir'}
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FAFAFA'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedAttendee(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D7DA',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#414651',
                  cursor: 'pointer'
                }}
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={() => toggleManualCheckIn(selectedAttendee.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: selectedAttendee.isCheckedIn ? '#FEF3F2' : '#FF7A00',
                  color: selectedAttendee.isCheckedIn ? '#D92D21' : '#FFFFFF',
                  border: selectedAttendee.isCheckedIn ? '1px solid #FECDCA' : 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: selectedAttendee.isCheckedIn ? 'none' : '0 1px 2px rgba(255, 122, 0, 0.2)'
                }}
              >
                <CheckCircle2 size={16} />
                <span>{selectedAttendee.isCheckedIn ? 'Batalkan Check-in' : 'Check-in Manual'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
