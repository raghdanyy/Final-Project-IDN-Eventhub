import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  Mail,
  Trash2,
  Lock
} from 'lucide-react';

export const TeamManagementPage = () => {
  const { teamMembers, invites, inviteTeamMember, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('event_manager');

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteTeamMember(inviteEmail.trim(), inviteRole);
    setIsModalOpen(false);
    setInviteEmail('');
  };

  const roleDescriptions = {
    owner: 'Pemilik organisasi dengan akses tanpa batas dan transfer ownership.',
    admin: 'Mengelola event, tiket, team member, dan konfigurasi sistem.',
    event_manager: 'Membuat dan mengedit konten event, jadwal, pembicara, dan tiket.',
    finance: 'Akses laporan GMV, saldo payout balance, refund, dan invoice.',
    checkin_staff: 'Akses khusus pemindaian QR code dan check-in attendee di hari-H.',
    content_manager: 'Mengelola jadwal sesi, speaker, dan deskripsi acara.'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 1. Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="h1-title">Manajemen Tim & Hak Akses</h1>
          <p className="p-subtitle">
            Kelola anggota tim, undang kolaborator, dan tentukan 7 tingkatan role akses (PRD Feature 2 & Section 22).
          </p>
        </div>

        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => setIsModalOpen(true)}
        >
          Undang Anggota Tim
        </Button>
      </div>

      {/* 2. Team Members Table */}
      <div className="apple-table-container">
        <table className="apple-table">
          <thead>
            <tr>
              <th>Anggota Tim</th>
              <th>Role & Hak Akses</th>
              <th>Tanggal Bergabung</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((mem) => (
              <tr key={mem.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={mem.avatar_url}
                      alt={mem.full_name}
                      style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-display)' }}>
                        {mem.full_name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                        {mem.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: mem.role === 'owner' ? 'var(--color-brand-subtle)' : 'var(--color-bg-secondary)',
                      color: mem.role === 'owner' ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                      textTransform: 'uppercase'
                    }}
                  >
                    {mem.role.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {new Date(mem.joined_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </span>
                </td>
                <td>
                  <Badge variant="success">AKTIF</Badge>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {mem.role !== 'owner' ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => showToast(`Edit role ${mem.full_name}`, 'info')}
                    >
                      Ubah Role
                    </Button>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Owner Utama</span>
                  )}
                </td>
              </tr>
            ))}

            {/* Pending Invites */}
            {invites.map((inv) => (
              <tr key={inv.id} style={{ opacity: 0.75 }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mail size={16} color="var(--color-text-tertiary)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{inv.email}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Undangan Terkirim</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ padding: '3px 8px', borderRadius: 9999, fontSize: '11px', background: 'var(--color-bg-secondary)', textTransform: 'uppercase' }}>
                    {inv.role.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Menunggu Konfirmasi
                  </span>
                </td>
                <td>
                  <Badge variant="warning">PENDING</Badge>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => showToast('Link undangan disalin', 'info')}
                  >
                    Salin Link
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Permission Matrix Reference Card */}
      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <ShieldCheck size={20} color="var(--color-brand-primary)" />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>
            Matriks Hak Akses & Kewenangan (PRD Section 22)
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {Object.entries(roleDescriptions).map(([key, desc]) => (
            <div
              key={key}
              style={{
                padding: '12px 14px',
                background: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-primary)' }}>
                {key.replace('_', ' ')}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 4, lineHeight: 1.4 }}>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Invite Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Undang Anggota Tim Baru"
        subtitle="Kirim link bergabung ke email kolega Anda"
      >
        <form onSubmit={handleSendInvite} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Alamat Email *"
            type="email"
            placeholder="kolega@organisasi.id"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />

          <div className="apple-input-group">
            <label className="apple-label">Role Akses</label>
            <select
              className="apple-input"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="admin">Admin (Akses Penuh Manajemen)</option>
              <option value="event_manager">Event Manager (Konten & Tiket)</option>
              <option value="finance">Finance (Pendapatan & Refund)</option>
              <option value="checkin_staff">Check-in Staff (Pintu Masuk Hari-H)</option>
              <option value="content_manager">Content Manager (Jadwal & Speaker)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Kirim Undangan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
