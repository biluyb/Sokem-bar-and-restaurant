# Task 001: Project Foundation & Tooling Setup

## Objective
Initialize the core Next.js 14 project, configure TypeScript, setup Tailwind CSS styling engine, establish directory structure, and define central site configuration.

---

## Action Items

- [ ] Initialize Next.js 14 App Router project with TypeScript (`npm init` / `create-next-app`).
- [ ] Configure `tailwind.config.ts` with brand color palette (deep slate `#0F172A`, gold `#F59E0B`), typography, and container utilities.
- [ ] Setup `src/config/site.ts` containing all central business placeholders (`SOKEM_CONFIG.name`, `SOKEM_CONFIG.address`, `SOKEM_CONFIG.phone`, `SOKEM_CONFIG.hours`).
- [ ] Configure `tsconfig.json` path aliases (`@/*` pointing to `./src/*`).
- [ ] Create root layout `src/app/layout.tsx` with Google Font integration (`Outfit` + `Inter`).
- [ ] Verify build passes cleanly via `npm run build`.

---

## Deliverables & Acceptance Criteria
- Zero TypeScript or lint errors.
- Base layout renders dark slate background with proper typography tokens.
