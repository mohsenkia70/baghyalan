"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Gift, Search, Users2, TrendingUp, Wallet, Check } from "lucide-react";
import { REFERRALS } from "@/lib/mock-data/referrals";
import { StatusChip } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/date";
import type { ReferralRecord, RewardStatus } from "@/lib/types";

const FILTERS: (ReferralRecord["status"] | "همه")[] = [
  "همه", "لید جدید", "در حال بررسی", "تبدیل به مشتری", "رد شده",
];

export default function ReferralsPage() {
  const [records, setRecords] = useState<ReferralRecord[]>(REFERRALS);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("همه");
  const [search, setSearch] = useState("");

  const filtered = records.filter((r) => {
    const matchesFilter = filter === "همه" || r.status === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      r.referrerName.toLowerCase().includes(q) ||
      r.refereeName.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const stats = useMemo(() => {
    const converted = records.filter((r) => r.status === "تبدیل به مشتری").length;
    const pendingReward = records.filter(
      (r) => r.status === "تبدیل به مشتری" && r.rewardStatus === "پرداخت‌نشده"
    ).length;
    const conversionRate = records.length
      ? Math.round((converted / records.length) * 100)
      : 0;
    return { total: records.length, converted, pendingReward, conversionRate };
  }, [records]);

  function markRewardPaid(id: string) {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rewardStatus: "پرداخت‌شده" as RewardStatus } : r))
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-[26px] text-ink">ردیابی معرفی مشتریان</h1>
        <p className="text-[13px] text-ink-soft">مشتریان قبلی که مشتری جدید معرفی کرده‌اند و وضعیت پاداش آن‌ها</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Users2} label="کل معرفی‌ها" value={stats.total} />
        <StatCard icon={TrendingUp} label="تبدیل به مشتری" value={stats.converted} tone="forest" />
        <StatCard icon={Gift} label="نرخ تبدیل معرفی" value={`${toPersianDigits(stats.conversionRate)}٪`} tone="gold" />
        <StatCard icon={Wallet} label="پاداش پرداخت‌نشده" value={stats.pendingReward} tone="error" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-stone/50 bg-paper px-4">
          <Search size={15} className="text-ink-soft" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجوی نام معرف یا مشتری جدید..."
            className="h-10 w-64 max-w-full bg-transparent text-[13px] text-ink outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                filter === f ? "border-forest bg-forest text-paper" : "border-stone/50 bg-paper text-ink-soft"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-stone/50 bg-paper">
        <table className="w-full min-w-[820px] text-[12.5px]">
          <thead>
            <tr className="border-b border-stone/50 text-ink-soft">
              <th className="p-3 text-right font-normal">معرف (مشتری قبلی)</th>
              <th className="p-3 text-right font-normal">مشتری جدید</th>
              <th className="p-3 text-right font-normal">تاریخ معرفی</th>
              <th className="p-3 text-right font-normal">وضعیت</th>
              <th className="p-3 text-right font-normal">نوع پاداش</th>
              <th className="p-3 text-right font-normal">وضعیت پاداش</th>
              <th className="p-3 text-right font-normal" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-stone/30 last:border-0 hover:bg-ivory-deep/40 align-top">
                <td className="p-3">
                  <Link href={`/admin/events/${r.referrerEventId}`} className="font-medium text-ink hover:text-gold-deep">
                    {r.referrerName}
                  </Link>
                </td>
                <td className="p-3">
                  <p className="font-medium text-ink">{r.refereeName}</p>
                  <p dir="ltr" className="mt-0.5 text-[11px] text-ink-soft">{r.refereePhone}</p>
                  {r.notes && <p className="mt-1 max-w-[220px] text-[11px] leading-5 text-ink-soft">{r.notes}</p>}
                </td>
                <td className="p-3 text-ink-soft">{r.dateReferred}</td>
                <td className="p-3">
                  <StatusChip status={r.status === "لید جدید" ? "در انتظار" : r.status === "در حال بررسی" ? "نیازمند بررسی" : r.status === "تبدیل به مشتری" ? "تایید شده" : "لغو شده"} />
                  <p className="mt-1 text-[10.5px] text-ink-soft">{r.status}</p>
                </td>
                <td className="p-3 text-ink-soft">
                  {r.rewardType}
                  <p className="mt-0.5 font-num text-[11.5px] text-ink">{r.rewardValue}</p>
                </td>
                <td className="p-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-medium",
                      r.rewardStatus === "پرداخت‌شده"
                        ? "bg-forest-tint text-forest-2"
                        : r.rewardStatus === "پرداخت‌نشده"
                          ? "bg-gold-soft/40 text-gold-deep"
                          : "bg-stone/30 text-ink-soft"
                    )}
                  >
                    {r.rewardStatus}
                  </span>
                </td>
                <td className="p-3">
                  {r.status === "تبدیل به مشتری" && r.rewardStatus === "پرداخت‌نشده" && (
                    <button
                      onClick={() => markRewardPaid(r.id)}
                      className="flex items-center gap-1 rounded-full bg-forest px-3 py-1.5 text-[11px] font-medium text-paper"
                    >
                      <Check size={11} /> ثبت پرداخت
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "forest",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  tone?: "forest" | "gold" | "error";
}) {
  const toneClass =
    tone === "forest" ? "text-forest" : tone === "gold" ? "text-gold-deep" : "text-error";
  return (
    <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
      <span className={cn("flex h-9 w-9 items-center justify-center rounded-full bg-forest-tint", toneClass)}>
        <Icon size={16} />
      </span>
      <p className={cn("mt-3 font-num font-display text-[22px]", toneClass)}>
        {typeof value === "number" ? toPersianDigits(value) : value}
      </p>
      <p className="mt-1 text-[11px] text-ink-soft">{label}</p>
    </div>
  );
}
