# EventHub — Feature Specification (Release 1 / MVP)

Companion document to `EventHub_PRD.md`. Setiap fitur mengikuti schema standar: description, user story, business value, functional requirements, non-functional requirements, acceptance criteria, validation rules, error handling, edge cases, permission, dependencies, API requirements, database impact, analytics events, QA scenarios, future improvement.

---

## Feature 1: Auth & Organization Onboarding

**Description:** Alur pendaftaran akun individu, pembuatan organisasi (tenant) baru, dan verifikasi email, sebagai gerbang masuk pertama ke EventHub.

**User Story:** Sebagai calon organizer, saya ingin mendaftar dan membuat organisasi saya dalam beberapa menit, supaya saya bisa langsung mulai membuat event.

**Business Value:** Langsung mendukung Business Goal "200 organisasi aktif dalam 6 bulan" (Section 4 PRD) — friction rendah di onboarding = konversi signup lebih tinggi.

**Functional Requirements:**
- FR-1.1: User bisa daftar via Email+Password atau Google SSO.
- FR-1.2: Setelah daftar, user diarahkan membuat/join organisasi (create new atau accept invite jika ada undangan pending).
- FR-1.3: Email verifikasi wajib sebelum bisa publish event (draft tetap bisa dibuat sebelum verifikasi).
- FR-1.4: User pertama yang membuat organisasi otomatis mendapat role `Owner`.
- FR-1.5: Sistem mendukung forgot password flow (email reset link, expire 1 jam).

**Non-Functional Requirements:**
- Signup + verifikasi email selesai dalam < 2 menit end-to-end (termasuk waktu kirim email, target delivery < 30 detik).

**Acceptance Criteria:**
- Given user baru, When mendaftar dengan email valid & password sesuai rule, Then akun dibuat dan email verifikasi terkirim dalam 30 detik.
- Given user klik link verifikasi valid, When link belum expired, Then akun berstatus verified dan user bisa publish event.
- Given user daftar via Google SSO, When email Google belum pernah terdaftar, Then akun baru dibuat otomatis verified (tidak perlu verifikasi email tambahan).

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Email | Format valid, unique | "Email tidak valid" / "Email sudah terdaftar, silakan login" |
| Password | Min 8 karakter, kombinasi huruf & angka | "Password minimal 8 karakter, kombinasi huruf & angka" |
| Nama organisasi | 3-100 karakter, wajib | "Nama organisasi wajib diisi (3-100 karakter)" |

**Error Handling:** Email provider gagal kirim → retry 3x dengan backoff, jika tetap gagal tampilkan opsi "Kirim ulang email verifikasi" manual. Google OAuth gagal/dibatalkan user → kembali ke halaman login tanpa membuat akun parsial.

**Edge Cases:**
- User daftar via Google SSO dengan email yang sebelumnya sudah daftar via Email+Password → sistem tawarkan link akun (merge), bukan buat akun duplikat.
- User klik link verifikasi yang sudah expired → tampilkan tombol "Kirim ulang" tanpa perlu daftar ulang.
- User diundang ke organisasi (lihat Feature 2) sebelum mereka punya akun → signup flow otomatis skip "create organization" dan langsung join organisasi yang mengundang setelah verifikasi.

**Permission:** Publik (belum authenticated) untuk signup/login. Semua role setelah login.

**Dependencies:** Email provider (transactional email), Google OAuth 2.0 credentials.

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/auth/register` | None | `{email, password, full_name}` | `{user_id, verification_sent: true}` |
| POST | `/v1/auth/login` | None | `{email, password}` | `{access_token, refresh_token, user}` |
| POST | `/v1/auth/google` | None | `{id_token}` | `{access_token, refresh_token, user}` |
| POST | `/v1/auth/verify-email` | None | `{token}` | `{verified: true}` |
| POST | `/v1/auth/forgot-password` | None | `{email}` | `{sent: true}` |
| POST | `/v1/organizations` | Bearer | `{name, category}` | `{organization_id, name, owner_id}` |

**Database Impact:** New tables `User`, `Organization`, `OrganizationMember` (lihat `EventHub_DataModel.md`).

**Analytics Event(s):** `user_registered` (trigger: register sukses, properties: `signup_method`), `organization_created` (lihat PRD Section 31).

**QA Test Scenarios:**
- Happy path: Register email → verify → create organization → login sukses.
- Edge case: Register lalu invite diterima sebelum verifikasi → organisasi ter-join dengan benar.
- Negative case: Register dengan email sudah terdaftar → error jelas, tidak buat akun duplikat.

**Future Improvement:** Multi-factor authentication (Phase 2), SSO Enterprise (SAML) untuk tier Enterprise.

---

## Feature 2: Team & Role Management

**Description:** Owner/Admin mengundang anggota tim ke organisasi dan menetapkan role (Owner, Admin, Event Manager, Finance, Marketing*, Check-in Staff, Content Manager) yang menentukan akses fitur (lihat Permission Matrix PRD Section 22). *Marketing role aktif penuh di Phase 2, di Release 1 role ini bisa di-assign tapi akses fiturnya minimal.

**User Story:** Sebagai Owner, saya ingin mengundang anggota tim dengan role spesifik, supaya setiap orang hanya bisa akses bagian yang relevan dengan pekerjaannya.

**Business Value:** Mendukung retensi organisasi menengah/besar yang butuh kolaborasi tim aman (least-privilege) — juga prasyarat untuk Persona 2 (Maya, Finance) dan Persona 3 (Budi, Check-in Staff).

**Functional Requirements:**
- FR-2.1: Owner/Admin bisa invite user via email dengan role tertentu.
- FR-2.2: Invited user menerima email berisi link accept invite.
- FR-2.3: Owner/Admin bisa mengubah role member existing atau me-remove member.
- FR-2.4: Owner tidak bisa di-remove atau di-downgrade oleh Admin (hanya Owner lain atau transfer ownership eksplisit).
- FR-2.5: Setiap `OrganizationMember` strict 1 role (lihat Business Rule PRD Section 18).

**Non-Functional Requirements:** Perubahan role harus efektif (permission ter-enforce) dalam < 5 detik, termasuk untuk session yang sedang aktif (token refresh atau permission check real-time).

**Acceptance Criteria:**
- Given Owner invite email dengan role Finance, When user menerima & accept invite, Then user muncul di Team list dengan role Finance dan hanya melihat menu sesuai Permission Matrix.
- Given Admin mencoba remove Owner, When aksi dijalankan, Then sistem menolak dengan error permission denied.
- Given role member diubah dari Event Manager ke Check-in Staff, When perubahan disimpan, Then akses member ke Ticket Management langsung tercabut.

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Invite email | Format valid | "Email tidak valid" |
| Role | Harus salah satu dari role terdaftar | "Role tidak valid" |

**Error Handling:** Invite ke email yang sudah jadi member organisasi yang sama → error "User sudah menjadi anggota". Invite gagal terkirim → retry otomatis, fallback tampilkan link invite yang bisa di-copy manual oleh Owner.

**Edge Cases:**
- Invite dikirim ke email yang belum pernah daftar EventHub → alur gabung dengan Feature 1 (signup otomatis terarah ke join organization).
- Owner tunggal keluar/dihapus tanpa ada Owner lain → sistem wajib minta transfer ownership dulu sebelum Owner bisa leave organisasi (tidak boleh organisasi tanpa Owner).
- Member di-invite dengan role yang sama dua kali (invite pending duplikat) → invite kedua menggantikan invite pertama (bukan duplikat entry).

**Permission:** Invite/edit/remove member — Owner & Admin saja (lihat Permission Matrix PRD Section 22). Member lain hanya bisa lihat daftar tim (read-only nama & role, tanpa email/kontak).

**Dependencies:** Feature 1 (Auth), email provider.

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/organizations/{id}/invites` | Bearer (Owner/Admin) | `{email, role}` | `{invite_id, status: pending}` |
| POST | `/v1/invites/{token}/accept` | Bearer | — | `{organization_id, role}` |
| GET | `/v1/organizations/{id}/members` | Bearer | — | `{members: [...]}` |
| PATCH | `/v1/organizations/{id}/members/{member_id}` | Bearer (Owner/Admin) | `{role}` | `{member_id, role}` |
| DELETE | `/v1/organizations/{id}/members/{member_id}` | Bearer (Owner/Admin) | — | `{removed: true}` |

**Database Impact:** `OrganizationMember` (role enum column), new table `Invite` (email, role, token, status, expires_at).

**Analytics Event(s):** `member_invited` (properties: `role`), `member_role_changed` (properties: `from_role`, `to_role`).

**QA Test Scenarios:**
- Happy path: Owner invite Finance role → accepted → akses sesuai matrix.
- Edge case: Transfer ownership sebelum Owner leave.
- Negative case: Admin coba downgrade Owner → ditolak.

**Future Improvement:** Custom role builder (Phase 2, di luar 7 role fixed saat ini), bulk invite via CSV.

---

## Feature 3: Subscription & Billing

**Description:** Manajemen paket langganan organisasi (Free/Pro/Enterprise) termasuk upgrade/downgrade, metode pembayaran, invoice, dan tracking payout balance dari komisi tiket.

**User Story:** Sebagai Owner, saya ingin melihat & mengelola paket langganan organisasi saya, supaya saya tahu biaya yang saya keluarkan dan fitur yang saya dapatkan.

**Business Value:** Komponen inti monetisasi platform (Business Goal Section 4) — subscription + komisi.

**Functional Requirements:**
- FR-3.1: Organisasi baru otomatis di tier Free.
- FR-3.2: Owner/Admin bisa upgrade ke Pro/Enterprise kapan saja (prorata billing).
- FR-3.3: Downgrade berlaku di awal siklus billing berikutnya, dengan validasi limit tier baru (lihat Business Rule PRD Section 18/20 Edge Case).
- FR-3.4: Sistem generate invoice otomatis tiap siklus billing, dan invoice per settlement komisi tiket.
- FR-3.5: Owner/Admin bisa melihat `payout_balance` (akumulasi dana dari penjualan tiket dikurangi komisi) dan riwayat settlement.

**Non-Functional Requirements:** Perhitungan komisi & payout balance harus akurat sampai 2 desimal (currency-safe, gunakan integer cents/rupiah, bukan floating point).

**Acceptance Criteria:**
- Given organisasi Free tier sudah punya 1 event aktif, When mencoba buat event kedua, Then sistem tampilkan prompt upgrade ke Pro.
- Given Owner upgrade ke Pro di tengah siklus billing, When pembayaran prorata sukses, Then fitur Pro langsung aktif tanpa menunggu siklus berikutnya.
- Given event selesai (status completed), When settlement dijalankan (T+7), Then `payout_balance` organisasi bertambah sebesar GMV event dikurangi komisi platform.

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Metode pembayaran | Kartu/VA valid di gateway | "Metode pembayaran gagal diverifikasi" |
| Downgrade | Event aktif organisasi harus <= limit tier tujuan | "Kurangi event aktif sebelum downgrade ke tier ini" |

**Error Handling:** Pembayaran subscription gagal → organisasi tetap di tier lama, notifikasi ke Owner untuk update metode pembayaran, grace period 3 hari sebelum fitur Pro di-suspend.

**Edge Cases:** Lihat PRD Section 20 (downgrade dengan event aktif melebihi limit). Tambahan: organisasi cancel subscription di tengah event masih berjalan → event tetap bisa diselesaikan & settlement tetap diproses, hanya fitur tier baru yang tidak aktif untuk event berikutnya.

**Permission:** Billing edit — Owner & Admin. Finance — view only (lihat Permission Matrix).

**Dependencies:** Payment gateway (Midtrans/Xendit) untuk charge subscription & payout settlement.

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/v1/organizations/{id}/subscription` | Bearer | — | `{tier, status, current_period_end}` |
| POST | `/v1/organizations/{id}/subscription/upgrade` | Bearer (Owner/Admin) | `{target_tier, payment_method_id}` | `{subscription, invoice}` |
| POST | `/v1/organizations/{id}/subscription/downgrade` | Bearer (Owner/Admin) | `{target_tier}` | `{effective_at}` |
| GET | `/v1/organizations/{id}/invoices` | Bearer | — | `{invoices: [...]}` |
| GET | `/v1/organizations/{id}/payout-balance` | Bearer | — | `{balance, currency, last_settlement}` |

**Database Impact:** New tables `Subscription`, `Invoice`, `Settlement` (lihat data model).

**Analytics Event(s):** `subscription_upgraded`/`downgraded` (lihat PRD Section 31), `settlement_processed` (properties: `amount`, `commission_amount`).

**QA Test Scenarios:**
- Happy path: Free → Pro upgrade sukses, fitur langsung terbuka.
- Edge case: Downgrade ditolak karena event aktif melebihi limit.
- Negative case: Payment gateway declined → tier tidak berubah, error jelas ke user.

**Future Improvement:** Custom Enterprise contract & invoicing manual (Phase 2), usage-based add-on (misal beli kuota tiket tambahan tanpa upgrade tier penuh).

---

## Feature 4: Event Management

**Description:** Wizard multi-step untuk membuat, mengedit, dan mempublikasikan event — mencakup informasi dasar, tanggal & venue, dan status lifecycle (draft/published/completed/cancelled).

**User Story:** Sebagai Event Manager, saya ingin membuat event baru lewat wizard terstruktur, supaya saya tidak melewatkan informasi penting sebelum publish.

**Business Value:** Fitur inti — langsung terhubung ke metric "Time-to-publish < 30 menit" dan "Event dipublikasikan: 350" (Section 5 PRD).

**Functional Requirements:**
- FR-4.1: Wizard 6 step (Basic Info, Date & Venue, Content, Tickets, Settings, Review) — lihat User Flow PRD Section 12.
- FR-4.2: User bisa save as draft di step manapun dan lanjutkan nanti.
- FR-4.3: Event hanya bisa dipublish jika lolos validasi (lihat Business Rule PRD Section 18: minimal 1 ticket type aktif + venue/link online terisi).
- FR-4.4: Event type: In-person / Online / Hybrid — menentukan field venue wajib (fisik) vs link (online).
- FR-4.5: Setelah event selesai (`end_date` terlewati), status otomatis berubah ke `completed` via scheduled job, memicu proses settlement (Feature 3).
- FR-4.6: Owner/Admin bisa cancel event yang sudah published (memicu alur refund massal — lihat Feature 8).

**Non-Functional Requirements:** Autosave draft setiap perubahan field (debounced 2 detik) supaya tidak ada data hilang jika browser crash.

**Acceptance Criteria:**
- Given Event Manager mengisi seluruh step wajib, When klik Publish, Then event berstatus published dan muncul di halaman publik (Consumer App, di luar scope tapi API-ready).
- Given event berstatus draft, When user keluar tanpa publish, Then data tersimpan otomatis dan muncul di list "Drafts".
- Given event `end_date` sudah lewat, When scheduled job jalan, Then status berubah ke `completed` dan trigger settlement.

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Event name | 3-150 karakter | "Nama event wajib diisi (3-150 karakter)" |
| start_date/end_date | `end_date` >= `start_date`, `start_date` >= hari ini saat create | "Tanggal event tidak valid" |
| Venue (in-person/hybrid) | Wajib diisi | "Venue wajib diisi untuk event in-person/hybrid" |
| Online link (online/hybrid) | Format URL valid | "Link online tidak valid" |

**Error Handling:** Publish gagal karena validasi → highlight step & field spesifik yang error (lihat User Flow diagram), tidak reset progress step lain.

**Edge Cases:** Lihat PRD Section 20 (perubahan harga tiket setelah order pending). Tambahan: Event Manager cancel event yang sudah punya order paid → sistem wajib konfirmasi ganda ("X order akan di-refund, lanjutkan?") sebelum eksekusi.

**Permission:** Create/edit — Owner, Admin, Event Manager. Publish — Owner, Admin, Event Manager. Delete — Owner, Admin saja. Content Manager — edit terbatas ke Schedule/Speaker (Feature 5) saja, tidak bisa ubah venue/ticket.

**Dependencies:** Feature 6 (Ticket Management, wajib ada sebelum publish), Google Maps API (venue search — opsional enhancement, fallback input alamat manual jika API gagal).

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/events` | Bearer | `{...basic_info}` | `{event_id, status: draft}` |
| PATCH | `/v1/events/{id}` | Bearer | `{...fields}` | `{event}` |
| POST | `/v1/events/{id}/publish` | Bearer | — | `{status: published}` atau `400` dgn detail validasi |
| POST | `/v1/events/{id}/cancel` | Bearer (Owner/Admin) | `{reason}` | `{status: cancelled, refunds_triggered: n}` |
| GET | `/v1/events` | Bearer | `?status=draft\|published\|completed` | `{events: [...]}` |
| GET | `/v1/events/{id}` | Bearer | — | `{event}` |

**Database Impact:** New tables `Event`, `Venue`.

**Analytics Event(s):** `event_published` (lihat PRD Section 31), `event_cancelled` (properties: `refund_count`, `reason`).

**QA Test Scenarios:**
- Happy path: Isi wizard lengkap → publish sukses.
- Edge case: Save draft di step 3, kembali besok, lanjut ke step 4 tanpa kehilangan data.
- Negative case: Publish tanpa ticket type → error jelas, tetap di step Tickets.

**Future Improvement:** Event Templates & Duplicate Event (Phase 2), recurring event series.

---

## Feature 5: Event Content — Schedule & Speaker

**Description:** Pengelolaan susunan acara (session/schedule) dan profil pembicara yang ditampilkan di halaman event publik.

**User Story:** Sebagai Content Manager, saya ingin menambahkan jadwal sesi dan profil pembicara, supaya calon peserta tahu apa yang akan mereka dapatkan dari event ini.

**Business Value:** Meningkatkan kualitas informasi event → mendukung konversi checkout (calon buyer lebih yakin membeli tiket saat melihat detail acara & pembicara jelas).

**Functional Requirements:**
- FR-5.1: User bisa tambah/edit/hapus session dengan waktu mulai-selesai, judul, deskripsi opsional.
- FR-5.2: User bisa tambah/edit/hapus speaker dengan foto, nama, jabatan, perusahaan, social link.
- FR-5.3: Speaker bisa di-assign ke satu atau lebih session.
- FR-5.4: Session ditampilkan terurut otomatis berdasarkan waktu mulai.

**Non-Functional Requirements:** Upload foto speaker maksimal 5MB, auto-resize/compress untuk tampilan web.

**Acceptance Criteria:**
- Given user menambahkan 5 session dengan waktu berbeda, When disimpan, Then session tertampil terurut kronologis otomatis.
- Given speaker di-assign ke session tertentu, When halaman event dilihat, Then nama speaker muncul di detail session tersebut.

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Session time | `end_time` > `start_time`, dalam rentang `event.start_date`-`event.end_date` | "Waktu sesi di luar rentang tanggal event" |
| Speaker name | Wajib, max 100 karakter | "Nama pembicara wajib diisi" |
| Social link | Format URL valid (jika diisi) | "Link tidak valid" |

**Error Handling:** Upload foto gagal (format tidak didukung/size terlalu besar) → pesan error spesifik, form tetap menyimpan data teks yang sudah diisi.

**Edge Cases:** Dua session dengan waktu overlap (misal 2 track paralel) → diizinkan (bukan error), ditampilkan sebagai track berbeda di UI.

**Permission:** Owner, Admin, Event Manager, Content Manager — full access (lihat Permission Matrix).

**Dependencies:** Feature 4 (Event harus exist dulu), object storage untuk foto speaker.

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/events/{id}/sessions` | Bearer | `{title, start_time, end_time, description}` | `{session_id}` |
| PATCH | `/v1/events/{id}/sessions/{session_id}` | Bearer | `{...fields}` | `{session}` |
| DELETE | `/v1/events/{id}/sessions/{session_id}` | Bearer | — | `{deleted: true}` |
| POST | `/v1/events/{id}/speakers` | Bearer | `{name, title, company, photo_url, social_links}` | `{speaker_id}` |
| POST | `/v1/events/{id}/sessions/{session_id}/speakers` | Bearer | `{speaker_id}` | `{assigned: true}` |

**Database Impact:** New tables `EventSession`, `Speaker`, `SessionSpeaker` (join).

**Analytics Event(s):** `session_added`, `speaker_added` (properties: `event_id`).

**QA Test Scenarios:**
- Happy path: Tambah 3 session + 3 speaker, assign masing-masing.
- Edge case: Session waktu overlap tersimpan tanpa error.
- Negative case: Session di luar rentang tanggal event → ditolak dengan pesan jelas.

**Future Improvement:** Import schedule dari CSV/spreadsheet, multi-track visual builder.

---

## Feature 6: Ticket Management

**Description:** Pengelolaan tipe tiket (Early Bird, Regular, VIP, dst) beserta harga, kuota, dan periode penjualan untuk satu event.

**User Story:** Sebagai Event Manager, saya ingin membuat beberapa tipe tiket dengan harga dan kuota berbeda, supaya saya bisa menyesuaikan strategi penjualan (early bird, VIP, dst).

**Business Value:** Fitur inti monetisasi — langsung terhubung ke GMV dan Tiket Terjual (Section 5 PRD).

**Functional Requirements:**
- FR-6.1: User bisa create/edit/deactivate ticket type dengan nama, harga, kuota, periode sale.
- FR-6.2: Sistem menampilkan real-time sold count & remaining quota per ticket type.
- FR-6.3: Ticket type bisa punya benefit description (teks bebas) dan refund policy per tipe.
- FR-6.4: Ticket type dengan `sale_start` di masa depan otomatis berstatus "Upcoming" (belum bisa dibeli) sampai waktunya tiba.
- FR-6.5: Ticket type dengan `quantity_sold >= quantity_total` otomatis berstatus "Sold Out".

**Non-Functional Requirements:** Update `quantity_sold` harus atomic (row-level lock / optimistic locking) untuk mencegah oversell saat concurrent purchase (lihat Business Rule PRD Section 18).

**Acceptance Criteria:**
- Given Event Manager membuat ticket type "VIP" kuota 100 harga Rp500.000, When dipublish, Then tiket muncul di halaman event dengan status "On Sale" sesuai `sale_start`.
- Given kuota tersisa 1 dan dua buyer checkout bersamaan, When keduanya submit payment, Then hanya satu yang berhasil, satu lagi mendapat error "Sold Out".
- Given Event Manager mengubah harga ticket type yang sudah punya order lama, When perubahan disimpan, Then order lama tidak terpengaruh (price snapshot di `OrderItem`).

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Ticket price | >= 0, kelipatan Rp1.000 | "Harga tiket harus kelipatan Rp1.000" |
| Ticket quantity | Integer > 0 | "Kuota tiket harus lebih dari 0" |
| sale_start/sale_end | `sale_start` < `sale_end` <= `event.end_date` | "Periode sale tidak valid" |

**Error Handling:** Percobaan mengurangi kuota di bawah `quantity_sold` saat ini → ditolak dengan pesan "Kuota tidak boleh lebih kecil dari jumlah tiket terjual (X)".

**Edge Cases:** Lihat PRD Section 20 & 18 (oversell prevention, price snapshot). Tambahan: Event Manager menghapus ticket type yang sudah ada order paid → tidak diizinkan hapus, hanya bisa deactivate (stop future sale, order existing tetap valid).

**Permission:** Create/edit — Owner, Admin, Event Manager. View — + Finance (read-only, lihat Permission Matrix).

**Dependencies:** Feature 4 (Event harus exist), Feature 8 (Checkout, konsumen `quantity_sold`).

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/events/{id}/ticket-types` | Bearer | `{name, price, quantity_total, sale_start, sale_end, benefits, refund_policy}` | `{ticket_type_id}` |
| PATCH | `/v1/events/{id}/ticket-types/{ticket_type_id}` | Bearer | `{...fields}` | `{ticket_type}` |
| POST | `/v1/events/{id}/ticket-types/{ticket_type_id}/deactivate` | Bearer | — | `{status: inactive}` |
| GET | `/v1/events/{id}/ticket-types` | Bearer/Public | — | `{ticket_types: [{..., quantity_sold, quantity_remaining, status}]}` |

**Database Impact:** New table `TicketType` (dengan `quantity_total`, `quantity_sold` counter column).

**Analytics Event(s):** `ticket_type_created`, `ticket_sold_out` (properties: `ticket_type_id`, `event_id`).

**QA Test Scenarios:**
- Happy path: Buat 3 tipe tiket, semua tampil sesuai periode sale.
- Edge case: Concurrent purchase pada kuota tersisa 1 → tidak oversell.
- Negative case: Set kuota baru di bawah jumlah terjual → ditolak.

**Future Improvement:** Tiered/dynamic pricing (harga naik otomatis per milestone kuota terjual), group ticket bundle.

---

## Feature 7: Promo Codes

**Description:** Kode diskon yang bisa dibuat organizer dan diterapkan buyer saat checkout, dengan batasan tipe tiket, usage limit, dan periode berlaku.

**User Story:** Sebagai Event Manager, saya ingin membuat kode promo untuk mendorong penjualan early, supaya saya bisa meningkatkan konversi di periode tertentu.

**Business Value:** Alat growth sederhana yang meningkatkan konversi checkout tanpa menunggu modul Marketing penuh (Phase 2).

**Functional Requirements:**
- FR-7.1: User bisa create promo code (kode custom atau auto-generate), dengan tipe diskon percentage atau fixed amount.
- FR-7.2: Promo code di-assign eksplisit ke satu/lebih ticket type (lihat Business Rule Section 18 — tidak berlaku ke semua tiket by default).
- FR-7.3: Promo code punya usage limit total dan optional per-user limit.
- FR-7.4: Buyer input kode saat checkout, sistem validasi real-time (valid/expired/limit habis/tidak applicable ke tiket yang dipilih).

**Non-Functional Requirements:** Validasi promo code di checkout harus < 500ms (tidak boleh jadi bottleneck funnel checkout).

**Acceptance Criteria:**
- Given promo "DESIGN20" 20% off untuk Regular & VIP, When buyer apply ke Early Bird, Then sistem tolak dengan pesan "Kode tidak berlaku untuk tiket ini".
- Given usage limit 500 sudah tercapai, When buyer ke-501 apply kode, Then sistem tolak dengan pesan "Kode promo sudah mencapai batas penggunaan".
- Given promo valid diterapkan, When checkout selesai, Then `usage_count` bertambah 1 secara atomic.

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Code | Unique per organisasi, alfanumerik 4-20 karakter | "Kode promo sudah digunakan / format tidak valid" |
| Discount percentage | 1-100 | "Diskon persentase harus 1-100%" |
| Discount fixed | > 0, tidak melebihi harga tiket terendah yang applicable | "Nominal diskon tidak valid" |
| Usage limit | Integer > 0 | "Batas penggunaan harus lebih dari 0" |

**Error Handling:** Race condition dua buyer pakai kode di usage limit terakhir bersamaan → atomic counter increment, salah satu ditolak dengan pesan limit habis (sama seperti oversell prevention).

**Edge Cases:** Promo code tidak stackable — buyer coba apply 2 kode dalam 1 order → sistem hanya terima kode pertama, kode kedua ditolak dengan pesan "Hanya 1 kode promo per transaksi". Promo `valid_until` terlewati saat buyer sudah di tengah checkout → checkout tetap lanjut tanpa diskon, buyer diberi notifikasi kode sudah tidak berlaku.

**Permission:** Create/manage — Owner, Admin, Event Manager (lihat Permission Matrix; Marketing role akses penuh di Phase 2).

**Dependencies:** Feature 6 (Ticket Management), Feature 8 (Checkout — tempat kode diterapkan).

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/events/{id}/promo-codes` | Bearer | `{code, discount_type, discount_value, applicable_ticket_type_ids, usage_limit, valid_until}` | `{promo_code_id}` |
| GET | `/v1/events/{id}/promo-codes` | Bearer | — | `{promo_codes: [{..., usage_count}]}` |
| POST | `/v1/checkout/validate-promo` | Public/session | `{code, ticket_type_id}` | `{valid, discount_amount}` atau `400` |

**Database Impact:** New table `PromoCode` (many-to-many ke `TicketType` via `PromoCodeTicketType`).

**Analytics Event(s):** `promo_code_created`, `promo_code_applied` (properties: `code`, `discount_amount`, `order_id`).

**QA Test Scenarios:**
- Happy path: Buat kode 20% untuk Regular, buyer apply sukses, harga terpotong benar.
- Edge case: Dua buyer pakai kode di limit terakhir bersamaan.
- Negative case: Apply kode expired → error jelas.

**Future Improvement:** Auto-generate kode unik per influencer/affiliate untuk tracking referral (Phase 2, terhubung Marketing module).

---

## Feature 8: Checkout & Order Management

**Description:** Alur pembelian tiket oleh buyer (guest checkout, tanpa perlu akun EventHub) hingga pembayaran, plus dashboard Order untuk organizer memantau & mengelola transaksi termasuk refund.

**User Story:** Sebagai buyer, saya ingin membeli tiket dengan cepat dan aman; sebagai Event Manager/Finance, saya ingin memantau semua order dan memproses refund jika diperlukan.

**Business Value:** Fitur paling kritikal — GMV, Checkout Conversion Rate, dan Tiket Terjual (Section 5 PRD) semua bergantung pada fitur ini.

**Functional Requirements:**
- FR-8.1: Buyer pilih ticket type + jumlah → sistem reserve kuota (soft lock 10 menit) → isi data buyer → apply promo (opsional) → bayar via Midtrans/Xendit.
- FR-8.2: Setelah payment gateway callback sukses, sistem generate `Attendee` record per tiket (dengan QR code unik) dan kirim e-ticket via email.
- FR-8.3: Organizer (Owner/Admin/Event Manager/Finance) bisa melihat list Orders dengan filter status (paid/pending/cancelled/refunded).
- FR-8.4: Owner/Admin/Finance bisa memproses refund (partial atau full) yang otomatis void `Attendee` terkait (lihat Business Rule Section 18).
- FR-8.5: Soft lock kuota otomatis rilis jika checkout tidak selesai dalam 10 menit.

**Non-Functional Requirements:** Checkout flow (dari pilih tiket sampai redirect ke payment gateway) target < 3 detik response time; tahan lonjakan 1.000 request/menit (lihat NFR PRD Section 17).

**Acceptance Criteria:**
- Given buyer checkout 2 tiket Regular dengan promo valid, When payment sukses, Then 2 `Attendee` record dibuat dengan QR unik dan e-ticket terkirim ke email buyer dalam < 1 menit.
- Given buyer tidak menyelesaikan payment dalam 10 menit, When soft lock expired, Then kuota kembali tersedia untuk buyer lain.
- Given Finance memproses refund penuh untuk 1 order, When refund selesai diproses gateway, Then status order → refunded dan semua `Attendee` terkait → void (tidak bisa check-in).

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Buyer email | Format valid, wajib | "Email tidak valid" |
| Buyer nama | Wajib | "Nama wajib diisi" |
| Quantity per order | Max 10 tiket per tipe per order (anti-scalping default) | "Maksimal 10 tiket per transaksi" |
| Refund amount | <= jumlah yang sudah dibayar | "Nominal refund melebihi jumlah pembayaran" |

**Error Handling:** Lihat PRD Section 21 (payment gateway timeout → status pending, poll & retry). Refund gagal diproses gateway → status tetap `refund_pending`, retry otomatis + alert ke Finance jika gagal > 3x.

**Edge Cases:** Lihat PRD Section 20 (sold out saat checkout, refund setelah check-in). Tambahan: buyer melakukan double-submit payment (klik bayar 2x) → idempotency key (FR-SYS-5) mencegah double charge.

**Permission:** View orders — Owner, Admin, Event Manager, Finance. Process refund — Owner, Admin, Finance saja (lihat Permission Matrix).

**Dependencies:** Feature 6 (Ticket Management), Feature 7 (Promo Codes), Feature 9 (generate Attendee), Payment gateway (Midtrans/Xendit), Email provider.

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/checkout/sessions` | Public/session | `{ticket_type_id, quantity, promo_code?}` | `{checkout_session_id, expires_at, reserved_quantity}` |
| POST | `/v1/checkout/sessions/{id}/complete` | Public/session | `{buyer_name, buyer_email, payment_method}` | `{order_id, payment_redirect_url}` |
| POST | `/v1/webhooks/payment-callback` | Signature-verified | `{gateway_order_id, status}` | `200 OK` |
| GET | `/v1/events/{id}/orders` | Bearer | `?status=` | `{orders: [...]}` (paginated) |
| POST | `/v1/orders/{id}/refund` | Bearer (Owner/Admin/Finance) | `{amount, reason}` | `{refund_id, status}` |

**Database Impact:** New tables `Order`, `OrderItem`, `Attendee` (lihat data model), plus counter update ke `TicketType.quantity_sold`.

**Analytics Event(s):** `checkout_started`, `payment_succeeded`, `payment_failed` (lihat PRD Section 31), `refund_processed` (properties: `order_id`, `amount`).

**QA Test Scenarios:**
- Happy path: Checkout → bayar → e-ticket terkirim.
- Edge case: Soft lock expire, kuota rilis kembali.
- Negative case: Payment gateway declined → order status failed, kuota dirilis, buyer bisa retry.

**Future Improvement:** Buyer account (riwayat pembelian lintas event), installment/cicilan payment, ticket transfer antar buyer (disebut di dokumen sumber sebagai "Transferability" — Phase 2).

---

## Feature 9: Attendee Management

**Description:** Daftar peserta yang sudah membeli tiket per event, dengan kemampuan cari, export, dan lihat status check-in.

**User Story:** Sebagai Event Manager, saya ingin melihat & mengelola seluruh daftar peserta event saya, supaya saya siap untuk hari-H dan pelaporan pasca-event.

**Business Value:** Prasyarat operasional untuk Check-in (Feature 10) dan pelaporan pasca-event ke stakeholder/sponsor (Phase 2).

**Functional Requirements:**
- FR-9.1: List semua `Attendee` per event dengan search (nama/email) dan filter (ticket type, status check-in).
- FR-9.2: Export attendee list ke CSV.
- FR-9.3: Organizer bisa menambah attendee manual (misal komplimen tiket) tanpa melalui checkout publik.
- FR-9.4: Klik satu attendee menampilkan detail (tiket, order terkait, riwayat check-in jika ada).

**Non-Functional Requirements:** List & search attendee tetap responsif (< 1 detik) untuk event dengan 10.000+ attendee (pagination cursor-based, lihat API Design PRD Section 25).

**Acceptance Criteria:**
- Given event dengan 2.341 attendee, When Event Manager search nama tertentu, Then hasil muncul < 1 detik.
- Given Event Manager export CSV, When file di-generate, Then berisi seluruh field relevan (nama, email, ticket type, status bayar, status check-in) sesuai jumlah attendee saat itu.
- Given Finance membuka Attendee list, When melihat data, Then kontak pribadi (email/telepon) tidak ditampilkan sesuai Permission Matrix.

**Validation Rules:**
| Field | Rule | Error Message |
|---|---|---|
| Manual add — email | Format valid | "Email tidak valid" |

**Error Handling:** Export CSV untuk dataset sangat besar (>50.000 baris) → diproses async, notifikasi & link download dikirim setelah selesai (bukan block UI).

**Edge Cases:** Attendee dari order yang sudah di-refund tetap muncul di list dengan status "Refunded/Void" (bukan dihapus) — untuk keperluan audit trail.

**Permission:** Full view + export — Owner, Admin, Event Manager. Finance — view terbatas (tanpa kontak). Check-in Staff — view terbatas ke hari-H, hanya field relevan check-in (nama, foto tiket, status). Lihat Permission Matrix PRD Section 22.

**Dependencies:** Feature 8 (Order/Checkout sebagai sumber data attendee).

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/v1/events/{id}/attendees` | Bearer | `?search=&ticket_type_id=&checkin_status=&cursor=` | `{attendees: [...], next_cursor}` |
| POST | `/v1/events/{id}/attendees/manual` | Bearer (Owner/Admin/Event Manager) | `{name, email, ticket_type_id}` | `{attendee_id}` |
| GET | `/v1/events/{id}/attendees/export` | Bearer | — | `{export_job_id}` → async, notifikasi saat selesai |
| GET | `/v1/attendees/{id}` | Bearer | — | `{attendee, order, checkin_history}` |

**Database Impact:** Menggunakan tabel `Attendee` (dari Feature 8), tidak ada tabel baru — index tambahan untuk search performant (`name`, `email`, `event_id`).

**Analytics Event(s):** `attendee_exported` (properties: `event_id`, `count`), `attendee_added_manual`.

**QA Test Scenarios:**
- Happy path: Search & filter attendee dengan hasil akurat.
- Edge case: Export dataset besar selesai async dengan notifikasi.
- Negative case: Finance role tidak melihat kolom email/telepon di UI maupun response API.

**Future Improvement:** Attendee Segmentation lanjutan berbasis behavior (Phase 2, lihat Roadmap PRD Section 36).

---

## Feature 10: Check-in (Event Day)

**Description:** Dashboard hari-H untuk memantau kehadiran real-time, dengan scan QR code, manual check-in (search nama), dan dukungan offline mode untuk venue dengan koneksi lemah.

**User Story:** Sebagai Check-in Staff, saya ingin scan QR tiket peserta secepat mungkin dan tahu status valid/tidaknya, supaya antrean masuk lancar meski koneksi venue lemot.

**Business Value:** Langsung terhubung ke metric "Check-in success rate > 95%" (Section 5 PRD) dan pengalaman hari-H yang jadi differentiator dibanding kompetitor manual.

**Functional Requirements:**
- FR-10.1: Staff scan QR code attendee via kamera device (web-based scanner atau PWA).
- FR-10.2: Sistem validasi QR: valid & belum check-in → sukses; sudah check-in → warning (bukan block); void/refunded → error jelas.
- FR-10.3: Manual check-in via search nama/email untuk kasus QR tidak terbaca/hilang.
- FR-10.4: Live dashboard menampilkan jumlah checked-in real-time, persentase dari total expected, dan grafik check-in per jam.
- FR-10.5: Offline mode: scan tetap berfungsi tanpa koneksi, data di-queue lokal di device, auto-sync saat koneksi kembali (lihat NFR PRD Section 17).

**Non-Functional Requirements:** Scan-to-feedback (visual/audio konfirmasi valid/invalid) < 1 detik saat online; offline queue mampu menampung minimal 1.000 check-in lokal sebelum sync.

**Acceptance Criteria:**
- Given QR code valid & belum check-in, When staff scan, Then muncul konfirmasi hijau "Checked in: [Nama]" dalam < 1 detik.
- Given QR code sudah pernah check-in, When staff scan lagi, Then muncul warning kuning "Already checked in at [waktu]" tanpa memblokir staff melanjutkan scan berikutnya.
- Given koneksi internet venue putus, When staff tetap scan, Then check-in tersimpan lokal dan banner "X belum tersinkron" muncul; saat koneksi kembali, seluruh data tersinkron otomatis dan Live Dashboard update.

**Validation Rules:** Tidak ada input form tradisional; validasi dilakukan terhadap state `Attendee` (lihat Business Rule PRD Section 18: 1x check-in per tiket).

**Error Handling:** QR code tidak terbaca kamera (rusak/gelap) → fallback otomatis tawarkan manual search. QR dari event lain (salah scan) → error jelas "Tiket ini bukan untuk event ini".

**Edge Cases:** Lihat PRD Section 20 (race condition dua staff scan bersamaan, refund setelah check-in). Tambahan: device staff offline > 30 menit lalu online kembali dengan konflik data (misal attendee yang sama sudah di-check-in staff lain secara online) → server jadi source of truth, staff device menampilkan hasil sync final (bukan overwrite server).

**Permission:** Check-in (scan/manual) — Owner, Admin, Event Manager, Check-in Staff. Live dashboard view — sama + Finance (view revenue-adjacent context, bukan scan). Lihat Permission Matrix PRD Section 22.

**Dependencies:** Feature 9 (Attendee data), device kamera (browser/PWA permission).

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/v1/events/{id}/checkin/scan` | Bearer (Check-in Staff+) | `{qr_code, scanned_at, device_id}` | `{status: success\|already_checked_in\|invalid\|voided, attendee}` |
| POST | `/v1/events/{id}/checkin/manual` | Bearer | `{attendee_id}` | `{status}` |
| POST | `/v1/events/{id}/checkin/sync-batch` | Bearer | `{checkins: [{qr_code, scanned_at, device_id}]}` (offline queue sync) | `{results: [...]}` |
| GET | `/v1/events/{id}/checkin/live-stats` | Bearer | — | `{checked_in, expected, percentage, hourly_breakdown}` |

**Database Impact:** New table `CheckIn` (1:1 ke `Attendee`, dengan `device_id`, `is_offline_sync`, `scanned_at` vs `synced_at` untuk audit selisih waktu).

**Analytics Event(s):** `attendee_checked_in` (lihat PRD Section 31), `checkin_duplicate_attempt`, `checkin_offline_sync_completed` (properties: `count`, `sync_delay_seconds`).

**QA Test Scenarios:**
- Happy path: Scan QR valid → checked-in, live stats update.
- Edge case: Offline scan 50 attendee, online kembali, semua tersinkron tanpa duplikat.
- Negative case: Scan QR dari tiket yang sudah di-refund → error jelas, tidak checked-in.

**Future Improvement:** Face-recognition check-in opsional (Phase 2+), print badge otomatis saat check-in.

---

## Feature 11: Analytics Overview

**Description:** Dashboard ringkasan performa (revenue, tiket terjual, funnel dasar) di level organisasi (semua event) dan per event.

**User Story:** Sebagai Owner, saya ingin melihat ringkasan performa semua event saya di satu tempat, supaya saya bisa mengambil keputusan cepat tanpa export manual.

**Business Value:** Mendukung retensi (organizer yang punya visibilitas data cenderung lebih aktif) dan menjadi fondasi untuk Advanced Analytics di Phase 2.

**Functional Requirements:**
- FR-11.1: KPI cards di halaman Overview: Total Revenue, Tickets Sold, Total Events, Attendees — dengan perbandingan periode sebelumnya (%).
- FR-11.2: Line chart revenue dengan filter periode (7/30/90 hari, custom range) dan filter metric (Revenue/Tickets/Orders/Attendees).
- FR-11.3: Per-event analytics: revenue breakdown, ticket sales by type, funnel dasar (Event Views → Ticket Page → Checkout → Purchase).
- FR-11.4: Export report (PDF/CSV) untuk periode yang dipilih.

**Non-Functional Requirements:** Dashboard analytics query dari read-replica (bukan primary DB) supaya tidak membebani transactional load dari Checkout (lihat System Architecture PRD Section 26); target load < 2 detik untuk range 90 hari.

**Acceptance Criteria:**
- Given organisasi punya 24 event aktif, When Owner buka Overview, Then KPI cards & chart termuat < 2 detik dengan data akurat sesuai filter periode default (30 hari).
- Given Owner ganti filter ke "Tickets", When chart di-render ulang, Then data merefleksikan jumlah tiket terjual (bukan revenue) per periode yang sama.
- Given Owner export report PDF, When proses selesai, Then file berisi KPI, chart, dan breakdown sesuai periode yang sedang difilter.

**Validation Rules:** Custom date range — `end_date` >= `start_date`, maksimal rentang 1 tahun untuk performa query.

**Error Handling:** Query timeout pada rentang data sangat besar → sistem otomatis sarankan mempersempit rentang tanggal, bukan silent fail.

**Edge Cases:** Organisasi baru tanpa event/tiket terjual → tampilkan empty state informatif ("Belum ada data — publish event pertamamu") bukan chart kosong membingungkan.

**Permission:** Owner, Admin, Event Manager, Finance (lihat Permission Matrix — semua role ini punya akses view analytics/revenue).

**Dependencies:** Feature 8 (Order data sebagai sumber revenue), Feature 4 (Event data).

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/v1/organizations/{id}/analytics/overview` | Bearer | `?period=30d\|90d\|custom&start=&end=` | `{revenue, tickets_sold, events_count, attendees, deltas}` |
| GET | `/v1/organizations/{id}/analytics/revenue-chart` | Bearer | `?metric=revenue\|tickets\|orders\|attendees&period=` | `{series: [...]}` |
| GET | `/v1/events/{id}/analytics` | Bearer | — | `{revenue, ticket_breakdown, funnel}` |
| GET | `/v1/organizations/{id}/analytics/export` | Bearer | `?format=pdf\|csv&period=` | `{export_job_id}` |

**Database Impact:** Tidak ada tabel baru — agregasi read dari `Order`, `OrderItem`, `Attendee`, `Event`. Pertimbangkan materialized view/summary table jika volume besar (optimisasi, bukan blocking untuk MVP awal).

**Analytics Event(s):** `analytics_report_exported` (properties: `format`, `period`).

**QA Test Scenarios:**
- Happy path: KPI & chart akurat sesuai filter.
- Edge case: Organisasi baru tanpa data → empty state, bukan error.
- Negative case: Custom range > 1 tahun → validasi menolak dengan pesan jelas.

**Future Improvement:** Advanced Audience Analytics (demografi, lokasi, behavior) dan Event Health Score — keduanya Phase 2 (lihat Roadmap PRD Section 36).

---

## Feature 12: Notification Center

**Description:** Pusat notifikasi in-app (dengan email untuk kejadian kritikal) yang memberi tahu tim organizer atas peristiwa penting secara real-time.

**User Story:** Sebagai Event Manager, saya ingin mendapat notifikasi saat ada order baru atau tiket hampir habis, supaya saya bisa bereaksi cepat tanpa harus terus-menerus cek dashboard.

**Business Value:** Meningkatkan engagement & responsivitas organizer terhadap event yang sedang berjalan — mendukung retensi.

**Functional Requirements:**
- FR-12.1: Sistem generate notifikasi in-app untuk: order baru, tiket hampir habis (< 10% kuota tersisa), event mendekati kapasitas, refund diproses, member baru join tim, invoice/billing gagal.
- FR-12.2: User bisa mark as read (single/all) dan melihat riwayat notifikasi.
- FR-12.3: Notifikasi kritikal (billing gagal, refund besar) juga dikirim via email, bukan hanya in-app.
- FR-12.4: Notification preference per user (bisa nonaktifkan kategori tertentu, kecuali kategori kritikal yang selalu aktif).

**Non-Functional Requirements:** Notifikasi in-app muncul real-time (< 5 detik dari event trigger) menggunakan WebSocket/SSE atau polling interval pendek.

**Acceptance Criteria:**
- Given order baru masuk, When payment sukses, Then Event Manager & Owner menerima notifikasi in-app < 5 detik.
- Given tiket tersisa < 10%, When threshold tercapai, Then notifikasi "Tiket [nama] hampir habis" dikirim sekali (tidak berulang spam tiap detik).
- Given user nonaktifkan kategori "Marketing" notification (Phase 2 relevant), When event kategori itu terjadi, Then tidak ada notifikasi terkirim ke user tsb, namun kategori kritikal (billing/refund) tetap terkirim.

**Validation Rules:** Tidak ada input form kompleks — preference toggle per kategori, disimpan per `User`.

**Error Handling:** Delivery notifikasi real-time gagal (koneksi WebSocket putus) → fallback ke polling saat reconnect, notifikasi yang terlewat tetap muncul di riwayat (tidak hilang).

**Edge Cases:** User dengan banyak role di banyak organisasi → notifikasi tetap ter-scope dengan benar per organisasi (tidak campur aduk).

**Permission:** Semua role menerima notifikasi relevan dengan aksesnya (misal Check-in Staff tidak menerima notifikasi billing).

**Dependencies:** Feature 8 (Order events), Feature 6 (Ticket quota events), Feature 3 (Billing events), email provider.

**API Requirements:**
| Method | Endpoint | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/v1/users/me/notifications` | Bearer | `?unread_only=&cursor=` | `{notifications: [...], unread_count}` |
| PATCH | `/v1/users/me/notifications/{id}/read` | Bearer | — | `{read: true}` |
| PATCH | `/v1/users/me/notifications/read-all` | Bearer | — | `{marked: n}` |
| GET/PATCH | `/v1/users/me/notification-preferences` | Bearer | `{category: enabled}` | `{preferences}` |

**Database Impact:** New table `Notification` (per `User`, dengan `category`, `read_at`, `payload` JSON), `NotificationPreference`.

**Analytics Event(s):** `notification_sent` (properties: `category`), `notification_clicked`.

**QA Test Scenarios:**
- Happy path: Order baru → notifikasi muncul real-time ke role relevan.
- Edge case: User nonaktifkan kategori non-kritikal, kategori kritikal tetap masuk.
- Negative case: WebSocket putus → notifikasi tetap tersimpan & muncul saat reconnect/polling.

**Future Improvement:** Push notification mobile (saat mobile app dibangun), digest email harian/mingguan (Phase 2).

---

## Phase 2 Modules (Ringkasan Non-Detail)

Modul berikut **di luar scope Release 1** (lihat PRD Section 7 untuk alasan) dan akan mendapat feature spec lengkap terpisah saat masuk perencanaan Phase 2:

- **Marketing** — Campaigns (email/push/social), Promotions terjadwal.
- **Community** — Posts, Comments, Messages, Announcements, Polls.
- **Sponsor Management** — kontrak, tier sponsor, deliverables tracking.
- **Vendor Management** — kontrak vendor, status pembayaran, deliverables.
- **Advanced Audience Analytics** — age, lokasi, interest, behavior segmentation.
- **Event Health Score** — AI-generated scoring & insight lintas event.
- **Event Templates & Duplicate Event**.
- **Integrasi eksternal** — Google Calendar sync, Mailchimp, Meta, Slack, WhatsApp Business API.
