import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Ticket,
  Users,
  Share2,
  Edit3,
  CheckCircle2,
  Plus,
  QrCode,
  Sparkles,
  Trash2,
  AlertTriangle,
  X
} from 'lucide-react';

export const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    events,
    activeEvent,
    updateEvent,
    deleteEvent,
    ticketTypes,
    attendees,
    showToast
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Find event from state or fallback to activeEvent or default mock
  const currentEvent =
    events.find((e) => e.id === id) ||
    events.find((e) => String(e.id) === String(id)) ||
    activeEvent || {
      id: id || 'evt-1',
      title: 'Event Organizer',
      venue: 'Jakarta, Indonesia',
      date: '12 Sep 2026',
      status: 'Published',
      soldPercent: 73,
      soldCount: 874,
      capacity: 1200,
      revenue: 'Rp 612.300.000'
    };

  // Format date helper (handles ISO string, timestamps, or Indonesian date strings)
  const formatEventDate = (dateStr) => {
    if (!dateStr) return '12 Sep 2026';
    try {
      // If it contains ISO string format e.g. 2026-10-05T10:00:00Z or YYYY-MM-DD
      if (dateStr.includes('-') || dateStr.includes('T')) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
        }
      }
    } catch (err) {
      console.warn('Date parsing fallback:', err);
    }
    return dateStr;
  };

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: currentEvent.title || '',
    venue: currentEvent.venue || currentEvent.venue_name || 'Balai Kartini · Jakarta',
    date: formatEventDate(currentEvent.date || currentEvent.start_date),
    capacity: currentEvent.capacity || 500,
    status: currentEvent.status || 'Published'
  });

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateEvent(currentEvent.id, editForm);
    setIsEditing(false);
    showToast('Detail event berhasil diperbarui!', 'success');
  };

  const handlePublishToggle = () => {
    const newStatus = currentEvent.status?.toLowerCase() === 'published' ? 'Draft' : 'Published';
    updateEvent(currentEvent.id, { status: newStatus });
    showToast(`Status event diubah menjadi ${newStatus}!`, 'success');
  };

  const handleDeleteConfirm = () => {
    deleteEvent(currentEvent.id);
    setIsDeleteModalOpen(false);
    navigate('/events');
  };

  const getBadgeStyle = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'published' || s === 'berlangsung') {
      return { backgroundColor: '#ECFDF3', color: '#079455' };
    }
    if (s === 'draft') {
      return { backgroundColor: '#EFF8FF', color: '#006BFF' };
    }
    return { backgroundColor: '#F2F4F7', color: '#475467' };
  };

  const soldCount = currentEvent.soldCount !== undefined ? currentEvent.soldCount : (currentEvent.tickets_sold || 0);
  const capacity = currentEvent.capacity || 500;
  const percent = currentEvent.soldPercent !== undefined ? currentEvent.soldPercent : Math.round((soldCount / capacity) * 100);
  const revenue = currentEvent.revenue || (currentEvent.total_gmv ? `Rp ${new Intl.NumberFormat('id-ID').format(currentEvent.total_gmv)}` : 'Rp 0');
  const formattedDate = formatEventDate(currentEvent.date || currentEvent.start_date);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-family-text)' }}>
      
      {/* 1. Navigation & Actions Bar (Fully Responsive) */}
      <div
        className="event-detail-top-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/events')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#414651',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F9FA')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke My Events</span>
        </button>

        {/* Action Buttons Group */}
        <div
          className="event-detail-actions-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          {/* Share Button */}
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              showToast('Tautan event berhasil disalin ke clipboard!', 'info');
            }}
            className="event-action-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 14px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5D7DA',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#181D27',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Share2 size={15} />
            <span>Bagikan</span>
          </button>

          {/* Edit Event Button */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="event-action-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 14px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5D7DA',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#181D27',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Edit3 size={15} />
            <span>{isEditing ? 'Tutup' : 'Edit Event'}</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="event-action-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 14px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #FECDCA',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#D92D21',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF3F2')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            title="Hapus event dari database"
          >
            <Trash2 size={15} color="#D92D21" />
            <span>Hapus</span>
          </button>

          {/* Publish / Draft Button */}
          <button
            type="button"
            onClick={handlePublishToggle}
            className="event-action-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 16px',
              backgroundColor: '#FF7A00',
              color: '#FFFFFF',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
          >
            <CheckCircle2 size={15} />
            <span>{currentEvent.status?.toLowerCase() === 'published' ? 'Jadikan Draft' : 'Publikasikan'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Hero Banner Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EAEB',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '9999px',
              ...getBadgeStyle(currentEvent.status)
            }}
          >
            {currentEvent.status || 'Published'}
          </span>
          <span style={{ fontSize: '12px', color: '#717680' }}>
            ID: {currentEvent.id}
          </span>
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#181D27',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            fontFamily: 'var(--font-family-display)'
          }}
        >
          {currentEvent.title}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#414651' }}>
            <Calendar size={16} color="#717680" style={{ flexShrink: 0 }} />
            <span>{formattedDate}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#414651' }}>
            <MapPin size={16} color="#717680" style={{ flexShrink: 0 }} />
            <span>{currentEvent.venue || currentEvent.venue_name || 'Balai Kartini · Jakarta'}</span>
          </div>
        </div>
      </div>

      {/* 3. Inline Edit Card (Visible when isEditing === true) */}
      {isEditing && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #FF7A00',
            borderRadius: '12px',
            padding: '20px',
            animation: 'appleScaleUp 0.2s ease-out'
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#181D27', marginBottom: '16px' }}>
            Edit Informasi Event
          </h2>

          <form onSubmit={handleSaveEdit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#181D27' }}>Nama Event</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                required
                style={{
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  border: '1px solid #E9EAEB',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#181D27' }}>Lokasi / Venue</label>
              <input
                type="text"
                value={editForm.venue}
                onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                required
                style={{
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  border: '1px solid #E9EAEB',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#181D27' }}>Tanggal Pelaksanaan</label>
              <input
                type="text"
                value={editForm.date}
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                required
                style={{
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  border: '1px solid #E9EAEB',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#181D27' }}>Total Kapasitas (Tiket)</label>
              <input
                type="number"
                value={editForm.capacity}
                onChange={(e) => setEditForm({ ...editForm, capacity: Number(e.target.value) })}
                required
                style={{
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  border: '1px solid #E9EAEB',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D7DA',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#414651',
                  cursor: 'pointer'
                }}
              >
                Batal
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#FF7A00',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Four KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px'
        }}
      >
        {/* Metric 1 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9EAEB', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ fontSize: '12px', color: '#717680', fontWeight: '500' }}>Tiket Terjual</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#181D27', margin: '6px 0 2px', fontFamily: 'var(--font-family-display)' }}>
            {soldCount} / {capacity}
          </div>
          <div style={{ fontSize: '11px', color: '#079455', fontWeight: '600' }}>
            {percent}% Kuota Terisi
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9EAEB', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ fontSize: '12px', color: '#717680', fontWeight: '500' }}>Estimasi Pendapatan</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#181D27', margin: '6px 0 2px', fontFamily: 'var(--font-family-display)' }}>
            {revenue}
          </div>
          <div style={{ fontSize: '11px', color: '#717680' }}>Total GMV Transaksi</div>
        </div>

        {/* Metric 3 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9EAEB', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ fontSize: '12px', color: '#717680', fontWeight: '500' }}>Kapasitas Venue</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#181D27', margin: '6px 0 2px', fontFamily: 'var(--font-family-display)' }}>
            {capacity} Pax
          </div>
          <div style={{ fontSize: '11px', color: '#717680' }}>Batas Pengunjung</div>
        </div>

        {/* Metric 4 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9EAEB', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ fontSize: '12px', color: '#717680', fontWeight: '500' }}>Status Tiketing</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#181D27', margin: '6px 0 2px', fontFamily: 'var(--font-family-display)' }}>
            {Math.max(0, capacity - soldCount)} Sisa
          </div>
          <div style={{ fontSize: '11px', color: '#006BFF', fontWeight: '600' }}>Siap Ditransaksikan</div>
        </div>
      </div>

      {/* 5. Sub-navigation Quick Access Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
        {/* Module 1: Tickets */}
        <div
          onClick={() => navigate('/tickets')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF7A00';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E9EAEB';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FFF4ED', color: '#FF7A00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>Tipe Tiket & Kuota</h3>
              <p style={{ fontSize: '12px', color: '#717680' }}>Kelola harga dan kuota tiket</p>
            </div>
          </div>
        </div>

        {/* Module 2: Attendees */}
        <div
          onClick={() => navigate('/attendees')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF7A00';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E9EAEB';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF8FF', color: '#006BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>Daftar Peserta & E-Ticket</h3>
              <p style={{ fontSize: '12px', color: '#717680' }}>Lihat dan kelola database attendee</p>
            </div>
          </div>
        </div>

        {/* Module 3: Check-in */}
        <div
          onClick={() => navigate('/checkin')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF7A00';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E9EAEB';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ECFDF3', color: '#079455', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>Terminal Check-in Gate</h3>
              <p style={{ fontSize: '12px', color: '#717680' }}>Scanner QR code tiket hari-H</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Modal Konfirmasi Hapus Event */}
      {isDeleteModalOpen && (
        <div
          onClick={() => setIsDeleteModalOpen(false)}
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
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E9EAEB',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.16)',
              overflow: 'hidden',
              animation: 'appleScaleUp 0.2s ease-out'
            }}
          >
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#FEF3F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D92D21',
                    flexShrink: 0
                  }}
                >
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#181D27' }}>
                    Hapus Event Ini?
                  </h3>
                  <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#414651', lineHeight: 1.5 }}>
                Apakah Anda yakin ingin menghapus <strong>"{currentEvent.title}"</strong>? Semua data tiket, peserta, dan pengaturan terkait event ini akan dihapus dari database secara permanen.
              </p>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
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
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#D92D21',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(217, 45, 33, 0.2)'
                  }}
                >
                  Ya, Hapus Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
