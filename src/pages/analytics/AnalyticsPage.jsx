import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearchInput } from '../../components/common/GlobalSearchInput';
import { Plus } from 'lucide-react';

export const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { salesChartData, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBarIdx, setHoveredBarIdx] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null);

  // Weekly sales trend data matching Figma screenshot with brand orange
  const weeklySales = [
    { day: 'Sen', percent: '28%', tickets: 32 },
    { day: 'Sel', percent: '52%', tickets: 58 },
    { day: 'Rab', percent: '44%', tickets: 46 },
    { day: 'Kam', percent: '70%', tickets: 74 },
    { day: 'Jum', percent: '95%', tickets: 110 },
    { day: 'Sab', percent: '82%', tickets: 92 },
    { day: 'Min', percent: '56%', tickets: 62 }
  ];

  // Funnel steps data matching Figma screenshot
  const funnelSteps = [
    { label: 'Kunjungan halaman event', count: '18.420', percent: 100 },
    { label: 'Mulai checkout', count: '4.210', percent: 23 },
    { label: 'Pembayaran dibuat', count: '2.180', percent: 12 },
    { label: 'Order lunas', count: '1.769', percent: 10 }
  ];

  // Top revenue events matching Figma screenshot
  const topEvents = [
    { title: 'Jakarta Tech Summit 2026', revenue: 'Rp 612.300.000', barPercent: 100 },
    { title: 'AI Builders Bootcamp', revenue: 'Rp 129.300.000', barPercent: 21 },
    { title: 'Startup Funding Clinic', revenue: 'Rp 86.400.000', barPercent: 14 },
    { title: 'Product Craft Meetup #14', revenue: 'Rp 26.400.000', barPercent: 4.5 }
  ];

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
            Analytics
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Ringkasan performa penjualan 30 hari terakhir
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Universal Global Search Box */}
          <GlobalSearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

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
        {/* Card 1: Pendapatan Kotor */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Pendapatan kotor
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
          </div>
        </div>

        {/* Card 3: Rata-rata Nilai Order */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Rata-rata nilai order
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
            Rp 482.985
          </div>
        </div>

        {/* Card 4: Konversi Checkout */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#717680', fontWeight: '500' }}>
            Konversi checkout
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
            42,0%
          </div>
          <div style={{ fontSize: '12px', color: '#717680' }}>
            checkout → lunas
          </div>
        </div>
      </div>

      {/* 3. Row 2: Funnel Penjualan (Left) + Tren Penjualan Mingguan (Right) */}
      <div
        className="analytics-middle-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: '16px',
          alignItems: 'stretch'
        }}
      >
        {/* Left: Funnel Penjualan Card (Blue Progress Bars as requested) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
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
            Funnel penjualan
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {funnelSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#414651', fontWeight: '500' }}>{step.label}</span>
                  <span style={{ fontWeight: '700', color: '#181D27' }}>
                    {step.count} <span style={{ color: '#717680', fontWeight: '500' }}>({step.percent}%)</span>
                  </span>
                </div>
                <div
                  style={{
                    height: '6px',
                    backgroundColor: '#E0EAFF',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${step.percent}%`,
                      height: '100%',
                      backgroundColor: '#006BFF',
                      borderRadius: '9999px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tren Penjualan Mingguan Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E9EAEB',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
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
            Tren penjualan mingguan
          </h2>

          {/* Bar Chart Container */}
          <div
            style={{
              height: '140px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '10px',
              padding: '0 4px 10px',
              borderBottom: '1px solid #F2F4F7',
              position: 'relative'
            }}
          >
            {(salesChartData?.weekly?.items || weeklySales).map((item, idx) => {
              const isHovered = hoveredBarIdx === idx;
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
                    setHoveredBarIdx(idx);
                    setSelectedBar(item);
                  }}
                  onMouseLeave={() => setHoveredBarIdx(null)}
                  onClick={() => {
                    setSelectedBar(item);
                    showToast(`${item.fullDate || item.day}: ${item.tickets} tiket terjual (${item.revenue || 'Rp 12.800.000'})`, 'info');
                  }}
                >
                  {/* Floating Tooltip */}
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 8px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#181D27',
                        color: '#FFFFFF',
                        padding: '6px 10px',
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
                      <div style={{ fontWeight: '700' }}>{item.fullDate || item.day}</div>
                      <div style={{ color: '#FF7A00', fontWeight: '700' }}>
                        {item.tickets} tiket · {item.revenue || 'Rp 12.800.000'}
                      </div>
                      {item.topEvent && (
                        <div style={{ color: '#D5D7DA', fontSize: '10px' }}>Top: {item.topEvent}</div>
                      )}
                    </div>
                  )}

                  <div
                    style={{
                      width: '100%',
                      maxWidth: '48px',
                      height: item.height || item.percent,
                      backgroundColor: isHovered || selectedBar?.label === item.label ? '#D16400' : '#FF7A00',
                      borderRadius: '6px 6px 0 0',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Day Labels */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 4px 0',
              fontSize: '12px',
              color: '#717680'
            }}
          >
            {(salesChartData?.weekly?.items || weeklySales).map((item, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: selectedBar?.label === item.label ? '700' : '500',
                  color: selectedBar?.label === item.label ? '#FF7A00' : '#717680',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedBar(item);
                  showToast(`${item.fullDate || item.day}: ${item.tickets} tiket terjual`, 'info');
                }}
              >
                {item.label || item.day}
              </div>
            ))}
          </div>

          {/* Granular Detail Info */}
          {selectedBar && (
            <div
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#FFF4ED',
                border: '1px solid #FFE2CA',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#181D27',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '4px'
              }}
            >
              <span>
                <strong>{selectedBar.fullDate || selectedBar.day}:</strong> {selectedBar.tickets} tiket · {selectedBar.revenue || 'Rp 12.800.000'}
              </span>
              {selectedBar.topEvent && (
                <span style={{ color: '#717680' }}>Top: {selectedBar.topEvent}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. Row 3: Event dengan Pendapatan Tertinggi (Blue Progress Bars as requested) */}
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
          Event dengan pendapatan tertinggi
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {topEvents.map((evt, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                  {evt.title}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                  {evt.revenue}
                </span>
              </div>
              <div
                style={{
                  height: '6px',
                  backgroundColor: '#E0EAFF',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${evt.barPercent}%`,
                    height: '100%',
                    backgroundColor: '#006BFF',
                    borderRadius: '9999px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
