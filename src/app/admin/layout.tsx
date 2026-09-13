import { AdminThemeSync } from "@/components/admin/AdminThemeSync";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <AdminThemeSync />
      {children}
    </div>
  );
}
