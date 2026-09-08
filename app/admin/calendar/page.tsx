"use client";

import { useState } from "react";
import { CalendarDays, Users, PartyPopper, Handshake } from "lucide-react";
import { PersianCalendar } from "@/components/ui/PersianCalendar";
import { cn } from "@/lib/utils/cn";
import { formatJalaliDate, toPersianDigits } from "@/lib/utils/date";
import { VISITS } from "@/lib/mock-data/crm";
import { EVENTS } from "@/lib/mock-data/events";

const VIEWS = ["روز", "هفته", "ماه"] as const;

function getDayEvents(date: Date) {
  const seed = date.getDate() + date.getMonth();
  const items: { type: "visit" | "event" | "meeting"; title: string; time: string }[] = [];
  if (seed % 4 === 0) items.push({ type: "visit", title: "بازدید حضوری — خانواده رحیمی", time: "۱۷:۰۰" });
  if (seed % 6 === 0) items.push({ type: "event", title: "مراسم عروسی — نیلوفر و کیان", time: "۱۹:۰۰" });
  if (seed % 5 === 0) items.push({ type: "meeting", title: "جلسه هماهنگی تشریفات", time: "۱۱:۰۰" });
  return items;
}

const typeMeta = {
  visit: { icon: Users, color: "text-forest bg-forest-tint" },
  event: { icon: PartyPopper, color: "text-gold-deep bg-gold-soft/40" },
  meeting: { icon: Handshake, color: "text-[#2F5C8A] bg-[#DDE7F2]" },
};

export default function AdminCalendarPage() {
  const [view, setView] = useState<(typeof VIEWS)[number]>("ماه");
  const [selected, setSelected] = useState<Date | null>(new Date());

  return (
    <div className="flex flex-col gap-5 mt-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[26px] text-ink">تقویم مدیریت</h1>
          <p className="text-[13px] text-ink-soft">بازدیدها، مراسم‌ها، جلسات و تاریخ‌های مسدود</p>
        </div>
        <div className="flex rounded-full border border-stone/50 bg-paper p-1">
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-colors",
                view === v ? "bg-forest text-paper" : "text-ink-soft"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
        <PersianCalendar
          getStatus={(d) => (getDayEvents(d).length > 0 ? "review" : "available")}
          selected={selected}
          onSelect={setSelected}
        />

        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-forest" />
            <p className="text-[14px] font-medium text-ink">
              {selected ? formatJalaliDate(selected, true) : "روزی را انتخاب کنید"}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {selected && getDayEvents(selected).length === 0 && (
              <p className="py-8 text-center text-[13px] text-ink-soft">برنامه‌ای برای این روز ثبت نشده است.</p>
            )}
            {selected &&
              getDayEvents(selected).map((item, i) => {
                const meta = typeMeta[item.type];
                return (
                  <div key={i} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-stone/40 p-3">
                    <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", meta.color)}>
                      <meta.icon size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-ink">{item.title}</p>
                      <p className="text-[11px] text-ink-soft">ساعت {item.time}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-6 border-t border-stone/40 pt-4">
            <p className="mb-2.5 text-[12.5px] font-medium text-ink-soft">مراسم‌های نزدیک</p>
            <div className="flex flex-col gap-2">
              {EVENTS.slice(0, 3).map((e) => (
                <div key={e.id} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-ink">{e.coupleNames}</span>
                  <span className="font-num text-ink-soft">{e.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
