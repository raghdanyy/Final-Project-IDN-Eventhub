import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Plus, X, Trash2, AlertTriangle } from 'lucide-react';

export const OrganizationSettingsPage = () => {
  const navigate = useNavigate();
  const { teamMembers, setTeamMembers, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Organization Profile');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Organization profile form state
  const [formData, setFormData] = useState({
    orgName: 'Nusantara Event Co.',
    category: 'Tech Conference',
    contactEmail: 'halo@nusantaraevent.id',
    storefrontDomain: 'nusantaraevent.eventhub.io'
  });

  // Invoice history matching the Figma screenshot
  const invoices = [
    {
      id: 'INV-2026-08',
      period: 'Agustus 2026',
      status: 'Lunas',
      amount: 'Rp 1.499.000'
    },
    {
      id: 'INV-2026-07',
      period: 'Juli 2026',
      status: 'Lunas',
      amount: 'Rp 1.499.000'
    },
    {
      id: 'INV-2026-06',
      period: 'Juni 2026',
      status: 'Lunas',
      amount: 'Rp 1.499.000'
    }
  ];

  // New invite form state
  const [newInvite, setNewInvite] = useState({
    name: '',
    email: '',
    role: 'Event Manager'
  });

  const tabs = ['Organization Profile', 'Team & Roles', 'Billing & Subscription'];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    showToast('Profil organisasi berhasil diperbarui!', 'success');
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!newInvite.name.trim() || !newInvite.email.trim()) {
      showToast('Mohon lengkapi nama dan email anggota', 'error');
      return;
    }

    const newMember = {
      id: `tm-${Date.now()}`,
      name: newInvite.name.trim(),
      email: newInvite.email.trim(),
      role: newInvite.role,
      joinedDate: 'Hari ini'
    };

    setTeamMembers((prev) => [...prev, newMember]);
    setIsInviteModalOpen(false);
    setNewInvite({ name: '', email: '', role: 'Event Manager' });
    showToast(`Undangan berhasil dikirim ke ${newMember.email}`, 'success');
  };

  const handleDeleteMember = () => {
    if (!memberToDelete) return;
    setTeamMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id));
    showToast(`Anggota ${memberToDelete.name} berhasil dihapus dari tim.`, 'info');
    setMemberToDelete(null);
  };

  // Filter team members based on search
  const filteredTeam = teamMembers.filter((m) => {
    return (
      (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.role || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-family-text)' }}>
      
      {/* 1. Top Header Area */}
      <div
        className="page-header-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            Settings
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Pengaturan organisasi, tim, dan langganan
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Box */}
          <div
            className="page-header-search"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              width: '260px'
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                color: '#717680',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Cari event, order, attendee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                padding: '0 12px 0 36px',
                fontSize: '13px',
                color: '#181D27',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9EAEB',
                borderRadius: '8px',
                outline: 'none'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
              onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
            />
          </div>

          {/* Create Event Button */}
          <button
            type="button"
            className="page-header-btn"
            onClick={() => navigate('/events/new')}
            style={{
              height: '40px',
              padding: '0 16px',
              backgroundColor: '#FF7A00',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 18px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '500',
                backgroundColor: isActive ? '#FF7A00' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#181D27',
                border: isActive ? '1px solid #FF7A00' : '1px solid #E9EAEB',
                cursor: 'pointer',
                boxShadow: isActive ? '0 1px 2px rgba(255, 122, 0, 0.2)' : 'none',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#D5D7DA';
                  e.currentTarget.style.backgroundColor = '#FAFAFA';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#E9EAEB';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Content */}

      {/* TAB 1: Organization Profile */}
      {activeTab === 'Organization Profile' && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px'
          }}
        >
          <h2
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#181D27',
              marginBottom: '20px'
            }}
          >
            Profil organisasi
          </h2>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px'
              }}
            >
              {/* Field 1: Nama Organisasi */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#717680', textTransform: 'uppercase' }}>
                  NAMA ORGANISASI
                </label>
                <input
                  type="text"
                  value={formData.orgName}
                  onChange={(e) => handleInputChange('orgName', e.target.value)}
                  style={{
                    height: '44px',
                    padding: '0 14px',
                    fontSize: '13px',
                    color: '#181D27',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>

              {/* Field 2: Kategori */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#717680', textTransform: 'uppercase' }}>
                  KATEGORI
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  style={{
                    height: '44px',
                    padding: '0 14px',
                    fontSize: '13px',
                    color: '#181D27',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>

              {/* Field 3: Email Kontak */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#717680', textTransform: 'uppercase' }}>
                  EMAIL KONTAK
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  style={{
                    height: '44px',
                    padding: '0 14px',
                    fontSize: '13px',
                    color: '#181D27',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>

              {/* Field 4: Domain Storefront */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#717680', textTransform: 'uppercase' }}>
                  DOMAIN STOREFRONT
                </label>
                <input
                  type="text"
                  value={formData.storefrontDomain}
                  onChange={(e) => handleInputChange('storefrontDomain', e.target.value)}
                  style={{
                    height: '44px',
                    padding: '0 14px',
                    fontSize: '13px',
                    color: '#181D27',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '12px' }}>
              <button
                type="submit"
                style={{
                  height: '40px',
                  padding: '0 20px',
                  backgroundColor: '#FF7A00',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Team & Roles (Matching Figma Screenshot 1:1 with Delete Member Feature) */}
      {activeTab === 'Team & Roles' && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px'
          }}
        >
          {/* Card Header with Member Count & Invite Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#181D27' }}>
              {filteredTeam.length} anggota tim
            </h2>
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(true)}
              style={{
                height: '38px',
                padding: '0 16px',
                backgroundColor: '#FF7A00',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
            >
              Undang anggota
            </button>
          </div>

          {/* Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                  <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                    NAMA
                  </th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                    EMAIL
                  </th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                    ROLE
                  </th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                    BERGABUNG
                  </th>
                  <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', textAlign: 'right' }}>
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTeam.map((m) => {
                  const isOwner = (m.role || '').toLowerCase() === 'owner';
                  return (
                    <tr
                      key={m.id}
                      style={{
                        borderBottom: '1px solid #F8F9FA',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Nama Column */}
                      <td style={{ padding: '16px 12px 16px 0', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                        {m.name}
                      </td>

                      {/* Email Column */}
                      <td style={{ padding: '16px 12px', fontSize: '12px', color: '#717680' }}>
                        {m.email}
                      </td>

                      {/* Role Column */}
                      <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                        {m.role}
                      </td>

                      {/* Bergabung Column */}
                      <td style={{ padding: '16px 12px', fontSize: '12px', color: '#717680' }}>
                        {m.joinedDate}
                      </td>

                      {/* Aksi / Hapus Column */}
                      <td style={{ padding: '16px 0 16px 12px', textAlign: 'right' }}>
                        {isOwner ? (
                          <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '500' }}>
                            Owner
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setMemberToDelete(m)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E9EAEB',
                              borderRadius: '6px',
                              color: '#717680',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FEF3F2';
                              e.currentTarget.style.borderColor = '#FECDCA';
                              e.currentTarget.style.color = '#D92D21';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF';
                              e.currentTarget.style.borderColor = '#E9EAEB';
                              e.currentTarget.style.color = '#717680';
                            }}
                            title={`Hapus ${m.name} dari tim`}
                          >
                            <Trash2 size={14} />
                            <span>Hapus</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Billing & Subscription (Matching Figma Screenshot 1:1) */}
      {activeTab === 'Billing & Subscription' && (
        <div
          className="settings-billing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
            gap: '16px',
            alignItems: 'start'
          }}
        >
          {/* Left Card: Paket Saat Ini */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E9EAEB',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27', marginBottom: '20px' }}>
              Paket saat ini
            </h2>

            <div
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#181D27',
                fontFamily: 'var(--font-family-display)'
              }}
            >
              Pro
            </div>

            <p style={{ fontSize: '13px', color: '#717680', marginTop: '4px' }}>
              Rp1.499.000 / bulan · komisi 2,5% per tiket terjual
            </p>

            <p style={{ fontSize: '13px', color: '#181D27', fontWeight: '500', margin: '20px 0' }}>
              Perpanjangan berikutnya 10 September 2026
            </p>

            <button
              type="button"
              onClick={() => showToast('Membuka formulir upgrade paket ke Enterprise...', 'info')}
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
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
            >
              Upgrade ke Enterprise
            </button>
          </div>

          {/* Right Card: Riwayat Invoice */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E9EAEB',
              borderRadius: '12px',
              padding: '24px'
            }}
          >
            <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#181D27', marginBottom: '16px' }}>
              Riwayat invoice
            </h2>

            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                    <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                      INVOICE
                    </th>
                    <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                      PERIODE
                    </th>
                    <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                      STATUS
                    </th>
                    <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', textAlign: 'right' }}>
                      JUMLAH
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      onClick={() => showToast(`Mengunduh invoice ${inv.id}...`, 'success')}
                      style={{
                        borderBottom: '1px solid #F8F9FA',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      title="Klik untuk mengunduh invoice PDF"
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Invoice Column */}
                      <td style={{ padding: '16px 12px 16px 0', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                        {inv.id}
                      </td>

                      {/* Periode Column */}
                      <td style={{ padding: '16px 12px', fontSize: '12px', color: '#717680' }}>
                        {inv.period}
                      </td>

                      {/* Status Column */}
                      <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27', fontWeight: '500' }}>
                        {inv.status}
                      </td>

                      {/* Jumlah Column */}
                      <td style={{ padding: '16px 0 16px 12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                        {inv.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Undang Anggota Baru */}
      {isInviteModalOpen && (
        <div
          onClick={() => setIsInviteModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E9EAEB',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.16)',
              overflow: 'hidden',
              animation: 'appleScaleUp 0.2s ease-out'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FAFAFA'
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#181D27' }}>
                  Undang Anggota Tim
                </h3>
                <p style={{ fontSize: '12px', color: '#717680', marginTop: '2px' }}>
                  Kirim undangan ke email rekan kerja Anda
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E9EAEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#717680'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleInviteSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#181D27' }}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sarah Azhari"
                  value={newInvite.name}
                  onChange={(e) => setNewInvite((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  style={{
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '13px',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#181D27' }}>
                  Alamat Email *
                </label>
                <input
                  type="email"
                  placeholder="sarah@nusantaraevent.id"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  style={{
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '13px',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#181D27' }}>
                  Peran & Hak Akses
                </label>
                <select
                  value={newInvite.role}
                  onChange={(e) => setNewInvite((prev) => ({ ...prev, role: e.target.value }))}
                  style={{
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '13px',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Event Manager">Event Manager (Kelola Jadwal & Tiket)</option>
                  <option value="Finance">Finance (Akses Laporan & Settlement)</option>
                  <option value="Marketing">Marketing (Kelola Kode Promo & Banner)</option>
                  <option value="Check-in Staff">Check-in Staff (Hanya Terminal Validasi Gate)</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5D7DA',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#414651',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#FF7A00',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)'
                  }}
                >
                  Kirim Undangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Konfirmasi Hapus Anggota Tim */}
      {memberToDelete && (
        <div
          onClick={() => setMemberToDelete(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E9EAEB',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.16)',
              overflow: 'hidden',
              animation: 'appleScaleUp 0.2s ease-out'
            }}
          >
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#FEF3F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D92D21',
                    flexShrink: 0
                  }}
                >
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#181D27' }}>
                    Hapus Anggota Tim?
                  </h3>
                  <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
                    Akses dashboard anggota ini akan dicabut.
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#414651', lineHeight: 1.5 }}>
                Apakah Anda yakin ingin menghapus <strong>{memberToDelete.name}</strong> ({memberToDelete.email}) dengan peran <strong>{memberToDelete.role}</strong> dari organisasi?
              </p>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setMemberToDelete(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5D7DA',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#414651',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeleteMember}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#D92D21',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(217, 45, 33, 0.2)'
                  }}
                >
                  Ya, Hapus Anggota
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
