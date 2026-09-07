import { prisma } from "@/db/client";
import { MenuItem, MenuCategory, RestaurantEvent, GalleryItem } from "@/types";
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS, MOCK_EVENTS, MOCK_GALLERY } from "./data";

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    if (items.length === 0) return MOCK_MENU_ITEMS;

    return items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      currency: item.currency,
      categoryId: item.categoryId,
      categoryName: item.category.name,
      imageUrl: item.imageUrl || undefined,
      dietaryFlags: JSON.parse(item.dietaryFlags || "[]"),
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured,
    }));
  } catch (error) {
    console.error("[getMenuItems] Fallback to mock data:", error);
    return MOCK_MENU_ITEMS;
  }
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const categories = await prisma.menuCategory.findMany({
      orderBy: { displayOrder: "asc" },
    });

    if (categories.length === 0) return MOCK_CATEGORIES;

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      displayOrder: cat.displayOrder,
    }));
  } catch (error) {
    console.error("[getMenuCategories] Fallback to mock data:", error);
    return MOCK_CATEGORIES;
  }
}

export async function getEvents(): Promise<RestaurantEvent[]> {
  try {
    const events = await prisma.restaurantEvent.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    if (events.length === 0) return MOCK_EVENTS;

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      date: event.date,
      time: event.time,
      imageUrl: event.imageUrl || undefined,
      badge: event.badge || undefined,
      isPublished: event.isPublished,
    }));
  } catch (error) {
    console.error("[getEvents] Fallback to mock data:", error);
    return MOCK_EVENTS;
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const items = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    if (items.length === 0) return MOCK_GALLERY;

    return items.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category as any,
      imageUrl: item.imageUrl,
      alt: item.alt,
    }));
  } catch (error) {
    console.error("[getGalleryItems] Fallback to mock data:", error);
    return MOCK_GALLERY;
  }
}
