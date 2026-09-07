import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isAdmin, unauthorizedResponse, forbiddenResponse } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentSession();
  if (!session) return unauthorizedResponse();
  if (!isAdmin(session)) return forbiddenResponse("Admin role required");

  try {
    const body = await request.json();
    const { name, role, isActive } = body;

    if (params.id === session.userId && isActive === false) {
      return NextResponse.json({ error: "Cannot disable your own administrative account" }, { status: 400 });
    }

    if (params.id === session.userId && role && role !== "ADMIN") {
      return NextResponse.json({ error: "Cannot demote your own administrative role" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(role !== undefined && { role: role === "ADMIN" ? "ADMIN" : "STAFF" }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    await logAuditEvent(session.userId, "UPDATE", "User", params.id, {
      role: updated.role,
      isActive: updated.isActive,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[API Users ID PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentSession();
  if (!session) return unauthorizedResponse();
  if (!isAdmin(session)) return forbiddenResponse("Admin role required");

  if (params.id === session.userId) {
    return NextResponse.json({ error: "Cannot delete your own administrative account" }, { status: 400 });
  }

  try {
    const deleted = await prisma.user.delete({
      where: { id: params.id },
    });

    await logAuditEvent(session.userId, "DELETE", "User", params.id, {
      email: deleted.email,
    });

    return NextResponse.json({ success: true, deletedId: params.id });
  } catch (error) {
    console.error("[API Users ID DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
