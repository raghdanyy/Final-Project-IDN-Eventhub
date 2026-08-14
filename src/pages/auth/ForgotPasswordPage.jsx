import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Calendar, ArrowLeft, MailCheck } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    showToast(`Link reset password terkirim ke ${email}`, 'success');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg-canvas)',
        padding: '24px'
      }}
    >
      <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card style={{ padding: '32px' }}>
          {!isSent ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: 800 }}>Lupa Password?</h1>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
                  Masukkan email Anda dan kami akan mengirimkan tautan untuk reset password.
                </p>
              </div>

              <Input
                label="Alamat Email Terdaftar *"
                type="email"
                placeholder="nama@organisasi.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button variant="primary" size="lg" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                Kirim Link Reset
              </Button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success-primary)' }}>
                <MailCheck size={28} />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Email Terkirim!</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Silakan cek kotak masuk <strong>{email}</strong> dan ikuti instruksi untuk mereset kata sandi.
              </p>
            </div>
          )}

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to="/login" style={{ fontSize: '13px', color: 'var(--color-brand-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ArrowLeft size={14} />
              <span>Kembali ke Halaman Login</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
