import Link from "next/link";
import { Users, MapPin, TrendingUp } from "lucide-react";
import { EVENTS } from "@/lib/mock-data/events";
import { StatusChip } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { toPersianDigits, formatCompactToman } from "@/lib/utils/date";

export default function AdminEventsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-[26px] text-ink">مراسم‌ها</h1>
        <p className="text-[13px] text-ink-soft">
          نمای کلی، Timeline روز مراسم، پیامک به مهمانان و سودآوری هر مراسم
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {EVENTS.map((e) => {
          const netProfit =
            e.profitability.revenue -
            e.profitability.foodCost -
            e.profitability.decorCost -
            e.profitability.staffCost -
            e.profitability.musicCost -
            e.profitability.otherCost;
          const margin = Math.round((netProfit / e.profitability.revenue) * 100);

          return (
            <Link
              key={e.id}
              href={`/admin/events/${e.id}`}
              className="flex flex-col gap-3 rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-[18px] text-ink">{e.coupleNames}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-soft">{e.eventType} · {e.date}</p>
                </div>
                <StatusChip status={e.status} />
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11.5px] text-ink-soft">
                <span className="flex items-center gap-1">
                  <Users size={12} /> {toPersianDigits(e.guestCount)} نفر
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {e.space}
                </span>
              </div>

              <ProgressBar percent={e.progressPercent} label="آماده‌سازی" />

              <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-forest-tint px-3 py-2">
                <span className="flex items-center gap-1.5 text-[11.5px] text-forest">
                  <TrendingUp size={13} /> سود خالص تقریبی
                </span>
                <span className="font-num text-[12.5px] font-bold text-forest">
                  {formatCompactToman(netProfit)} · {toPersianDigits(margin)}٪
                </span>
              </div>

              <p className="text-[11px] text-ink-soft">مسئول مراسم: {e.responsiblePerson}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
