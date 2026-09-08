import Link from "next/link";
import { Phone, Users, Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import { toPersianDigits, formatCompactToman } from "@/lib/utils/date";
import type { Lead } from "@/lib/types";
import { CONSULTANTS } from "@/lib/mock-data/crm";

export function LeadCard({
  lead,
  onAdvance,
  onRegress,
  canAdvance,
  canRegress,
}: {
  lead: Lead;
  onAdvance?: () => void;
  onRegress?: () => void;
  canAdvance?: boolean;
  canRegress?: boolean;
}) {
  const consultant = CONSULTANTS.find((c) => c.id === lead.consultantId);
  return (
    <div className="flex flex-col gap-2.5 rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-3.5 shadow-[var(--shadow-sm)]">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/admin/leads/${lead.id}`} className="min-w-0">
          <p className="truncate text-[13px] font-medium text-ink">{lead.fullName}</p>
          <p className="mt-0.5 text-[11px] text-ink-soft">{lead.eventType} · {lead.possibleDate}</p>
        </Link>
        <span className="shrink-0 rounded-full bg-forest-tint px-2 py-0.5 text-[10px] font-medium text-forest">
          {lead.source}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-soft">
        <span className="flex items-center gap-1">
          <Phone size={11} /> {lead.phone}
        </span>
        <span className="flex items-center gap-1">
          <Users size={11} /> {toPersianDigits(lead.guestCount)} نفر
        </span>
        <span className="flex items-center gap-1">
          <Wallet size={11} /> {formatCompactToman(lead.budget)}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-stone/40 pt-2">
        <span className="flex items-center gap-1.5 text-[11px] text-ink-soft">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-[9px] text-paper">
            {consultant?.avatarInitial}
          </span>
          {consultant?.name}
        </span>
        {(onAdvance || onRegress) && (
          <div className="flex gap-1">
            {onRegress && (
              <button
                onClick={onRegress}
                disabled={!canRegress}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-stone/50 text-ink-soft disabled:opacity-30"
                aria-label="مرحله قبل"
              >
                <ChevronRight size={12} />
              </button>
            )}
            {onAdvance && (
              <button
                onClick={onAdvance}
                disabled={!canAdvance}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-paper disabled:opacity-30"
                aria-label="مرحله بعد"
              >
                <ChevronLeft size={12} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
