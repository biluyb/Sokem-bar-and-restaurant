import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { DashboardView } from "@/components/admin/DashboardView";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/admin/dashboard");
  }

  return <DashboardView user={session} />;
}
