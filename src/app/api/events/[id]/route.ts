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
    const event = await prisma.restaurantEvent.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("[API Events ID GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
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
    const { title, slug, description, date, time, imageUrl, badge, isPublished } = body;

    const updated = await prisma.restaurantEvent.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(date !== undefined && { date }),
        ...(time !== undefined && { time }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
        ...(badge !== undefined && { badge: badge || null }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    await logAuditEvent(session.userId, "UPDATE", "RestaurantEvent", params.id, { title: updated.title });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[API Events ID PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
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
    const deleted = await prisma.restaurantEvent.delete({
      where: { id: params.id },
    });

    await logAuditEvent(session.userId, "DELETE", "RestaurantEvent", params.id, { title: deleted.title });

    return NextResponse.json({ success: true, deletedId: params.id });
  } catch (error) {
    console.error("[API Events ID DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
