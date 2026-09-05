# Deployment & Operations Strategy

## 1. Hosting Architecture: Vercel

The application is deployed on **Vercel**, optimized natively for Next.js App Router applications with global Edge CDN distribution.

---

## 2. Environment Configurations

| Variable Name | Environment Scope | Purpose |
|---|---|---|
| `DATABASE_URL` | Server Only | PostgreSQL Connection String |
| `NEXTAUTH_SECRET` | Server Only | JWT Encryption Secret |
| `NEXTAUTH_URL` | Server Only | Canonical Application Base URL |
| `NEXT_PUBLIC_SITE_URL` | Public / Client | Canonical URL for OG metadata |
| `CLOUDINARY_URL` | Server Only | Media Hosting Credentials |

---

## 3. Deployment Pipeline & CI/CD
1. **Pull Request**: Automatic Vercel Preview Deployment created for visual review and regression testing.
2. **Database Migration**: Execute `npx prisma migrate deploy` in build step.
3. **Production Deployment**: Merges to `main` trigger production deployment with CDN invalidation.
