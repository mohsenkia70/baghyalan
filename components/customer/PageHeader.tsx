"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function PageHeader({
  title,
  subtitle,
  transparent = false,
  action,
}: {
  title: string;
  subtitle?: string;
  transparent?: boolean;
  action?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center gap-3 px-5 py-4 md:top-16 md:px-0",
        transparent ? "bg-transparent" : "bg-ivory/85 backdrop-blur-lg border-b border-stone/50 md:border-none md:bg-ivory/95"
      )}
    >
      <button
        onClick={() => router.back()}
        aria-label="بازگشت"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper border border-stone/60 text-ink transition-transform active:scale-95 md:hidden"
      >
        <ArrowRight size={18} />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-[20px] leading-tight text-ink">{title}</h1>
        {subtitle && <p className="truncate text-[12.5px] text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
