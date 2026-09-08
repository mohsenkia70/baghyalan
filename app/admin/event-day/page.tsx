"use client";

import { useState } from "react";
import { Trees, Building2, Flower2, LayoutGrid, Lightbulb, Utensils, Music, Check } from "lucide-react";
import { StatusChip } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { EVENT_DAY_STATIONS } from "@/lib/mock-data/events";
import { toPersianDigits } from "@/lib/utils/date";

const icons: Record<string, React.ElementType> = {
  hall: Building2,
  garden: Trees,
  flowers: Flower2,
  tables: LayoutGrid,
  lighting: Lightbulb,
  catering: Utensils,
  music: Music,
};

const STATUSES = ["آماده", "در حال انجام", "نیازمند بررسی"] as const;

export default function EventDayPanel() {
  const [stations, setStations] = useState(EVENT_DAY_STATIONS);

  const readyCount = stations.filter((s) => s.status === "آماده").length;

  function setStatus(id: string, status: (typeof STATUSES)[number]) {
    setStations((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  return (
    <div className="flex flex-col gap-5 mt-14">
      <div>
        <h1 className="font-display text-[26px] text-ink">پنل مدیریت روز مراسم</h1>
        <p className="text-[13px] text-ink-soft">وضعیت لحظه‌ای آماده‌سازی — مراسم نیلوفر و کیان صفری، امشب</p>
      </div>

      <div className="rounded-[var(--radius-lg)] bg-night p-5 text-center">
        <p className="font-display text-[32px] text-on-night">
          {toPersianDigits(readyCount)}/{toPersianDigits(stations.length)}
        </p>
        <p className="mt-1 text-[12px] text-on-night-soft">بخش آماده برای شروع مراسم</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {stations.map((s) => {
          const Icon = icons[s.id] ?? Building2;
          return (
            <div key={s.id} className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-tint text-forest">
                    <Icon size={16} />
                  </span>
                  <span className="text-[13.5px] font-medium text-ink">{s.name}</span>
                </span>
                <StatusChip status={s.status} />
              </div>
              <div className="mt-3 flex gap-1.5">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatus(s.id, st)}
                    className={cn(
                      "flex-1 rounded-full border py-1.5 text-[11px] font-medium transition-colors",
                      s.status === st ? "border-forest bg-forest text-paper" : "border-stone/50 text-ink-soft"
                    )}
                  >
                    {s.status === st && <Check size={10} className="ml-1 inline" />}
                    {st}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
