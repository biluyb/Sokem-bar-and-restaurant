import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff, unauthorizedResponse, forbiddenResponse } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("[API Gallery GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) return unauthorizedResponse();
  if (!isStaff(session)) return forbiddenResponse();

  try {
    const body = await request.json();
    const { title, category, imageUrl, alt, displayOrder, isActive } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Title and Image URL are required" }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category: category || "Ambience",
        imageUrl,
        alt: alt || title,
        displayOrder: displayOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    await logAuditEvent(session.userId, "CREATE", "GalleryItem", item.id, { title: item.title });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[API Gallery POST] Error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
