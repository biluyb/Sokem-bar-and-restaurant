import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff } from "@/lib/rbac";
import { GalleryManagerView } from "@/components/admin/GalleryManagerView";
import { prisma } from "@/db/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery Manager | Staff Portal",
};

export default async function StaffGalleryPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/staff/gallery");
  }

  if (!isStaff(session)) {
    redirect("/sign-in");
  }

  const items = await prisma.galleryItem.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return <GalleryManagerView user={session} initialItems={items} />;
}
