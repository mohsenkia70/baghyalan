"use client";

import {
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { REVENUE_TREND, CONSULTANTS, LEADS } from "@/lib/mock-data/crm";
import { toPersianDigits } from "@/lib/utils/date";

const SOURCE_COLORS: Record<string, string> = {
  "اینستاگرام": "#AC8A52",
  "وب‌سایت": "#1E3B2E",
  "معرفی": "#C79188",
  "تماس تلفنی": "#2F5C8A",
};

export default function AdminReportsPage() {
  const sourceCounts = Object.entries(
    LEADS.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const totalContracts = LEADS.filter((l) => l.stage === "قرارداد").length;
  const totalLost = LEADS.filter((l) => l.stage === "از دست رفته").length;
  const conversionRate = Math.round((totalContracts / LEADS.length) * 100);

  return (
    <div className="flex flex-col gap-5 mt-14">
      <div>
        <h1 className="font-display text-[26px] text-ink">گزارش‌ها و تحلیل عملکرد</h1>
        <p className="text-[13px] text-ink-soft">تحلیل منبع لیدها، نرخ تبدیل و روند درآمد</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatBox label="مجموع لیدها" value={LEADS.length} />
        <StatBox label="قرارداد نهایی" value={totalContracts} tone="forest" />
        <StatBox label="از دست رفته" value={totalLost} tone="error" />
        <StatBox label="نرخ تبدیل کل" value={`${toPersianDigits(conversionRate)}٪`} tone="gold" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5 lg:col-span-3">
          <p className="text-[14px] font-medium text-ink">روند درآمد (میلیارد تومان)</p>
          <div className="mt-3 h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCD0B4" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5B5140" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#5B5140" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #DCD0B4" }} />
                <Line type="monotone" dataKey="value" stroke="#AC8A52" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5 lg:col-span-2">
          <p className="text-[14px] font-medium text-ink">منبع لیدها</p>
          <div className="mt-3 h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceCounts} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {sourceCounts.map((s) => (
                    <Cell key={s.name} fill={SOURCE_COLORS[s.name] ?? "#5B5140"} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  align="center"
                  wrapperStyle={{ fontSize: 11, direction: "rtl" }}
                />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #DCD0B4" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
        <p className="mb-3 text-[14px] font-medium text-ink">عملکرد مشاوران</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-[12.5px]">
            <thead>
              <tr className="border-b border-stone/40 text-ink-soft">
                <th className="p-2.5 text-right font-normal">مشاور</th>
                <th className="p-2.5 text-right font-normal">لیدهای فعال</th>
                <th className="p-2.5 text-right font-normal">نرخ تبدیل</th>
                <th className="p-2.5 text-right font-normal">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {CONSULTANTS.map((c) => (
                <tr key={c.id} className="border-b border-stone/20 last:border-0">
                  <td className="p-2.5 font-medium text-ink">{c.name}</td>
                  <td className="p-2.5 font-num text-ink-soft">{toPersianDigits(c.activeLeads)}</td>
                  <td className="p-2.5 font-num text-forest-2">{toPersianDigits(c.conversionRate)}٪</td>
                  <td className="p-2.5">
                    <span className={c.online ? "text-forest-2" : "text-ink-soft"}>
                      {c.online ? "آنلاین" : "آفلاین"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, tone = "default" }: { label: string; value: string | number; tone?: "default" | "forest" | "gold" | "error" }) {
  const toneClass = {
    default: "text-ink",
    forest: "text-forest-2",
    gold: "text-gold-deep",
    error: "text-error",
  }[tone];
  return (
    <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
      <p className={`font-num font-display text-[24px] ${toneClass}`}>
        {typeof value === "number" ? toPersianDigits(value) : value}
      </p>
      <p className="mt-1 text-[11.5px] text-ink-soft">{label}</p>
    </div>
  );
}
