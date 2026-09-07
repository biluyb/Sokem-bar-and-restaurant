import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { isStaff } from "@/lib/rbac";
import { DashboardView } from "@/components/admin/DashboardView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Staff Dashboard | Sokem",
};

export default async function StaffDashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/staff/dashboard");
  }

  if (!isStaff(session)) {
    redirect("/sign-in");
  }

  return <DashboardView user={session} />;
}
