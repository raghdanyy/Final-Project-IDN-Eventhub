import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Compass,
  ArrowRight,
  Sparkles,
  FileCode,
  Layout,
  Calendar,
  Ticket,
  ShoppingCart,
  QrCode,
  Users,
  CreditCard,
  Settings,
  Lock
} from 'lucide-react';

export const ScreenIndexPage = () => {
  const navigate = useNavigate();

  const screenGroups = [
    {
      group: '0. Landing Page (Public Entrypoint)',
      icon: Compass,
      screens: [
        {
          name: 'Landing Page EventHub',
          path: '/',
          file: 'src/pages/landing/LandingPage.jsx',
          desc: 'Halaman utama publik, hero banner, komparasi, fitur utama, ekosistem & FAQ'
        }
      ]
    },
    {
      group: '1. Autentikasi & Onboarding (PRD Feature 1)',
      icon: Lock,
      screens: [
        {
          name: 'Halaman Login Organizer',
          path: '/login',
          file: 'src/pages/auth/LoginPage.jsx',
          desc: 'Form login email/password & Google SSO'
        },
        {
          name: 'Halaman Pendaftaran Akun',
          path: '/register',
          file: 'src/pages/auth/RegisterPage.jsx',
          desc: 'Pendaftaran user baru'
        },
        {
          name: 'Lupa Kata Sandi',
          path: '/forgot-password',
          file: 'src/pages/auth/ForgotPasswordPage.jsx',
          desc: 'Reset password via email token'
        },
        {
          name: 'Wizard Onboarding Organisasi',
          path: '/onboarding',
          file: 'src/pages/auth/OnboardingPage.jsx',
          desc: 'Setup tenant baru dan kategori'
        }
      ]
    },
    {
      group: '2. Dashboard Utama & Ikhtisar (PRD Core)',
      icon: Layout,
      screens: [
        {
          name: 'Dashboard Overview (Home)',
          path: '/',
          file: 'src/pages/dashboard/DashboardOverviewPage.jsx',
          desc: 'Ringkasan GMV, tiket terjual, event spotlight, pesanan terbaru'
        }
      ]
    },
    {
      group: '3. Manajemen Event (PRD Feature 4 & 5)',
      icon: Calendar,
      screens: [
        {
          name: 'Daftar Semua Event',
          path: '/events',
          file: 'src/pages/events/EventsListPage.jsx',
          desc: 'Filter All, Published, Draft, Selesai + Search'
        },
        {
          name: 'Event Command Center (Detail)',
          path: '/events/evt-1',
          file: 'src/pages/events/EventDetailPage.jsx',
          desc: 'Ringkasan performa event, aksi publish & submodul'
        },
        {
          name: 'Wizard Pembuatan Event (6 Langkah)',
          path: '/events/new',
          file: 'src/pages/events/CreateEventWizardPage.jsx',
          desc: 'Info, Lokasi, Sesi, Speaker, Tiket, dan Review Confetti'
        }
      ]
    },
    {
      group: '4. Tiket & Kode Promo (PRD Feature 6 & 7)',
      icon: Ticket,
      screens: [
        {
          name: 'Manajemen Tipe Tiket & Kuota',
          path: '/tickets',
          file: 'src/pages/tickets/TicketTiersPage.jsx',
          desc: 'Early Bird, Regular, VIP, Quota bar, Modal tambah tiket'
        },
        {
          name: 'Kode Promo & Diskon Voucher',
          path: '/promo-codes',
          file: 'src/pages/tickets/PromoCodesPage.jsx',
          desc: 'Voucher persentase / nominal tetap & kuota pemakaian'
        }
      ]
    },
    {
      group: '5. Operasional, Order & Check-in (PRD Feature 8, 9, 10)',
      icon: QrCode,
      screens: [
        {
          name: 'Daftar Pesanan & Refund',
          path: '/orders',
          file: 'src/pages/orders/OrdersListPage.jsx',
          desc: 'Daftar transaksi, detail order modal, aksi refund dana'
        },
        {
          name: 'Direktori Attendee & E-Ticket',
          path: '/attendees',
          file: 'src/pages/attendees/AttendeesListPage.jsx',
          desc: 'Daftar peserta, QR code preview modal, kirim ulang tiket'
        },
        {
          name: 'Live Check-in Terminal (Hari-H)',
          path: '/checkin',
          file: 'src/pages/checkin/CheckInTerminalPage.jsx',
          desc: 'Scanner QR cepat, offline mode toggle, live gate activity feed'
        }
      ]
    },
    {
      group: '6. Bisnis, Tim & Pengaturan (PRD Feature 2, 3, 11, 12)',
      icon: Users,
      screens: [
        {
          name: 'Analytics & Funnel Penjualan',
          path: '/analytics',
          file: 'src/pages/analytics/AnalyticsPage.jsx',
          desc: 'Funnel konversi, GMV breakdown, channel traffic'
        },
        {
          name: 'Manajemen Tim & Hak Akses Role',
          path: '/team',
          file: 'src/pages/team/TeamManagementPage.jsx',
          desc: 'Daftar anggota, modal invite, matriks 7 role permission'
        },
        {
          name: 'Billing, Paket Langganan & Payout',
          path: '/billing',
          file: 'src/pages/billing/BillingSubscriptionPage.jsx',
          desc: 'Pencairan saldo payout, perbandingan tier, riwayat settlement'
        },
        {
          name: 'Pengaturan Organisasi & Gateway',
          path: '/settings',
          file: 'src/pages/settings/OrganizationSettingsPage.jsx',
          desc: 'Profil tenant & konfigurasi Midtrans / Xendit'
        }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* 1. Header Guide */}
      <div
        style={{
          padding: '24px',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, #FF7A00 0%, #D16400 100%)',
          color: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={22} />
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            VIBE CODING DIRECTORY
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800 }}>
          Semua Layar & Alur Screen EventHub Terhubung
        </h1>
        <p style={{ fontSize: '13px', opacity: 0.9, marginTop: 6, maxWidth: 800 }}>
          Seluruh 20+ screen telah dibuat dengan routing lengkap, token warna Mode 1, dan schema DataModel. Cukup kirimkan screenshot dari Figma, lalu sebutkan nama screen-nya untuk langsung kita terapkan tampilannya!
        </p>
      </div>

      {/* 2. Screen Grid Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {screenGroups.map((grp, gIdx) => {
          const GroupIcon = grp.icon;
          return (
            <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <GroupIcon size={18} color="var(--color-brand-primary)" />
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-display)' }}>
                  {grp.group}
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
                {grp.screens.map((scr, sIdx) => (
                  <Card
                    key={sIdx}
                    interactive
                    onClick={() => navigate(scr.path)}
                    style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-display)' }}>
                          {scr.name}
                        </span>
                        <ArrowRight size={14} color="var(--color-brand-primary)" />
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                        {scr.desc}
                      </div>
                    </div>

                    <div style={{ paddingTop: 8, borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-brand-primary)', fontWeight: 600 }}>
                        {scr.path}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                        <code>{scr.file.split('/').pop()}</code>
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
