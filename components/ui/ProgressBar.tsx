"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/date";

export function ProgressBar({
  percent,
  label,
  showValue = true,
  tone = "gold",
  className,
}: {
  percent: number;
  label?: string;
  showValue?: boolean;
  tone?: "gold" | "forest";
  className?: string;
}) {
  const barColor = tone === "gold" ? "bg-gold" : "bg-forest";
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between text-[13px]">
          {label && <span className="text-ink-soft">{label}</span>}
          {showValue && (
            <span className="font-num font-medium text-ink">{toPersianDigits(Math.round(percent))}٪</span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-full rounded-full", barColor)}
        />
      </div>
    </div>
  );
}
