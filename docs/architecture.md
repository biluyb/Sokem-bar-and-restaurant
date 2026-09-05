# Architecture Specification

## 1. High-Level Architecture Overview

The Sokem Bar & Restaurant website is built using Next.js 14 (App Router) as a unified full-stack web application. It leverages React Server Components (RSC) for fast initial rendering and SEO optimization, while deploying Client Components strictly for interactive UI controls.

```
+-----------------------------------------------------------------------+
|                             Vercel Edge CDN                           |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                      Next.js 14 App Router                            |
|                                                                       |
|  +---------------------------+   +---------------------------------+  |
|  |   (public) Marketing      |   |   (admin) Protected Dashboard   |  |
|  |   Home, Menu, Bookings    |   |   Menu CRUD, Reservations       |  |
|  +---------------------------+   +---------------------------------+  |
|               |                                  |                    |
|               v                                  v                    |
|  +---------------------------+   +---------------------------------+  |
|  |   Server Actions          |   |   Edge Middleware (RBAC Auth)   |  |
|  +---------------------------+   +---------------------------------+  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                   Prisma ORM & PostgreSQL Database                    |
|                     (Supabase / Neon Multi-Branch)                    |
+-----------------------------------------------------------------------+
```

---

## 2. Component Boundary Principles

### 2.1 React Server Components (RSC) — Default
- Used for all marketing pages, static text, layout wrappers, and initial server-side data fetching.
- Benefits: Zero JavaScript sent to client for presentation code, optimal First Contentful Paint (FCP), perfect search engine crawlability.

### 2.2 Client Components (`"use client"`) — Interactive Boundaries
- Used strictly for components requiring state (`useState`, `useEffect`), event handlers (`onClick`, `onChange`), or browser APIs (modals, search bars, drawer toggles).
- Kept low in the component hierarchy to minimize bundle sizes.

---

## 3. Data Mutation Strategy: Server Actions
- Form submissions (Reservations, Contact messages, Admin login, Menu item availability toggles) leverage Next.js **Server Actions**.
- Eliminates custom REST controller boilerplate and provides strict end-to-end TypeScript validation via Zod schemas.

---

## 4. Multi-Branch Extensibility Pattern
- All core entities (`MenuItem`, `Category`, `Reservation`, `Event`) include an optional `branchId` foreign key.
- Unspecified `branchId` defaults to the main flagship branch, while allowing multi-tenant scoping when expanded.
