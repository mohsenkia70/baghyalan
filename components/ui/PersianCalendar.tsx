"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PERSIAN_MONTHS,
  PERSIAN_WEEKDAYS_SHORT,
  gregorianToJalali,
  jalaliMonthMatrix,
  toPersianDigits,
} from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";

export type DayStatus = "available" | "review" | "full" | "past" | "none";

const statusDot: Record<DayStatus, string> = {
  available: "bg-forest-2",
  review: "bg-gold-deep",
  full: "bg-error",
  past: "bg-transparent",
  none: "bg-transparent",
};

export function PersianCalendar({
  getStatus,
  selected,
  onSelect,
}: {
  getStatus: (date: Date) => DayStatus;
  selected?: Date | null;
  onSelect?: (date: Date) => void;
}) {
  const today = new Date();
  const todayJ = gregorianToJalali(today);
  const [jy, setJy] = useState(todayJ.jy);
  const [jm, setJm] = useState(todayJ.jm);

  const weeks = jalaliMonthMatrix(jy, jm);

  function shiftMonth(dir: 1 | -1) {
    let newM = jm + dir;
    let newY = jy;
    if (newM > 12) {
      newM = 1;
      newY += 1;
    } else if (newM < 1) {
      newM = 12;
      newY -= 1;
    }
    setJm(newM);
    setJy(newY);
  }

  return (
    <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => shiftMonth(1)}
          aria-label="ماه بعد"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone/50 text-ink transition-transform active:scale-90"
        >
          <ChevronRight size={16} />
        </button>
        <p className="font-display text-[17px] text-ink">
          {PERSIAN_MONTHS[jm - 1]} {toPersianDigits(jy)}
        </p>
        <button
          onClick={() => shiftMonth(-1)}
          aria-label="ماه قبل"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone/50 text-ink transition-transform active:scale-90"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {PERSIAN_WEEKDAYS_SHORT.map((w) => (
          <span key={w} className="py-1 text-[11px] text-ink-soft">
            {w}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${jy}-${jm}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-7 gap-1"
        >
          {weeks.flat().map((date, i) => {
            if (!date) return <div key={i} />;
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const status = isPast ? "past" : getStatus(date);
            const isSelected = selected && date.toDateString() === selected.toDateString();
            const j = gregorianToJalali(date);
            return (
              <button
                key={i}
                disabled={isPast}
                onClick={() => onSelect?.(date)}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] text-[12.5px] transition-colors",
                  isPast && "text-stone",
                  !isPast && "text-ink hover:bg-ivory-deep",
                  isSelected && "bg-forest text-paper hover:bg-forest"
                )}
              >
                <span className="font-num">{toPersianDigits(j.jd)}</span>
                {!isPast && (
                  <span className={cn("h-1 w-1 rounded-full", isSelected ? "bg-paper" : statusDot[status])} />
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-forest-2" /> قابل رزرو
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" /> نیازمند بررسی
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-error" /> تکمیل ظرفیت
        </span>
      </div>
    </div>
  );
}
