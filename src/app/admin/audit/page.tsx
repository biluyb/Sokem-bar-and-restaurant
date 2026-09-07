import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { isAdmin } from "@/lib/rbac";
import { AuditLogView } from "@/components/admin/AuditLogView";
import { prisma } from "@/db/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Audit Logs",
};

export default async function AdminAuditPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/admin/audit");
  }

  if (!isAdmin(session)) {
    redirect("/staff/dashboard");
  }

  const logs = await prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return <AuditLogView user={session} logs={logs} />;
}
