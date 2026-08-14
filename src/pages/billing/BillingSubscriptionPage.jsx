import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  CheckCircle,
  FileText,
  Building,
  Sparkles
} from 'lucide-react';

export const BillingSubscriptionPage = () => {
  const {
    activeOrg,
    settlements,
    invoices,
    requestPayout,
    formatIDR,
    showToast
  } = useApp();

  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(activeOrg.payout_balance);
  const [bankAccount, setBankAccount] = useState('BCA •••• 8821 (TechFest Indonesia)');

  const handlePayoutSubmit = (e) => {
    e.preventDefault();
    const success = requestPayout(Number(payoutAmount), bankAccount);
    if (success) {
      setIsPayoutModalOpen(false);
    }
  };

  const plans = [
    {
      name: 'Free Starter',
      price: 'Rp 0',
      period: '/ bulan',
      features: ['Maksimal 1 event aktif', 'Komisi 5% per tiket', '3 Anggota tim', 'Check-in scanner standar'],
      isCurrent: activeOrg.plan === 'free'
    },
    {
      name: 'Pro Organizer',
      price: 'Rp 499.000',
      period: '/ bulan',
      features: ['Hingga 10 event aktif', 'Komisi 3% per tiket', '10 Anggota tim', 'Offline check-in mode', 'Custom branding logo'],
      isCurrent: activeOrg.plan === 'pro',
      highlight: true
    },
    {
      name: 'Enterprise MICE',
      price: 'Hubungi Kami',
      period: '',
      features: ['Unlimited event aktif', 'Komisi 2% negotiable', 'Unlimited tim & SSO', 'Dedicated Account Manager', 'SLA Uptime 99.9%'],
      isCurrent: activeOrg.plan === 'enterprise'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 1. Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="h1-title">Billing & Payout Pendapatan</h1>
          <p className="p-subtitle">
            Kelola paket langganan organisasi, saldo payout hasil penjualan tiket, dan riwayat settlement (PRD Feature 3).
          </p>
        </div>
      </div>

      {/* 2. Payout Balance Card */}
      <div
        style={{
          padding: '24px',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, #181D27 0%, #0B0D12 100%)',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20
        }}
      >
        <div>
          <div style={{ fontSize: '12px', opacity: 0.8, letterSpacing: '0.04em' }}>
            SALDO PAYOUT BERSIH TERSEDIA (NET SETTLEMENT)
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, marginTop: 4, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            {formatIDR(activeOrg.payout_balance)}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: 4 }}>
            Komisi platform flat 3% telah dipotong otomatis.
          </div>
        </div>

        <Button
          variant="primary"
          icon={ArrowUpRight}
          size="lg"
          onClick={() => setIsPayoutModalOpen(true)}
        >
          Cairkan Dana ke Rekening
        </Button>
      </div>

      {/* 3. Subscription Tier Comparison */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: 14 }}>
          Paket Langganan Organisasi
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {plans.map((p) => (
            <Card
              key={p.name}
              style={{
                padding: '24px',
                border: p.highlight ? '2px solid var(--color-brand-primary)' : '1px solid var(--color-border-secondary)',
                position: 'relative'
              }}
            >
              {p.highlight && (
                <div style={{ position: 'absolute', top: -10, right: 18, background: 'var(--color-brand-primary)', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 9999 }}>
                  PAKET AKTIF
                </div>
              )}

              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{p.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '12px 0 16px' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-display)' }}>
                  {p.price}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>{p.period}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {p.features.map((f, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircle size={14} color="var(--color-success-primary)" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={p.isCurrent ? 'secondary' : 'primary'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => showToast(`Pilihan paket: ${p.name}`, 'info')}
                disabled={p.isCurrent}
              >
                {p.isCurrent ? 'Paket Sedang Berjalan' : 'Pilih Paket Ini'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Settlement History Table */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: 14 }}>
          Riwayat Pencairan & Settlement Event
        </h2>
        <div className="apple-table-container">
          <table className="apple-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>GMV Kotor</th>
                <th>Komisi (3%)</th>
                <th>Net Ditransfer</th>
                <th>Rekening Tujuan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((stl) => (
                <tr key={stl.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{stl.event_title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>ID: {stl.id}</div>
                  </td>
                  <td>{formatIDR(stl.gross_amount)}</td>
                  <td style={{ color: 'var(--color-error-text)' }}>- {formatIDR(stl.commission_amount)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-success-text)' }}>{formatIDR(stl.net_amount)}</td>
                  <td>{stl.bank_account}</td>
                  <td>
                    <Badge variant={stl.status === 'settled' ? 'success' : 'warning'}>
                      {stl.status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Payout Modal */}
      <Modal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        title="Ajukan Pencairan Dana"
        subtitle="Dana akan ditransfer via kliring perbankan (T+1)"
      >
        <form onSubmit={handlePayoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Nominal Pencairan (Rp) *"
            type="number"
            value={payoutAmount}
            onChange={(e) => setPayoutAmount(e.target.value)}
            max={activeOrg.payout_balance}
            required
          />

          <Input
            label="Rekening Bank Penerima *"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            required
          />

          <div style={{ padding: '12px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Estimasi diterima: <strong>{formatIDR(payoutAmount)}</strong> (bebas biaya admin transfer).
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => setIsPayoutModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Konfirmasi Pencairan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
