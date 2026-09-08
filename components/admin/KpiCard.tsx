import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/date";
import { ArrowDownLeft, ArrowUpLeft } from "lucide-react";

export function KpiCard({
  icon: Icon,
  label,
  value,
  suffix,
  trend,
  tone = "forest",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  suffix?: string;
  trend?: { value: number; positive: boolean };
  tone?: "forest" | "gold";
}) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            tone === "forest" ? "bg-forest-tint text-forest" : "bg-gold-soft/40 text-gold-deep"
          )}
        >
          <Icon size={16} />
        </span>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-[11px] font-medium",
              trend.positive ? "text-forest-2" : "text-error"
            )}
          >
            {trend.positive ? <ArrowUpLeft size={12} /> : <ArrowDownLeft size={12} />}
            {toPersianDigits(trend.value)}٪
          </span>
        )}
      </div>
      <p className="mt-3 font-num font-display text-[24px] leading-none text-ink">
        {typeof value === "number" ? toPersianDigits(value) : value}
        {suffix && <span className="mr-1 text-[13px] font-sans text-ink-soft">{suffix}</span>}
      </p>
      <p className="mt-1.5 text-[11.5px] text-ink-soft">{label}</p>
    </div>
  );
}
