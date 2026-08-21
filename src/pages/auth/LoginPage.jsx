import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, Check, ArrowLeft } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast, login } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    showToast('Login berhasil! Mengalihkan ke dashboard...', 'success');
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider) => {
    login();
    showToast(`Masuk dengan ${provider} berhasil!`, 'success');
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: '32px 16px',
        fontFamily: 'var(--font-family-text)'
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Back to Landing Page Link */}
        <Link
          to="/"
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '20px',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-bg-canvas)',
            border: '1px solid var(--color-border-secondary)',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={16} /> Kembali ke Landing Page
        </Link>

        {/* 1. App Icon Badge (Clickable to go home) */}
        <div
          onClick={() => navigate('/')}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#FF7A00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(255, 122, 0, 0.28)',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: 1,
              fontFamily: 'var(--font-family-display)'
            }}
          >
            E
          </span>
        </div>

        {/* 2. Heading & Subheading */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: '700',
            color: '#181D27',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            fontFamily: 'var(--font-family-display)'
          }}
        >
          Masuk ke EventHub
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#717680',
            textAlign: 'center',
            marginBottom: '28px',
            lineHeight: 1.4
          }}
        >
          Kelola event Nusantara Event Co. dalam satu dashboard.
        </p>

        {/* 3. Main Form Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E9EAEB',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
            padding: '32px 28px'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="email"
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#181D27'
                }}
              >
                Email
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    color: '#9CA3AF',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px 0 38px',
                    fontSize: '14px',
                    color: '#181D27',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5D7DA',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF7A00';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 122, 0, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D5D7DA';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#181D27'
                }}
              >
                Kata Sandi
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    color: '#9CA3AF',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="······"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px 0 38px',
                    fontSize: '14px',
                    color: '#181D27',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5D7DA',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF7A00';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 122, 0, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D5D7DA';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Remember Device Checkbox */}
            <div
              onClick={() => setRememberMe(!rememberMe)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                marginTop: '-4px'
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  backgroundColor: rememberMe ? '#FF7A00' : '#FFFFFF',
                  border: `1px solid ${rememberMe ? '#FF7A00' : '#D5D7DA'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {rememberMe && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
              </div>
              <span style={{ fontSize: '13px', color: '#414651', fontWeight: '400' }}>
                Ingat perangkat ini selama 30 hari
              </span>
            </div>

            {/* Primary Submit Button */}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(255, 122, 0, 0.3)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Masuk
            </button>

            {/* Divider (atau) */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '2px 0'
              }}
            >
              <div style={{ width: '100%', height: '1px', backgroundColor: '#E9EAEB' }} />
              <span
                style={{
                  position: 'absolute',
                  backgroundColor: '#FFFFFF',
                  padding: '0 12px',
                  fontSize: '11px',
                  color: '#717680',
                  fontWeight: '500'
                }}
              >
                atau
              </span>
            </div>

            {/* Social SSO Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D7DA',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#181D27',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FAFAFA';
                  e.currentTarget.style.borderColor = '#A3A7AE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#D5D7DA';
                }}
              >
                {/* Google Logo SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.37 7.36 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.27 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Lanjut dengan Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D7DA',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#181D27',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FAFAFA';
                  e.currentTarget.style.borderColor = '#A3A7AE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#D5D7DA';
                }}
              >
                {/* Apple Logo SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.18.66-2.88 1.46-.6.69-1.13 1.83-1 2.95 1.12.09 2.24-.57 2.89-1.37z" />
                </svg>
                <span>Lanjut dengan Apple</span>
              </button>
            </div>

          </form>
        </div>

        {/* 4. Footer Link outside Card */}
        <div
          style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '13px',
            color: '#717680'
          }}
        >
          <span>Belum punya akun organisasi? </span>
          <Link
            to="/register"
            style={{
              color: '#FF7A00',
              fontWeight: '600',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Daftar sekarang
          </Link>
        </div>

      </div>
    </div>
  );
};
