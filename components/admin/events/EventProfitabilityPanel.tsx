import { TrendingUp, Wallet } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatToman, toPersianDigits } from "@/lib/utils/date";
import type { EventProfitability } from "@/lib/types";

const COST_ROWS: { key: keyof Omit<EventProfitability, "revenue">; label: string; color: string }[] = [
  { key: "foodCost", label: "هزینه غذا و پذیرایی", color: "bg-[#C79188]" },
  { key: "decorCost", label: "دکور و گل‌آرایی", color: "bg-gold" },
  { key: "staffCost", label: "پرسنل و تشریفات", color: "bg-[#2F5C8A]" },
  { key: "musicCost", label: "موسیقی و صدابرداری", color: "bg-forest" },
  { key: "otherCost", label: "سایر هزینه‌ها", color: "bg-stone" },
];

export function EventProfitabilityPanel({ data }: { data: EventProfitability }) {
  const totalCost = COST_ROWS.reduce((sum, r) => sum + data[r.key], 0);
  const netProfit = data.revenue - totalCost;
  const margin = Math.round((netProfit / data.revenue) * 100);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-xl)] bg-night p-5">
          <span className="flex items-center gap-1.5 text-[11.5px] text-on-night-soft">
            <TrendingUp size={13} /> سود خالص تقریبی
          </span>
          <p className="mt-2 font-num font-display text-[30px] text-on-night">{formatToman(netProfit)}</p>
          <p className="mt-1 text-[11.5px] text-gold-soft">حاشیه سود {toPersianDigits(margin)}٪</p>
        </div>
        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
          <span className="flex items-center gap-1.5 text-[11.5px] text-ink-soft">
            <Wallet size={13} /> درآمد کل قرارداد
          </span>
          <p className="mt-2 font-num font-display text-[26px] text-ink">{formatToman(data.revenue)}</p>
          <p className="mt-1 text-[11.5px] text-ink-soft">مجموع هزینه‌ها: {formatToman(totalCost)}</p>
        </div>
      </div>

      {/* Composition bar */}
      <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
        <p className="mb-4 text-[13px] font-medium text-ink">ترکیب هزینه‌ها نسبت به درآمد</p>
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-ivory-deep">
          {COST_ROWS.map((r) => (
            <div
              key={r.key}
              className={cn("h-full", r.color)}
              style={{ width: `${(data[r.key] / data.revenue) * 100}%` }}
              title={r.label}
            />
          ))}
          <div className="h-full flex-1 bg-forest-2" title="سود خالص" />
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {COST_ROWS.map((r) => (
            <div key={r.key} className="flex items-center justify-between text-[12.5px]">
              <span className="flex items-center gap-2 text-ink-soft">
                <span className={cn("h-2.5 w-2.5 rounded-full", r.color)} />
                {r.label}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-num text-ink">{formatToman(data[r.key])}</span>
                <span className="w-10 text-left font-num text-[11px] text-ink-soft">
                  {toPersianDigits(Math.round((data[r.key] / data.revenue) * 100))}٪
                </span>
              </span>
            </div>
          ))}
          <div className="mt-1 flex items-center justify-between border-t border-stone/40 pt-2.5 text-[12.5px] font-medium">
            <span className="flex items-center gap-2 text-forest-2">
              <span className="h-2.5 w-2.5 rounded-full bg-forest-2" />
              سود خالص
            </span>
            <span className="flex items-center gap-2">
              <span className="font-num text-forest-2">{formatToman(netProfit)}</span>
              <span className="w-10 text-left font-num text-[11px] text-forest-2">{toPersianDigits(margin)}٪</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
