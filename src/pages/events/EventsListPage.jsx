import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearchInput } from '../../components/common/GlobalSearchInput';
import { Plus } from 'lucide-react';

export const EventsListPage = () => {
  const navigate = useNavigate();
  const { events, setSelectedEventId } = useApp();

  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['Semua', 'Published', 'Draft', 'Berlangsung', 'Selesai'];

  // Filter events based on tab and search
  const filteredEvents = events.filter((evt) => {
    const eventStatus = evt.status || 'Draft';
    const matchesFilter =
      activeFilter === 'Semua' || eventStatus.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      (evt.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.venue || evt.venue_name || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBadgeStyle = (status, type) => {
    const s = (status || '').toLowerCase();
    if (s === 'berlangsung' || type === 'success') {
      return { backgroundColor: '#ECFDF3', color: '#079455' };
    }
    if (s === 'published' || type === 'info') {
      return { backgroundColor: '#EFF8FF', color: '#006BFF' };
    }
    return { backgroundColor: '#F2F4F7', color: '#475467' };
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
            My Events
          </h1>
          <p style={{ fontSize: '13px', color: '#717680', marginTop: '2px' }}>
            Semua event milik organisasi Anda
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

      {/* 2. Filter Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
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

      {/* 3. Main Events Table Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EAEB',
          borderRadius: '12px',
          padding: '20px 24px'
        }}
      >
        {/* Table Count Header */}
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#181D27', marginBottom: '16px' }}>
          {filteredEvents.length} event
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F4F7' }}>
                <th style={{ padding: '10px 12px 10px 0', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Event
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Tanggal
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Status
                </th>
                <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680' }}>
                  Kapasitas
                </th>
                <th style={{ padding: '10px 0 10px 12px', fontSize: '11px', fontWeight: '500', color: '#717680', textAlign: 'right' }}>
                  Pendapatan
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => {
                const badgeStyle = getBadgeStyle(evt.status, evt.statusType);
                const venueText = evt.venue || evt.venue_name || 'Lokasi TBA';
                const dateText = evt.date || evt.start_date || 'TBA';
                const percent = evt.soldPercent !== undefined ? evt.soldPercent : Math.round(((evt.tickets_sold || 0) / (evt.capacity || 100)) * 100);
                const soldCount = evt.soldCount !== undefined ? evt.soldCount : (evt.tickets_sold || 0);
                const capacity = evt.capacity || 500;
                const revenue = evt.revenue || (evt.total_gmv ? `Rp ${new Intl.NumberFormat('id-ID').format(evt.total_gmv)}` : 'Rp 0');

                return (
                  <tr
                    key={evt.id}
                    style={{
                      borderBottom: '1px solid #F8F9FA',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onClick={() => {
                      setSelectedEventId(evt.id);
                      navigate(`/events/${evt.id}`);
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Event Column */}
                    <td style={{ padding: '16px 12px 16px 0' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                        {evt.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#717680', marginTop: '2px' }}>
                        {venueText}
                      </div>
                    </td>

                    {/* Tanggal Column */}
                    <td style={{ padding: '16px 12px', fontSize: '12px', color: '#181D27' }}>
                      {dateText}
                    </td>

                    {/* Status Column */}
                    <td style={{ padding: '16px 12px' }}>
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
                        {evt.status || 'Published'}
                      </span>
                    </td>

                    {/* Kapasitas Column */}
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
                                width: `${percent}%`,
                                height: '100%',
                                backgroundColor: percent > 0 ? '#006BFF' : 'transparent',
                                borderRadius: '9999px'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '11px', color: '#717680', minWidth: '26px' }}>
                            {percent}%
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#717680' }}>
                          {soldCount} / {capacity} tiket
                        </div>
                      </div>
                    </td>

                    {/* Pendapatan Column */}
                    <td style={{ padding: '16px 0 16px 12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#181D27' }}>
                      {revenue}
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
