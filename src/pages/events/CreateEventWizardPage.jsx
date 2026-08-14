import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import confetti from 'canvas-confetti';
import {
  Calendar,
  MapPin,
  Ticket,
  Mic,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2
} from 'lucide-react';

export const CreateEventWizardPage = () => {
  const navigate = useNavigate();
  const { createEvent, showToast } = useApp();

  const [step, setStep] = useState(1);

  // Form State across 6 steps
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology & AI',
    summary: '',
    banner_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
    venue_type: 'offline', // 'offline' | 'online' | 'hybrid'
    venue_name: '',
    venue_address: '',
    start_date: '2026-10-15',
    end_date: '2026-10-16',
    capacity: 500,
    ticket_tiers: [
      { name: 'Early Bird Pass', price: 150000, quota: 100 },
      { name: 'General Admission', price: 250000, quota: 400 }
    ],
    sessions: [
      { title: 'Opening & Keynote', stage: 'Main Hall', time: '09:00 - 10:30' }
    ]
  });

  const stepsList = [
    { num: 1, label: 'Info Dasar' },
    { num: 2, label: 'Waktu & Lokasi' },
    { num: 3, label: 'Sesi & Agenda' },
    { num: 4, label: 'Pembicara' },
    { num: 5, label: 'Tipe Tiket' },
    { num: 6, label: 'Review & Publish' }
  ];

  const handleFinish = (publishNow = false) => {
    const created = createEvent({
      title: formData.title || 'Event Baru',
      category: formData.category,
      venue: formData.venue_name || 'Jakarta, Indonesia',
      date: formData.start_date || '12 Sep 2026',
      status: publishNow ? 'Published' : 'Draft',
      statusType: publishNow ? 'success' : 'neutral',
      capacity: formData.capacity,
      price: formData.ticket_tiers[0]?.price || 0
    });

    if (publishNow) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    navigate(`/events/${created.id}`);
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Wizard Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="h1-title">Buat Event Baru</h1>
          <p className="p-subtitle">Setup event Anda dalam 6 langkah terstruktur.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/events')}>
          Batal
        </Button>
      </div>

      {/* Apple Step Progress Bar */}
      <div
        className="wizard-stepper-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          background: '#FFFFFF',
          borderRadius: '9999px',
          border: '1px solid #E9EAEB',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {stepsList.map((s, idx) => {
          const isCurrent = step === s.num;
          const isDone = step > s.num;
          return (
            <React.Fragment key={s.num}>
              <div
                onClick={() => isDone && setStep(s.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: isDone ? 'pointer' : 'default',
                  opacity: isCurrent || isDone ? 1 : 0.4,
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: isDone
                      ? '#079455'
                      : isCurrent
                      ? '#FF7A00'
                      : '#F2F4F7',
                    color: isDone || isCurrent ? '#FFFFFF' : '#475467',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {isDone ? <CheckCircle2 size={14} /> : s.num}
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? '#FF7A00' : '#181D27',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {s.label}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <div
                  style={{
                    width: 16,
                    minWidth: 12,
                    height: 1,
                    background: '#E9EAEB',
                    margin: '0 4px',
                    flexShrink: 0
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content Card */}
      <Card className="wizard-card" style={{ padding: '32px' }}>
        {/* Step 1: Info Dasar */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Langkah 1: Informasi Dasar Event</h3>
            
            <Input
              label="Judul Event *"
              placeholder="Contoh: AI Innovation Summit Jakarta 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <div className="apple-input-group">
              <label className="apple-label">Kategori Event</label>
              <select
                className="apple-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Technology & AI">Technology & AI</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Business & Startup">Business & Startup</option>
                <option value="Music & Festival">Music & Festival</option>
              </select>
            </div>

            <div className="apple-input-group">
              <label className="apple-label">Ringkasan Singkat Event</label>
              <textarea
                className="apple-input"
                rows={3}
                placeholder="Jelaskan mengenai tema, tujuan, dan hal menarik dari event ini..."
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 2: Waktu & Lokasi (Responsive Layout) */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Langkah 2: Waktu & Lokasi Penyelenggaraan</h3>

            <div className="apple-input-group">
              <label className="apple-label">Format Acara</label>
              <div className="wizard-format-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {['offline', 'online', 'hybrid'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormData({ ...formData, venue_type: fmt })}
                    style={{
                      padding: '12px 6px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.venue_type === fmt ? '2px solid var(--color-brand-primary)' : '1px solid var(--color-border-primary)',
                      background: formData.venue_type === fmt ? 'var(--color-brand-subtle)' : '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      textAlign: 'center'
                    }}
                  >
                    {fmt} Event
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Nama Venue / Platform *"
              placeholder="Contoh: Grand Ballroom Ritz Carlton / Zoom Live"
              value={formData.venue_name}
              onChange={(e) => setFormData({ ...formData, venue_name: e.target.value })}
            />

            <Input
              label="Alamat Lengkap Venue"
              placeholder="Jl. Jenderal Sudirman Kav. 21, Jakarta Selatan"
              value={formData.venue_address}
              onChange={(e) => setFormData({ ...formData, venue_address: e.target.value })}
            />

            {/* Tanggal Mulai & Selesai Grid */}
            <div className="wizard-date-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ minWidth: 0, width: '100%' }}>
                <Input
                  label="Tanggal Mulai"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div style={{ minWidth: 0, width: '100%' }}>
                <Input
                  label="Tanggal Selesai"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Agenda */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Langkah 3: Agenda & Sesi Acara</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Susun timeline jalannya acara untuk memberikan gambaran lengkap kepada peserta.
            </p>

            {formData.sessions.map((ses, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  background: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{ses.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>{ses.stage} • {ses.time}</div>
                </div>
              </div>
            ))}

            <Button
              variant="secondary"
              icon={Plus}
              onClick={() => showToast('Sesi baru ditambahkan ke draft', 'info')}
            >
              Tambah Sesi Lain
            </Button>
          </div>
        )}

        {/* Step 4: Speakers */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Langkah 4: Profil Pembicara / Speaker</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Tambahkan pembicara utama untuk meningkatkan daya tarik event.
            </p>
            <div style={{ padding: '24px', textAlign: 'center', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <Mic size={32} color="var(--color-brand-primary)" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Belum ada speaker khusus</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: 4 }}>
                Anda dapat menambahkan pembicara nanti setelah event dibuat.
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Tipe Tiket */}
        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Langkah 5: Tipe Tiket & Kuota Penjualan</h3>

            {formData.ticket_tiers.map((tier, idx) => (
              <div
                key={idx}
                className="wizard-ticket-tier"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: 12,
                  padding: '14px',
                  background: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{tier.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                    Rp {tier.price.toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Kuota: {tier.quota} tiket
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="secondary"
              icon={Plus}
              onClick={() => showToast('Tipe tiket baru ditambahkan ke draft', 'info')}
            >
              Tambah Kategori Tiket
            </Button>
          </div>
        )}

        {/* Step 6: Review & Publish */}
        {step === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Langkah 6: Review & Publikasikan</h3>

            <div style={{ padding: '20px', background: 'var(--color-brand-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-brand-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={20} color="var(--color-brand-primary)" />
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                  Event Anda Siap Diluncurkan!
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', marginTop: 6 }}>
                Semua detail konfigurasi telah lengkap. Anda dapat menyimpannya sebagai draft atau langsung mempublikasikannya agar tiket dapat dibeli peserta.
              </p>
            </div>

            <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{formData.title || 'Event Baru Tanpa Judul'}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
                {formData.venue_name || 'Lokasi Belum Diisi'} • Format {formData.venue_type.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="wizard-footer-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--color-border-subtle)', gap: 10 }}>
          {step > 1 ? (
            <Button
              variant="secondary"
              icon={ArrowLeft}
              onClick={() => setStep(step - 1)}
            >
              Kembali
            </Button>
          ) : <div />}

          {step < 6 ? (
            <Button
              variant="primary"
              iconRight={ArrowRight}
              onClick={() => {
                if (step === 1 && !formData.title.trim()) {
                  showToast('Mohon masukkan judul event terlebih dahulu', 'error');
                  return;
                }
                setStep(step + 1);
              }}
            >
              Lanjut ke Langkah {step + 1}
            </Button>
          ) : (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button
                variant="secondary"
                onClick={() => handleFinish(false)}
              >
                Simpan sebagai Draft
              </Button>
              <Button
                variant="primary"
                icon={Sparkles}
                onClick={() => handleFinish(true)}
              >
                🎉 Publikasikan Sekarang
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
