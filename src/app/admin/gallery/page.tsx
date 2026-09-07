import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { GalleryManagerView } from "@/components/admin/GalleryManagerView";
import { prisma } from "@/db/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery Manager",
};

export default async function AdminGalleryPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/admin/gallery");
  }

  const items = await prisma.galleryItem.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return <GalleryManagerView user={session} initialItems={items} />;
}
