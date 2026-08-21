import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Building, ArrowRight, Sparkles } from 'lucide-react';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [orgName, setOrgName] = useState('');
  const [category, setCategory] = useState('Tech Conference & Summit');

  const handleFinishOnboarding = (e) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    showToast(`Organisasi "${orgName}" berhasil dibuat!`, 'success');
    navigate('/dashboard');
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
      <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-brand-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-brand-primary)'
            }}
          >
            <Building size={24} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Setup Organisasi Pertama</h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Buat profil tenant event Anda untuk memulai publikasi.
          </p>
        </div>

        <Card style={{ padding: '32px' }}>
          <form onSubmit={handleFinishOnboarding} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Input
              label="Nama Organisasi / Komunitas *"
              placeholder="Contoh: Jakarta Tech Community, Nusantara MICE"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />

            <div className="apple-input-group">
              <label className="apple-label">Kategori Utama</label>
              <select
                className="apple-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Tech Conference & Summit">Tech Conference & Summit</option>
                <option value="Design Community & Workshops">Design Community & Workshops</option>
                <option value="Music & Entertainment">Music & Entertainment</option>
                <option value="Business & Networking">Business & Networking</option>
              </select>
            </div>

            <Button variant="primary" size="lg" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Mulai Buat Event Pertama</span>
              <ArrowRight size={16} />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
