import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { EventManagerView } from "@/components/admin/EventManagerView";
import { prisma } from "@/db/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events Manager",
};

export default async function AdminEventsPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/admin/events");
  }

  const events = await prisma.restaurantEvent.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <EventManagerView
      user={session}
      initialEvents={events.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        date: e.date,
        time: e.time,
        imageUrl: e.imageUrl || undefined,
        badge: e.badge || undefined,
        isPublished: e.isPublished,
      }))}
    />
  );
}
