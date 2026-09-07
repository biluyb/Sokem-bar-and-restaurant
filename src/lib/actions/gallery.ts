"use server";

import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export interface GalleryItemFormData {
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
  displayOrder?: number;
  isActive?: boolean;
}

export async function getGalleryItemsAction() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return { success: true, data: items };
  } catch (error) {
    console.error("[getGalleryItemsAction] Error:", error);
    return { success: false, error: "Failed to fetch gallery items", data: [] };
  }
}

export async function createGalleryItemAction(data: GalleryItemFormData) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const newItem = await prisma.galleryItem.create({
      data: {
        title: data.title,
        category: data.category,
        imageUrl: data.imageUrl,
        alt: data.alt,
        displayOrder: data.displayOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    await logAuditEvent(session.userId, "CREATE", "GalleryItem", newItem.id, {
      title: newItem.title,
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/staff/gallery");

    return { success: true, data: newItem };
  } catch (error) {
    console.error("[createGalleryItemAction] Error:", error);
    return { success: false, error: "Failed to create gallery item" };
  }
}

export async function updateGalleryItemAction(id: string, data: Partial<GalleryItemFormData>) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.alt !== undefined && { alt: data.alt }),
        ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });

    await logAuditEvent(session.userId, "UPDATE", "GalleryItem", id, {
      title: updated.title,
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/staff/gallery");

    return { success: true, data: updated };
  } catch (error) {
    console.error("[updateGalleryItemAction] Error:", error);
    return { success: false, error: "Failed to update gallery item" };
  }
}

export async function deleteGalleryItemAction(id: string) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const deleted = await prisma.galleryItem.delete({
      where: { id },
    });

    await logAuditEvent(session.userId, "DELETE", "GalleryItem", id, {
      title: deleted.title,
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/staff/gallery");

    return { success: true };
  } catch (error) {
    console.error("[deleteGalleryItemAction] Error:", error);
    return { success: false, error: "Failed to delete gallery item" };
  }
}
