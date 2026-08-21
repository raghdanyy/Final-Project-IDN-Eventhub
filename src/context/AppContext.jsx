import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/db';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Database-backed State
  const [events, setEvents] = useState(() => db.getEvents());
  const [ticketTypes, setTicketTypes] = useState(() => db.getTickets());
  const [promoCodes, setPromoCodes] = useState(() => db.getPromos());
  const [orders, setOrders] = useState(() => db.getOrders());
  const [attendees, setAttendees] = useState(() => db.getAttendees());
  const [teamMembers, setTeamMembers] = useState(() => db.getTeam());
  const [notifications, setNotifications] = useState(() => db.getNotifications());
  const [organization, setOrganization] = useState(() => db.getOrganization());
  const [salesChartData, setSalesChartData] = useState(() => db.getSalesChartData());

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('eventhub_auth') === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('eventhub_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('eventhub_auth', 'false');
  };

  const [selectedEventId, setSelectedEventId] = useState(() => {
    const evts = db.getEvents();
    return evts.length > 0 ? evts[0].id : 'evt-1';
  });

  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  // 2. Global Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync to database on state changes
  useEffect(() => {
    db.saveEvents(events);
  }, [events]);

  useEffect(() => {
    db.saveTickets(ticketTypes);
  }, [ticketTypes]);

  useEffect(() => {
    db.savePromos(promoCodes);
  }, [promoCodes]);

  useEffect(() => {
    db.saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    db.saveAttendees(attendees);
  }, [attendees]);

  useEffect(() => {
    db.saveTeam(teamMembers);
  }, [teamMembers]);

  useEffect(() => {
    db.saveNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    db.saveOrganization(organization);
  }, [organization]);

  useEffect(() => {
    db.saveSalesChartData(salesChartData);
  }, [salesChartData]);

  // Actions: Events
  const createEvent = (eventData) => {
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
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEventId(newEvent.id);
    showToast(`Event "${newEvent.title}" berhasil dibuat dan disimpan ke database!`, 'success');
    return newEvent;
  };

  const updateEvent = (eventId, updateData) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId || String(e.id) === String(eventId) ? { ...e, ...updateData } : e))
    );
    showToast('Perubahan event berhasil disimpan!', 'success');
  };

  const deleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId && String(e.id) !== String(eventId)));
    db.deleteEvent(eventId);
    showToast('Event berhasil dihapus!', 'info');
  };

  // Actions: Tickets
  const addTicketType = (ticketData) => {
    const newTicket = {
      id: `tkt-${Date.now()}`,
      soldPercent: 0,
      soldCount: 0,
      status: 'Dijual',
      statusType: 'info',
      ...ticketData
    };
    setTicketTypes((prev) => [...prev, newTicket]);
    showToast(`Tipe tiket "${newTicket.name}" berhasil disimpan!`, 'success');
  };

  const updateTicketType = (ticketId, updateData) => {
    setTicketTypes((prev) =>
      prev.map((t) => (t.id === ticketId || String(t.id) === String(ticketId) ? { ...t, ...updateData } : t))
    );
    showToast('Tipe tiket berhasil diperbarui!', 'success');
  };

  const deleteTicketType = (ticketId) => {
    setTicketTypes((prev) => prev.filter((t) => t.id !== ticketId && String(t.id) !== String(ticketId)));
    showToast('Tipe tiket berhasil dihapus!', 'info');
  };

  // Actions: Orders & Auto-Add Attendees
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(24000 + Math.random() * 999)}`,
      buyerName: orderData.buyerName || orderData.customer_name || 'Pembeli Baru',
      buyerEmail: orderData.buyerEmail || orderData.customer_email || 'pembeli@mail.com',
      event: orderData.event || 'Jakarta Tech Summit 2026',
      qty: Number(orderData.qty) || 1,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Lunas',
      statusType: 'success',
      total: orderData.total || 'Rp 750.000',
      paymentMethod: orderData.paymentMethod || 'QRIS / GoPay',
      ticketTier: orderData.ticketTier || 'Regular Pass (1x)'
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Auto add to Attendees
    const newAtt = {
      id: `att-${Date.now()}`,
      name: newOrder.buyerName,
      email: newOrder.buyerEmail,
      phone: '+62 812-3456-7890',
      event: newOrder.event,
      ticketType: newOrder.ticketTier,
      ticketCode: `EVH-${Math.floor(1000 + Math.random() * 9000)}-AUTO`,
      isCheckedIn: false,
      checkInTime: null,
      seat: 'Row A - Auto'
    };
    setAttendees((prev) => [newAtt, ...prev]);

    showToast(`Order ${newOrder.id} & Peserta ${newOrder.buyerName} berhasil dibuat!`, 'success');
    return newOrder;
  };

  const addAttendee = (attData) => {
    const newAtt = {
      id: `att-${Date.now()}`,
      phone: '+62 812-0000-0000',
      ticketCode: `EVH-${Math.floor(1000 + Math.random() * 9000)}-NEW`,
      isCheckedIn: false,
      checkInTime: null,
      seat: 'Row A - 01',
      ...attData
    };
    setAttendees((prev) => [newAtt, ...prev]);
    showToast(`Peserta baru ${newAtt.name} berhasil ditambahkan!`, 'success');
    return newAtt;
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isUnread: false } : n))
    );
  };

  // Actions: Promos
  const addPromoCode = (promoData) => {
    const newPromo = {
      id: `prm-${Date.now()}`,
      usedPercent: 0,
      usedCount: 0,
      status: promoData.status || 'Aktif',
      statusType: promoData.status === 'Aktif' ? 'info' : 'neutral',
      ...promoData
    };
    setPromoCodes((prev) => [newPromo, ...prev]);
    showToast(`Kode promo "${newPromo.code}" berhasil dibuat!`, 'success');
    return newPromo;
  };

  const updatePromoCode = (promoId, updateData) => {
    setPromoCodes((prev) =>
      prev.map((p) =>
        p.id === promoId || String(p.id) === String(promoId)
          ? {
              ...p,
              ...updateData,
              statusType: (updateData.status || p.status) === 'Aktif' ? 'info' : 'neutral'
            }
          : p
      )
    );
    showToast('Perubahan kode promo berhasil disimpan!', 'success');
  };

  const deletePromoCode = (promoId) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== promoId && String(p.id) !== String(promoId)));
    showToast('Kode promo berhasil dihapus!', 'info');
  };

  // Actions: Check-in
  const toggleAttendeeCheckIn = (attendeeId) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setAttendees((prev) =>
      prev.map((a) => {
        if (a.id === attendeeId) {
          const newStatus = !a.isCheckedIn;
          return {
            ...a,
            isCheckedIn: newStatus,
            checkInTime: newStatus ? timeStr : null
          };
        }
        return a;
      })
    );
  };

  // Actions: Organization
  const updateOrganization = (data) => {
    setOrganization((prev) => ({ ...prev, ...data }));
    showToast('Profil organisasi berhasil diperbarui!', 'success');
  };

  // Helper Formatter
  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <AppContext.Provider
      value={{
        // Auth State & Actions
        isAuthenticated,
        login,
        logout,

        // State
        events,
        setEvents,
        activeEvent,
        selectedEventId,
        setSelectedEventId,
        ticketTypes,
        setTicketTypes,
        promoCodes,
        setPromoCodes,
        orders,
        setOrders,
        attendees,
        setAttendees,
        teamMembers,
        setTeamMembers,
        notifications,
        setNotifications,
        organization,
        setOrganization,
        salesChartData,
        setSalesChartData,
        toast,

        // Handlers
        createEvent,
        updateEvent,
        deleteEvent,
        addTicketType,
        updateTicketType,
        deleteTicketType,
        addOrder,
        addAttendee,
        markNotificationAsRead,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        toggleAttendeeCheckIn,
        updateOrganization,
        showToast,
        formatIDR
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
