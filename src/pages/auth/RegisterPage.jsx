import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, User, Building, Check } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast('Harap setujui Syarat & Ketentuan untuk melanjutkan.', 'warning');
      return;
    }
    showToast(`Registrasi berhasil! Selamat datang, ${name || 'Organizer'}.`, 'success');
    navigate('/');
  };

  const handleSocialRegister = (provider) => {
    showToast(`Daftar dengan ${provider} berhasil!`, 'success');
    navigate('/');
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
        padding: '40px 16px',
        fontFamily: 'var(--font-family-text)'
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 1. App Icon Badge (Orange Rounded Box with White 'E') */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#FF7A00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(255, 122, 0, 0.28)',
            marginBottom: '20px'
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
          Daftar ke EventHub
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
          Mulai kelola event organisasi Anda dalam satu platform.
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Full Name Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="name"
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#181D27'
                }}
              >
                Nama Lengkap
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    color: '#9CA3AF',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  id="name"
                  type="text"
                  placeholder="Contoh: Alex Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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

            {/* Organization Name Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="orgName"
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#181D27'
                }}
              >
                Nama Organisasi / Event Organizer
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Building
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    color: '#9CA3AF',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  id="orgName"
                  type="text"
                  placeholder="Contoh: Nusantara Event Co."
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
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
                  required
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
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            {/* Terms Agreement Checkbox */}
            <div
              onClick={() => setAgreeTerms(!agreeTerms)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                marginTop: '2px'
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  backgroundColor: agreeTerms ? '#FF7A00' : '#FFFFFF',
                  border: `1px solid ${agreeTerms ? '#FF7A00' : '#D5D7DA'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                  transition: 'all 0.15s ease'
                }}
              >
                {agreeTerms && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
              </div>
              <span style={{ fontSize: '12px', color: '#414651', lineHeight: 1.4 }}>
                Saya menyetujui <strong>Syarat & Ketentuan</strong> serta <strong>Kebijakan Privasi</strong> EventHub.
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
                boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)',
                marginTop: '6px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
            >
              Daftar Akun Baru
            </button>

            {/* Divider 'atau' */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '8px 0 2px'
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E9EAEB' }} />
              <span style={{ padding: '0 12px', fontSize: '12px', color: '#717680' }}>
                atau
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E9EAEB' }} />
            </div>

            {/* Social Logins: Google & Apple */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialRegister('Google')}
                style={{
                  flex: 1,
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D7DA',
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
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => handleSocialRegister('Apple')}
                style={{
                  flex: 1,
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D7DA',
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.94 1.07.08 2.13-.46 2.79-1.28z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

          </form>
        </div>

        {/* 4. Bottom Link to Login */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '13px', color: '#717680' }}>
            Sudah punya akun?{' '}
          </span>
          <Link
            to="/login"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#FF7A00',
              textDecoration: 'none'
            }}
          >
            Masuk di sini
          </Link>
        </div>

      </div>
    </div>
  );
};
