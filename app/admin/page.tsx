"use client";

import Link from "next/link";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from "recharts";
import {
  CalendarCheck, Handshake, TrendingUp, Wallet, Star, ChevronLeft, AlertTriangle,
} from "lucide-react";
import { KpiCard } from "@/components/admin/KpiCard";
import { StatusChip } from "@/components/ui/Badge";
import { VISITS, CONSULTANTS } from "@/lib/mock-data/crm";
import { EVENTS } from "@/lib/mock-data/events";
import { toPersianDigits, formatCompactToman } from "@/lib/utils/date";

function netProfitOf(e: (typeof EVENTS)[number]) {
  const p = e.profitability;
  return p.revenue - p.foodCost - p.decorCost - p.staffCost - p.musicCost - p.otherCost;
}

export default function AdminDashboardPage() {
  const pendingVisits = VISITS.filter((v) => v.status === "در انتظار").length;
  const upcomingEvents = EVENTS.filter((e) => e.status !== "برگزار شده");

  const totalRevenue = EVENTS.reduce((sum, e) => sum + e.profitability.revenue, 0);
  const avgMargin = Math.round(
    EVENTS.reduce((sum, e) => sum + (netProfitOf(e) / e.profitability.revenue) * 100, 0) / EVENTS.length
  );
  const problemStepsTotal = EVENTS.reduce(
    (sum, e) => sum + e.adminTimeline.filter((s) => s.status === "مشکل").length,
    0
  );

  // Average net profit grouped by event type — answers "which event type is most profitable?"
  const byType = EVENTS.reduce<Record<string, { sum: number; count: number }>>((acc, e) => {
    acc[e.eventType] ??= { sum: 0, count: 0 };
    acc[e.eventType].sum += netProfitOf(e);
    acc[e.eventType].count += 1;
    return acc;
  }, {});
  const profitByType = Object.entries(byType).map(([label, v]) => ({
    label,
    value: Math.round(v.sum / v.count / 1_000_000), // میلیون تومان
  }));

  const marginByEvent = EVENTS.map((e) => ({
    label: e.coupleNames.split(" ")[0],
    value: Math.round((netProfitOf(e) / e.profitability.revenue) * 100),
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col gap-6 mt-14 md:mt-0">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-[26px] text-ink">داشبورد مدیریت</h1>
        <p className="text-[13px] text-ink-soft">نمای کلی عملکرد و سودآوری عمارت یلان</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <KpiCard icon={CalendarCheck} label="بازدیدهای این هفته" value={VISITS.length} trend={{ value: 8, positive: true }} />
        <KpiCard icon={Handshake} label="رزروهای در انتظار" value={pendingVisits} trend={{ value: 4, positive: false }} />
        <KpiCard icon={Star} label="مراسم‌های پیش‌رو" value={upcomingEvents.length} trend={{ value: 6, positive: true }} />
        <KpiCard icon={TrendingUp} label="میانگین حاشیه سود" value={`${toPersianDigits(avgMargin)}`} suffix="٪" trend={{ value: 3, positive: true }} tone="gold" />
        <KpiCard icon={Wallet} label="درآمد کل مراسم‌های فعال" value={formatCompactToman(totalRevenue)} tone="gold" />
        <KpiCard icon={AlertTriangle} label="مراحل نیازمند رسیدگی" value={problemStepsTotal} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5 lg:col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-ink">میانگین سود بر اساس نوع مراسم</p>
            <span className="text-[11px] text-ink-soft">میلیون تومان</span>
          </div>
          <div className="mt-3 h-52 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCD0B4" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5B5140" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#5B5140" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #DCD0B4" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
                  {profitByType.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#AC8A52" : "#1E3B2E"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-[11px] text-ink-soft">
            سودآورترین نوع مراسم:{" "}
            <span className="font-medium text-gold-deep">
              {profitByType.slice().sort((a, b) => b.value - a.value)[0]?.label}
            </span>
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5 lg:col-span-2">
          <p className="text-[14px] font-medium text-ink">حاشیه سود هر مراسم</p>
          <div className="mt-3 h-52 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marginByEvent} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="label" type="category" tick={{ fontSize: 11, fill: "#5B5140" }} axisLine={false} tickLine={false} width={56} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #DCD0B4" }} formatter={(v) => `${v}٪`} />
                <Bar dataKey="value" fill="#1E3B2E" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-ink">مراسم‌های پیش‌رو</p>
            <Link href="/admin/events" className="flex items-center gap-1 text-[12px] font-medium text-gold-deep">
              مشاهده همه <ChevronLeft size={13} />
            </Link>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {upcomingEvents.slice(0, 5).map((e) => (
              <Link
                key={e.id}
                href={`/admin/events/${e.id}`}
                className="flex items-center justify-between rounded-[var(--radius-md)] px-2 py-2.5 hover:bg-ivory-deep/60"
              >
                <div>
                  <p className="text-[13px] font-medium text-ink">{e.coupleNames}</p>
                  <p className="text-[11px] text-ink-soft">{e.eventType} · {e.date}</p>
                </div>
                <StatusChip status={e.status} />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
          <p className="text-[14px] font-medium text-ink">عملکرد مشاوران</p>
          <div className="mt-3 flex flex-col gap-3">
            {CONSULTANTS.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-tint font-display text-[14px] text-forest">
                  {c.avatarInitial}
                  {c.online && <span className="absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-forest-2" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium text-ink">{c.name}</p>
                  <p className="text-[10.5px] text-ink-soft">{c.role}</p>
                </div>
                <div className="text-left">
                  <p className="font-num text-[12.5px] font-medium text-ink">{toPersianDigits(c.activeLeads)} مورد فعال</p>
                  <p className="font-num text-[10.5px] text-forest-2">{toPersianDigits(c.conversionRate)}٪ تبدیل</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
