import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff, unauthorizedResponse, forbiddenResponse } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.menuItem.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...item,
      categoryName: item.category.name,
      dietaryFlags: JSON.parse(item.dietaryFlags || "[]"),
    });
  } catch (error) {
    console.error("[API Menu ID GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentSession();
  if (!session) return unauthorizedResponse();
  if (!isStaff(session)) return forbiddenResponse();

  try {
    const body = await request.json();
    const { title, description, price, currency, categoryId, imageUrl, dietaryFlags, isAvailable, isFeatured } = body;

    const updated = await prisma.menuItem.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: Number(price) }),
        ...(currency !== undefined && { currency }),
        ...(categoryId !== undefined && { categoryId }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
        ...(dietaryFlags !== undefined && { dietaryFlags: JSON.stringify(dietaryFlags) }),
        ...(isAvailable !== undefined && { isAvailable }),
        ...(isFeatured !== undefined && { isFeatured }),
      },
      include: { category: true },
    });

    await logAuditEvent(session.userId, "UPDATE", "MenuItem", params.id, { title: updated.title });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[API Menu ID PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentSession();
  if (!session) return unauthorizedResponse();
  if (!isStaff(session)) return forbiddenResponse();

  try {
    const deleted = await prisma.menuItem.delete({
      where: { id: params.id },
    });

    await logAuditEvent(session.userId, "DELETE", "MenuItem", params.id, { title: deleted.title });

    return NextResponse.json({ success: true, deletedId: params.id });
  } catch (error) {
    console.error("[API Menu ID DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
