import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className,
  tone = "forest",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "forest" | "gold" | "blush" | "night";
}) {
  const tones: Record<string, string> = {
    forest: "bg-forest-tint text-forest-2",
    gold: "bg-gold-soft/40 text-gold-deep",
    blush: "bg-blush/40 text-blush-deep",
    night: "bg-on-night/10 text-on-night",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-3 py-1 text-[12px] font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const statusTone: Record<string, { bg: string; dot: string }> = {
  // customer-facing statuses
  "قابل رزرو": { bg: "bg-[#E4EAE2] text-forest-2", dot: "bg-forest-2" },
  "نیازمند بررسی": { bg: "bg-gold-soft/40 text-gold-deep", dot: "bg-gold-deep" },
  "تکمیل ظرفیت": { bg: "bg-[#F3DEDA] text-error", dot: "bg-error" },
  "پرداخت شده": { bg: "bg-[#E4EAE2] text-forest-2", dot: "bg-forest-2" },
  "در انتظار": { bg: "bg-gold-soft/40 text-gold-deep", dot: "bg-gold-deep" },
  "تایید شده": { bg: "bg-[#E4EAE2] text-forest-2", dot: "bg-forest-2" },
  "انجام شده": { bg: "bg-[#DDE7F2] text-[#2F5C8A]", dot: "bg-[#2F5C8A]" },
  "لغو شده": { bg: "bg-[#F3DEDA] text-error", dot: "bg-error" },
  // admin/event statuses
  "برنامه‌ریزی": { bg: "bg-gold-soft/40 text-gold-deep", dot: "bg-gold-deep" },
  "در آماده‌سازی": { bg: "bg-[#DDE7F2] text-[#2F5C8A]", dot: "bg-[#2F5C8A]" },
  "برگزار شده": { bg: "bg-[#E4EAE2] text-forest-2", dot: "bg-forest-2" },
  "آماده": { bg: "bg-[#E4EAE2] text-forest-2", dot: "bg-forest-2" },
  "در حال انجام": { bg: "bg-gold-soft/40 text-gold-deep", dot: "bg-gold-deep" },
};

export function StatusChip({ status }: { status: string }) {
  const tone = statusTone[status] ?? { bg: "bg-forest-tint text-forest-2", dot: "bg-forest-2" };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1 text-[12px] font-medium",
        tone.bg
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
      {status}
    </span>
  );
}
