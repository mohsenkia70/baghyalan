"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarHeart, MapPin, Phone, Users2, Wallet, ListChecks,
  Clock3, FileText, ChevronLeft, CheckCircle2, Circle as CircleIcon,
} from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { StepTimeline } from "@/components/customer/StepTimeline";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { StatusChip } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { formatToman, toPersianDigits } from "@/lib/utils/date";
import { MY_EVENT, MY_GUESTS } from "@/lib/mock-data/my-event";
import { PACKAGES, VENUE_CONTACT } from "@/lib/mock-data/venue";
import type { ChecklistItem } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;
const TABS = ["نمای کلی", "پیگیری", "چک‌لیست", "روز مراسم", "مهمانان", "مالی"] as const;
type Tab = (typeof TABS)[number];

const TIMEFRAMES: ChecklistItem["timeframe"][] = [
  "چند ماه مانده", "سه ماه مانده", "یک ماه مانده", "یک هفته مانده", "روز مراسم",
];

export default function MyEventDashboardPage() {
  const [tab, setTab] = useState<Tab>("نمای کلی");
  const [checklist, setChecklist] = useState(MY_EVENT.checklist);
  const pkg = PACKAGES.find((p) => p.id === MY_EVENT.packageId)!;

  const doneCount = checklist.filter((c) => c.done).length;
  const checklistPercent = Math.round((doneCount / checklist.length) * 100);

  const confirmedGuests = MY_GUESTS.filter((g) => g.confirmed);
  const totalGuestCount = MY_GUESTS.reduce((sum, g) => sum + g.companions, 0);

  function toggleChecklist(id: string) {
    setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  }

  const remaining = MY_EVENT.totalPrice - MY_EVENT.paidAmount;
  const paidPercent = Math.round((MY_EVENT.paidAmount / MY_EVENT.totalPrice) * 100);

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        title="مراسم من"
        subtitle={`${MY_EVENT.coupleNames} · ${MY_EVENT.eventType}`}
        action={
          <a href={VENUE_CONTACT.phoneHref} className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-tint text-forest">
            <Phone size={17} />
          </a>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto px-5 pb-1 pt-1 [scrollbar-width:none]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors",
              tab === t ? "bg-forest text-paper" : "bg-paper border border-stone/50 text-ink-soft"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="px-5 pt-4"
        >
          {tab === "نمای کلی" && (
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-[var(--radius-xl)] bg-night p-5 text-center">
                <p className="text-[12px] text-on-night-soft">شمارش معکوس تا مراسم</p>
                <p className="mt-2 font-display text-[46px] leading-none text-on-night">
                  {toPersianDigits(MY_EVENT.countdownDays)}
                </p>
                <p className="text-[12.5px] text-on-night-soft">روز مانده تا {MY_EVENT.date}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatCard icon={CalendarHeart} label="وضعیت مراسم" value={<StatusChip status={MY_EVENT.status} />} />
                <StatCard icon={Users2} label="تعداد مهمان" value={`${toPersianDigits(MY_EVENT.guestCount)} نفر`} />
                <StatCard icon={ListChecks} label="پکیج انتخابی" value={pkg.name} />
                <StatCard icon={MapPin} label="فضا" value={MY_EVENT.space} />
              </div>

              <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[13.5px] font-medium text-ink">پیشرفت آماده‌سازی</p>
                  <span className="text-[12px] text-ink-soft">مسئول: {MY_EVENT.responsiblePerson}</span>
                </div>
                <ProgressBar percent={MY_EVENT.progressPercent} className="mt-3" />
              </div>

              <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
                <p className="mb-3 text-[13.5px] font-medium text-ink">آخرین وضعیت پیگیری</p>
                <StepTimeline steps={MY_EVENT.journey.slice(-3)} />
                <button onClick={() => setTab("پیگیری")} className="mt-1 flex items-center gap-1 text-[12.5px] font-medium text-gold-deep">
                  مشاهده مسیر کامل <ChevronLeft size={14} />
                </button>
              </div>

              <a href={VENUE_CONTACT.phoneHref} className="flex items-center justify-between rounded-[var(--radius-lg)] bg-forest-tint p-4">
                <div className="flex items-center gap-2.5">
                  <Phone size={17} className="text-forest" />
                  <span className="text-[13px] font-medium text-forest">تماس با مشاور اختصاصی شما · سارا محمودی</span>
                </div>
                <ChevronLeft size={16} className="text-forest" />
              </a>
            </div>
          )}

          {tab === "پیگیری" && (
            <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
              <StepTimeline steps={MY_EVENT.journey} />
            </div>
          )}

          {tab === "چک‌لیست" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
                <ProgressBar percent={checklistPercent} label={`${toPersianDigits(doneCount)} از ${toPersianDigits(checklist.length)} مورد انجام شده`} />
              </div>
              {TIMEFRAMES.map((tf) => {
                const items = checklist.filter((c) => c.timeframe === tf);
                if (items.length === 0) return null;
                return (
                  <div key={tf}>
                    <p className="mb-2 text-[12.5px] font-medium text-gold-deep">{tf}</p>
                    <div className="flex flex-col gap-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleChecklist(item.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-[var(--radius-md)] border p-3 text-right transition-colors",
                            item.done ? "border-forest-2/30 bg-forest-tint" : "border-stone/50 bg-paper"
                          )}
                        >
                          {item.done ? (
                            <CheckCircle2 size={19} className="shrink-0 text-forest-2" />
                          ) : (
                            <CircleIcon size={19} className="shrink-0 text-stone" />
                          )}
                          <span className={cn("text-[13px]", item.done ? "text-ink-soft line-through" : "text-ink")}>
                            {item.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "روز مراسم" && (
            <div className="flex flex-col gap-3">
              <p className="text-[12.5px] text-ink-soft">برنامه زمانی روز {MY_EVENT.date}</p>
              <div className="flex flex-col gap-0 rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
                {MY_EVENT.dayTimeline.map((item, i) => (
                  <div key={item.id} className="flex gap-3 pb-5 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-14 shrink-0 items-center justify-center rounded-full bg-forest-tint text-[11px] font-medium text-forest">
                        {item.time}
                      </span>
                      {i < MY_EVENT.dayTimeline.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-stone/50" />}
                    </div>
                    <div className="pb-1">
                      <p className="text-[13.5px] font-medium text-ink">{item.title}</p>
                      <p className="mt-0.5 text-[12px] leading-5 text-ink-soft">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "مهمانان" && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard icon={Users2} label="مجموع مهمانان" value={`${toPersianDigits(totalGuestCount)} نفر`} />
                <StatCard icon={CheckCircle2} label="تایید شده" value={`${toPersianDigits(confirmedGuests.length)} گروه`} />
              </div>
              <div className="flex flex-col gap-2">
                {MY_GUESTS.map((g) => (
                  <div key={g.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-paper border border-stone/50 p-3.5">
                    <div>
                      <p className="text-[13.5px] font-medium text-ink">{g.name}</p>
                      <p className="text-[11.5px] text-ink-soft">{g.group} · {toPersianDigits(g.companions)} نفر</p>
                    </div>
                    <StatusChip status={g.confirmed ? "تایید شده" : "در انتظار"} />
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-[var(--radius-lg)] bg-night p-5 text-center">
                <p className="font-display text-[18px] text-on-night">کارت دعوت دیجیتال</p>
                <p className="mt-1 text-[12px] text-on-night-soft">کارت اختصاصی مراسم خود را طراحی و برای مهمانان ارسال کنید</p>
                <Button variant="gold" size="sm" className="mt-4">
                  طراحی کارت دعوت
                </Button>
              </div>
            </div>
          )}

          {tab === "مالی" && (
            <div className="flex flex-col gap-4">
              <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ink-soft">مبلغ کل قرارداد</span>
                  <span className="font-medium text-ink">{formatToman(MY_EVENT.totalPrice)}</span>
                </div>
                <ProgressBar percent={paidPercent} label="میزان پرداخت‌شده" className="mt-3" />
                <div className="mt-3 flex items-center justify-between text-[13px]">
                  <span className="text-ink-soft">باقی‌مانده</span>
                  <span className="font-medium text-error">{formatToman(remaining)}</span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[13px] font-medium text-ink-soft">تاریخچه پرداخت‌ها</p>
                <div className="flex flex-col gap-2">
                  {MY_EVENT.payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-paper border border-stone/50 p-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-tint text-forest">
                          <Wallet size={15} />
                        </span>
                        <div>
                          <p className="text-[13px] font-medium text-ink">{p.title}</p>
                          <p className="text-[11px] text-ink-soft">{p.date}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-num text-[13px] font-medium text-ink">{formatToman(p.amount)}</p>
                        <StatusChip status={p.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-[var(--radius-lg)] bg-forest-tint p-4">
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className="text-forest" />
                  <div>
                    <p className="text-[13px] font-medium text-forest">قرارداد و مدارک</p>
                    <p className="text-[11px] text-forest/80">۳ سند در دسترس شماست</p>
                  </div>
                </div>
                <Clock3 size={16} className="text-forest" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-3.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-tint text-forest">
        <Icon size={15} />
      </span>
      <p className="mt-2 text-[11px] text-ink-soft">{label}</p>
      <div className="mt-0.5 text-[13.5px] font-medium text-ink">{value}</div>
    </div>
  );
}
