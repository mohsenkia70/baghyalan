import { Phone, Users, Clock } from "lucide-react";
import { VISITS } from "@/lib/mock-data/crm";
import { StatusChip } from "@/components/ui/Badge";
import { toPersianDigits } from "@/lib/utils/date";

export default function AdminVisitsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-[26px] text-ink">مدیریت بازدیدها</h1>
        <p className="text-[13px] text-ink-soft">بازدیدهای حضوری رزروشده توسط مشتریان</p>
      </div>

      <div className="flex flex-col gap-3 mt-14">
        {VISITS.map((v) => (
          <div
            key={v.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-tint font-display text-[16px] text-forest">
                {v.fullName[0]}
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-ink">{v.fullName}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-ink-soft">
                  <Phone size={11} /> {v.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[12px] text-ink-soft">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {v.date} · {v.time}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} /> {toPersianDigits(v.guestsAccompanying)} همراه
              </span>
            </div>

            <StatusChip status={v.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
