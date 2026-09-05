export type DietaryFlag = "Vegan" | "Vegetarian" | "Gluten-Free" | "Chef Special" | "Signature Cocktail";

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  categoryId: string;
  categoryName: string;
  imageUrl?: string;
  dietaryFlags: DietaryFlag[];
  isAvailable: boolean;
  isFeatured: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
}

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  status: ReservationStatus;
  specialNotes?: string;
  createdAt: string;
}

export interface RestaurantEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  imageUrl?: string;
  badge?: string;
  isPublished: boolean;
}

export type GalleryCategory = "All" | "Culinary" | "Cocktails" | "Ambience" | "Events";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  alt: string;
}
