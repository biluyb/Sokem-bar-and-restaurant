"use server";

import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isAdmin } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF";
}

export async function getUsersAction() {
  const session = await getCurrentSession();
  if (!isAdmin(session)) {
    return { success: false, error: "Unauthorized. Admin access required.", data: [] };
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: users };
  } catch (error) {
    console.error("[getUsersAction] Error:", error);
    return { success: false, error: "Failed to fetch users", data: [] };
  }
}

export async function createUserAction(data: CreateUserData) {
  const session = await getCurrentSession();
  if (!isAdmin(session)) {
    return { success: false, error: "Unauthorized. Admin access required." };
  }

  try {
    const email = data.email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "A user with this email already exists." };
    }

    if (!data.password || data.password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: data.name.trim(),
        email,
        passwordHash,
        role: data.role,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await logAuditEvent(session.userId, "CREATE", "User", newUser.id, {
      email: newUser.email,
      role: newUser.role,
    });

    revalidatePath("/admin/users");

    return { success: true, data: newUser };
  } catch (error) {
    console.error("[createUserAction] Error:", error);
    return { success: false, error: "Failed to create user." };
  }
}

export async function toggleUserActiveAction(id: string, isActive: boolean) {
  const session = await getCurrentSession();
  if (!isAdmin(session)) {
    return { success: false, error: "Unauthorized. Admin access required." };
  }

  if (session.userId === id) {
    return { success: false, error: "Cannot disable your own administrative account." };
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    await logAuditEvent(session.userId, isActive ? "ENABLE" : "DISABLE", "User", id, {
      email: updated.email,
    });

    revalidatePath("/admin/users");

    return { success: true, data: updated };
  } catch (error) {
    console.error("[toggleUserActiveAction] Error:", error);
    return { success: false, error: "Failed to update user status." };
  }
}

export async function updateUserRoleAction(id: string, role: "ADMIN" | "STAFF") {
  const session = await getCurrentSession();
  if (!isAdmin(session)) {
    return { success: false, error: "Unauthorized. Admin access required." };
  }

  if (session.userId === id && role !== "ADMIN") {
    return { success: false, error: "Cannot demote your own administrative role." };
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    await logAuditEvent(session.userId, "UPDATE", "User", id, {
      newRole: role,
    });

    revalidatePath("/admin/users");

    return { success: true, data: updated };
  } catch (error) {
    console.error("[updateUserRoleAction] Error:", error);
    return { success: false, error: "Failed to update user role." };
  }
}

export async function deleteUserAction(id: string) {
  const session = await getCurrentSession();
  if (!isAdmin(session)) {
    return { success: false, error: "Unauthorized. Admin access required." };
  }

  if (session.userId === id) {
    return { success: false, error: "Cannot delete your own administrative account." };
  }

  try {
    const deleted = await prisma.user.delete({
      where: { id },
    });

    await logAuditEvent(session.userId, "DELETE", "User", id, {
      email: deleted.email,
    });

    revalidatePath("/admin/users");

    return { success: true };
  } catch (error) {
    console.error("[deleteUserAction] Error:", error);
    return { success: false, error: "Failed to delete user." };
  }
}
