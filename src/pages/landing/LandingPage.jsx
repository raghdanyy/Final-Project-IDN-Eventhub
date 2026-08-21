import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  QrCode,
  Zap,
  ShieldCheck,
  Award,
  ChevronDown,
  Star,
  Building2,
  Lock,
  Server,
  TrendingUp,
  Ticket,
  Bot,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, showToast } = useApp();

  // Mobile navigation burger menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      showToast('Silakan masuk terlebih dahulu untuk mengakses dashboard.', 'warning');
      navigate('/login');
    }
  };

  const handleCreateEvent = () => {
    if (isAuthenticated) {
      navigate('/events/new');
    } else {
      navigate('/register');
    }
  };

  // Tab state for Feature Highlight section
  const [activeTab, setActiveTab] = useState('organizer');

  // Accordion state for FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Apakah ada biaya pendaftaran awal untuk organizer?",
      answer: "Tidak ada biaya awal sama sekali! Anda bisa mendaftar secara gratis di tier Free, membuat event, dan baru dikenakan komisi kecil otomatis saat tiket Anda terjual."
    },
    {
      question: "Berapa lama proses pencairan dana hasil penjualan tiket?",
      answer: "Pencairan dana (settlement) diproses H+1 kerja setelah event selesai atau sesuai jadwal payout mingguan yang bisa dikonfigurasi langsung dari dashboard."
    },
    {
      question: "Apakah EventHub bisa digunakan untuk event gratis tanpa tiket berbayar?",
      answer: "Tentu saja! EventHub mendukung ticketing $0 (Free Pass). Anda tidak dikenakan komisi platform untuk tiket gratis."
    },
    {
      question: "Bagaimana jika koneksi internet di lokasi event kurang stabil saat check-in?",
      answer: "Aplikasi scanner QR EventHub memiliki fitur Sync Offline Mode. Staff Anda tetap bisa memindai QR Code peserta tanpa sinyal internet, dan data akan otomatis tersinkronisasi saat terhubung kembali."
    }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-canvas)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-family-text)'
      }}
    >
      {/* 1. Header Navigation Bar (Matches Dashboard Token Styling) */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderBottom: '1px solid var(--color-border-secondary)',
          padding: '14px 24px'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo Brand (Orange EventHub Theme) */}
          <div
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(255, 122, 0, 0.3)'
              }}
            >
              <Ticket size={18} />
            </div>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--color-text-display)',
                fontFamily: 'var(--font-family-display)',
                letterSpacing: '-0.02em'
              }}
            >
              Event<span style={{ color: 'var(--color-brand-primary)' }}>Hub</span>
            </span>
          </div>

          {/* Nav Menu Links (Desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="nav-menu-desktop">
            <a href="#features" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
              Fitur Utama
            </a>
            <a href="#organizer" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
              Untuk Organizer
            </a>
            <a href="#ecosystem" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
              Ekosistem
            </a>
            <a href="#testimonials" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
              Testimoni
            </a>
            <a href="#faq" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
              FAQ
            </a>
          </div>

          {/* Action Buttons (Desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="nav-buttons-desktop">
            {isAuthenticated ? (
              <Button variant="primary" pill onClick={handleOpenDashboard}>
                Masuk ke Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Masuk
                </Button>
                <Button variant="primary" pill onClick={() => navigate('/register')}>
                  Buat Event Gratis
                </Button>
              </>
            )}
          </div>

          {/* Mobile Burger Menu Button (< 860px) */}
          <button
            className="landing-burger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Slide-down Mobile Menu Overlay (< 860px) */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--color-border-secondary)',
            padding: '20px 24px',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12)'
          }}
        >
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: 600, padding: '6px 0' }}
          >
            Fitur Utama
          </a>
          <a
            href="#organizer"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: 600, padding: '6px 0' }}
          >
            Untuk Organizer
          </a>
          <a
            href="#ecosystem"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: 600, padding: '6px 0' }}
          >
            Ekosistem
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: 600, padding: '6px 0' }}
          >
            Testimoni
          </a>
          <a
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: 600, padding: '6px 0' }}
          >
            FAQ
          </a>

          <div style={{ height: '1px', backgroundColor: 'var(--color-border-subtle)', margin: '4px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {isAuthenticated ? (
              <Button
                variant="primary"
                pill
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenDashboard();
                }}
              >
                Masuk ke Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  pill
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  Masuk
                </Button>
                <Button
                  variant="primary"
                  pill
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/register');
                  }}
                >
                  Buat Event Gratis
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="landing-section-padding" style={{ padding: '72px 24px 56px' }}>
        <div
          className="landing-hero-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '56px',
            alignItems: 'center'
          }}
        >
          {/* Left Hero Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Badge Pill */}
            <div style={{ alignSelf: 'flex-start' }}>
              <Badge variant="orange" size="md">
                <Sparkles size={14} /> #1 Platform Event & Ticketing Indonesia
              </Badge>
            </div>

            {/* Main Headline */}
            <h1
              className="landing-hero-title"
              style={{
                fontSize: '42px',
                lineHeight: 1.18,
                fontWeight: 800,
                color: 'var(--color-text-display)',
                fontFamily: 'var(--font-family-display)',
                letterSpacing: '-0.03em'
              }}
            >
              Dari temukan acara favorit hingga kelola ribuan peserta, <br />
              <span style={{ color: 'var(--color-brand-primary)' }}>
                semua di satu tempat.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="landing-hero-subtitle" style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-text-secondary)', maxWidth: '520px' }}>
              Tingkatkan konversi penjualan tiket dengan sistem ticketing instan, pembayaran otomatis, manajemen tim, check-in QR cepat, serta analitik penjualan real-time.
            </p>

            {/* CTA Group with Standard Buttons */}
            <div className="landing-cta-group" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', paddingTop: '8px' }}>
              <Button
                variant="primary"
                size="lg"
                pill
                iconRight={ArrowRight}
                onClick={handleCreateEvent}
              >
                Buat Event Sekarang
              </Button>
              <Button
                variant="secondary"
                size="lg"
                pill
                onClick={handleOpenDashboard}
              >
                Masuk ke Dashboard
              </Button>
            </div>

            {/* Rating / Trust Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border-subtle)'
              }}
            >
              <div style={{ display: 'flex', color: '#FF7A00' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FF7A00" />
                ))}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-tertiary)' }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>4.9/5</strong> dari 500+ organizer |{' '}
                <strong style={{ color: 'var(--color-text-primary)' }}>1.2M+</strong> tiket terverifikasi
              </span>
            </div>
          </div>

          {/* Right Hero Live Monitor Widget (Matches Card Component Style) */}
          <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success-primary)' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Live Event Monitor
                </span>
              </div>
              <Badge variant="orange" size="sm">
                Real-time Sync
              </Badge>
            </div>

            {/* GMV Sales Box */}
            <div
              style={{
                backgroundColor: 'var(--color-brand-subtle)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '18px',
                border: '1px solid var(--color-border-brand-subtle)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
                Penjualan Tiket Hari Ini
              </div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--color-brand-primary)', letterSpacing: '-0.02em' }}>
                Rp 42.600.000
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '13px', color: 'var(--color-success-text)', fontWeight: 600 }}>
                <TrendingUp size={15} /> +24% dibanding event sebelumnya
              </div>
            </div>

            {/* Transactions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>
                Transaksi Terbaru
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-card-subtle)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-brand-subtle)',
                      color: 'var(--color-brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px'
                    }}
                  >
                    DP
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Dion Pratama
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Ticket VIP ITS 2026 • Lunas
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Rp 1.500.000
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                    2 menit lalu
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-card-subtle)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-success-bg)',
                      color: 'var(--color-success-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px'
                    }}
                  >
                    CP
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Clarissa Putri
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Regular Pass 2-Day • Lunas
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Rp 500.000
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                    5 menit lalu
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Event Logo Marquee / Ticker */}
      <section
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderTop: '1px solid var(--color-border-secondary)',
          borderBottom: '1px solid var(--color-border-secondary)',
          padding: '20px 0'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Dipercaya oleh 500+ Komunitas & Event Organizer Ternama
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', opacity: 0.85 }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>⚡ TECHVERSE ASIA</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>🎨 JAKARTA DESIGN CLUB</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>🏢 MICE CORPORATE</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>🤖 AI BUILDERS ID</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>🚀 STARTUP FEST</span>
          </div>
        </div>
      </section>

      {/* 4. Section 2: Why Choose EventHub? (Comparison Grid) */}
      <section id="organizer" className="landing-section-padding" style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-canvas)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 className="landing-section-title" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-display)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Mengapa komunitas dan organizer beralih ke EventHub?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-tertiary)' }}>
              Hentikan pencatatan tiket manual menggunakan spreadsheet dan pesan WhatsApp. Beralih ke ekosistem terpadu.
            </p>
          </div>

          <div className="landing-comparison-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            {/* Left: Sebelum EventHub */}
            <Card style={{ padding: '32px', backgroundColor: '#FEF3F2', borderColor: '#FDA29B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEE4E2', color: '#D92D20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XCircle size={22} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#912018' }}>Cara Lama (Tanpa EventHub)</h3>
              </div>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#7A271A', alignItems: 'flex-start' }}>
                  <XCircle size={16} color="#D92D20" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Transfer manual via bank lalu kirim bukti transfer lewat WhatsApp (rawan dipalsukan).</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#7A271A', alignItems: 'flex-start' }}>
                  <XCircle size={16} color="#D92D20" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Data peserta tercecer di beberapa spreadsheet Excel yang membingungkan tim.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#7A271A', alignItems: 'flex-start' }}>
                  <XCircle size={16} color="#D92D20" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Antrean panjang di venue hari-H karena mencoret nama manual satu per satu di kertas.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#7A271A', alignItems: 'flex-start' }}>
                  <XCircle size={16} color="#D92D20" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Sulit membagi hak akses ke tim (finance, marketing, staff pintu masuk).</span>
                </li>
              </ul>
            </Card>

            {/* Right: Dengan EventHub */}
            <Card style={{ padding: '32px', backgroundColor: 'var(--color-brand-subtle)', borderColor: 'var(--color-border-brand-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-brand-200)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={22} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brand-700)' }}>Dengan EventHub</h3>
              </div>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--color-brand-900)', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Pembayaran otomatis via Midtrans & Xendit (QRIS, VA, E-Wallet, Card). Tiket e-mail otomatis terkirim.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--color-brand-900)', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Pemindaian QR Code cepat (&lt; 1 detik per peserta) plus Offline Sync jika sinyal terputus.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--color-brand-900)', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Manajemen tim dengan 7 tingkatan role permission (Owner, Admin, Finance, Check-in Staff).</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--color-brand-900)', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Analitik pendapatan & grafik tren penjualan tiket terpantau secara real-time.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Section 3: Feature Highlights (Segmented Tabs) */}
      <section id="features" className="landing-section-padding" style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-card)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <h2 className="landing-section-title" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-display)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Fitur Canggih untuk Setiap Kebutuhan
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-tertiary)' }}>
              Solusi yang dirancang khusus untuk pengalaman terbaik peserta dan kemudahan operasional organizer.
            </p>

            {/* Segmented Control Buttons */}
            <div
              style={{
                display: 'inline-flex',
                padding: '4px',
                backgroundColor: 'var(--color-bg-canvas)',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--color-border-secondary)',
                marginTop: '20px'
              }}
            >
              <Button
                variant={activeTab === 'participant' ? 'primary' : 'ghost'}
                size="sm"
                pill
                onClick={() => setActiveTab('participant')}
              >
                Untuk Participant
              </Button>
              <Button
                variant={activeTab === 'organizer' ? 'primary' : 'ghost'}
                size="sm"
                pill
                onClick={() => setActiveTab('organizer')}
              >
                Untuk Event Organizer
              </Button>
            </div>
          </div>

          {/* Dynamic Feature Grid based on Active Tab */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {activeTab === 'participant' ? (
              <>
                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-brand-subtle)',
                      color: 'var(--color-brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <Bot size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    AI Smart Recommender
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Rekomendasi event cerdas berbasis preferensi minat, histori kehadiran, dan koneksi sosial peserta secara personal.
                  </p>
                </Card>

                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-success-bg)',
                      color: 'var(--color-success-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <QrCode size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    Instant QR Ticket & Offline Wallet
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Tiket dengan QR Code unik yang dapat diakses langsung dari aplikasi tanpa koneksi seluler di hari acara.
                  </p>
                </Card>

                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <MessageSquare size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    Live Event Room & Social Feed
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Fitur tanya-jawab interaktif (Q&A), polling langsung dengan speaker, serta jejaring sesama peserta event.
                  </p>
                </Card>

                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-warning-bg)',
                      color: 'var(--color-warning-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <Zap size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    1-Click Fast Checkout
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Pembayaran instan via QRIS, GoPay, OVO, ShopeePay, Virtual Account, dan Kartu Kredit secara otomatis.
                  </p>
                </Card>
              </>
            ) : (
              <>
                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-brand-subtle)',
                      color: 'var(--color-brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <Ticket size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    Multi-Tier Ticketing & Quota
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Atur tier tiket Early Bird, Regular, VIP Pass, dan batas kuota terjual dengan fleksibilitas harga & periode promo.
                  </p>
                </Card>

                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-success-bg)',
                      color: 'var(--color-success-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    Fast QR Scan & Offline Gate Sync
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Pindai QR Code peserta &lt; 1 detik saat hari-H dengan aplikasi scanner offline mode yang tetap sinkron meski tanpa internet.
                  </p>
                </Card>

                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-info-bg)',
                      color: 'var(--color-info-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <Building2 size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    Team Roles & Permissions
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Kelola tim event Anda dengan 7 tingkatan role permission (Owner, Admin, Finance, Event Manager, Check-in Staff).
                  </p>
                </Card>

                <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card-subtle)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-warning-bg)',
                      color: 'var(--color-warning-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <TrendingUp size={22} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    Real-Time Revenue & Payout
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Pantau grafik penjualan tiket real-time, statistik kehadiran peserta, dan pencairan saldo payout otomatis ke bank Anda.
                  </p>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 6. Section 4: Ecosystem & B2B Features */}
      <section id="ecosystem" className="landing-section-padding" style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-canvas)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
            <h2 className="landing-section-title" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-display)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Bukan sekadar tiket, ini ekosistem event lengkap.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-tertiary)' }}>
              Dukungan penuh dari kemitraan sponsor hingga pertumbuhan portofolio bisnis organizer Anda.
            </p>
          </div>

          <div className="landing-ecosystem-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--color-bg-card)' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-brand-subtle)',
                    color: 'var(--color-brand-primary)',
                    marginBottom: '16px'
                  }}
                >
                  <Building2 size={22} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                  Showcase portofolio & dapatkan klien organizer
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Halaman organisasi publik Anda berfungsi sebagai portofolio resmi untuk menarik klien baru dan meningkatkan kredibilitas brand Anda.
                </p>
              </div>
              <div>
                <Button variant="secondary" iconRight={ArrowRight} onClick={() => navigate('/register')}>
                  Gabung Sebagai Mitra
                </Button>
              </div>
            </Card>

            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--color-bg-card)' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-success-bg)',
                    color: 'var(--color-success-text)',
                    marginBottom: '16px'
                  }}
                >
                  <Award size={22} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                  Jangkau audiens spesifik level booth sponsorship
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Integrasi manajemen sponsor yang mempermudah Anda menampilkan logo partner, mengelola booth virtual, dan melaporkan ROI ke sponsor.
                </p>
              </div>
              <div>
                <Button variant="secondary" iconRight={ArrowRight} onClick={() => navigate('/register')}>
                  Pelajari Program Sponsor
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. Section 5: Security & Performance Pillars */}
      <section className="landing-section-padding" style={{ padding: '72px 24px', backgroundColor: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <h2 className="landing-section-title" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-display)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Keamanan standar industri & performa tanpa kompromi
            </h2>
          </div>

          <div className="landing-security-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
            <Card style={{ padding: '20px', textAlign: 'center', backgroundColor: 'var(--color-bg-card-subtle)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-brand-subtle)', color: 'var(--color-brand-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <ShieldCheck size={18} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>100% Anti-Fraud QR</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Verifikasi enkripsi mencegah tiket palsu.</p>
            </Card>

            <Card style={{ padding: '20px', textAlign: 'center', backgroundColor: 'var(--color-bg-card-subtle)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success-text)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Lock size={18} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>PCI-DSS Compliant</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Sistem pembayaran standar bank.</p>
            </Card>

            <Card style={{ padding: '20px', textAlign: 'center', backgroundColor: 'var(--color-bg-card-subtle)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Zap size={18} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>99.9% Uptime SLA</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Infrastruktur siap flash sale tiket.</p>
            </Card>

            <Card style={{ padding: '20px', textAlign: 'center', backgroundColor: 'var(--color-bg-card-subtle)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-info-bg)', color: 'var(--color-info-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Server size={18} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>24/7 Cloud Backup</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Data transaksi tersimpan otomatis.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. Section 6: Testimonials */}
      <section id="testimonials" className="landing-section-padding" style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-canvas)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
            <h2 className="landing-section-title" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-display)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Cerita sukses dari komunitas & organizer
            </h2>
          </div>

          <div className="landing-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                "Setelah 500 tiket penjualan awal habis dalam 10 menit, sistem EventHub tetap stabil tanpa lag. Check-in 1.200 peserta saat hari-H sangat lancar!"
              </p>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Rina Prasetya</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Lead Organizer, Indonesia Tech Summit</div>
              </div>
            </Card>

            <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                "Sangat membantu memisahkan akses tim Finance dan Check-in Staff. Tiket QR scan yang tetap berfungsi offline sangat menolong kami saat di gedung basement."
              </p>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Dika Utama</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Founder, Jakarta Design Club</div>
              </div>
            </Card>

            <Card style={{ padding: '24px', backgroundColor: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                "Sistem laporan keuangan dan payout otomatisnya luar biasa akurat. Kami langsung tahu berapa komisi dan pendapatan bersih setiap selesai sesi."
              </p>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Yuni Maharani</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Event Manager, MICE Corp</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 9. Section 7: FAQ Accordion */}
      <section id="faq" className="landing-section-padding" style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-card)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 className="landing-section-title" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-display)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Pertanyaan yang sering diajukan
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqData.map((faq, index) => (
              <Card
                key={index}
                interactive
                onClick={() => toggleFaq(index)}
                style={{
                  backgroundColor: 'var(--color-bg-card-subtle)',
                  padding: 0,
                  overflow: 'hidden'
                }}
              >
                <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {faq.question}
                  </h4>
                  <ChevronDown
                    size={18}
                    color="var(--color-text-tertiary)"
                    style={{
                      transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>

                {openFaqIndex === index && (
                  <div
                    style={{
                      padding: '0 22px 18px',
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--color-border-subtle)',
                      paddingTop: '14px'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Bottom Hero CTA Banner */}
      <section className="landing-section-padding" style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-canvas)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <Card
            className="landing-cta-banner"
            style={{
              padding: '52px 36px',
              textAlign: 'center',
              backgroundColor: 'var(--color-brand-primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 12px 32px rgba(255, 122, 0, 0.28)'
            }}
          >
            <h2 className="landing-cta-title" style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Siap menggelar event berikutnya?
            </h2>
            <p style={{ fontSize: '16px', opacity: 0.92, maxWidth: '540px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              Daftar sekarang, buat tiket dalam hitungan menit, dan terima pembayaran langsung dari peserta event Anda.
            </p>

            <div className="landing-cta-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Button
                variant="secondary"
                size="lg"
                pill
                iconRight={ArrowRight}
                onClick={handleCreateEvent}
                style={{ backgroundColor: '#FFFFFF', color: 'var(--color-brand-primary)', fontWeight: 700 }}
              >
                Daftar Gratis
              </Button>
              <Button
                variant="ghost"
                size="lg"
                pill
                onClick={handleOpenDashboard}
                style={{ color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)' }}
              >
                Masuk ke Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* 11. Footer */}
      <footer
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderTop: '1px solid var(--color-border-secondary)',
          padding: '36px 24px'
        }}
      >
        <div
          className="landing-footer-container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Ticket size={16} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              EventHub
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginLeft: '12px' }}>
              © 2026 EventHub Inc. All rights reserved.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            <a href="#features" style={{ color: 'inherit' }}>
              Masuk
            </a>
            <a href="#organizer" style={{ color: 'inherit' }}>
              Daftar
            </a>
            <a href="#faq" style={{ color: 'inherit' }}>
              Dashboard
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
