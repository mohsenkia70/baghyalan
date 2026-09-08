"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Users, MapPin, Wallet, ClipboardList, TrendingUp,
  MessageSquareText, CalendarClock,
} from "lucide-react";
import { EVENTS } from "@/lib/mock-data/events";
import { StatusChip } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { toPersianDigits, formatCompactToman } from "@/lib/utils/date";
import { EventTimelinePanel } from "@/components/admin/events/EventTimelinePanel";
import { EventProfitabilityPanel } from "@/components/admin/events/EventProfitabilityPanel";
import { EventSmsPanel } from "@/components/admin/events/EventSmsPanel";
import { GuestManagementPanel } from "@/components/admin/events/GuestManagementPanel";

const ease = [0.16, 1, 0.3, 1] as const;
const TABS = [
  { id: "overview", label: "نمای کلی", icon: ClipboardList },
  { id: "timeline", label: "Timeline روز مراسم", icon: CalendarClock },
  { id: "profitability", label: "سودآوری", icon: TrendingUp },
  { id: "guests", label: "مهمانان و پیامک", icon: Users },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminEventDetailPage() {
  const params = useParams<{ eventId: string }>();
  const event = EVENTS.find((e) => e.id === params.eventId);
  const [tab, setTab] = useState<TabId>("overview");

  if (!event) notFound();

  const netProfit =
    event.profitability.revenue -
    event.profitability.foodCost -
    event.profitability.decorCost -
    event.profitability.staffCost -
    event.profitability.musicCost -
    event.profitability.otherCost;
  const margin = Math.round((netProfit / event.profitability.revenue) * 100);

  const problemSteps = event.adminTimeline.filter((s) => s.status === "مشکل").length;

  return (
    <div className="flex flex-col gap-5">
      <Link href="/admin/events" className="flex w-fit items-center gap-1.5 text-[13px] text-ink-soft hover:text-ink">
        <ArrowRight size={15} /> بازگشت به مراسم‌ها
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
        <div>
          <h1 className="font-display text-[24px] text-ink">{event.coupleNames}</h1>
          <p className="mt-1 text-[13px] text-ink-soft">{event.eventType} · {event.date}</p>
        </div>
        <StatusChip status={event.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <InfoCard icon={Users} label="مهمانان" value={`${toPersianDigits(event.guestCount)} نفر`} />
        <InfoCard icon={MapPin} label="فضا" value={event.space} />
        <InfoCard icon={Wallet} label="سود خالص تقریبی" value={formatCompactToman(netProfit)} tone="forest" />
        <InfoCard
          icon={TrendingUp}
          label="حاشیه سود"
          value={`${toPersianDigits(margin)}٪`}
          tone={margin >= 40 ? "forest" : margin >= 20 ? "gold" : "error"}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors ${
              tab === t.id ? "border-forest bg-forest text-paper" : "border-stone/50 bg-paper text-ink-soft"
            }`}
          >
            <t.icon size={14} />
            {t.label}
            {t.id === "timeline" && problemSteps > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-error text-[9px] text-paper">
                {toPersianDigits(problemSteps)}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          {tab === "overview" && (
            <div className="flex flex-col gap-4">
              <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
                <p className="mb-3 text-[13.5px] font-medium text-ink">پیشرفت آماده‌سازی</p>
                <ProgressBar percent={event.progressPercent} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
                  <p className="text-[13.5px] font-medium text-ink">تیم مسئول</p>
                  <p className="mt-2 text-[14px] text-ink">{event.responsiblePerson}</p>
                  <p className="text-[11.5px] text-ink-soft">هماهنگ‌کننده اختصاصی مراسم</p>
                </div>
                <button
                  onClick={() => setTab("timeline")}
                  className="rounded-[var(--radius-xl)] bg-night p-5 text-right transition-colors hover:bg-night-2"
                >
                  <p className="text-[13px] font-medium text-on-night">مشاهده Timeline روز مراسم</p>
                  <p className="mt-1 text-[11px] text-on-night-soft">
                    {problemSteps > 0
                      ? `${toPersianDigits(problemSteps)} مرحله نیازمند رسیدگی است`
                      : "همه مراحل تحت کنترل هستند"}
                  </p>
                </button>
              </div>
            </div>
          )}

          {tab === "timeline" && <EventTimelinePanel steps={event.adminTimeline} />}
          {tab === "profitability" && <EventProfitabilityPanel data={event.profitability} />}
          {tab === "guests" && (
            <div className="flex flex-col gap-6">
              <GuestManagementPanel eventId={event.id} />
              <div>
                <p className="mb-3 flex items-center gap-2 text-[14px] font-medium text-ink">
                  <MessageSquareText size={16} className="text-forest" /> ارسال پیامک به مهمانان
                </p>
                <EventSmsPanel eventId={event.id} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone?: "default" | "forest" | "gold" | "error";
}) {
  const toneClass =
    tone === "forest" ? "text-forest" : tone === "gold" ? "text-gold-deep" : tone === "error" ? "text-error" : "text-ink";
  return (
    <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-tint text-forest">
        <Icon size={14} />
      </span>
      <p className="mt-2 text-[11px] text-ink-soft">{label}</p>
      <p className={`text-[13px] font-medium ${toneClass}`}>{value}</p>
    </div>
  );
}
