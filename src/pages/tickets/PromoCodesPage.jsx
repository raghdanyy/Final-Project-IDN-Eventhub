import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Plus,
  X,
  Copy,
  Tag,
  Pencil,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export const PromoCodesPage = () => {
  const navigate = useNavigate();
  const { promoCodes, addPromoCode, updatePromoCode, deletePromoCode, showToast, events } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromo, setSelectedPromo] = useState(null);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [deletingPromo, setDeletingPromo] = useState(null);

  // Form State for Create / Edit
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'Persentase',
    discountNum: 20,
    quota: 100,
    validUntil: '2026-10-31',
    applicableEvents: 'Semua Event Aktif',
    minPurchase: 'Rp 100.000',
    status: 'Aktif'
  });

  const list = promoCodes && promoCodes.length > 0 ? promoCodes : [];

  // Filter based on search query
  const filteredPromoCodes = list.filter((prm) => {
    const code = prm.code || '';
    const dtype = prm.discountType || prm.discount_type || '';
    const val = prm.value || '';
    const evt = prm.applicableEvents || '';
    return (
      code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dtype.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Aktif':
      case 'active':
        return { backgroundColor: '#EFF8FF', color: '#006BFF' };
      case 'Dijeda':
        return { backgroundColor: '#FFFAEB', color: '#B54708' };
      case 'Kedaluwarsa':
      case 'expired':
      default:
        return { backgroundColor: '#F2F4F7', color: '#475467' };
    }
  };

  const copyCode = (code, e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(code);
    showToast(`Kode promo "${code}" disalin ke clipboard!`, 'success');
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setFormData({
      code: '',
      discountType: 'Persentase',
      discountNum: 20,
      quota: 100,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applicableEvents: 'Semua Event Aktif',
      minPurchase: 'Rp 100.000',
      status: 'Aktif'
    });
    setIsCreateModalOpen(true);
  };

  // Submit Create Promo Code
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      showToast('Mohon masukkan kode promo', 'error');
      return;
    }

    const valueFormatted =
      formData.discountType === 'Persentase'
        ? `${formData.discountNum}%`
        : `Rp ${Number(formData.discountNum).toLocaleString('id-ID')}`;

    addPromoCode({
      code: formData.code.toUpperCase().replace(/\s+/g, ''),
      discountType: formData.discountType,
      value: valueFormatted,
      discount_value: Number(formData.discountNum),
      quota: Number(formData.quota) || 100,
      usedCount: 0,
      usedPercent: 0,
      validUntil: formData.validUntil,
      applicableEvents: formData.applicableEvents || 'Semua Event Aktif',
      minPurchase: formData.minPurchase || 'Rp 0',
      status: formData.status
    });

    setIsCreateModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (prm, e) => {
    e?.stopPropagation();
    let rawNum = 20;
    if (typeof prm.value === 'string') {
      const match = prm.value.replace(/[^0-9]/g, '');
      if (match) rawNum = Number(match);
    } else if (prm.discount_value) {
      rawNum = prm.discount_value;
    }

    setFormData({
      code: prm.code,
      discountType: prm.discountType || (prm.discount_type === 'fixed' ? 'Nominal tetap' : 'Persentase'),
      discountNum: rawNum,
      quota: prm.quota || 100,
      validUntil: prm.validUntil || '2026-10-31',
      applicableEvents: prm.applicableEvents || 'Semua Event Aktif',
      minPurchase: prm.minPurchase || 'Rp 0',
      status: prm.status || 'Aktif'
    });
    setEditingPromo(prm);
  };

  // Submit Edit Promo Code
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingPromo) return;
    if (!formData.code.trim()) {
      showToast('Mohon masukkan kode promo', 'error');
      return;
    }

    const valueFormatted =
      formData.discountType === 'Persentase'
        ? `${formData.discountNum}%`
        : `Rp ${Number(formData.discountNum).toLocaleString('id-ID')}`;

    const updatedUsedCount = editingPromo.usedCount || 0;
    const newQuota = Number(formData.quota) || 100;
    const updatedUsedPercent = Math.min(100, Math.round((updatedUsedCount / newQuota) * 100));

    updatePromoCode(editingPromo.id, {
      code: formData.code.toUpperCase().replace(/\s+/g, ''),
      discountType: formData.discountType,
      value: valueFormatted,
      discount_value: Number(formData.discountNum),
      quota: newQuota,
      usedPercent: updatedUsedPercent,
      validUntil: formData.validUntil,
      applicableEvents: formData.applicableEvents,
      minPurchase: formData.minPurchase,
      status: formData.status
    });

    if (selectedPromo && selectedPromo.id === editingPromo.id) {
      setSelectedPromo({
        ...selectedPromo,
        code: formData.code.toUpperCase().replace(/\s+/g, ''),
        discountType: formData.discountType,
        value: valueFormatted,
        quota: newQuota,
        validUntil: formData.validUntil,
        applicableEvents: formData.applicableEvents,
        minPurchase: formData.minPurchase,
        status: formData.status
      });
    }

    setEditingPromo(null);
  };

  // Delete Handler
  const handleDeleteConfirm = () => {
    if (!deletingPromo) return;
    deletePromoCode(deletingPromo.id);
    if (selectedPromo?.id === deletingPromo.id) {
      setSelectedPromo(null);
    }
    setDeletingPromo(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-family-text)' }}>
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
            Promo Codes
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Kode diskon untuk mendorong penjualan tiket
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
              placeholder="Cari promo, diskon, event"
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

          {/* Create Promo Code Button (Brand Orange) */}
          <button
            type="button"
            className="page-header-btn"
            onClick={handleOpenCreateModal}
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
            <span>Create Promo Code</span>
          </button>
        </div>
      </div>

      {/* 2. Main Promo Codes Table Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EAEB',
          borderRadius: '12px',
          padding: '20px 24px'
        }}
      >
        {/* Table Count Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>
            {filteredPromoCodes.length} kode promo
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            💡 Klik baris voucher untuk melihat rincian ketentuan promo
          </div>
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  KODE
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  TIPE DISKON
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  NILAI
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  PEMAKAIAN
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  STATUS
                </th>
                <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', textAlign: 'right' }}>
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPromoCodes.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '32px 0', textAlign: 'center', color: '#717680', fontSize: '13px' }}>
                    Belum ada kode promo yang sesuai. Klik <strong>+ Create Promo Code</strong> untuk membuat kode baru.
                  </td>
                </tr>
              ) : (
                filteredPromoCodes.map((prm) => {
                  const badgeStyle = getBadgeStyle(prm.status);
                  const displayValue = prm.value || `${prm.discount_value}%`;
                  const displayType = prm.discountType || (prm.discount_type === 'fixed' ? 'Nominal tetap' : 'Persentase');
                  const usedCount = prm.usedCount || prm.used_count || 0;
                  const quota = prm.quota || 100;
                  const usedPercent = prm.usedPercent !== undefined ? prm.usedPercent : Math.round((usedCount / quota) * 100);

                  return (
                    <tr
                      key={prm.id}
                      onClick={() => setSelectedPromo(prm)}
                      style={{
                        borderBottom: '1px solid #F8F9FA',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Kode Column */}
                      <td style={{ padding: '16px 12px 16px 0', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Tag size={14} color="#FF7A00" />
                          <span>{prm.code}</span>
                        </div>
                      </td>

                      {/* Tipe Diskon Column */}
                      <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                        {displayType}
                      </td>

                      {/* Nilai Column */}
                      <td style={{ padding: '16px 12px', fontSize: '13px', fontWeight: '700', color: '#FF7A00' }}>
                        {displayValue}
                      </td>

                      {/* Pemakaian Progress Column */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '130px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                              style={{
                                flex: 1,
                                height: '6px',
                                backgroundColor: '#E0EAFF',
                                borderRadius: '9999px',
                                overflow: 'hidden'
                              }}
                            >
                              <div
                                style={{
                                  width: `${Math.min(100, usedPercent)}%`,
                                  height: '100%',
                                  backgroundColor: '#006BFF',
                                  borderRadius: '9999px'
                                }}
                              />
                            </div>
                            <span style={{ fontSize: '11px', color: '#717680', minWidth: '26px' }}>
                              {usedPercent}%
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#717680' }}>
                            {usedCount} / {quota} kuota
                          </div>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td style={{ padding: '16px 12px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '2px 10px',
                            borderRadius: '9999px',
                            display: 'inline-block',
                            ...badgeStyle
                          }}
                        >
                          {prm.status || 'Aktif'}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td style={{ padding: '16px 0 16px 12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          {/* Copy */}
                          <button
                            type="button"
                            title="Salin Kode"
                            onClick={(e) => copyCode(prm.code, e)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              backgroundColor: '#F8F9FA',
                              border: '1px solid #E9EAEB',
                              color: '#717680',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFF4ED';
                              e.currentTarget.style.color = '#FF7A00';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#F8F9FA';
                              e.currentTarget.style.color = '#717680';
                            }}
                          >
                            <Copy size={14} />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit Promo"
                            onClick={(e) => handleOpenEditModal(prm, e)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              backgroundColor: '#F8F9FA',
                              border: '1px solid #E9EAEB',
                              color: '#717680',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#EFF8FF';
                              e.currentTarget.style.color = '#006BFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#F8F9FA';
                              e.currentTarget.style.color = '#717680';
                            }}
                          >
                            <Pencil size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Hapus Promo"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingPromo(prm);
                            }}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              backgroundColor: '#F8F9FA',
                              border: '1px solid #E9EAEB',
                              color: '#717680',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FEF3F2';
                              e.currentTarget.style.color = '#D92D20';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#F8F9FA';
                              e.currentTarget.style.color = '#717680';
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CREATE PROMO CODE MODAL                                                */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div
          onClick={() => setIsCreateModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E9EAEB',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.16)',
              animation: 'appleScaleUp 0.2s ease-out'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FAFAFA'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#FFF4ED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF7A00'
                  }}
                >
                  <Tag size={18} />
                </div>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#181D27' }}>
                    Buat Kode Promo Baru
                  </h2>
                  <p style={{ fontSize: '12px', color: '#717680' }}>
                    Tambahkan diskon khusus tiket untuk calon peserta
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                style={{
                  width: '28px',
                  height: '28px',
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
                <X size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Kode Promo Input */}
              <div className="apple-input-group">
                <label className="apple-label">Kode Promo (Huruf Kapital & Angka) *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: MERDEKA2026 / VIPACCESS"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 14px',
                    fontSize: '14px',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>

              {/* Tipe Diskon & Besaran Diskon Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="apple-input-group">
                  <label className="apple-label">Tipe Diskon</label>
                  <select
                    className="apple-input"
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  >
                    <option value="Persentase">Persentase (%)</option>
                    <option value="Nominal tetap">Nominal Tetap (Rp)</option>
                  </select>
                </div>

                <div className="apple-input-group">
                  <label className="apple-label">
                    {formData.discountType === 'Persentase' ? 'Besaran Diskon (%) *' : 'Potongan Harga (Rp) *'}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder={formData.discountType === 'Persentase' ? '20' : '50000'}
                    value={formData.discountNum}
                    onChange={(e) => setFormData({ ...formData, discountNum: e.target.value })}
                    className="apple-input"
                  />
                </div>
              </div>

              {/* Kuota & Berlaku Sampai Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="apple-input-group">
                  <label className="apple-label">Kuota Tiket *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="100"
                    value={formData.quota}
                    onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                    className="apple-input"
                  />
                </div>

                <div className="apple-input-group">
                  <label className="apple-label">Berlaku Sampai Kapan *</label>
                  <input
                    type="date"
                    required
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="apple-input"
                  />
                </div>
              </div>

              {/* Event yang Berlaku */}
              <div className="apple-input-group">
                <label className="apple-label">Event yang Berlaku</label>
                <select
                  className="apple-input"
                  value={formData.applicableEvents}
                  onChange={(e) => setFormData({ ...formData, applicableEvents: e.target.value })}
                >
                  <option value="Semua Event Aktif">Semua Event Aktif</option>
                  {events &&
                    events.map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.title}
                      </option>
                    ))}
                </select>
              </div>

              {/* Status */}
              <div className="apple-input-group">
                <label className="apple-label">Status Voucher</label>
                <select
                  className="apple-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Aktif">Aktif (Dapat Digunakan)</option>
                  <option value="Dijeda">Dijeda (Nonaktif Sementara)</option>
                </select>
              </div>

              {/* Modal Buttons */}
              <div
                className="promo-modal-footer-single"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '8px',
                  paddingTop: '16px',
                  borderTop: '1px solid #F2F4F7'
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{
                    padding: '9px 16px',
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
                    padding: '9px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#FF7A00',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 1px 2px rgba(255, 122, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D16400')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7A00')}
                >
                  <Plus size={15} />
                  <span>Simpan Kode Promo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. EDIT PROMO CODE MODAL                                                  */}
      {/* ========================================================================= */}
      {editingPromo && (
        <div
          onClick={() => setEditingPromo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E9EAEB',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.16)',
              animation: 'appleScaleUp 0.2s ease-out'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FAFAFA'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#006BFF'
                  }}
                >
                  <Pencil size={16} />
                </div>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#181D27' }}>
                    Edit Kode Promo
                  </h2>
                  <p style={{ fontSize: '12px', color: '#717680' }}>
                    Ubah masa berlaku, kuota, atau besaran diskon
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingPromo(null)}
                style={{
                  width: '28px',
                  height: '28px',
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
                <X size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Kode Promo Input */}
              <div className="apple-input-group">
                <label className="apple-label">Kode Promo *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 14px',
                    fontSize: '14px',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E9EAEB',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FF7A00')}
                  onBlur={(e) => (e.target.style.borderColor = '#E9EAEB')}
                />
              </div>

              {/* Tipe Diskon & Besaran Diskon Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="apple-input-group">
                  <label className="apple-label">Tipe Diskon</label>
                  <select
                    className="apple-input"
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  >
                    <option value="Persentase">Persentase (%)</option>
                    <option value="Nominal tetap">Nominal Tetap (Rp)</option>
                  </select>
                </div>

                <div className="apple-input-group">
                  <label className="apple-label">
                    {formData.discountType === 'Persentase' ? 'Besaran Diskon (%) *' : 'Potongan Harga (Rp) *'}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.discountNum}
                    onChange={(e) => setFormData({ ...formData, discountNum: e.target.value })}
                    className="apple-input"
                  />
                </div>
              </div>

              {/* Kuota & Berlaku Sampai Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="apple-input-group">
                  <label className="apple-label">Kuota Tiket *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.quota}
                    onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                    className="apple-input"
                  />
                </div>

                <div className="apple-input-group">
                  <label className="apple-label">Berlaku Sampai Kapan *</label>
                  <input
                    type="date"
                    required
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="apple-input"
                  />
                </div>
              </div>

              {/* Event yang Berlaku */}
              <div className="apple-input-group">
                <label className="apple-label">Event yang Berlaku</label>
                <select
                  className="apple-input"
                  value={formData.applicableEvents}
                  onChange={(e) => setFormData({ ...formData, applicableEvents: e.target.value })}
                >
                  <option value="Semua Event Aktif">Semua Event Aktif</option>
                  {events &&
                    events.map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.title}
                      </option>
                    ))}
                </select>
              </div>

              {/* Status */}
              <div className="apple-input-group">
                <label className="apple-label">Status Voucher</label>
                <select
                  className="apple-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Aktif">Aktif (Dapat Digunakan)</option>
                  <option value="Dijeda">Dijeda (Nonaktif Sementara)</option>
                  <option value="Kedaluwarsa">Kedaluwarsa (Expired)</option>
                </select>
              </div>

              {/* Modal Buttons — Fully Responsive with zero overlapping */}
              <div className="promo-edit-modal-footer">
                <button
                  type="button"
                  className="promo-btn-delete"
                  onClick={() => {
                    const toDelete = editingPromo;
                    setEditingPromo(null);
                    setDeletingPromo(toDelete);
                  }}
                >
                  <Trash2 size={14} />
                  <span>Hapus</span>
                </button>

                <div className="promo-btn-group-right">
                  <button
                    type="button"
                    className="promo-btn-cancel"
                    onClick={() => setEditingPromo(null)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="promo-btn-save"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DELETE CONFIRMATION MODAL                                              */}
      {/* ========================================================================= */}
      {deletingPromo && (
        <div
          onClick={() => setDeletingPromo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E9EAEB',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              padding: '24px',
              animation: 'appleScaleUp 0.2s ease-out'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#FEF3F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D92D20',
                marginBottom: '16px'
              }}
            >
              <AlertTriangle size={24} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#181D27', marginBottom: '6px' }}>
              Hapus Kode Promo "{deletingPromo.code}"?
            </h3>
            <p style={{ fontSize: '13px', color: '#717680', lineHeight: 1.5, marginBottom: '24px' }}>
              Kode promo ini akan dihapus secara permanen dari database. Peserta tidak akan bisa lagi menggunakan voucher ini saat checkout tiket.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setDeletingPromo(null)}
                style={{
                  padding: '9px 16px',
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
                onClick={handleDeleteConfirm}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#D92D20',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(217, 45, 32, 0.2)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B42318')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D92D20')}
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PROMO DETAIL POPUP MODAL                                               */}
      {/* ========================================================================= */}
      {selectedPromo && (
        <div
          onClick={() => setSelectedPromo(null)}
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
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '480px',
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
                padding: '18px 20px',
                borderBottom: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                backgroundColor: '#FAFAFA'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      ...getBadgeStyle(selectedPromo.status)
                    }}
                  >
                    {selectedPromo.status || 'Aktif'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#717680' }}>
                    ID: {selectedPromo.id}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#181D27',
                    marginTop: '6px',
                    fontFamily: 'var(--font-family-display)'
                  }}
                >
                  {selectedPromo.code}
                </h2>
                <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
                  Voucher Diskon {selectedPromo.discountType || 'Persentase'} ({selectedPromo.value || `${selectedPromo.discount_value}%`})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPromo(null)}
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

            {/* Modal Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Discount Value Box */}
              <div style={{ padding: '14px 16px', backgroundColor: '#F8F9FA', borderRadius: '10px', border: '1px solid #F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#717680', fontWeight: '500' }}>
                    BESARAN POTONGAN DISKON
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#FF7A00', marginTop: '2px' }}>
                    {selectedPromo.value || `${selectedPromo.discount_value}%`} OFF
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => copyCode(selectedPromo.code, e)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5D7DA',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#181D27',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Copy size={13} />
                  <span>Salin Kode</span>
                </button>
              </div>

              {/* Usage Progress */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                  <span>Statistik Pemakaian Kuota</span>
                  <span style={{ color: '#006BFF' }}>
                    {selectedPromo.usedCount || selectedPromo.used_count || 0} / {selectedPromo.quota || 100} kuota ({selectedPromo.usedPercent || 0}%)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E0EAFF', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${Math.min(100, selectedPromo.usedPercent || 0)}%`,
                      height: '100%',
                      backgroundColor: '#006BFF',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: '#717680', marginTop: '6px' }}>
                  Sisa kuota voucher yang dapat digunakan:{' '}
                  <strong>{(selectedPromo.quota || 100) - (selectedPromo.usedCount || selectedPromo.used_count || 0)} kali</strong>
                </div>
              </div>

              {/* Terms Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Event yang Berlaku</span>
                  <span style={{ fontWeight: '600', color: '#181D27', textAlign: 'right', maxWidth: '240px' }}>
                    {selectedPromo.applicableEvents || 'Semua Event Aktif'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Minimal Transaksi</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedPromo.minPurchase || 'Rp 0'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
                  <span style={{ color: '#717680' }}>Masa Berlaku Hingga</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedPromo.validUntil || '2026-10-31'}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer with Edit & Delete Quick Actions */}
            <div
              style={{
                padding: '14px 20px',
                borderTop: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                backgroundColor: '#FAFAFA'
              }}
            >
              <button
                type="button"
                onClick={() => {
                  const toDelete = selectedPromo;
                  setSelectedPromo(null);
                  setDeletingPromo(toDelete);
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF3F2',
                  border: '1px solid #FECDCA',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#D92D20',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Trash2 size={13} />
                <span>Hapus</span>
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const toEdit = selectedPromo;
                    setSelectedPromo(null);
                    handleOpenEditModal(toEdit);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5D7DA',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#181D27',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Pencil size={13} />
                  <span>Edit Promo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPromo(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#181D27',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
