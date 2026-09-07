import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff } from "@/lib/rbac";
import { MenuManagerView } from "@/components/admin/MenuManagerView";
import { prisma } from "@/db/client";
import { MenuItem } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menu Manager | Staff Portal",
};

export default async function StaffMenuPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/staff/menu");
  }

  if (!isStaff(session)) {
    redirect("/sign-in");
  }

  const [dbItems, dbCategories] = await Promise.all([
    prisma.menuItem.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.menuCategory.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  const items: MenuItem[] = dbItems.map((item) => ({
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
  }));

  return (
    <MenuManagerView
      user={session}
      initialItems={items}
      initialCategories={dbCategories}
    />
  );
}
