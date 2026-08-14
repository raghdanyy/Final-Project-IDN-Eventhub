import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, X, Image, FileCode, CheckCircle, ArrowRight } from 'lucide-react';

export const FigmaDropzoneGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Map route to source file
  const routeToFileMap = {
    '/': 'src/pages/dashboard/DashboardOverviewPage.jsx',
    '/events': 'src/pages/events/EventsListPage.jsx',
    '/events/new': 'src/pages/events/CreateEventWizardPage.jsx',
    '/events/:id': 'src/pages/events/EventDetailPage.jsx',
    '/tickets': 'src/pages/tickets/TicketTiersPage.jsx',
    '/promo-codes': 'src/pages/tickets/PromoCodesPage.jsx',
    '/orders': 'src/pages/orders/OrdersListPage.jsx',
    '/attendees': 'src/pages/attendees/AttendeesListPage.jsx',
    '/checkin': 'src/pages/checkin/CheckInTerminalPage.jsx',
    '/analytics': 'src/pages/analytics/AnalyticsPage.jsx',
    '/team': 'src/pages/team/TeamManagementPage.jsx',
    '/billing': 'src/pages/billing/BillingSubscriptionPage.jsx',
    '/settings': 'src/pages/settings/OrganizationSettingsPage.jsx',
    '/screens': 'src/pages/sitemap/ScreenIndexPage.jsx',
    '/login': 'src/pages/auth/LoginPage.jsx',
    '/register': 'src/pages/auth/RegisterPage.jsx',
    '/onboarding': 'src/pages/auth/OnboardingPage.jsx'
  };

  const currentFile = routeToFileMap[location.pathname] || 'src/pages/dashboard/DashboardOverviewPage.jsx';

  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}>
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            background: 'linear-gradient(135deg, #181D27 0%, #0B0D12 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(255, 122, 0, 0.4)',
            boxShadow: 'var(--shadow-apple-float)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Sparkles size={14} color="#FF7A00" />
          <span>Vibe Guide: Figma Ready</span>
        </button>
      ) : (
        <div
          style={{
            width: 340,
            background: '#FFFFFF',
            border: '1px solid var(--color-border-secondary)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-apple-float)',
            padding: '16px',
            animation: 'appleFadeIn 0.2s ease'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} color="var(--color-brand-primary)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-display)' }}>
                Vibe Coding Helper
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Current Screen Info */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-subtle)',
              marginBottom: 12
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              SCREEN SAAT INI:
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand-primary)', marginTop: 2 }}>
              {location.pathname}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                marginTop: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <FileCode size={12} />
              <code>{currentFile}</code>
            </div>
          </div>

          {/* Instructions */}
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>
            💡 <strong>Cara Pakai:</strong> Cukup lampirkan screenshot Figma screen ini di chat, lalu minta saya menyesuaikan styling & visualnya agar 100% identik dengan desain Anda!
          </div>

          {/* Directory Link */}
          <button
            type="button"
            onClick={() => {
              navigate('/screens');
              setIsOpen(false);
            }}
            className="apple-btn apple-btn-tinted"
            style={{ width: '100%', fontSize: '12px', justifyContent: 'center' }}
          >
            <span>Buka Screen Directory (20+ Screens)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
