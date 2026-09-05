# Database Specification

## 1. Relational Schema Overview

The database is built on **PostgreSQL** managed via **Prisma ORM**. The data models support single-branch operation out-of-the-box while accommodating future multi-branch expansion.

---

## 2. Prisma Schema Definition

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Branch {
  id           String        @id @default(cuid())
  name         String
  slug         String        @unique
  address      String
  phone        String
  email        String
  openingHours Json
  isActive     Boolean       @default(true)
  categories   Category[]
  items        MenuItem[]
  reservations Reservation[]
  events       Event[]
  users        User[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Category {
  id           String     @id @default(cuid())
  branchId     String?
  branch       Branch?    @relation(fields: [branchId], references: [id], onDelete: Cascade)
  name         String
  slug         String
  displayOrder Int        @default(0)
  items        MenuItem[]
}

model MenuItem {
  id           String   @id @default(cuid())
  categoryId   String
  category     Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  branchId     String?
  branch       Branch?  @relation(fields: [branchId], references: [id], onDelete: Cascade)
  title        String
  description  String
  price        Decimal  @db.Decimal(10, 2)
  currency     String   @default("USD")
  imageUrl     String?
  dietaryFlags String[]
  isAvailable  Boolean  @default(true)
  isFeatured   Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Reservation {
  id           String            @id @default(cuid())
  branchId     String?
  branch       Branch?           @relation(fields: [branchId], references: [id], onDelete: Cascade)
  customerName String
  email        String
  phone        String
  partySize    Int
  date         DateTime
  timeSlot     String
  status       ReservationStatus @default(PENDING)
  specialNotes String?
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
}

enum ReservationStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

model Event {
  id          String   @id @default(cuid())
  branchId    String?
  branch      Branch?  @relation(fields: [branchId], references: [id], onDelete: Cascade)
  title       String
  slug        String   @unique
  description String
  imageUrl    String?
  startDate   DateTime
  endDate     DateTime
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
}

enum Role {
  SUPER_ADMIN
  BRANCH_MANAGER
  STAFF
  CUSTOMER
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(STAFF)
  branchId  String?
  branch    Branch?  @relation(fields: [branchId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 3. Database Indexes

- `MenuItem`: Index on `(categoryId, isAvailable)` for fast menu grid queries.
- `Reservation`: Index on `(date, status)` for admin dashboard filtering.
- `Event`: Index on `(startDate, isPublished)` for upcoming event listings.
