# ADR 002: Multi-Branch Relational Database Schema Design

## Context & Problem Statement
The Sokem Bar & Restaurant platform needs a structured persistence layer to manage menu items, categories, customer table reservations, upcoming events, and administrative staff accounts. While launching initially for a single flagship location, the schema must accommodate future multi-branch expansion without breaking schema migrations.

---

## Decision Drivers
- Relational integrity between Menu Categories, Menu Items, Branches, and Reservations.
- Type-safe query building and automated schema migration management.
- Cloud database hosting compatibility (Supabase / Neon PostgreSQL).

---

## Decision Outcome
**Chosen Option**: **PostgreSQL + Prisma ORM with Multi-Branch Foreign Keys**.

### Rationale
- **Relational Integrity**: Foreign key constraints ensure cascading deletions (e.g. deleting a menu category cleanly handles associated items).
- **Prisma ORM Type Safety**: Auto-generated TypeScript types derived directly from `schema.prisma`.
- **Multi-Branch Preparedness**: Including `branchId` optional foreign keys across core entities enables location-specific filtering when multi-branch features are enabled in Phase 4.
