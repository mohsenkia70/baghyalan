import { BottomNav } from "@/components/customer/BottomNav";
import { DesktopNav } from "@/components/customer/DesktopNav";
import { AuthGate } from "@/components/auth/AuthGate";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate role="customer">
      <div className="min-h-dvh bg-ivory">
        <DesktopNav />
        <div className="mx-auto flex min-h-dvh max-w-md flex-col pb-24 md:max-w-4xl md:pb-10">
          {children}
        </div>
        <BottomNav />
      </div>
    </AuthGate>
  );
}

