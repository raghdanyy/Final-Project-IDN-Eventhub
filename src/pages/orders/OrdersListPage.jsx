import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearchInput } from '../../components/common/GlobalSearchInput';
import { Plus, X, CheckCircle2, RotateCcw, CreditCard, Calendar, User, Mail, Download, ArrowUpDown, Send, ShoppingBag } from 'lucide-react';

export const OrdersListPage = () => {
  const navigate = useNavigate();
  const { showToast, addOrder } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    buyerName: '',
    buyerEmail: '',
    event: 'Jakarta Tech Summit 2026',
    ticketTier: 'Regular Pass (1x)',
    total: 'Rp 750.000',
    paymentMethod: 'BCA Virtual Account'
  });

  // 6 orders matching the Figma screenshot
  const [ordersList, setOrdersList] = useState([
    {
      id: 'ORD-24081',
      buyerName: 'Maya Rahmadani',
      buyerEmail: 'maya@mail.com',
      event: 'Jakarta Tech Summit 2026',
      qty: 2,
      time: '2026-08-09 21:14',
      status: 'Lunas',
      statusType: 'success',
      total: 'Rp 1.500.000',
      paymentMethod: 'BCA Virtual Account',
      ticketTier: 'Regular Pass (2x)'
    },
    {
      id: 'ORD-24080',
      buyerName: 'Budi Santoso',
      buyerEmail: 'budi@mail.com',
      event: 'AI Builders Bootcamp',
      qty: 1,
      time: '2026-08-09 20:52',
      status: 'Menunggu',
      statusType: 'warning',
      total: 'Rp 300.000',
      paymentMethod: 'QRIS / GoPay',
      ticketTier: 'Online Workshop Pass (1x)'
    },
    {
      id: 'ORD-24079',
      buyerName: 'Clara Wijaya',
      buyerEmail: 'clara@mail.com',
      event: 'Jakarta Tech Summit 2026',
      qty: 4,
      time: '2026-08-09 19:33',
      status: 'Lunas',
      statusType: 'success',
      total: 'Rp 3.000.000',
      paymentMethod: 'Credit Card (Mastercard)',
      ticketTier: 'Regular Pass (4x)'
    },
    {
      id: 'ORD-24078',
      buyerName: 'Dimas Prakoso',
      buyerEmail: 'dimas@mail.com',
      event: 'Product Craft Meetup #14',
      qty: 1,
      time: '2026-08-09 18:02',
      status: 'Refund',
      statusType: 'danger',
      total: 'Rp 150.000',
      paymentMethod: 'Mandiri Bill Payment',
      ticketTier: 'Community Pass (1x)'
    },
    {
      id: 'ORD-24077',
      buyerName: 'Ella Kurnia',
      buyerEmail: 'ella@mail.com',
      event: 'Jakarta Tech Summit 2026',
      qty: 1,
      time: '2026-08-09 16:47',
      status: 'Lunas',
      statusType: 'success',
      total: 'Rp 1.850.000',
      paymentMethod: 'BCA Virtual Account',
      ticketTier: 'VIP Front Row Pass (1x)'
    },
    {
      id: 'ORD-24076',
      buyerName: 'Fajar Nugroho',
      buyerEmail: 'fajar@mail.com',
      event: 'AI Builders Bootcamp',
      qty: 3,
      time: '2026-08-09 15:20',
      status: 'Kedaluwarsa',
      statusType: 'neutral',
      total: 'Rp 900.000',
      paymentMethod: 'BNI Virtual Account',
      ticketTier: 'Online Workshop Pass (3x)'
    }
  ]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newOrderForm.buyerName.trim() || !newOrderForm.buyerEmail.trim()) {
      showToast('Harap lengkapi nama dan email pembeli!', 'warning');
      return;
    }
    const created = {
      id: `ORD-${Math.floor(24000 + Math.random() * 999)}`,
      buyerName: newOrderForm.buyerName,
      buyerEmail: newOrderForm.buyerEmail,
      event: newOrderForm.event,
      qty: 1,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Lunas',
      statusType: 'success',
      total: newOrderForm.total,
      paymentMethod: newOrderForm.paymentMethod,
      ticketTier: newOrderForm.ticketTier
    };

    setOrdersList((prev) => [created, ...prev]);
    if (addOrder) addOrder(created);

    showToast(`Order ${created.id} berhasil dibuat dan otomatis terdaftar ke Attendees!`, 'success');
    setShowCreateModal(false);
    setNewOrderForm({
      buyerName: '',
      buyerEmail: '',
      event: 'Jakarta Tech Summit 2026',
      ticketTier: 'Regular Pass (1x)',
      total: 'Rp 750.000',
      paymentMethod: 'BCA Virtual Account'
    });
  };

  // Filter based on search query and sort
  const filteredOrders = ordersList
    .filter((ord) => {
      return (
        ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.ticketTier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.buyerName.localeCompare(b.buyerName);
      if (sortBy === 'name-desc') return b.buyerName.localeCompare(a.buyerName);
      if (sortBy === 'date-desc') return b.time.localeCompare(a.time);
      if (sortBy === 'date-asc') return a.time.localeCompare(b.time);
      if (sortBy === 'amount-desc') {
        const numA = parseInt(a.total.replace(/[^0-9]/g, ''), 10);
        const numB = parseInt(b.total.replace(/[^0-9]/g, ''), 10);
        return numB - numA;
      }
      if (sortBy === 'amount-asc') {
        const numA = parseInt(a.total.replace(/[^0-9]/g, ''), 10);
        const numB = parseInt(b.total.replace(/[^0-9]/g, ''), 10);
        return numA - numB;
      }
      return 0;
    });

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#ECFDF3', color: '#079455' };
      case 'warning':
        return { backgroundColor: '#FFF8E6', color: '#DC6903' };
      case 'danger':
        return { backgroundColor: '#FEF3F2', color: '#D92D21' };
      case 'neutral':
      default:
        return { backgroundColor: '#F2F4F7', color: '#475467' };
    }
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
            Orders
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Semua transaksi & riwayat pembelian tiket
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Universal Global Search Box */}
          <GlobalSearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sort Control Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={15} color="#717680" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                height: '40px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #D5D7DA',
                backgroundColor: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                color: '#414651',
                cursor: 'pointer'
              }}
            >
              <option value="name-asc">Urutkan: Nama A - Z</option>
              <option value="name-desc">Urutkan: Nama Z - A</option>
              <option value="date-desc">Urutkan: Tanggal Terbaru</option>
              <option value="date-asc">Urutkan: Tanggal Terlama</option>
              <option value="amount-desc">Urutkan: Nominal Tertinggi</option>
              <option value="amount-asc">Urutkan: Nominal Terendah</option>
            </select>
          </div>

          {/* Send Email Ticket Button */}
          <button
            type="button"
            className="page-header-btn"
            onClick={() => showToast('Email e-ticket berhasil dikirim ulang ke semua pembeli!', 'success')}
            style={{
              height: '40px',
              padding: '0 14px',
              backgroundColor: '#FFFFFF',
              color: '#414651',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              border: '1px solid #D5D7DA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Send size={15} />
            <span>Kirim Email Tiket</span>
          </button>

          {/* Create Order Button */}
          <button
            type="button"
            className="page-header-btn"
            onClick={() => setShowCreateModal(true)}
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
              whiteSpace: 'nowrap'
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create New Order</span>
          </button>
        </div>
      </div>

      {/* 2. Four Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Card 1: Order Lunas */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Order lunas
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            3
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            hari ini
          </div>
        </div>

        {/* Card 2: Menunggu Pembayaran */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Menunggu pembayaran
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            1
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            expire dalam 60 menit
          </div>
        </div>

        {/* Card 3: Nilai Transaksi */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Nilai transaksi
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            Rp 6.350.000
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
            <span
              style={{
                backgroundColor: '#ECFDF3',
                color: '#079455',
                padding: '2px 6px',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '11px'
              }}
            >
              +4,8%
            </span>
          </div>
        </div>

        {/* Card 4: Refund */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Refund
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            Rp 150.000
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            1 order
          </div>
        </div>
      </div>

      {/* 3. Main Orders Table Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EAEB',
          borderRadius: '12px',
          padding: '20px 24px'
        }}
      >
        {/* Table Count Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>
            Daftar order
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            💡 Klik baris pesanan untuk melihat detail transaksi
          </div>
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Order ID
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Pembeli
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Event
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Qty
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Waktu
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Status
                </th>
                <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', textAlign: 'right' }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => {
                const badgeStyle = getBadgeStyle(ord.statusType);
                return (
                  <tr
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    style={{
                      borderBottom: '1px solid #F8F9FA',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Order ID Column */}
                    <td style={{ padding: '16px 12px 16px 0', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {ord.id}
                    </td>

                    {/* Pembeli Column */}
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                        {ord.buyerName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                        {ord.buyerEmail}
                      </div>
                    </td>

                    {/* Event Column */}
                    <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                      {ord.event}
                    </td>

                    {/* Qty Column */}
                    <td style={{ padding: '16px 12px', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {ord.qty}
                    </td>

                    {/* Waktu Column */}
                    <td style={{ padding: '16px 12px', fontSize: '12px', color: '#717680' }}>
                      {ord.time}
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
                        {ord.status}
                      </span>
                    </td>

                    {/* Total Column */}
                    <td style={{ padding: '16px 0 16px 12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {ord.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Order Detail Modal Popup */}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
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
              maxWidth: '520px',
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
                      ...getBadgeStyle(selectedOrder.statusType)
                    }}
                  >
                    {selectedOrder.status}
                  </span>
                  <span style={{ fontSize: '12px', color: '#717680' }}>
                    {selectedOrder.time}
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
                  Detail Order {selectedOrder.id}
                </h2>
                <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
                  {selectedOrder.event}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
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
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Buyer Info Card */}
              <div style={{ padding: '14px 16px', backgroundColor: '#F8F9FA', borderRadius: '10px', border: '1px solid #F2F4F7' }}>
                <div style={{ fontSize: '11px', color: '#717680', fontWeight: '500', marginBottom: '6px' }}>
                  INFORMASI PEMBELI
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>
                  {selectedOrder.buyerName}
                </div>
                <div style={{ fontSize: '12px', color: '#717680', marginTop: '2px' }}>
                  {selectedOrder.buyerEmail}
                </div>
              </div>

              {/* Items & Payment Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Tiket Dipesan</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedOrder.ticketTier}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Metode Pembayaran</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedOrder.paymentMethod}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F2F4F7' }}>
                  <span style={{ color: '#717680' }}>Jumlah Tiket (Qty)</span>
                  <span style={{ fontWeight: '600', color: '#181D27' }}>{selectedOrder.qty} Tiket</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', fontSize: '15px', fontWeight: '700' }}>
                  <span style={{ color: '#181D27' }}>Total Pembayaran</span>
                  <span style={{ color: '#FF7A00' }}>{selectedOrder.total}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '10px',
                backgroundColor: '#FAFAFA'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
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
                Tutup
              </button>
              {selectedOrder.status === 'Lunas' && (
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Kwitansi order ${selectedOrder.id} berhasil diunduh!`, 'success');
                  }}
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
                  Unduh Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Order Form Modal */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 24, 40, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#181D27' }}>
                Buat Pesanan Baru
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#717680' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#414651', display: 'block', marginBottom: '6px' }}>
                  Nama Lengkap Pembeli *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dani Setiawan"
                  value={newOrderForm.buyerName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, buyerName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5D7DA',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#414651', display: 'block', marginBottom: '6px' }}>
                  Email Pembeli *
                </label>
                <input
                  type="email"
                  required
                  placeholder="dani@mail.com"
                  value={newOrderForm.buyerEmail}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, buyerEmail: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5D7DA',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#414651', display: 'block', marginBottom: '6px' }}>
                  Pilih Event
                </label>
                <select
                  value={newOrderForm.event}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, event: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5D7DA',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Jakarta Tech Summit 2026">Jakarta Tech Summit 2026</option>
                  <option value="AI Builders Bootcamp">AI Builders Bootcamp</option>
                  <option value="Product Craft Meetup #14">Product Craft Meetup #14</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#414651', display: 'block', marginBottom: '6px' }}>
                    Tier Tiket
                  </label>
                  <select
                    value={newOrderForm.ticketTier}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, ticketTier: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D5D7DA',
                      fontSize: '14px',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <option value="Regular Pass (1x)">Regular Pass (1x)</option>
                    <option value="VIP Front Row (1x)">VIP Front Row (1x)</option>
                    <option value="Early Bird Pass (1x)">Early Bird Pass (1x)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#414651', display: 'block', marginBottom: '6px' }}>
                    Metode Pembayaran
                  </label>
                  <select
                    value={newOrderForm.paymentMethod}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D5D7DA',
                      fontSize: '14px',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <option value="BCA Virtual Account">BCA Virtual Account</option>
                    <option value="QRIS / GoPay">QRIS / GoPay</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Mandiri Bill Payment">Mandiri Bill Payment</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    border: '1px solid #D5D7DA',
                    backgroundColor: '#FFFFFF',
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
                    border: 'none',
                    backgroundColor: '#FF7A00',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Simpan & Buat Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
