import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearchInput } from '../../components/common/GlobalSearchInput';
import { Plus, X, Calendar, Ticket, CheckCircle2, DollarSign, Users, Clock, Edit3, Share2, Trash2, Eye } from 'lucide-react';

export const TicketTiersPage = () => {
  const navigate = useNavigate();
  const { showToast, deleteTicketType } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // 4 ticket types matching the Figma screenshot with full details
  const [localTickets, setLocalTickets] = useState([
    {
      id: 'tkt-01',
      name: 'Early Bird',
      event: 'Jakarta Tech Summit 2026',
      price: 'Rp 450.000',
      rawPrice: 450000,
      soldPercent: 100,
      soldCount: 300,
      quota: 300,
      endDate: '2026-07-01',
      status: 'Habis',
      statusType: 'warning',
      description: 'Akses penuh ke seluruh keynote sesi 2 hari, sertifikat digital resmi, dan exclusive conference goodie bag.',
      venue: 'Balai Kartini · Jakarta',
      eventDate: '12-13 September 2026',
      benefits: ['Akses 2 Hari Konferensi', 'Digital Certificate', 'Conference Swag Bag', 'Networking Coffee Break']
    },
    {
      id: 'tkt-02',
      name: 'Regular',
      event: 'Jakarta Tech Summit 2026',
      price: 'Rp 750.000',
      rawPrice: 750000,
      soldPercent: 73,
      soldCount: 512,
      quota: 700,
      endDate: '2026-09-10',
      status: 'Dijual',
      statusType: 'info',
      description: 'Akses seluruh stage presentasi, expo floor teknologi, makan siang buffet 2 hari, dan sertifikat kehadiran.',
      venue: 'Balai Kartini · Jakarta',
      eventDate: '12-13 September 2026',
      benefits: ['Akses Semua Stage & Expo', 'Makan Siang Buffet 2 Hari', 'E-Certificate', 'Akses Recording Sesi 30 Hari']
    },
    {
      id: 'tkt-03',
      name: 'VIP Front Row',
      event: 'Jakarta Tech Summit 2026',
      price: 'Rp 1.850.000',
      rawPrice: 1850000,
      soldPercent: 31,
      soldCount: 62,
      quota: 200,
      endDate: '2026-09-10',
      status: 'Dijual',
      statusType: 'info',
      description: 'Kursi baris depan (Front Row), akses VIP Lounge eksklusif, fast-track check-in, dan undangan Private Dinner bersama pembicara.',
      venue: 'Balai Kartini · Jakarta',
      eventDate: '12-13 September 2026',
      benefits: ['Front-Row Priority Seating', 'VIP Lounge & Dedicated Barista', 'Fast-Track Gate Check-in', 'Private Speaker Dinner Invitation']
    },
    {
      id: 'tkt-04',
      name: 'Community Pass',
      event: 'Product Craft Meetup #14',
      price: 'Rp 150.000',
      rawPrice: 150000,
      soldPercent: 96,
      soldCount: 176,
      quota: 180,
      endDate: '2026-08-10',
      status: 'Dijual',
      statusType: 'info',
      description: 'Tiket khusus komunitas pegiat desain & product management. Termasuk snack box dan sesi networking santai.',
      venue: 'GoWork Pacific Place · Jakarta',
      eventDate: '10 Agustus 2026',
      benefits: ['Akses Meetup & Panel Discussion', 'Snack & Beverage Box', 'Community Networking Room', 'Digital Event Guide']
    }
  ]);

  const handleDeleteTicket = (tktId, tktName) => {
    setLocalTickets((prev) => prev.filter((t) => t.id !== tktId));
    if (deleteTicketType) deleteTicketType(tktId);
    showToast(`Tipe tiket "${tktName}" berhasil dihapus!`, 'info');
  };

  const handleShareTicket = (tkt) => {
    showToast(`Link pembelian tiket "${tkt.name}" berhasil disalin ke clipboard!`, 'success');
  };

  const handleEditTicket = (tkt) => {
    setSelectedTicket(tkt);
  };

  // Filter based on search
  const filteredTickets = localTickets.filter((tkt) => {
    return (
      tkt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tkt.event.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'warning':
        return { backgroundColor: '#FFF8E6', color: '#DC6903' };
      case 'info':
      default:
        return { backgroundColor: '#EFF8FF', color: '#006BFF' };
    }
  };

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val || 0);
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
            Ticket Tiers
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Manajemen kategori & harga tiket event
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
            onClick={() => showToast('Form pembuatan tipe tiket baru dibuka', 'info')}
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
            <span>Tambah Tiket</span>
          </button>
        </div>
      </div>

      {/* 2. Main Ticket Table Card */}
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
            {filteredTickets.length} tipe tiket
          </div>
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Tipe tiket
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Event
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Harga
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Kuota terjual
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Penjualan berakhir
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Status
                </th>
                <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', textAlign: 'right' }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((tkt) => {
                const badgeStyle = getBadgeStyle(tkt.statusType);
                return (
                  <tr
                    key={tkt.id}
                    style={{
                      borderBottom: '1px solid #F8F9FA',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Tipe Tiket Column */}
                    <td style={{ padding: '16px 12px 16px 0', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {tkt.name}
                    </td>

                    {/* Event Column */}
                    <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                      {tkt.event}
                    </td>

                    {/* Harga Column */}
                    <td style={{ padding: '16px 12px', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {tkt.price}
                    </td>

                    {/* Kuota Terjual Progress Column */}
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '130px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              flex: 1,
                              height: '6px',
                              backgroundColor: '#E0EAFF',
                              borderRadius: '9999px',
                              overflow: 'hidden'
                            }}
                          >
                            <div
                              style={{
                                width: `${tkt.soldPercent}%`,
                                height: '100%',
                                backgroundColor: '#FF7A00',
                                borderRadius: '9999px'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '11px', color: '#717680', minWidth: '26px' }}>
                            {tkt.soldPercent}%
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#717680' }}>
                          {tkt.soldCount} / {tkt.quota}
                        </div>
                      </div>
                    </td>

                    {/* Penjualan Berakhir Column */}
                    <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                      {tkt.endDate}
                    </td>

                    {/* Status Column */}
                    <td style={{ padding: '16px 12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '2px 10px',
                          borderRadius: '9999px',
                          display: 'inline-block',
                          ...badgeStyle
                        }}
                      >
                        {tkt.status}
                      </span>
                    </td>

                    {/* Outer Action Icon Buttons Column */}
                    <td style={{ padding: '16px 0 16px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedTicket(tkt)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid #E9EAEB',
                            backgroundColor: '#FFFFFF',
                            color: '#414651',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Detail Tiket"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditTicket(tkt)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid #E9EAEB',
                            backgroundColor: '#FFFFFF',
                            color: '#006BFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Edit Tiket"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShareTicket(tkt)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid #E9EAEB',
                            backgroundColor: '#FFFFFF',
                            color: '#079455',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Bagikan Link Tiket"
                        >
                          <Share2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTicket(tkt.id, tkt.name)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid #FECDCA',
                            backgroundColor: '#FEF3F2',
                            color: '#D92D21',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Hapus Tiket"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Ticket Detail Modal Popup */}
      {selectedTicket && (
        <div
          onClick={() => setSelectedTicket(null)}
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
                      ...getBadgeStyle(selectedTicket.statusType)
                    }}
                  >
                    {selectedTicket.status}
                  </span>
                  <span style={{ fontSize: '12px', color: '#717680' }}>
                    ID: {selectedTicket.id}
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
                  {selectedTicket.name}
                </h2>
                <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
                  {selectedTicket.event}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
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
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Price & Generated Revenue Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '14px 16px', backgroundColor: '#F8F9FA', borderRadius: '10px', border: '1px solid #F2F4F7' }}>
                  <div style={{ fontSize: '11px', color: '#717680', fontWeight: '500' }}>
                    HARGA PER TIKET
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#FF7A00', marginTop: '4px' }}>
                    {selectedTicket.price}
                  </div>
                </div>

                <div style={{ padding: '14px 16px', backgroundColor: '#F8F9FA', borderRadius: '10px', border: '1px solid #F2F4F7' }}>
                  <div style={{ fontSize: '11px', color: '#717680', fontWeight: '500' }}>
                    TOTAL REVENUE TIKET
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#181D27', marginTop: '4px' }}>
                    {formatIDR(selectedTicket.soldCount * selectedTicket.rawPrice)}
                  </div>
                </div>
              </div>

              {/* Quota Progress */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                  <span>Progres Kuota Penjualan</span>
                  <span style={{ color: '#006BFF' }}>
                    {selectedTicket.soldCount} / {selectedTicket.quota} ({selectedTicket.soldPercent}%)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E0EAFF', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${selectedTicket.soldPercent}%`,
                      height: '100%',
                      backgroundColor: '#006BFF',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: '#717680', marginTop: '6px' }}>
                  Sisa kuota tersedia: <strong>{selectedTicket.quota - selectedTicket.soldCount} tiket</strong>
                </div>
              </div>

              {/* Description & Benefits */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#181D27', marginBottom: '6px' }}>
                  Deskripsi & Fasilitas
                </div>
                <p style={{ fontSize: '13px', color: '#414651', lineHeight: 1.5, marginBottom: '12px' }}>
                  {selectedTicket.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {selectedTicket.benefits.map((b, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#414651' }}>
                      <CheckCircle2 size={14} color="#079455" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validity & Venue Info */}
              <div style={{ padding: '12px 14px', backgroundColor: '#F8F9FA', borderRadius: '8px', border: '1px solid #F2F4F7', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#414651' }}>
                  <Clock size={14} color="#717680" />
                  <span>Periode Penjualan Berakhir: <strong>{selectedTicket.endDate}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#414651' }}>
                  <Calendar size={14} color="#717680" />
                  <span>Pelaksanaan Event: <strong>{selectedTicket.eventDate}</strong> ({selectedTicket.venue})</span>
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
                justifyContent: 'flex-end',
                gap: '10px',
                backgroundColor: '#FAFAFA'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
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
                onClick={() => {
                  showToast(`Membuka form edit untuk tiket ${selectedTicket.name}`, 'info');
                  setSelectedTicket(null);
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#FF7A00',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)'
                }}
              >
                Edit Tipe Tiket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
