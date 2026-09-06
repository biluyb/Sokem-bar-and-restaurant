import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { EventManagerView } from "@/components/admin/EventManagerView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events Manager",
};

export default async function AdminEventsPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/admin/login?callbackUrl=/admin/events");
  }

  return <EventManagerView user={session} />;
}
