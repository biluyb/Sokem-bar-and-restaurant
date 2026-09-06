import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { MenuManagerView } from "@/components/admin/MenuManagerView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menu Manager",
};

export default async function AdminMenuPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/admin/login?callbackUrl=/admin/menu");
  }

  return <MenuManagerView user={session} />;
}
