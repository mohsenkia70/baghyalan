"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import type { UserRole } from "@/lib/types";

export function AuthGate({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user || user.role !== role) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/")}&role=${role}`);
    }
  }, [ready, user, role, router, pathname]);

  if (!ready || !user || user.role !== role) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-ivory">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
          <p className="text-[12.5px] text-ink-soft">در حال بررسی ورود...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
