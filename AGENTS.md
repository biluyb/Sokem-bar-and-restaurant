# AGENTS.md — Engineering Guidelines for AI & Human Developers

This document serves as the authoritative source of engineering standards, architecture decisions, and operational conventions for the **Sokem Bar & Restaurant** codebase. All AI coding agents and human developers working on this project MUST follow these instructions.

---

## 1. Project Purpose
The Sokem Bar & Restaurant web application provides a high-impact, visual, responsive, accessible, and SEO-optimized public portal for visitors, alongside a robust administrative backend for restaurant management (menu, reservations, events, gallery, promotions, online ordering, and multi-branch operations).

---

## 2. Technology Stack
- **Framework**: Next.js 14+ (App Router, Server Components & Server Actions)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Framer Motion (Micro-animations) + Lucide React Icons
- **Database & ORM**: PostgreSQL (Supabase / Neon) + Prisma ORM
- **Authentication**: NextAuth.js / Supabase Auth (Role-Based Access Control)
- **Validation**: Zod + React Hook Form
- **Hosting & Deployment**: Vercel

---

## 3. Architecture Principles
- **Server-First Data Fetching**: Prefer React Server Components (RSC) for initial page loads and SEO. Use Client Components (`"use client"`) only for interactive UI state.
- **Server Actions for Mutations**: Use Next.js Server Actions for form submissions and state mutations instead of custom REST API boilerplate whenever applicable.
- **Modular & Feature-Focused**: Group logic by domain/feature. Keep UI components presentationally focused and decoupled from data storage implementation details.
- **Future-Proof Scalability**: Data models and utility functions must account for multi-branch operation, role-based authorization, and future online ordering without structural overhauls.

---

## 4. Folder Structure Conventions
```
sokem-bar-and-restaurant/
├── public/                 # Static assets (images, favicon, robots.txt)
├── src/
│   ├── app/                # App Router pages, layouts, server actions, route handlers
│   │   ├── (public)/       # Public marketing routes (Home, Menu, Booking, Events, Gallery, Contact)
│   │   ├── (auth)/         # Authentication routes (Login, Reset)
│   │   ├── (admin)/        # Protected Admin Dashboard routes
│   │   └── api/            # External integration endpoints & webhooks
│   ├── components/         # Reusable React components
│   │   ├── ui/             # Generic atomic elements (Button, Input, Modal, Card, Badge)
│   │   ├── layout/         # Shell components (Header, Footer, Nav, MobileDrawer)
│   │   ├── sections/       # Page-specific composite sections (Hero, MenuGrid, ReservationForm)
│   │   └── admin/          # Management UI widgets (DataTable, AdminHeader, StatusToggle)
│   ├── config/             # Site metadata, placeholders, navigation configs
│   ├── db/                 # Prisma database client singleton & helper functions
│   ├── lib/                # Shared utilities, formatters, and Zod schemas
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript interfaces and global type definitions
│   └── styles/             # Global CSS and Tailwind custom theme setup
└── prisma/                 # Schema models & migration files
```

---

## 5. TypeScript Conventions
- Enable `strict: true` in `tsconfig.json`. Do NOT use `any`; use `unknown` or explicit generic types if a type is undetermined.
- Export shared interface and type definitions from `@/types` or adjacent module files.
- Prefer `type` for simple unions/aliases and `interface` for expandable object models.
- Avoid non-null assertions (`!`). Use explicit guard conditions or optional chaining (`?.`).

---

## 6. React & Next.js Conventions
- Use functional components with explicit TypeScript props definitions.
- Mark interactive components explicitly with `"use client"` at the top of the file. Keep the client boundary as low in the component tree as possible.
- Use `next/image` for all images to ensure responsive sizing and dynamic WebP optimization.
- Use `next/font` for web font loading to prevent Layout Shifts (CLS).
- Define dynamic metadata per page via Next.js `generateMetadata` or static `metadata` objects.

---

## 7. Component Design & Reuse
- **Atomic Composition**: Build UI primitives in `src/components/ui/` first (e.g. `Button`, `Modal`, `Input`), then compose section components.
- **Prop Interface Standard**: Pass explicit props; avoid passing un-typed blob objects when only a few fields are used.
- **Single Responsibility**: Each component file should export one primary component.

---

## 8. Styling Conventions
- **Palette**: Dark luxury aesthetic tailored for a high-end bar & restaurant (deep slate `#0F172A`, rich amber/gold `#F59E0B` accents, dark glassmorphism).
- **Tailwind Utility Classes**: Prefer utility classes over inline styles. Use the `cn()` helper (`clsx` + `tailwind-merge`) for conditional class joining.
- Avoid hardcoded pixel values where Tailwind spacing or design tokens apply (`px-4`, `py-6`, `gap-4`).

---

## 9. Responsive Design
- Mobile-first approach: Write default mobile styles first, then build up using `sm:`, `md:`, `lg:`, `xl:` breakpoints.
- Touch-friendly targets: All interactive elements on mobile must have a minimum touch target size of 44x44px.
- Test layouts across 375px (Mobile), 768px (Tablet), and 1440px+ (Desktop).

---

## 10. Accessibility (a11y)
- Use HTML5 semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- Ensure keyboard focus visibility (`focus-visible:outline-none focus-visible:ring-2`).
- Include ARIA attributes (`aria-label`, `aria-expanded`, `aria-controls`) on dynamic elements like mobile drawers, modals, and tabs.
- Ensure color contrast ratios meet WCAG 2.1 AA standards.

---

## 11. SEO & Social Sharing Strategy
- Include dynamic page `<title>`, `<meta description>`, OpenGraph image metadata, and canonical links.
- Inject Schema.org JSON-LD structured data on relevant routes (`Restaurant`, `FoodMenu`, `Event`).
- Ensure every page has exactly one `<h1>` heading.

---

## 12. Performance
- Target Lighthouse Performance score > 90 and First Contentful Paint (FCP) < 1.0s.
- Lazy load non-critical below-the-fold components and third-party scripts.
- Avoid large client-side dependencies when lightweight native alternatives exist.

---

## 13. Security
- Never expose private keys or credentials in client-side code or public repositories.
- Use `process.env.NEXT_PUBLIC_*` strictly for public environment variables.
- Enforce Role-Based Access Control (RBAC) in server middleware for `/admin` routes.
- Sanitize and validate all incoming inputs using Zod to prevent XSS and SQL injection.

---

## 14. Environment Variables
- Maintain an `.env.example` file detailing required environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `CLOUDINARY_URL`, etc.).
- Never commit actual `.env` or `.env.local` files to Git.

---

## 15. Database Conventions
- Name tables in `snake_case` or Prisma model defaults (`CamelCase` mapped to database pluralized tables).
- Always include `createdAt` and `updatedAt` timestamps on core tables.
- Write migrations cleanly via Prisma CLI (`npx prisma migrate dev`).

---

## 16. API & Data Conventions
- Use Next.js Server Actions for state mutations (e.g. form processing).
- Use Route Handlers (`/api/v1/...`) for external integrations, webhooks, or JSON APIs.
- Return structured JSON responses with explicit HTTP status codes (`200 OK`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `500 Internal Error`).

---

## 17. Authentication & Authorization
- Store administrative sessions in HTTP-only, SameSite, Secure cookies.
- Protect all `/admin` routes via Next.js Edge Middleware.
- Validate permissions per request on the server, not just in UI component display logic.

---

## 18. Error Handling
- Never catch exceptions silently. Log server errors and return human-friendly error messages to the client.
- Provide custom fallback error boundaries (`error.tsx`) and 404 pages (`not-found.tsx`).
- Use toast notifications or localized alert banners for form validation and submission errors.

---

## 19. Input Validation
- Define Zod validation schemas in `src/lib/validators/`.
- Validate user input on both the client (for UX feedback) and the server (for security).

---

## 20. Testing & Quality Assurance
- Run `npm run build` or `npx next build` to verify type safety and compilation before submitting code.
- Write unit tests for business utilities and Zod schema validations.
- Verify key user interactions (Menu filtering, Reservation form submission, Admin toggle) manually or via E2E tests.

---

## 21. Git Practices
- Maintain clean, descriptive commit messages (e.g. `feat(menu): add dietary filtering controls`, `fix(auth): enforce RBAC middleware on admin routes`).
- Do not commit generated build folders (`.next`, `dist`, `node_modules`).

---

## 22. Dependency Management
- Keep dependencies minimal. Justify any new package addition.
- Prefer built-in Web APIs, native React hooks, and standard Tailwind utilities over adding small third-party helper libraries.

---

## 23. Documentation
- Keep inline code comments concise and meaningful. Document *why* complex decisions were made, not what self-explanatory code does.
- Update `AGENTS.md` or central configuration docs when introducing new architectural patterns.

---

## 24. Code Duplication & Abstraction Discipline
- **Avoid Duplication (DRY)**: Re-use UI components from `src/components/ui/` and helper functions from `src/lib/`.
- **Avoid Unnecessary Abstractions**: Do not introduce multi-layered abstraction wrappers around simple standard library calls. Prefer simple, readable, maintainable solutions over clever hacks.
- **Avoid Premature Optimization**: Write clean, straightforward code first; optimize bottlenecks only when measured.

---

## 25. Sokem Business Data & Placeholders
- **NEVER INVENT REAL BUSINESS DETAILS**: Do not guess physical addresses, phone numbers, email addresses, operating hours, prices, menu items, or social media links.
- Use central placeholders defined in `src/config/site.ts` (e.g. `SOKEM_CONFIG.address`, `SOKEM_CONFIG.phone`).

---

## 26. Browser Testing & Definition of Done
- A feature is considered **Done** ONLY when:
  1. The code compiles without TypeScript or build errors (`npx next build`).
  2. The code adheres to all guidelines in this document.
  3. The UI is tested and visually verified across desktop and mobile viewports.
  4. No placeholder text is hardcoded outside of `src/config/site.ts`.
  5. Empirical runtime verification passes cleanly.

---

## 27. MANDATORY AI-AGENT BEHAVIOR RULES
1. **Inspect before modifying**: Always inspect repository structure, existing files, and component signatures before editing or adding code.
2. **Reuse existing components**: Check `src/components/` before creating a new UI component.
3. **Do not duplicate functionality**: Audit helper functions in `src/lib/` before writing custom utilities.
4. **Do not introduce dependencies without justification**: Avoid adding NPM packages unless absolutely necessary.
5. **Do not rewrite working code unnecessarily**: Make targeted edits; preserve unaffected logic and comments.
6. **Do not change architecture casually**: Adhere strictly to Next.js 14 App Router standards and server/client boundary guidelines.
7. **Do not invent business data**: Use placeholder constants from `src/config/site.ts`.
8. **Keep changes focused**: Modify only files directly related to the user request.
9. **Run validation after implementation**: Execute build/type checks (`npx next build` or equivalent) before declaring completion.
10. **Report summary of work**: Provide a clear list of created/modified files and validation results.
11. **Ask for clarification when ambiguous**: If a requirement has significant architectural or business impact, stop and ask the user.
12. **Prefer simplicity**: Choose clean, maintainable code over complex tricks.
