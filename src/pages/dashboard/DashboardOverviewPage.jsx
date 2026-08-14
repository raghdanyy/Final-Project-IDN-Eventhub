import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Plus } from 'lucide-react';

export const DashboardOverviewPage = () => {
  const navigate = useNavigate();
  const { salesChartData, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [chartTimeframe, setChartTimeframe] = useState('weekly'); // 'weekly' | 'monthly' | 'yearly'
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [selectedBarItem, setSelectedBarItem] = useState(null);

  // Timeframe chart options
  const activeChart = salesChartData?.[chartTimeframe] || {
    title: 'Penjualan tiket 7 hari terakhir',
    subtitle: '7 hari terakhir',
    totalTickets: 412,
    items: [
      { label: 'Sen', tickets: 32, height: '28%' },
      { label: 'Sel', tickets: 58, height: '52%' },
      { label: 'Rab', tickets: 46, height: '42%' },
      { label: 'Kam', tickets: 74, height: '70%' },
      { label: 'Jum', tickets: 110, height: '94%' },
      { label: 'Sab', tickets: 92, height: '80%' },
      { label: 'Min', tickets: 62, height: '56%' }
    ]
  };

  // Recent Orders Data (matching Figma screenshot)
  const recentOrders = [
    {
      id: 'ORD-24081',
      name: 'Maya Rahmadani',
      ticketCount: 2,
      amount: 'Rp 1.500.000',
      status: 'Lunas',
      statusType: 'success'
    },
    {
      id: 'ORD-24080',
      name: 'Budi Santoso',
      ticketCount: 1,
      amount: 'Rp 300.000',
      status: 'Menunggu',
      statusType: 'warning'
    },
    {
      id: 'ORD-24079',
      name: 'Clara Wijaya',
      ticketCount: 4,
      amount: 'Rp 3.000.000',
      status: 'Lunas',
      statusType: 'success'
    },
    {
      id: 'ORD-24078',
      name: 'Dimas Prakoso',
      ticketCount: 1,
      amount: 'Rp 150.000',
      status: 'Refund',
      statusType: 'danger'
    },
    {
      id: 'ORD-24077',
      name: 'Ella Kurnia',
      ticketCount: 1,
      amount: 'Rp 1.850.000',
      status: 'Lunas',
      statusType: 'success'
    }
  ];

  // Upcoming Events Data (matching Figma screenshot)
  const upcomingEvents = [
    {
      id: 'evt-1',
      title: 'Jakarta Tech Summit 2026',
      venue: 'Balai Kartini · Jakarta',
      date: '12 Sep 2026',
      status: 'Published',
      statusType: 'info',
      soldPercent: 73,
      revenue: 'Rp 612.300.000'
    },
    {
      id: 'evt-2',
      title: 'Product Craft Meetup #14',
      venue: 'GoWork Pacific Place · Jakarta',
      date: '10 Agu 2026',
      status: 'Berlangsung',
      statusType: 'success',
      soldPercent: 98,
      revenue: 'Rp 26.400.000'
    },
    {
      id: 'evt-3',
      title: 'Bandung Design Week',
      venue: 'Trans Convention · Bandung',
      date: '3 Okt 2026',
      status: 'Draft',
      statusType: 'neutral',
      soldPercent: 0,
      revenue: 'Rp 0'
    },
    {
      id: 'evt-4',
      title: 'Startup Funding Clinic',
      venue: 'Menara BCA · Jakarta',
      date: '21 Jun 2026',
      status: 'Selesai',
      statusType: 'neutral',
      soldPercent: 96,
      revenue: 'Rp 86.400.000'
    }
  ];

  // Helper for Badge Styles
  const getBadgeStyle = (type) => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#ECFDF3', color: '#079455' };
      case 'warning':
        return { backgroundColor: '#FFF8E6', color: '#DC6903' };
      case 'danger':
        return { backgroundColor: '#FEF3F2', color: '#D92D21' };
      case 'info':
        return { backgroundColor: '#EFF8FF', color: '#006BFF' };
      case 'neutral':
      default:
        return { backgroundColor: '#F2F4F7', color: '#475467' };
    }
  };

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
            Overview
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Ringkasan performa event dan aktivitas terkini
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

      {/* 2. Four Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Card 1: Total Pendapatan */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Total pendapatan
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            Rp 854.400.000
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
              +12,4%
            </span>
            <span style={{ color: '#717680' }}>30 hari terakhir</span>
          </div>
        </div>

        {/* Card 2: Tiket Terjual */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Tiket terjual
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            1.769
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
              +8,1%
            </span>
            <span style={{ color: '#717680' }}>semua event</span>
          </div>
        </div>

        {/* Card 3: Event Aktif */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Event aktif
          </div>
          <div
            style={{
              fontSize: '22px',
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
            5 total event
          </div>
        </div>

        {/* Card 4: Saldo Payout */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Saldo payout
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#181D27',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            Rp 48.250.000
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            cair 12 Agu 2026
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Sales Bar Chart (Left) + Recent Orders (Right) */}
      <div
        className="dashboard-middle-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)',
          gap: '16px'
        }}
      >
        {/* Left: Penjualan Tiket with Timeframe Toggle (Weekly, Monthly, Yearly) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Card Header with Timeframe Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#181D27', display: 'block' }}>
                Penjualan tiket
              </span>
              <span style={{ fontSize: '12px', color: '#717680' }}>
                {activeChart.subtitle || '7 hari terakhir'} · Total {activeChart.totalTickets.toLocaleString('id-ID')} tiket
              </span>
            </div>

            {/* Timeframe Toggle Pills */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8F9FA', padding: '3px', borderRadius: '8px', border: '1px solid #E9EAEB' }}>
              {[
                { id: 'weekly', label: '7 Hari' },
                { id: 'monthly', label: 'Bulanan' },
                { id: 'yearly', label: 'Tahunan' }
              ].map((tab) => {
                const isActive = chartTimeframe === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setChartTimeframe(tab.id);
                      showToast(`Menampilkan tren penjualan: ${tab.label}`, 'info');
                    }}
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? '#FFFFFF' : '#717680',
                      backgroundColor: isActive ? '#FF7A00' : 'transparent',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bar Chart Bars with Floating Interactive Tooltip */}
          <div
            style={{
              height: '180px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: chartTimeframe === 'monthly' ? '4px' : '10px',
              padding: '0 2px 12px',
              borderBottom: '1px solid #F2F4F7',
              position: 'relative'
            }}
          >
            {activeChart.items.map((item, idx) => {
              const isHovered = hoveredBarIndex === idx;
              const isSelected = selectedBarItem?.label === item.label;
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    position: 'relative'
                  }}
                  onMouseEnter={() => {
                    setHoveredBarIndex(idx);
                    setSelectedBarItem(item);
                  }}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  onClick={() => {
                    setSelectedBarItem(item);
                    showToast(`${item.fullDate || item.fullPeriod}: ${item.tickets} tiket terjual (${item.revenue})`, 'info');
                  }}
                >
                  {/* Floating Apple-Style Tooltip on Hover */}
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 10px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#181D27',
                        color: '#FFFFFF',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        lineHeight: 1.4,
                        whiteSpace: 'nowrap',
                        zIndex: 100,
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                        pointerEvents: 'none',
                        animation: 'appleScaleUp 0.15s ease-out'
                      }}
                    >
                      <div style={{ fontWeight: '700', color: '#FFFFFF' }}>
                        {item.fullDate || item.fullPeriod || item.label}
                      </div>
                      <div style={{ color: '#FF7A00', fontWeight: '700', marginTop: '2px' }}>
                        {item.tickets} tiket · {item.revenue}
                      </div>
                      {item.topEvent && (
                        <div style={{ color: '#D5D7DA', fontSize: '10px', marginTop: '2px' }}>
                          Top: {item.topEvent}
                        </div>
                      )}
                      {item.conversionRate && (
                        <div style={{ color: '#079455', fontSize: '10px', fontWeight: '600' }}>
                          Konversi: {item.conversionRate}
                        </div>
                      )}
                      {item.growth && (
                        <div style={{ color: '#006BFF', fontSize: '10px', fontWeight: '600' }}>
                          Pertumbuhan: {item.growth}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vertical Bar */}
                  <div
                    style={{
                      width: '100%',
                      maxWidth: chartTimeframe === 'monthly' ? '28px' : '64px',
                      height: item.height,
                      backgroundColor: isSelected || isHovered ? '#D16400' : '#FF7A00',
                      borderRadius: '5px 5px 0 0',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                      boxShadow: isSelected || isHovered ? '0 0 10px rgba(255, 122, 0, 0.4)' : 'none'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Labels */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 2px 0',
              fontSize: chartTimeframe === 'monthly' ? '10px' : '11px',
              color: '#717680'
            }}
          >
            {activeChart.items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedBarItem(item);
                  showToast(`${item.fullDate || item.fullPeriod}: ${item.tickets} tiket terjual (${item.revenue})`, 'info');
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: selectedBarItem?.label === item.label ? '700' : '500',
                  color: selectedBarItem?.label === item.label ? '#FF7A00' : '#717680',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Granular Detail Info Strip */}
          <div
            style={{
              marginTop: '12px',
              padding: '10px 14px',
              backgroundColor: '#FFF4ED',
              border: '1px solid #FFE2CA',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '6px',
              fontSize: '12px'
            }}
          >
            {selectedBarItem ? (
              <>
                <div>
                  <span style={{ fontWeight: '700', color: '#181D27' }}>
                    {selectedBarItem.fullDate || selectedBarItem.fullPeriod}:
                  </span>{' '}
                  <span style={{ color: '#FF7A00', fontWeight: '700' }}>
                    {selectedBarItem.tickets} tiket
                  </span>{' '}
                  · <span style={{ color: '#181D27', fontWeight: '600' }}>{selectedBarItem.revenue}</span>
                  {selectedBarItem.topEvent && (
                    <span style={{ color: '#717680' }}> · Top: {selectedBarItem.topEvent}</span>
                  )}
                </div>
                {selectedBarItem.conversionRate && (
                  <span style={{ color: '#079455', fontWeight: '600', fontSize: '11px' }}>
                    Konversi {selectedBarItem.conversionRate}
                  </span>
                )}
                {selectedBarItem.growth && (
                  <span style={{ color: '#006BFF', fontWeight: '600', fontSize: '11px' }}>
                    Growth {selectedBarItem.growth}
                  </span>
                )}
              </>
            ) : (
              <div style={{ color: '#717680', fontSize: '11px' }}>
                💡 <strong>Tips:</strong> Klik atau sorot salah satu batang grafik untuk melihat rincian omzet, tiket, dan top event per tanggal/periode.
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Terbaru */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Card Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>
              Order terbaru
            </span>
            <button
              type="button"
              onClick={() => navigate('/orders')}
              style={{
                fontSize: '12px',
                color: '#006BFF',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Lihat semua
            </button>
          </div>

          {/* Order List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recentOrders.map((ord) => {
              const badgeStyle = getBadgeStyle(ord.statusType);
              return (
                <div
                  key={ord.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ord.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                      {ord.id} · {ord.ticketCount} tiket
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {ord.amount}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        display: 'inline-block',
                        marginTop: '2px',
                        ...badgeStyle
                      }}
                    >
                      {ord.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Upcoming Events Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EAEB',
          borderRadius: '12px',
          padding: '20px 24px'
        }}
      >
        {/* Table Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#181D27' }}>
            Upcoming events
          </span>
          <button
            type="button"
            onClick={() => navigate('/events')}
            style={{
              fontSize: '12px',
              color: '#006BFF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Lihat semua
          </button>
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680', whiteSpace: 'nowrap' }}>
                  Event
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', whiteSpace: 'nowrap' }}>
                  Tanggal
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', whiteSpace: 'nowrap' }}>
                  Status
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', whiteSpace: 'nowrap' }}>
                  Kapasitas
                </th>
                <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  Pendapatan
                </th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((evt) => {
                const badgeStyle = getBadgeStyle(evt.statusType);
                return (
                  <tr
                    key={evt.id}
                    style={{
                      borderBottom: '1px solid #F8F9FA',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onClick={() => navigate(`/events/${evt.id}`)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Event Column */}
                    <td style={{ padding: '14px 12px 14px 0', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                        {evt.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                        {evt.venue}
                      </div>
                    </td>

                    {/* Tanggal Column */}
                    <td style={{ padding: '14px 12px', fontSize: '12px', color: '#181D27', whiteSpace: 'nowrap' }}>
                      {evt.date}
                    </td>

                    {/* Status Column */}
                    <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          display: 'inline-block',
                          ...badgeStyle
                        }}
                      >
                        {evt.status}
                      </span>
                    </td>

                    {/* Kapasitas Column */}
                    <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
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
                              width: `${evt.soldPercent}%`,
                              height: '100%',
                              backgroundColor: '#006BFF',
                              borderRadius: '9999px'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '11px', color: '#717680', minWidth: '26px' }}>
                          {evt.soldPercent}%
                        </span>
                      </div>
                    </td>

                    {/* Pendapatan Column */}
                    <td style={{ padding: '14px 0 14px 12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#181D27', whiteSpace: 'nowrap' }}>
                      {evt.revenue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
