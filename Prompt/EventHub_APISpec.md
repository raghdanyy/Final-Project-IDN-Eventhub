# EventHub — API Specification (Release 1 / MVP)

Companion document to `EventHub_PRD.md`. Base URL: `https://api.eventhub.io/v1`.

**Auth conventions:**
- `Bearer` = JWT access token wajib, request otomatis di-scope ke `organization_id` yang terkandung di token (multi-tenant isolation, lihat FR-SYS-1).
- `Bearer (Role)` = selain login, role user harus sesuai Permission Matrix (PRD Section 22) atau request ditolak `403`.
- `Public/session` = tidak perlu akun EventHub, tapi pakai checkout session token sementara (untuk Consumer App / storefront).
- `Signature-verified` = request dari pihak ketiga (payment gateway webhook) diverifikasi via HMAC signature header, bukan JWT.

**Error format standar:**
```json
{ "error": { "code": "TICKET_SOLD_OUT", "message": "Tiket ini sudah habis", "details": {} } }
```

---

## Auth & Onboarding

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/auth/register` | None | `{email, password, full_name}` | `201 {user_id, verification_sent}` | `400 EMAIL_TAKEN`, `400 VALIDATION_ERROR` |
| POST | `/auth/login` | None | `{email, password}` | `200 {access_token, refresh_token, user}` | `401 INVALID_CREDENTIALS` |
| POST | `/auth/google` | None | `{id_token}` | `200 {access_token, refresh_token, user}` | `401 INVALID_GOOGLE_TOKEN` |
| POST | `/auth/refresh` | Refresh cookie | — | `200 {access_token}` | `401 REFRESH_EXPIRED` |
| POST | `/auth/verify-email` | None | `{token}` | `200 {verified: true}` | `400 TOKEN_EXPIRED` |
| POST | `/auth/forgot-password` | None | `{email}` | `200 {sent: true}` | — (selalu 200 untuk mencegah email enumeration) |
| POST | `/auth/reset-password` | None | `{token, new_password}` | `200 {reset: true}` | `400 TOKEN_EXPIRED` |
| POST | `/organizations` | Bearer | `{name, category}` | `201 {organization_id, name, owner_id}` | `400 VALIDATION_ERROR` |

## Team & Role Management

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/organizations/{id}/invites` | Bearer (Owner/Admin) | `{email, role}` | `201 {invite_id, status}` | `409 ALREADY_MEMBER` |
| GET | `/organizations/{id}/invites` | Bearer (Owner/Admin) | — | `200 {invites: [...]}` | — |
| POST | `/invites/{token}/accept` | Bearer | — | `200 {organization_id, role}` | `400 TOKEN_EXPIRED` |
| GET | `/organizations/{id}/members` | Bearer | — | `200 {members: [...]}` | — |
| PATCH | `/organizations/{id}/members/{member_id}` | Bearer (Owner/Admin) | `{role}` | `200 {member_id, role}` | `403 CANNOT_MODIFY_OWNER` |
| DELETE | `/organizations/{id}/members/{member_id}` | Bearer (Owner/Admin) | — | `200 {removed: true}` | `403 CANNOT_REMOVE_OWNER` |

## Subscription & Billing

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| GET | `/organizations/{id}/subscription` | Bearer | — | `200 {tier, status, current_period_end}` | — |
| POST | `/organizations/{id}/subscription/upgrade` | Bearer (Owner/Admin) | `{target_tier, payment_method_id}` | `200 {subscription, invoice}` | `402 PAYMENT_DECLINED` |
| POST | `/organizations/{id}/subscription/downgrade` | Bearer (Owner/Admin) | `{target_tier}` | `200 {effective_at}` | `400 EXCEEDS_TARGET_LIMIT` |
| GET | `/organizations/{id}/invoices` | Bearer | — | `200 {invoices: [...]}` | — |
| GET | `/organizations/{id}/payout-balance` | Bearer | — | `200 {balance, currency, last_settlement}` | — |
| GET | `/organizations/{id}/settlements` | Bearer (Owner/Admin/Finance) | `?event_id=` | `200 {settlements: [...]}` | — |

## Event Management

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/events` | Bearer (Owner/Admin/Event Manager) | `{name, description, category, cover_image_url, event_type}` | `201 {event_id, status: draft}` | `400 VALIDATION_ERROR` |
| GET | `/events` | Bearer | `?status=&cursor=` | `200 {events: [...], next_cursor}` | — |
| GET | `/events/{id}` | Bearer | — | `200 {event}` | `404 NOT_FOUND` |
| PATCH | `/events/{id}` | Bearer (Owner/Admin/Event Manager) | `{...fields}` | `200 {event}` | `400 VALIDATION_ERROR` |
| POST | `/events/{id}/publish` | Bearer (Owner/Admin/Event Manager) | — | `200 {status: published}` | `400 MISSING_TICKET_TYPE`, `400 MISSING_VENUE` |
| POST | `/events/{id}/cancel` | Bearer (Owner/Admin) | `{reason}` | `200 {status: cancelled, refunds_triggered}` | — |
| DELETE | `/events/{id}` | Bearer (Owner/Admin) | — (hanya untuk draft) | `200 {deleted: true}` | `400 CANNOT_DELETE_PUBLISHED` |

## Event Content (Schedule & Speaker)

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/events/{id}/sessions` | Bearer | `{title, description, start_time, end_time}` | `201 {session_id}` | `400 TIME_OUT_OF_RANGE` |
| GET | `/events/{id}/sessions` | Bearer/Public | — | `200 {sessions: [...]}` sorted by start_time | — |
| PATCH | `/events/{id}/sessions/{session_id}` | Bearer | `{...fields}` | `200 {session}` | `400 VALIDATION_ERROR` |
| DELETE | `/events/{id}/sessions/{session_id}` | Bearer | — | `200 {deleted: true}` | — |
| POST | `/events/{id}/speakers` | Bearer | `{name, title, company, photo_url, social_links}` | `201 {speaker_id}` | `400 VALIDATION_ERROR` |
| POST | `/events/{id}/sessions/{session_id}/speakers` | Bearer | `{speaker_id}` | `200 {assigned: true}` | — |

## Ticket Management

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/events/{id}/ticket-types` | Bearer (Owner/Admin/Event Manager) | `{name, price, quantity_total, sale_start, sale_end, benefits, refund_policy, transferable}` | `201 {ticket_type_id}` | `400 VALIDATION_ERROR` |
| GET | `/events/{id}/ticket-types` | Bearer/Public | — | `200 {ticket_types: [{..., quantity_sold, quantity_remaining, status}]}` | — |
| PATCH | `/events/{id}/ticket-types/{tt_id}` | Bearer (Owner/Admin/Event Manager) | `{...fields}` | `200 {ticket_type}` | `400 BELOW_SOLD_QUANTITY` |
| POST | `/events/{id}/ticket-types/{tt_id}/deactivate` | Bearer | — | `200 {status: inactive}` | — |

## Promo Codes

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/events/{id}/promo-codes` | Bearer (Owner/Admin/Event Manager) | `{code, discount_type, discount_value, applicable_ticket_type_ids, usage_limit, per_user_limit, valid_until}` | `201 {promo_code_id}` | `409 CODE_TAKEN` |
| GET | `/events/{id}/promo-codes` | Bearer | — | `200 {promo_codes: [{..., usage_count}]}` | — |
| PATCH | `/events/{id}/promo-codes/{pc_id}` | Bearer | `{...fields}` | `200 {promo_code}` | — |
| POST | `/checkout/validate-promo` | Public/session | `{code, ticket_type_id}` | `200 {valid, discount_amount}` | `400 CODE_EXPIRED`, `400 CODE_LIMIT_REACHED`, `400 CODE_NOT_APPLICABLE` |

## Checkout & Order Management

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/checkout/sessions` | Public/session | `{ticket_type_id, quantity, promo_code?}` | `201 {checkout_session_id, expires_at, reserved_quantity}` | `409 TICKET_SOLD_OUT` |
| POST | `/checkout/sessions/{id}/complete` | Public/session | `{buyer_name, buyer_email, buyer_phone, payment_method}` | `200 {order_id, payment_redirect_url}` | `400 SESSION_EXPIRED` |
| POST | `/webhooks/payment-callback` | Signature-verified | `{gateway_order_id, status, amount}` | `200 OK` | `400 INVALID_SIGNATURE` |
| GET | `/events/{id}/orders` | Bearer (Owner/Admin/Event Manager/Finance) | `?status=&cursor=` | `200 {orders: [...], next_cursor}` | — |
| GET | `/orders/{id}` | Bearer | — | `200 {order, items, attendees}` | `404 NOT_FOUND` |
| POST | `/orders/{id}/refund` | Bearer (Owner/Admin/Finance) | `{amount, reason}` | `200 {refund_id, status}` | `400 EXCEEDS_PAID_AMOUNT` |

## Attendee Management

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| GET | `/events/{id}/attendees` | Bearer | `?search=&ticket_type_id=&checkin_status=&cursor=` | `200 {attendees: [...], next_cursor}` | — |
| POST | `/events/{id}/attendees/manual` | Bearer (Owner/Admin/Event Manager) | `{name, email, ticket_type_id}` | `201 {attendee_id}` | `409 TICKET_SOLD_OUT` |
| GET | `/attendees/{id}` | Bearer | — | `200 {attendee, order, checkin_history}` | `404 NOT_FOUND` |
| GET | `/events/{id}/attendees/export` | Bearer (Owner/Admin/Event Manager) | — | `202 {export_job_id}` | — |
| GET | `/exports/{job_id}` | Bearer | — | `200 {status, download_url}` | — |

## Check-in

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/events/{id}/checkin/scan` | Bearer (Owner/Admin/Event Manager/Check-in Staff) | `{qr_code, scanned_at, device_id}` | `200 {status: success\|already_checked_in\|invalid\|voided, attendee}` | `404 QR_NOT_FOUND` |
| POST | `/events/{id}/checkin/manual` | Bearer | `{attendee_id}` | `200 {status}` | `409 ALREADY_CHECKED_IN` |
| POST | `/events/{id}/checkin/sync-batch` | Bearer | `{checkins: [{qr_code, scanned_at, device_id}]}` | `200 {results: [...]}` | — |
| GET | `/events/{id}/checkin/live-stats` | Bearer | — | `200 {checked_in, expected, percentage, hourly_breakdown}` | — |

## Analytics

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| GET | `/organizations/{id}/analytics/overview` | Bearer (Owner/Admin/Event Manager/Finance) | `?period=30d\|90d\|custom&start=&end=` | `200 {revenue, tickets_sold, events_count, attendees, deltas}` | `400 RANGE_TOO_LARGE` |
| GET | `/organizations/{id}/analytics/revenue-chart` | Bearer | `?metric=&period=` | `200 {series: [...]}` | — |
| GET | `/events/{id}/analytics` | Bearer | — | `200 {revenue, ticket_breakdown, funnel}` | — |
| GET | `/organizations/{id}/analytics/export` | Bearer | `?format=pdf\|csv&period=` | `202 {export_job_id}` | — |

## Notification Center

| Method | Endpoint | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| GET | `/users/me/notifications` | Bearer | `?unread_only=&cursor=` | `200 {notifications: [...], unread_count}` | — |
| PATCH | `/users/me/notifications/{id}/read` | Bearer | — | `200 {read: true}` | — |
| PATCH | `/users/me/notifications/read-all` | Bearer | — | `200 {marked: n}` | — |
| GET | `/users/me/notification-preferences` | Bearer | — | `200 {preferences}` | — |
| PATCH | `/users/me/notification-preferences` | Bearer | `{category: enabled}` | `200 {preferences}` | `400 CANNOT_DISABLE_CRITICAL` |

## Rate Limiting

| Endpoint group | Limit |
|---|---|
| `/auth/*` | 10 req/menit per IP |
| `/checkout/*` | 30 req/menit per IP, dengan CAPTCHA challenge di atas threshold suspicious (lihat Security PRD Section 28) |
| `/events/{id}/checkin/*` | 300 req/menit per device_id (mengakomodasi scan cepat berturut-turut) |
| Semua endpoint dashboard lain | 100 req/menit per user |
