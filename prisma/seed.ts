/**
 * Prisma Database Seeder
 * Seeds initial admin user, a demo staff user, menu categories,
 * menu items, gallery items, events, and site content.
 *
 * Run with: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Users ────────────────────────────────────────────────────────────────
  const adminPasswordHash = await bcrypt.hash("Admin@Sokem2026!", 10);
  const staffPasswordHash = await bcrypt.hash("Staff@Sokem2026!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@sokem-restaurant.com" },
    update: { passwordHash: adminPasswordHash, isActive: true },
    create: {
      email: "admin@sokem-restaurant.com",
      name: "Sokem Operations Director",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@sokem-restaurant.com" },
    update: { passwordHash: staffPasswordHash, isActive: true },
    create: {
      email: "staff@sokem-restaurant.com",
      name: "Sokem Staff Member",
      passwordHash: staffPasswordHash,
      role: "STAFF",
      isActive: true,
    },
  });

  console.log(`  ✓ Admin: ${admin.email}`);
  console.log(`  ✓ Staff: ${staff.email}`);

  // ── Menu Categories ───────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.menuCategory.upsert({
      where: { slug: "starters" },
      update: {},
      create: { name: "Starters & Small Plates", slug: "starters", displayOrder: 1 },
    }),
    prisma.menuCategory.upsert({
      where: { slug: "mains" },
      update: {},
      create: { name: "Executive Mains", slug: "mains", displayOrder: 2 },
    }),
    prisma.menuCategory.upsert({
      where: { slug: "grills" },
      update: {},
      create: { name: "Signature Grills", slug: "grills", displayOrder: 3 },
    }),
    prisma.menuCategory.upsert({
      where: { slug: "desserts" },
      update: {},
      create: { name: "Artisanal Desserts", slug: "desserts", displayOrder: 4 },
    }),
    prisma.menuCategory.upsert({
      where: { slug: "cocktails" },
      update: {},
      create: { name: "Handcrafted Cocktails", slug: "cocktails", displayOrder: 5 },
    }),
    prisma.menuCategory.upsert({
      where: { slug: "wines" },
      update: {},
      create: { name: "Cellar Selection", slug: "wines", displayOrder: 6 },
    }),
  ]);

  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));
  console.log(`  ✓ ${categories.length} menu categories`);

  // ── Menu Items ────────────────────────────────────────────────────────────
  const menuItems = [
    {
      title: "Pan-Seared Diver Scallops",
      description: "Truffle cauliflower puree, crispy pancetta lardons, herb emulsion, gold leaf touch.",
      price: 650,
      currency: "ETB",
      categoryId: catMap["starters"],
      imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
      dietaryFlags: JSON.stringify(["Gluten-Free", "Chef Special"]),
      isAvailable: true,
      isFeatured: true,
    },
    {
      title: "Dry-Aged Prime Ribeye (12oz)",
      description: "45-day aged Black Angus, smoked bone marrow butter, roasted heritage carrots, red wine reduction.",
      price: 1200,
      currency: "ETB",
      categoryId: catMap["mains"],
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      dietaryFlags: JSON.stringify(["Chef Special"]),
      isAvailable: true,
      isFeatured: true,
    },
    {
      title: "Wild Mushroom & Truffle Risotto",
      description: "Carnaroli rice, foraged chanterelles, aged Parmigiano-Reggiano, white truffle oil essence.",
      price: 850,
      currency: "ETB",
      categoryId: catMap["mains"],
      imageUrl: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
      dietaryFlags: JSON.stringify(["Vegetarian", "Gluten-Free"]),
      isAvailable: true,
      isFeatured: false,
    },
    {
      title: "Sokem Golden Old Fashioned",
      description: "Small-batch bourbon, smoked demerara syrup, Angostura & orange bitters, flamed orange peel, 24k gold flake.",
      price: 480,
      currency: "ETB",
      categoryId: catMap["cocktails"],
      imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      dietaryFlags: JSON.stringify(["Signature Cocktail"]),
      isAvailable: true,
      isFeatured: true,
    },
    {
      title: "Smoked Mezcal Paloma",
      description: "Artisanal mezcal, fresh pink grapefruit, agave nectar, lime, volcanic black salt rim.",
      price: 420,
      currency: "ETB",
      categoryId: catMap["cocktails"],
      imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      dietaryFlags: JSON.stringify(["Signature Cocktail"]),
      isAvailable: true,
      isFeatured: false,
    },
    {
      title: "Valrhona Dark Chocolate Fondant",
      description: "Molten 70% dark chocolate core, pistachio gelato, salted caramel drizzle.",
      price: 380,
      currency: "ETB",
      categoryId: catMap["desserts"],
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      dietaryFlags: JSON.stringify(["Vegetarian"]),
      isAvailable: true,
      isFeatured: true,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: "seed-" + item.title.slice(0, 10).replace(/\s/g, "") },
      update: {},
      create: { id: "seed-" + item.title.slice(0, 10).replace(/\s/g, ""), ...item },
    });
  }
  console.log(`  ✓ ${menuItems.length} menu items`);

  // ── Gallery ───────────────────────────────────────────────────────────────
  const galleryItems = [
    { title: "Handcrafted Mixology", category: "Cocktails", imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80", alt: "Smoked luxury cocktail on marble bar", displayOrder: 1 },
    { title: "Prime Dry-Aged Ribeye", category: "Culinary", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", alt: "Gourmet plated steak with roasted vegetables", displayOrder: 2 },
    { title: "The Main Dining Room", category: "Ambience", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", alt: "Warm ambient restaurant lighting and modern seating", displayOrder: 3 },
    { title: "Artisanal Dessert Plating", category: "Culinary", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", alt: "Dark chocolate molten lava cake with gold leaf", displayOrder: 4 },
    { title: "Live Jazz Evenings", category: "Events", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", alt: "Saxophone player during live music night", displayOrder: 5 },
    { title: "The Private Lounge", category: "Ambience", imageUrl: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80", alt: "Intimate private dining and booth tables", displayOrder: 6 },
  ];

  for (let i = 0; i < galleryItems.length; i++) {
    const item = galleryItems[i];
    await prisma.galleryItem.upsert({
      where: { id: `seed-gal-${i + 1}` },
      update: {},
      create: { id: `seed-gal-${i + 1}`, ...item, isActive: true },
    });
  }
  console.log(`  ✓ ${galleryItems.length} gallery items`);

  // ── Events ────────────────────────────────────────────────────────────────
  const events = [
    { slug: "cand-night", title: "Cand Night", description: "Join us for our signature Cand Night every Thursday evening at Sokem Bar & Restaurant.", date: "Every Thursday Evening", time: "7:30 PM - 11:00 PM", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", badge: "Special Event", isPublished: true },
    { slug: "chef-wine-tasting-dinner", title: "Executive Chef's Wine & Tasting Dinner", description: "A 5-course gastronomic journey curated by our executive culinary team, expertly paired with reserve international vintages.", date: "First Saturday of the Month", time: "6:30 PM & 9:00 PM Seatings", imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80", badge: "Special Tasting", isPublished: true },
    { slug: "golden-hour-lounge", title: "Golden Hour Sunset Lounge", description: "Unwind after work with curated ambient DJ sets, complimentary tapas bites, and 2-for-1 signature house mixology.", date: "Fridays & Saturdays", time: "5:00 PM - 7:30 PM", imageUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80", badge: "Happy Hour", isPublished: true },
  ];

  for (const event of events) {
    await prisma.restaurantEvent.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }
  console.log(`  ✓ ${events.length} events`);

  // ── Site Content ──────────────────────────────────────────────────────────
  const siteContent = [
    { key: "hero_title", value: "Sokem Bar & Restaurant", label: "Hero Title", group: "hero" },
    { key: "hero_subtitle", value: "Haute Gastronomie, Artisanal Cocktails & Live Jazz in Addis Ababa, Ethiopia.", label: "Hero Subtitle", group: "hero" },
    { key: "hero_cta_primary", value: "Reserve a Table", label: "Hero Primary CTA Text", group: "hero" },
    { key: "hero_cta_secondary", value: "Explore Our Menu", label: "Hero Secondary CTA Text", group: "hero" },
    { key: "about_title", value: "A Culinary Experience Unlike Any Other", label: "About Section Title", group: "about" },
    { key: "about_description", value: "Sokem Bar & Restaurant combines the finest local and international cuisine with handcrafted cocktails, curated wines, and live jazz performances in the heart of Addis Ababa.", label: "About Section Description", group: "about" },
    { key: "footer_tagline", value: "Culinary Elegance & Handcrafted Libations", label: "Footer Tagline", group: "footer" },
  ];

  for (const content of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: {},
      create: content,
    });
  }
  console.log(`  ✓ ${siteContent.length} site content entries`);

  console.log("\n✅ Seeding complete!");
  console.log("\n📋 Default credentials:");
  console.log("   Admin: admin@sokem-restaurant.com / Admin@Sokem2026!");
  console.log("   Staff: staff@sokem-restaurant.com / Staff@Sokem2026!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
