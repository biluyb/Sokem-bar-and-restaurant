# Task 008: Admin Dashboard & Content Management System

## Objective
Construct the protected administrative backend (`src/app/(admin)/...`) for managing restaurant data, updating menu availability, and managing reservations.

---

## Action Items

- [ ] Configure Next.js Middleware (`middleware.ts`) enforcing session authentication on `/admin/:path*`.
- [ ] Build `/admin/login` page with secure credentials authentication.
- [ ] Build Admin Layout shell with sidebar navigation (`Dashboard`, `Menu Manager`, `Reservations`, `Events`).
- [ ] Implement `MenuManagerTable`: Searchable, filterable list of menu items with instant availability toggle switches (`In Stock` / `Out of Stock`) and edit modals.
- [ ] Implement `ReservationManagerTable`: Filterable list of incoming customer reservations with status update controls (`Confirm`, `Cancel`, `Complete`).

---

## Deliverables & Acceptance Criteria
- `/admin` routes completely inaccessible to unauthenticated users.
- Menu availability toggles update UI state in real-time.
