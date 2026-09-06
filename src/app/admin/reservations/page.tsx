import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { ReservationManagerView } from "@/components/admin/ReservationManagerView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reservations Manager",
};

export default async function AdminReservationsPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/admin/login?callbackUrl=/admin/reservations");
  }

  return <ReservationManagerView user={session} />;
}
