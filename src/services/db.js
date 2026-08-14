/**
 * EventHub Persistent Client Database Service
 * Provides localStorage backed persistence for all tables:
 * - events
 * - ticketTypes
 * - promoCodes
 * - orders
 * - attendees
 * - teamMembers
 * - notifications
 * - organization
 * - salesChart (weekly, monthly, yearly with rich per-day/per-month/per-year details)
 */

import {
  initialEvents,
  initialTicketTypes,
  initialPromoCodes,
  initialOrders,
  initialAttendees,
  initialTeamMembers,
  initialNotifications,
  initialOrganizations
} from '../data/mockData';

const STORAGE_KEYS = {
  EVENTS: 'eventhub_db_events',
  TICKETS: 'eventhub_db_tickets',
  PROMOS: 'eventhub_db_promos',
  ORDERS: 'eventhub_db_orders',
  ATTENDEES: 'eventhub_db_attendees',
  TEAM: 'eventhub_db_team',
  NOTIFICATIONS: 'eventhub_db_notifications',
  ORG: 'eventhub_db_org',
  SALES_CHART: 'eventhub_db_sales_chart'
};

const defaultSalesChart = {
  weekly: {
    title: 'Penjualan tiket 7 hari terakhir',
    subtitle: '7 hari terakhir',
    totalTickets: 412,
    totalRevenue: 'Rp 148.500.000',
    items: [
      {
        label: 'Sen',
        dayName: 'Senin',
        fullDate: 'Senin, 10 Agu 2026',
        tickets: 32,
        revenue: 'Rp 12.800.000',
        topEvent: 'Jakarta Tech Summit 2026',
        conversionRate: '3,8%',
        height: '28%'
      },
      {
        label: 'Sel',
        dayName: 'Selasa',
        fullDate: 'Selasa, 11 Agu 2026',
        tickets: 58,
        revenue: 'Rp 21.400.000',
        topEvent: 'Product Craft Meetup #14',
        conversionRate: '4,5%',
        height: '52%'
      },
      {
        label: 'Rab',
        dayName: 'Rabu',
        fullDate: 'Rabu, 12 Agu 2026',
        tickets: 46,
        revenue: 'Rp 17.200.000',
        topEvent: 'Jakarta Tech Summit 2026',
        conversionRate: '4,1%',
        height: '42%'
      },
      {
        label: 'Kam',
        dayName: 'Kamis',
        fullDate: 'Kamis, 13 Agu 2026',
        tickets: 74,
        revenue: 'Rp 28.600.000',
        topEvent: 'Bandung Design Week',
        conversionRate: '5,2%',
        height: '70%'
      },
      {
        label: 'Jum',
        dayName: 'Jumat',
        fullDate: 'Jumat, 14 Agu 2026',
        tickets: 110,
        revenue: 'Rp 41.500.000',
        topEvent: 'Jakarta Tech Summit 2026',
        conversionRate: '6,4%',
        height: '94%'
      },
      {
        label: 'Sab',
        dayName: 'Sabtu',
        fullDate: 'Sabtu, 15 Agu 2026',
        tickets: 92,
        revenue: 'Rp 34.200.000',
        topEvent: 'Product Craft Meetup #14',
        conversionRate: '5,8%',
        height: '80%'
      },
      {
        label: 'Min',
        dayName: 'Minggu',
        fullDate: 'Minggu, 16 Agu 2026',
        tickets: 62,
        revenue: 'Rp 22.800.000',
        topEvent: 'Startup Funding Clinic',
        conversionRate: '4,6%',
        height: '56%'
      }
    ]
  },
  monthly: {
    title: 'Penjualan tiket 12 bulan terakhir (2026)',
    subtitle: '12 bulan terakhir',
    totalTickets: 1769,
    totalRevenue: 'Rp 854.400.000',
    items: [
      {
        label: 'Jan',
        fullPeriod: 'Januari 2026',
        tickets: 85,
        revenue: 'Rp 38.250.000',
        topEvent: 'Startup Funding Clinic',
        conversionRate: '3,6%',
        height: '28%'
      },
      {
        label: 'Feb',
        fullPeriod: 'Februari 2026',
        tickets: 120,
        revenue: 'Rp 56.400.000',
        topEvent: 'AI Builders Bootcamp',
        conversionRate: '4,1%',
        height: '40%'
      },
      {
        label: 'Mar',
        fullPeriod: 'Maret 2026',
        tickets: 140,
        revenue: 'Rp 67.200.000',
        topEvent: 'Jakarta Tech Summit 2026',
        conversionRate: '4,4%',
        height: '46%'
      },
      {
        label: 'Apr',
        fullPeriod: 'April 2026',
        tickets: 110,
        revenue: 'Rp 52.800.000',
        topEvent: 'Product Craft Meetup #14',
        conversionRate: '3,9%',
        height: '36%'
      },
      {
        label: 'Mei',
        fullPeriod: 'Mei 2026',
        tickets: 160,
        revenue: 'Rp 78.400.000',
        topEvent: 'Bandung Design Week',
        conversionRate: '4,8%',
        height: '52%'
      },
      {
        label: 'Jun',
        fullPeriod: 'Juni 2026',
        tickets: 210,
        revenue: 'Rp 102.500.000',
        topEvent: 'Startup Funding Clinic',
        conversionRate: '5,3%',
        height: '68%'
      },
      {
        label: 'Jul',
        fullPeriod: 'Juli 2026',
        tickets: 290,
        revenue: 'Rp 142.800.000',
        topEvent: 'Jakarta Tech Summit 2026',
        conversionRate: '6,1%',
        height: '92%'
      },
      {
        label: 'Agu',
        fullPeriod: 'Agustus 2026',
        tickets: 310,
        revenue: 'Rp 154.200.000',
        topEvent: 'Jakarta Tech Summit 2026',
        conversionRate: '6,7%',
        height: '100%'
      },
      {
        label: 'Sep',
        fullPeriod: 'September 2026',
        tickets: 190,
        revenue: 'Rp 91.600.000',
        topEvent: 'Bandung Design Week',
        conversionRate: '5,0%',
        height: '62%'
      },
      {
        label: 'Okt',
        fullPeriod: 'Oktober 2026',
        tickets: 120,
        revenue: 'Rp 58.400.000',
        topEvent: 'Product Craft Meetup #14',
        conversionRate: '4,2%',
        height: '40%'
      },
      {
        label: 'Nov',
        fullPeriod: 'November 2026',
        tickets: 80,
        revenue: 'Rp 36.800.000',
        topEvent: 'AI Builders Bootcamp',
        conversionRate: '3,5%',
        height: '26%'
      },
      {
        label: 'Des',
        fullPeriod: 'Desember 2026',
        tickets: 54,
        revenue: 'Rp 24.650.000',
        topEvent: 'Startup Year-End Gala',
        conversionRate: '3,2%',
        height: '18%'
      }
    ]
  },
  yearly: {
    title: 'Tren penjualan tiket tahunan (5 Tahun)',
    subtitle: '5 tahun terakhir',
    totalTickets: 4890,
    totalRevenue: 'Rp 2.450.000.000',
    items: [
      {
        label: '2022',
        fullPeriod: 'Tahun 2022',
        tickets: 450,
        revenue: 'Rp 210.000.000',
        topEvent: 'Jakarta Tech Meetup 2022',
        growth: 'Baseline',
        height: '26%'
      },
      {
        label: '2023',
        fullPeriod: 'Tahun 2023',
        tickets: 780,
        revenue: 'Rp 380.000.000',
        topEvent: 'Product Summit 2023',
        growth: '+73,3%',
        height: '45%'
      },
      {
        label: '2024',
        fullPeriod: 'Tahun 2024',
        tickets: 1120,
        revenue: 'Rp 540.000.000',
        topEvent: 'Tech Founders Fest 2024',
        growth: '+43,6%',
        height: '64%'
      },
      {
        label: '2025',
        fullPeriod: 'Tahun 2025',
        tickets: 1650,
        revenue: 'Rp 810.000.000',
        topEvent: 'Jakarta Tech Summit 2025',
        growth: '+47,3%',
        height: '94%'
      },
      {
        label: '2026',
        fullPeriod: 'Tahun 2026 (YTD)',
        tickets: 1769,
        revenue: 'Rp 854.400.000',
        topEvent: 'Jakarta Tech Summit 2026',
        growth: '+7,2% (YTD)',
        height: '100%'
      }
    ]
  }
};

// Initial state loader with safe fallback
const loadTable = (key, defaultData) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure schema compatibility for sales chart
      if (key === STORAGE_KEYS.SALES_CHART && (!parsed.weekly?.items?.[0]?.revenue || !parsed.monthly?.items?.[0]?.revenue)) {
        localStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
      }
      return parsed;
    }
  } catch (err) {
    console.warn(`[EventHub DB] Failed to load table ${key}:`, err);
  }
  // If not found, save default
  try {
    localStorage.setItem(key, JSON.stringify(defaultData));
  } catch (err) {
    console.warn(`[EventHub DB] Failed to save default table ${key}:`, err);
  }
  return defaultData;
};

const saveTable = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`[EventHub DB] Failed to persist table ${key}:`, err);
  }
};

export const db = {
  // Events
  getEvents: () => loadTable(STORAGE_KEYS.EVENTS, initialEvents),
  saveEvents: (data) => saveTable(STORAGE_KEYS.EVENTS, data),
  getEventById: (id) => {
    const events = loadTable(STORAGE_KEYS.EVENTS, initialEvents);
    return events.find((e) => e.id === id || String(e.id) === String(id)) || null;
  },
  createEvent: (eventData) => {
    const events = loadTable(STORAGE_KEYS.EVENTS, initialEvents);
    const newEvent = {
      id: `evt-${Date.now()}`,
      slug: (eventData.title || 'event').toLowerCase().replace(/\s+/g, '-'),
      status: eventData.status || 'Published',
      statusType: eventData.statusType || 'info',
      tickets_sold: 0,
      soldPercent: 0,
      soldCount: 0,
      capacity: Number(eventData.capacity) || 500,
      revenue: 'Rp 0',
      created_at: new Date().toISOString(),
      ...eventData
    };
    const updated = [newEvent, ...events];
    saveTable(STORAGE_KEYS.EVENTS, updated);
    return newEvent;
  },
  updateEvent: (id, updateData) => {
    const events = loadTable(STORAGE_KEYS.EVENTS, initialEvents);
    const updated = events.map((e) => (e.id === id || String(e.id) === String(id) ? { ...e, ...updateData } : e));
    saveTable(STORAGE_KEYS.EVENTS, updated);
    return updated.find((e) => e.id === id || String(e.id) === String(id));
  },
  deleteEvent: (id) => {
    const events = loadTable(STORAGE_KEYS.EVENTS, initialEvents);
    const updated = events.filter((e) => e.id !== id && String(e.id) !== String(id));
    saveTable(STORAGE_KEYS.EVENTS, updated);
    return true;
  },

  // Tickets
  getTickets: () => loadTable(STORAGE_KEYS.TICKETS, initialTicketTypes),
  saveTickets: (data) => saveTable(STORAGE_KEYS.TICKETS, data),

  // Promos
  getPromos: () => loadTable(STORAGE_KEYS.PROMOS, initialPromoCodes),
  savePromos: (data) => saveTable(STORAGE_KEYS.PROMOS, data),

  // Orders
  getOrders: () => loadTable(STORAGE_KEYS.ORDERS, initialOrders),
  saveOrders: (data) => saveTable(STORAGE_KEYS.ORDERS, data),

  // Attendees
  getAttendees: () => loadTable(STORAGE_KEYS.ATTENDEES, initialAttendees),
  saveAttendees: (data) => saveTable(STORAGE_KEYS.ATTENDEES, data),

  // Team
  getTeam: () => loadTable(STORAGE_KEYS.TEAM, initialTeamMembers),
  saveTeam: (data) => saveTable(STORAGE_KEYS.TEAM, data),

  // Notifications
  getNotifications: () => loadTable(STORAGE_KEYS.NOTIFICATIONS, initialNotifications),
  saveNotifications: (data) => saveTable(STORAGE_KEYS.NOTIFICATIONS, data),

  // Organization Settings
  getOrganization: () =>
    loadTable(STORAGE_KEYS.ORG, {
      name: 'Nusantara Event Co.',
      category: 'Tech Conference',
      contactEmail: 'halo@nusantaraevent.id',
      storefrontDomain: 'nusantaraevent.eventhub.io',
      plan: 'Pro',
      price: 'Rp1.499.000 / bulan'
    }),
  saveOrganization: (data) => saveTable(STORAGE_KEYS.ORG, data),

  // Sales Chart Data (Weekly, Monthly, Yearly with rich details)
  getSalesChartData: () => loadTable(STORAGE_KEYS.SALES_CHART, defaultSalesChart),
  saveSalesChartData: (data) => saveTable(STORAGE_KEYS.SALES_CHART, data),

  // Reset to initial seed
  resetDatabase: () => {
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.TICKETS);
    localStorage.removeItem(STORAGE_KEYS.PROMOS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.ATTENDEES);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ORG);
    localStorage.removeItem(STORAGE_KEYS.SALES_CHART);
  }
};
