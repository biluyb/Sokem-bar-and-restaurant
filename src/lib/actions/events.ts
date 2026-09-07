"use server";

import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export interface RestaurantEventFormData {
  title: string;
  slug?: string;
  description: string;
  date: string;
  time: string;
  imageUrl?: string;
  badge?: string;
  isPublished?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getEventsAction() {
  try {
    const events = await prisma.restaurantEvent.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: events };
  } catch (error) {
    console.error("[getEventsAction] Error:", error);
    return { success: false, error: "Failed to fetch events", data: [] };
  }
}

export async function createEventAction(data: RestaurantEventFormData) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    let baseSlug = data.slug || slugify(data.title);
    if (!baseSlug) baseSlug = `event-${Date.now()}`;

    // Ensure unique slug
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await prisma.restaurantEvent.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const newEvent = await prisma.restaurantEvent.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        description: data.description,
        date: data.date,
        time: data.time,
        imageUrl: data.imageUrl || null,
        badge: data.badge || null,
        isPublished: data.isPublished ?? true,
      },
    });

    await logAuditEvent(session.userId, "CREATE", "RestaurantEvent", newEvent.id, {
      title: newEvent.title,
    });

    revalidatePath("/events");
    revalidatePath("/admin/events");
    revalidatePath("/staff/events");
    revalidatePath("/");

    return { success: true, data: newEvent };
  } catch (error) {
    console.error("[createEventAction] Error:", error);
    return { success: false, error: "Failed to create event" };
  }
}

export async function updateEventAction(id: string, data: Partial<RestaurantEventFormData>) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updated = await prisma.restaurantEvent.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.time !== undefined && { time: data.time }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl || null }),
        ...(data.badge !== undefined && { badge: data.badge || null }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
      },
    });

    await logAuditEvent(session.userId, "UPDATE", "RestaurantEvent", id, {
      title: updated.title,
    });

    revalidatePath("/events");
    revalidatePath("/admin/events");
    revalidatePath("/staff/events");
    revalidatePath("/");

    return { success: true, data: updated };
  } catch (error) {
    console.error("[updateEventAction] Error:", error);
    return { success: false, error: "Failed to update event" };
  }
}

export async function deleteEventAction(id: string) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const deleted = await prisma.restaurantEvent.delete({
      where: { id },
    });

    await logAuditEvent(session.userId, "DELETE", "RestaurantEvent", id, {
      title: deleted.title,
    });

    revalidatePath("/events");
    revalidatePath("/admin/events");
    revalidatePath("/staff/events");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("[deleteEventAction] Error:", error);
    return { success: false, error: "Failed to delete event" };
  }
}
