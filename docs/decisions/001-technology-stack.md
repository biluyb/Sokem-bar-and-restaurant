# ADR 001: Technology Stack Selection

## Context & Problem Statement
The Sokem Bar & Restaurant website requires a modern full-stack web application that delivers exceptional visual aesthetics, fast load times, accessibility, and high search engine ranking for public visitors, while supporting real-time management workflows for restaurant staff and future online ordering.

---

## Decision Drivers
- **SEO & Performance**: Initial page renders must be server-driven (RSC) to maximize Lighthouse performance and search engine indexability.
- **Developer Velocity & Type Safety**: End-to-end type safety between backend schemas and frontend UI components.
- **Future Extensibility**: Seamless support for authentication, database mutations, admin workflows, and payment APIs without restructuring the codebase.

---

## Considered Options
1. **Single Page Application (Vite + React)** with separate Express API server.
2. **Next.js 14+ App Router (React, TypeScript, Tailwind CSS)**.
3. **Traditional CMS (WordPress / Craft CMS)**.

---

## Decision Outcome
**Chosen Option**: **Next.js 14+ App Router (React, TypeScript, Tailwind CSS)**.

### Rationale
- **Unified Full-Stack Architecture**: Eliminates the need to maintain separate frontend and backend deployments.
- **Server Components & Server Actions**: Maximizes SEO performance by streaming HTML from the edge while offering secure server-side mutation handlers.
- **Ecosystem Maturity**: Native compatibility with Vercel, Prisma ORM, NextAuth, and Tailwind CSS.
