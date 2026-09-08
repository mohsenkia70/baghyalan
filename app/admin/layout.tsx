import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AuthGate } from "@/components/auth/AuthGate";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate role="admin">
      <div className="flex min-h-dvh bg-ivory-deep/40">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </div>
    </AuthGate>
  );
}

