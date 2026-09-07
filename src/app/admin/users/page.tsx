import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { isAdmin } from "@/lib/rbac";
import { UserManagerView } from "@/components/admin/UserManagerView";
import { prisma } from "@/db/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "User Management",
};

export default async function AdminUsersPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in?callbackUrl=/admin/users");
  }

  if (!isAdmin(session)) {
    redirect("/staff/dashboard");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <UserManagerView
      user={session}
      initialUsers={users.map((u) => ({
        ...u,
        role: (u.role === "ADMIN" ? "ADMIN" : "STAFF") as "ADMIN" | "STAFF",
      }))}
    />
  );
}
