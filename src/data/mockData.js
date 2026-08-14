/**
 * EventHub Mock Data Layer
 * Accurately implements schemas defined in EventHub_DataModel.md & EventHub_APISpec.md
 * Currency stored as integers in Rupiah (sen-safe)
 */

export const initialUser = {
  id: "usr-01",
  email: "alex.pratama@techfest.id",
  full_name: "Alex Pratama",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  email_verified_at: "2026-01-15T08:30:00Z",
  created_at: "2026-01-15T08:30:00Z"
};

export const initialOrganizations = [
  {
    id: "org-01",
    name: "TechFest Indonesia",
    category: "Tech Conference & Summit",
    logo_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    payout_balance: 334650000, // Rp 334.650.000
    plan: "pro",
    created_at: "2026-01-15T08:35:00Z"
  },
  {
    id: "org-02",
    name: "Design Crafters ID",
    category: "Design Community",
    logo_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&auto=format&fit=crop&q=80",
    payout_balance: 48500000,
    plan: "free",
    created_at: "2026-03-10T10:00:00Z"
  }
];

export const initialTeamMembers = [
  {
    id: "mem-01",
    user_id: "usr-01",
    full_name: "Alex Pratama",
    email: "alex.pratama@techfest.id",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "owner",
    joined_at: "2026-01-15T08:35:00Z",
    status: "active"
  },
  {
    id: "mem-02",
    user_id: "usr-02",
    full_name: "Maya Handayani",
    email: "maya.h@techfest.id",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "finance",
    joined_at: "2026-02-01T09:15:00Z",
    status: "active"
  },
  {
    id: "mem-03",
    user_id: "usr-03",
    full_name: "Rian Satria",
    email: "rian.satria@techfest.id",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "admin",
    joined_at: "2026-02-10T11:00:00Z",
    status: "active"
  },
  {
    id: "mem-04",
    user_id: "usr-04",
    full_name: "Budi Santoso",
    email: "budi.checkin@techfest.id",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "checkin_staff",
    joined_at: "2026-03-01T14:20:00Z",
    status: "active"
  },
  {
    id: "mem-05",
    user_id: "usr-05",
    full_name: "Dina Kartika",
    email: "dina.event@techfest.id",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    role: "event_manager",
    joined_at: "2026-03-15T10:45:00Z",
    status: "active"
  }
];

export const initialInvites = [
  {
    id: "inv-01",
    email: "farhan.dev@gmail.com",
    role: "content_manager",
    status: "pending",
    expires_at: "2026-08-20T23:59:59Z",
    created_at: "2026-08-10T12:00:00Z"
  }
];

export const initialEvents = [
  {
    id: "evt-1",
    title: "TechInno Summit 2026 — Next Generation AI & Cloud",
    slug: "techinno-summit-2026",
    status: "published",
    category: "Technology & AI",
    summary: "Konferensi teknologi terbesar di Indonesia yang menghadirkan 20+ pakar industri AI global dan regional.",
    banner_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    venue_type: "offline",
    venue_name: "Jakarta Convention Center (JCC) — Plenary Hall",
    venue_address: "Jl. Gatot Subroto No.1, Gelora, Tanah Abang, Jakarta Pusat",
    start_date: "2026-09-18T09:00:00Z",
    end_date: "2026-09-19T18:00:00Z",
    timezone: "Asia/Jakarta (WIB)",
    capacity: 1500,
    tickets_sold: 1250,
    total_gmv: 345000000,
    checkin_count: 0,
    is_featured: true,
    created_at: "2026-06-01T10:00:00Z"
  },
  {
    id: "evt-2",
    title: "Product Design Camp Jakarta 2026",
    slug: "design-camp-jkt-2026",
    status: "published",
    category: "Design & UX",
    summary: "Workshop intensif 2 hari belajar Design System, Interaction Design, dan AI-assisted prototyping.",
    banner_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
    venue_type: "hybrid",
    venue_name: "GoWork Coworking Plaza Indonesia & Zoom Live",
    venue_address: "Level 5, Plaza Indonesia, Jakarta Pusat",
    start_date: "2026-10-05T10:00:00Z",
    end_date: "2026-10-06T17:00:00Z",
    timezone: "Asia/Jakarta (WIB)",
    capacity: 500,
    tickets_sold: 380,
    total_gmv: 95000000,
    checkin_count: 0,
    is_featured: false,
    created_at: "2026-07-10T11:00:00Z"
  },
  {
    id: "evt-3",
    title: "Fullstack Web & Mobile DevCon 2026",
    slug: "devcon-2026",
    status: "draft",
    category: "Software Engineering",
    summary: "Konferensi fullstack development mencakup React, Next.js, Rust, Go, dan Cloud Native architecture.",
    banner_url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop&q=80",
    venue_type: "online",
    venue_name: "EventHub Live Stage Stream",
    venue_address: "Online / Virtual Stage",
    start_date: "2026-11-12T13:00:00Z",
    end_date: "2026-11-12T20:00:00Z",
    timezone: "Asia/Jakarta (WIB)",
    capacity: 2000,
    tickets_sold: 0,
    total_gmv: 0,
    checkin_count: 0,
    is_featured: false,
    created_at: "2026-08-01T15:30:00Z"
  },
  {
    id: "evt-4",
    title: "Jakarta Tech Founders Meetup #15",
    slug: "founders-meetup-15",
    status: "completed",
    category: "Networking & Business",
    summary: "Networking santai antar founder startup teknologi, angel investor, dan venture capital.",
    banner_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80",
    venue_type: "offline",
    venue_name: "Block71 Jakarta, Kuningan",
    venue_address: "Ariobimo Sentral lt 8, Kuningan Timur, Jakarta Selatan",
    start_date: "2026-07-25T18:30:00Z",
    end_date: "2026-07-25T21:30:00Z",
    timezone: "Asia/Jakarta (WIB)",
    capacity: 150,
    tickets_sold: 150,
    total_gmv: 22500000,
    checkin_count: 142,
    is_featured: false,
    created_at: "2026-06-15T09:00:00Z"
  }
];

export const initialTicketTypes = [
  {
    id: "tkt-01",
    event_id: "evt-1",
    name: "Early Bird Pass",
    tier: "early_bird",
    price: 150000, // Rp 150.000
    quota: 300,
    sold: 300,
    sale_start: "2026-06-05T00:00:00Z",
    sale_end: "2026-07-01T23:59:59Z",
    status: "sold_out",
    description: "Akses 2 hari penuh konferensi + Goodie bag eksklusif + Sertifikat digital."
  },
  {
    id: "tkt-02",
    event_id: "evt-1",
    name: "Regular / General Admission",
    tier: "regular",
    price: 275000, // Rp 275.000
    quota: 900,
    sold: 720,
    sale_start: "2026-07-02T00:00:00Z",
    sale_end: "2026-09-17T23:59:59Z",
    status: "active",
    description: "Akses seluruh stage + Expo area + Makan siang 2 hari."
  },
  {
    id: "tkt-03",
    event_id: "evt-1",
    name: "VIP All-Access + Speaker Dinner",
    tier: "vip",
    price: 850000, // Rp 850.000
    quota: 300,
    sold: 230,
    sale_start: "2026-06-05T00:00:00Z",
    sale_end: "2026-09-17T23:59:59Z",
    status: "active",
    description: "Front-row seats + VIP Lounge + Akses eksklusif Private Dinner bersama Keynote Speakers."
  },
  {
    id: "tkt-04",
    event_id: "evt-2",
    name: "Design Workshop Pass (In-Person)",
    tier: "regular",
    price: 250000,
    quota: 300,
    sold: 260,
    sale_start: "2026-07-15T00:00:00Z",
    sale_end: "2026-10-04T23:59:59Z",
    status: "active",
    description: "Workshop hands-on langsung di venue dengan mentor top tech designer."
  },
  {
    id: "tkt-05",
    event_id: "evt-2",
    name: "Virtual Live Stream Pass",
    tier: "online",
    price: 125000,
    quota: 200,
    sold: 120,
    sale_start: "2026-07-15T00:00:00Z",
    sale_end: "2026-10-04T23:59:59Z",
    status: "active",
    description: "Akses streaming HD interaktif + Q&A room + Recording replay."
  }
];

export const initialSpeakers = [
  {
    id: "spk-01",
    event_id: "evt-1",
    full_name: "Dr. Nadia Gunawan",
    role: "VP of AI Research",
    company: "Global Quantum Labs",
    bio: "Pakar Natural Language Processing dan Deep Learning dengan 15+ tahun pengalaman di Silicon Valley.",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com/in/example",
    twitter_url: "https://x.com/example"
  },
  {
    id: "spk-02",
    event_id: "evt-1",
    full_name: "Kevin Sanjaya",
    role: "Chief Technology Officer",
    company: "Nusantara Cloud Platform",
    bio: "Arsitek sistem cloud terdistribusi berskala jutaan concurrent users di Asia Tenggara.",
    photo_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com/in/example",
    twitter_url: "https://x.com/example"
  },
  {
    id: "spk-03",
    event_id: "evt-1",
    full_name: "Sarah Wijaya",
    role: "Lead Product Designer",
    company: "Fintech Nexus",
    bio: "Spesialis design token dan Apple HIG design system implementation.",
    photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com/in/example",
    twitter_url: "https://x.com/example"
  }
];

export const initialSessions = [
  {
    id: "ses-01",
    event_id: "evt-1",
    title: "Opening Keynote: The Future of Autonomous AI Agents in SEA",
    stage: "Main Plenary Hall",
    day: 1,
    start_time: "09:30",
    end_time: "10:45",
    speaker_id: "spk-01",
    description: "Eksplorasi tren autonomous agents dan bagaimana perusahaan enterprise mengadopsinya di tahun 2026."
  },
  {
    id: "ses-02",
    event_id: "evt-1",
    title: "High-Performance Cloud Architecture with Zero Latency",
    stage: "Tech Stage A",
    day: 1,
    start_time: "11:15",
    end_time: "12:30",
    speaker_id: "spk-02",
    description: "Deep dive teknik optimasi latency di microservices multi-region."
  },
  {
    id: "ses-03",
    event_id: "evt-1",
    title: "Building World-Class UI/UX with Apple Design Guidelines",
    stage: "Design & UX Track",
    day: 2,
    start_time: "14:00",
    end_time: "15:30",
    speaker_id: "spk-03",
    description: "Framework praktis merancang visual elegan, micro-interactions, dan token-based systems."
  }
];

export const initialPromoCodes = [
  {
    id: "prm-01",
    event_id: "evt-1",
    code: "EARLY20",
    discountType: "Persentase",
    value: "20%",
    discount_type: "percentage",
    discount_value: 20,
    usedPercent: 74,
    usedCount: 148,
    quota: 200,
    status: "Aktif",
    statusType: "info",
    validUntil: "2026-09-01",
    applicableEvents: "Jakarta Tech Summit 2026",
    minPurchase: "Rp 450.000"
  },
  {
    id: "prm-02",
    event_id: "evt-1",
    code: "KOMUNITAS50K",
    discountType: "Nominal tetap",
    value: "Rp 50.000",
    discount_type: "fixed",
    discount_value: 50000,
    usedPercent: 42,
    usedCount: 63,
    quota: 150,
    status: "Aktif",
    statusType: "info",
    validUntil: "2026-08-31",
    applicableEvents: "Semua Event Aktif",
    minPurchase: "Rp 200.000"
  },
  {
    id: "prm-03",
    event_id: "evt-1",
    code: "MEDIAPASS",
    discountType: "Persentase",
    value: "100%",
    discount_type: "percentage",
    discount_value: 100,
    usedPercent: 88,
    usedCount: 22,
    quota: 25,
    status: "Dijeda",
    statusType: "neutral",
    validUntil: "2026-09-12",
    applicableEvents: "Jakarta Tech Summit 2026 (Media & Press)",
    minPurchase: "Rp 0"
  },
  {
    id: "prm-04",
    event_id: "evt-1",
    code: "LAUNCH10",
    discountType: "Persentase",
    value: "10%",
    discount_type: "percentage",
    discount_value: 10,
    usedPercent: 100,
    usedCount: 300,
    quota: 300,
    status: "Kedaluwarsa",
    statusType: "neutral",
    validUntil: "2026-07-15",
    applicableEvents: "AI Builders Bootcamp",
    minPurchase: "Rp 150.000"
  }
];

export const initialOrders = [
  {
    id: "ord-1001",
    event_id: "evt-1",
    customer_name: "Dimas Anggara",
    customer_email: "dimas.a@gmail.com",
    customer_phone: "+6281234567890",
    ticket_name: "VIP All-Access + Speaker Dinner",
    ticket_type_id: "tkt-03",
    quantity: 2,
    unit_price: 850000,
    discount_amount: 170000, // 20%
    total_amount: 1530000,
    payment_method: "BCA Virtual Account",
    payment_status: "paid",
    paid_at: "2026-08-10T14:32:00Z",
    created_at: "2026-08-10T14:30:00Z"
  },
  {
    id: "ord-1002",
    event_id: "evt-1",
    customer_name: "Siti Rahmawati",
    customer_email: "siti.rahma@perusahaan.co.id",
    customer_phone: "+6281898765432",
    ticket_name: "Regular / General Admission",
    ticket_type_id: "tkt-02",
    quantity: 1,
    unit_price: 275000,
    discount_amount: 0,
    total_amount: 275000,
    payment_method: "GoPay / QRIS",
    payment_status: "paid",
    paid_at: "2026-08-10T16:15:00Z",
    created_at: "2026-08-10T16:10:00Z"
  },
  {
    id: "ord-1003",
    event_id: "evt-1",
    customer_name: "Fajar Nugraha",
    customer_email: "fajar.n@startup.io",
    customer_phone: "+6281356781234",
    ticket_name: "Regular / General Admission",
    ticket_type_id: "tkt-02",
    quantity: 3,
    unit_price: 275000,
    discount_amount: 150000,
    total_amount: 675000,
    payment_method: "Mandiri Bill",
    payment_status: "pending",
    paid_at: null,
    created_at: "2026-08-11T08:00:00Z"
  },
  {
    id: "ord-1004",
    event_id: "evt-1",
    customer_name: "Bayu Wicaksono",
    customer_email: "bayu.w@yahoo.com",
    customer_phone: "+6281723456789",
    ticket_name: "Early Bird Pass",
    ticket_type_id: "tkt-01",
    quantity: 1,
    unit_price: 150000,
    discount_amount: 0,
    total_amount: 150000,
    payment_method: "Credit Card (Visa)",
    payment_status: "refunded",
    refund_reason: "Attendee jadwal bentrok mendadak",
    paid_at: "2026-06-20T10:00:00Z",
    refunded_at: "2026-06-25T11:00:00Z",
    created_at: "2026-06-20T09:55:00Z"
  }
];

export const initialAttendees = [
  {
    id: "att-001",
    event_id: "evt-1",
    order_id: "ord-1001",
    full_name: "Dimas Anggara",
    email: "dimas.a@gmail.com",
    phone: "+6281234567890",
    ticket_name: "VIP All-Access",
    ticket_code: "EH-TIN-88910",
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EH-TIN-88910",
    checked_in: false,
    checked_in_at: null,
    checked_in_by: null,
    seat_number: "VIP-A12",
    notes: "Vegan meal preference"
  },
  {
    id: "att-002",
    event_id: "evt-1",
    order_id: "ord-1001",
    full_name: "Tania Putri",
    email: "tania.putri@gmail.com",
    phone: "+6281234567891",
    ticket_name: "VIP All-Access",
    ticket_code: "EH-TIN-88911",
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EH-TIN-88911",
    checked_in: false,
    checked_in_at: null,
    checked_in_by: null,
    seat_number: "VIP-A13",
    notes: ""
  },
  {
    id: "att-003",
    event_id: "evt-1",
    order_id: "ord-1002",
    full_name: "Siti Rahmawati",
    email: "siti.rahma@perusahaan.co.id",
    phone: "+6281898765432",
    ticket_name: "Regular Pass",
    ticket_code: "EH-TIN-45201",
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EH-TIN-45201",
    checked_in: true,
    checked_in_at: "2026-09-18T08:45:12Z",
    checked_in_by: "Budi Santoso",
    seat_number: "REG-C45",
    notes: ""
  },
  {
    id: "att-004",
    event_id: "evt-1",
    order_id: "ord-1004",
    full_name: "Bayu Wicaksono",
    email: "bayu.w@yahoo.com",
    phone: "+6281723456789",
    ticket_name: "Early Bird Pass",
    ticket_code: "EH-TIN-11002",
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EH-TIN-11002",
    checked_in: false,
    checked_in_at: null,
    checked_in_by: null,
    seat_number: "-",
    notes: "Ticket Refunded"
  }
];

export const initialCheckInLogs = [
  {
    id: "chk-01",
    attendee_name: "Siti Rahmawati",
    ticket_code: "EH-TIN-45201",
    ticket_type: "Regular Pass",
    timestamp: "2026-09-18T08:45:12Z",
    staff_name: "Budi Santoso",
    gate: "Gate 1 — Main Entrance",
    status: "success"
  }
];

export const initialSettlements = [
  {
    id: "stl-01",
    event_title: "Jakarta Tech Founders Meetup #15",
    gross_amount: 22500000,
    commission_rate: "3%",
    commission_amount: 675000,
    net_amount: 21825000,
    status: "settled",
    processed_at: "2026-08-01T10:00:00Z",
    bank_account: "BCA •••• 8821"
  },
  {
    id: "stl-02",
    event_title: "TechInno Summit 2026 (Partial Advance)",
    gross_amount: 200000000,
    commission_rate: "3%",
    commission_amount: 6000000,
    net_amount: 194000000,
    status: "processing",
    processed_at: "2026-08-11T09:00:00Z",
    bank_account: "BCA •••• 8821"
  }
];

export const initialInvoices = [
  {
    id: "inv-2026-08",
    description: "EventHub Pro Subscription — August 2026",
    amount: 499000,
    status: "paid",
    paid_at: "2026-08-01T08:00:00Z",
    invoice_url: "#"
  },
  {
    id: "inv-2026-07",
    description: "EventHub Pro Subscription — July 2026",
    amount: 499000,
    status: "paid",
    paid_at: "2026-07-01T08:00:00Z",
    invoice_url: "#"
  }
];

export const initialNotifications = [
  {
    id: "notif-01",
    title: "Tiket Terjual!",
    message: "Dimas Anggara baru saja membeli 2x tiket VIP All-Access (Rp 1.530.000)",
    type: "order",
    time_ago: "10 menit lalu",
    read: false
  },
  {
    id: "notif-02",
    title: "Early Bird Sold Out",
    message: "Kuota tiket Early Bird Pass untuk TechInno Summit 2026 telah habis 100%.",
    type: "ticket",
    time_ago: "2 jam lalu",
    read: false
  },
  {
    id: "notif-03",
    title: "Settlement Berhasil",
    message: "Dana bersih Rp 21.825.000 untuk Founders Meetup #15 telah ditransfer ke rekening Anda.",
    type: "payout",
    time_ago: "1 hari lalu",
    read: true
  }
];
