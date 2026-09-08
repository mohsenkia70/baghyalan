"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, Search, Plus } from "lucide-react";
import { LeadCard } from "@/components/admin/LeadCard";
import { StatusChip } from "@/components/ui/Badge";
import { LEADS as INITIAL_LEADS, CONSULTANTS } from "@/lib/mock-data/crm";
import { LEAD_STAGES } from "@/lib/types";
import type { Lead, LeadStage } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits, formatCompactToman } from "@/lib/utils/date";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [query, setQuery] = useState("");

  const filtered = leads.filter(
    (l) => !query.trim() || l.fullName.toLowerCase().includes(query.toLowerCase()) || l.phone.includes(query)
  );

  function moveStage(id: string, dir: 1 | -1) {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const idx = LEAD_STAGES.indexOf(l.stage);
        const nextIdx = Math.min(LEAD_STAGES.length - 1, Math.max(0, idx + dir));
        return { ...l, stage: LEAD_STAGES[nextIdx] };
      })
    );
  }

  return (
    <div className="flex flex-col gap-5 mt-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[26px] text-ink">مدیریت لیدها</h1>
          <p className="text-[13px] text-ink-soft">پایپ‌لاین فروش از لید تا قرارداد</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-forest px-4 py-2.5 text-[13px] font-medium text-paper">
          <Plus size={15} /> لید جدید
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-stone/50 bg-paper px-4">
          <Search size={15} className="text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجوی نام یا شماره تماس..."
            className="h-10 w-64 max-w-full bg-transparent text-[13px] text-ink outline-none"
          />
        </div>
        <div className="flex rounded-full border border-stone/50 bg-paper p-1">
          {[
            { id: "kanban" as const, icon: LayoutGrid, label: "کانبان" },
            { id: "list" as const, icon: List, label: "لیست" },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                view === v.id ? "bg-forest text-paper" : "text-ink-soft"
              )}
            >
              <v.icon size={14} /> {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "kanban" ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {LEAD_STAGES.map((stage) => {
            const stageLeads = filtered.filter((l) => l.stage === stage);
            return (
              <div key={stage} className="w-72 shrink-0">
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="text-[12.5px] font-medium text-ink">{stage}</p>
                  <span className="rounded-full bg-stone/40 px-2 py-0.5 text-[10.5px] text-ink-soft">
                    {toPersianDigits(stageLeads.length)}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 rounded-[var(--radius-lg)] bg-ivory-deep/40 p-2.5">
                  {stageLeads.length === 0 && (
                    <p className="py-6 text-center text-[11px] text-ink-soft">موردی نیست</p>
                  )}
                  {stageLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      canAdvance={LEAD_STAGES.indexOf(lead.stage) < LEAD_STAGES.length - 1}
                      canRegress={LEAD_STAGES.indexOf(lead.stage) > 0}
                      onAdvance={() => moveStage(lead.id, 1)}
                      onRegress={() => moveStage(lead.id, -1)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-stone/50 bg-paper">
          <table className="w-full min-w-[720px] text-[12.5px]">
            <thead>
              <tr className="border-b border-stone/50 text-ink-soft">
                <th className="p-3 text-right font-normal">نام مشتری</th>
                <th className="p-3 text-right font-normal">منبع</th>
                <th className="p-3 text-right font-normal">تاریخ احتمالی</th>
                <th className="p-3 text-right font-normal">مهمان</th>
                <th className="p-3 text-right font-normal">بودجه</th>
                <th className="p-3 text-right font-normal">مشاور</th>
                <th className="p-3 text-right font-normal">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const consultant = CONSULTANTS.find((c) => c.id === lead.consultantId);
                return (
                  <tr key={lead.id} className="border-b border-stone/30 last:border-0 hover:bg-ivory-deep/40">
                    <td className="p-3">
                      <Link href={`/admin/leads/${lead.id}`} className="font-medium text-ink hover:text-gold-deep">
                        {lead.fullName}
                      </Link>
                    </td>
                    <td className="p-3 text-ink-soft">{lead.source}</td>
                    <td className="p-3 text-ink-soft">{lead.possibleDate}</td>
                    <td className="p-3 font-num text-ink-soft">{toPersianDigits(lead.guestCount)}</td>
                    <td className="p-3 font-num text-ink-soft">{formatCompactToman(lead.budget)}</td>
                    <td className="p-3 text-ink-soft">{consultant?.name}</td>
                    <td className="p-3">
                      <StatusChip status={lead.stage} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
