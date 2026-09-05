# API & Data Fetching Architecture

## 1. Data Mutation Pattern: Next.js Server Actions

Server Actions are used for processing form submissions and administrative updates. They run server-side and automatically update UI state.

---

## 2. Server Action Interfaces

### 2.1 Reservation Submission (`submitReservation`)
- **Input Schema**:
  ```ts
  const ReservationSchema = z.object({
    customerName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    partySize: z.number().min(1).max(20),
    date: z.string(),
    timeSlot: z.string(),
    specialNotes: z.string().optional(),
  });
  ```
- **Response**: `{ success: boolean; reservationId?: string; error?: string }`

### 2.2 Admin Menu Availability Toggle (`toggleMenuItemAvailability`)
- **Input**: `{ id: string; isAvailable: boolean }`
- **Security Guard**: Middleware role validation (`SUPER_ADMIN` or `BRANCH_MANAGER`).

---

## 3. Public Route Handlers (`/api/v1/...`)

Used primarily for external integrations or lightweight client-side polling.

- `GET /api/v1/menu`: Returns JSON menu grouped by categories.
- `GET /api/v1/events`: Returns upcoming published events.
- `POST /api/v1/contact`: Processes customer contact inquiries.
