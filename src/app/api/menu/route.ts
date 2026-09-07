import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff, unauthorizedResponse, forbiddenResponse } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    const categories = await prisma.menuCategory.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        currency: item.currency,
        categoryId: item.categoryId,
        categoryName: item.category.name,
        imageUrl: item.imageUrl,
        dietaryFlags: JSON.parse(item.dietaryFlags || "[]"),
        isAvailable: item.isAvailable,
        isFeatured: item.isFeatured,
      })),
      categories,
    });
  } catch (error) {
    console.error("[API Menu GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) return unauthorizedResponse();
  if (!isStaff(session)) return forbiddenResponse();

  try {
    const body = await request.json();
    const { title, description, price, currency, categoryId, imageUrl, dietaryFlags, isAvailable, isFeatured } = body;

    if (!title || !description || price === undefined || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const item = await prisma.menuItem.create({
      data: {
        title,
        description,
        price: Number(price),
        currency: currency || "USD",
        categoryId,
        imageUrl: imageUrl || null,
        dietaryFlags: JSON.stringify(dietaryFlags || []),
        isAvailable: isAvailable ?? true,
        isFeatured: isFeatured ?? false,
      },
      include: { category: true },
    });

    await logAuditEvent(session.userId, "CREATE", "MenuItem", item.id, { title: item.title });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[API Menu POST] Error:", error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}
