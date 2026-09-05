# SEO & OpenGraph Strategy

## 1. Dynamic Page Metadata Architecture

Every page utilizes Next.js `metadata` or `generateMetadata` API to deliver tailored meta titles, descriptions, canonical URLs, and preview images.

```ts
export const metadata: Metadata = {
  title: "Sokem Bar & Restaurant | Premier Dining & Cocktail Experience",
  description: "Experience exquisite culinary offerings, handcrafted cocktails, and unforgettable ambience at Sokem Bar & Restaurant.",
  openGraph: {
    title: "Sokem Bar & Restaurant",
    description: "Premier dining, handcrafted cocktails, and live events.",
    images: [{ url: "/images/og-main.jpg", width: 1200, height: 630, alt: "Sokem Bar & Restaurant" }],
  },
};
```

---

## 2. Schema.org JSON-LD Structured Data

Structured data is injected via `<script type="application/ld+json">` tags on relevant routes:

- **Homepage**: `@type: Restaurant` (name, image, openingHoursSpecification, priceRange, address placeholder).
- **Menu Page**: `@type: FoodMenu` with nested `MenuItem` schemas.
- **Events Page**: `@type: Event` (name, startDate, location, image).

---

## 3. Search Indexing Assets
- Automated `src/app/sitemap.ts` generates dynamic sitemap XML.
- Automated `src/app/robots.ts` directs search engine crawlers.
