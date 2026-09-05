# Security & Auth Strategy

## 1. Authentication Architecture
- Admin authentication is handled via **NextAuth.js (Auth.js v5)** using credentials strategy (email + bcrypt-hashed password) or **Supabase Auth**.
- Session data is stored in HTTP-only, `SameSite=Lax`, `Secure` cookies to prevent XSS session theft.

---

## 2. Authorization & RBAC Middleware
- All routes matching `/admin/:path*` are guarded by Next.js Edge Middleware (`middleware.ts`).
- Requests without a valid session token are redirected immediately to `/admin/login`.
- Role verification ensures `STAFF` users cannot delete records or edit system settings.

---

## 3. Data Sanitization & Protection
- All user inputs are validated against strict **Zod** schemas to prevent XSS attack vectors.
- Database access via **Prisma ORM** uses parameterized queries to eliminate SQL injection vulnerabilities.
- Rate limiting on public API endpoints (Reservations, Contact form) prevents automated spam attacks.

---

## 4. Security Headers Configuration (`next.config.mjs`)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` enforcing strict script and image domain sources.
