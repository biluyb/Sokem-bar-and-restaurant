# Task 007: Online Table Reservation Engine

## Objective
Develop the public table reservation request system (`src/app/(public)/reservations/page.tsx`) with form validation, date/time selection, and submission confirmation feedback.

---

## Action Items

- [ ] Define Zod validation schema in `src/lib/validators/reservation.ts`.
- [ ] Build `ReservationForm` using `react-hook-form` + `@hookform/resolvers/zod`:
  - Party size selector (1-20 guests).
  - Accessible Date Picker.
  - Time slot selection buttons (Lunch & Dinner slots).
  - Contact inputs (Full Name, Email, Phone Number).
  - Special Requests text area (Dietary allergies, seating preferences).
- [ ] Implement Server Action `submitReservation` for processing submissions.
- [ ] Build Confirmation screen / modal with reservation summary and reference ID.

---

## Deliverables & Acceptance Criteria
- Full client-side and server-side validation feedback.
- Accessible error announcements via `aria-live`.
