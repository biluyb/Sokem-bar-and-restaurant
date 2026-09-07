"use server";

import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export interface MenuItemFormData {
  title: string;
  description: string;
  price: number;
  currency?: string;
  categoryId: string;
  imageUrl?: string;
  dietaryFlags?: string[];
  isAvailable?: boolean;
  isFeatured?: boolean;
}

export async function getMenuItemsAction() {
  try {
    const items = await prisma.menuItem.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: items.map((item) => ({
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
      })),
    };
  } catch (error) {
    console.error("[getMenuItemsAction] Error:", error);
    return { success: false, error: "Failed to fetch menu items", data: [] };
  }
}

export async function getMenuCategoriesAction() {
  try {
    const categories = await prisma.menuCategory.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("[getMenuCategoriesAction] Error:", error);
    return { success: false, error: "Failed to fetch categories", data: [] };
  }
}

export async function createMenuItemAction(data: MenuItemFormData) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const newItem = await prisma.menuItem.create({
      data: {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        currency: data.currency || "USD",
        categoryId: data.categoryId,
        imageUrl: data.imageUrl || null,
        dietaryFlags: JSON.stringify(data.dietaryFlags || []),
        isAvailable: data.isAvailable ?? true,
        isFeatured: data.isFeatured ?? false,
      },
      include: { category: true },
    });

    await logAuditEvent(session.userId, "CREATE", "MenuItem", newItem.id, {
      title: newItem.title,
    });

    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    revalidatePath("/staff/menu");
    revalidatePath("/");

    return { success: true, data: newItem };
  } catch (error) {
    console.error("[createMenuItemAction] Error:", error);
    return { success: false, error: "Failed to create menu item" };
  }
}

export async function updateMenuItemAction(id: string, data: Partial<MenuItemFormData>) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: Number(data.price) }),
        ...(data.currency !== undefined && { currency: data.currency }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl || null }),
        ...(data.dietaryFlags !== undefined && {
          dietaryFlags: JSON.stringify(data.dietaryFlags),
        }),
        ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
      },
      include: { category: true },
    });

    await logAuditEvent(session.userId, "UPDATE", "MenuItem", id, {
      title: updated.title,
    });

    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    revalidatePath("/staff/menu");
    revalidatePath("/");

    return { success: true, data: updated };
  } catch (error) {
    console.error("[updateMenuItemAction] Error:", error);
    return { success: false, error: "Failed to update menu item" };
  }
}

export async function deleteMenuItemAction(id: string) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const deleted = await prisma.menuItem.delete({
      where: { id },
    });

    await logAuditEvent(session.userId, "DELETE", "MenuItem", id, {
      title: deleted.title,
    });

    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    revalidatePath("/staff/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("[deleteMenuItemAction] Error:", error);
    return { success: false, error: "Failed to delete menu item" };
  }
}

export async function toggleMenuItemAvailableAction(id: string, isAvailable: boolean) {
  const session = await getCurrentSession();
  if (!isStaff(session)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updated = await prisma.menuItem.update({
      where: { id },
      data: { isAvailable },
    });

    await logAuditEvent(session.userId, "TOGGLE", "MenuItem", id, {
      isAvailable,
    });

    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    revalidatePath("/staff/menu");

    return { success: true, data: updated };
  } catch (error) {
    console.error("[toggleMenuItemAvailableAction] Error:", error);
    return { success: false, error: "Failed to toggle availability" };
  }
}
