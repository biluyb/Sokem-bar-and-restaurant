import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff, unauthorizedResponse, forbiddenResponse } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";

export async function GET() {
  try {
    const events = await prisma.restaurantEvent.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("[API Events GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) return unauthorizedResponse();
  if (!isStaff(session)) return forbiddenResponse();

  try {
    const body = await request.json();
    const { title, slug, description, date, time, imageUrl, badge, isPublished } = body;

    if (!title || !description || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const eventSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const event = await prisma.restaurantEvent.create({
      data: {
        title,
        slug: eventSlug,
        description,
        date,
        time,
        imageUrl: imageUrl || null,
        badge: badge || null,
        isPublished: isPublished ?? true,
      },
    });

    await logAuditEvent(session.userId, "CREATE", "RestaurantEvent", event.id, { title: event.title });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("[API Events POST] Error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
