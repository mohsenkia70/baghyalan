"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Heart, PartyPopper, Sparkles, CheckCircle2, AlertCircle, XCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { PersianCalendar, type DayStatus } from "@/components/ui/PersianCalendar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { formatJalaliDate, toPersianDigits } from "@/lib/utils/date";
import { VENUE_CONTACT } from "@/lib/mock-data/venue";
import type { EventType } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;
const EVENT_TYPES: { id: EventType; icon: React.ElementType }[] = [
  { id: "عروسی", icon: Heart },
  { id: "عقد", icon: Gem },
  { id: "نامزدی", icon: Sparkles },
  { id: "جشن خانوادگی", icon: PartyPopper },
];

// Deterministic pseudo-availability so the demo feels consistent across renders.
function getMockStatus(date: Date): DayStatus {
  const seed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  const dow = date.getDay(); // 4=Thu, 5=Fri high demand in Iran
  if (dow === 4 || dow === 5) {
    if (seed % 5 === 0) return "full";
    if (seed % 3 === 0) return "review";
    return "available";
  }
  if (seed % 9 === 0) return "review";
  return "available";
}

const statusMeta: Record<DayStatus, { label: string; icon: React.ElementType; tone: string }> = {
  available: { label: "قابل رزرو", icon: CheckCircle2, tone: "text-forest-2" },
  review: { label: "نیازمند بررسی", icon: AlertCircle, tone: "text-gold-deep" },
  full: { label: "تکمیل ظرفیت", icon: XCircle, tone: "text-error" },
  past: { label: "گذشته", icon: XCircle, tone: "text-stone" },
  none: { label: "", icon: XCircle, tone: "" },
};

export default function DateCheckPage() {
  const [step, setStep] = useState<0 | 1>(0);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [guestCount, setGuestCount] = useState(200);
  const [selected, setSelected] = useState<Date | null>(null);

  const status = useMemo(() => (selected ? getMockStatus(selected) : null), [selected]);
  const meta = status ? statusMeta[status] : null;

  return (
    <div className="flex flex-col pb-8">
      <PageHeader title="بررسی تاریخ مراسم" subtitle="ظرفیت تاریخ مورد نظرتان را بررسی کنید" />

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease }}
            className="flex flex-col gap-6 px-5 pt-2"
          >
            <div>
              <p className="mb-3 text-[13px] font-medium text-ink-soft">نوع مراسم</p>
              <div className="grid grid-cols-2 gap-2.5">
                {EVENT_TYPES.map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setEventType(id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[var(--radius-lg)] border p-4 text-right transition-colors",
                      eventType === id ? "border-gold bg-gold-soft/30" : "border-stone/50 bg-paper"
                    )}
                  >
                    <Icon size={18} className={eventType === id ? "text-gold-deep" : "text-forest"} />
                    <span className="text-[13.5px] font-medium text-ink">{id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[13px] font-medium text-ink-soft">تعداد مهمان تقریبی</p>
              <div className="flex items-center gap-4 rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="flex-1 accent-gold"
                />
                <span className="w-16 shrink-0 text-left font-num text-[14px] font-medium text-forest">
                  {toPersianDigits(guestCount)}
                </span>
              </div>
            </div>

            <Button size="lg" disabled={!eventType} onClick={() => setStep(1)}>
              ادامه و انتخاب تاریخ
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease }}
            className="flex flex-col gap-4 px-5 pt-2"
          >
            <PersianCalendar getStatus={getMockStatus} selected={selected} onSelect={setSelected} />

            <AnimatePresence>
              {selected && meta && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] text-ink-soft">تاریخ انتخابی</p>
                      <p className="mt-0.5 font-display text-[18px] text-ink">{formatJalaliDate(selected, true)}</p>
                    </div>
                    <span className={cn("flex items-center gap-1.5 text-[13px] font-medium", meta.tone)}>
                      <meta.icon size={16} /> {meta.label}
                    </span>
                  </div>

                  {status === "full" ? (
                    <p className="mt-3 text-[12.5px] leading-6 text-ink-soft">
                      این تاریخ در حال حاضر تکمیل ظرفیت است. می‌توانید تاریخ نزدیک دیگری را انتخاب کنید یا با مشاور
                      درباره لیست انتظار صحبت کنید.
                    </p>
                  ) : status === "review" ? (
                    <p className="mt-3 text-[12.5px] leading-6 text-ink-soft">
                      این تاریخ نیازمند هماهنگی نهایی با تیم عمارت است. مشاور ما ظرف چند ساعت با شما تماس می‌گیرد.
                    </p>
                  ) : (
                    <p className="mt-3 text-[12.5px] leading-6 text-ink-soft">
                      خبر خوب! این تاریخ برای مراسم {eventType ?? "شما"} با حدود {toPersianDigits(guestCount)}{" "}
                      مهمان قابل رزرو است.
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Link href="/bazdid" className="flex-1">
                      <Button className="w-full" size="sm" disabled={status === "full"}>
                        رزرو بازدید برای این تاریخ
                      </Button>
                    </Link>
                    <a href={VENUE_CONTACT.phoneHref} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        <Phone size={14} /> تماس با مشاور
                      </Button>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
