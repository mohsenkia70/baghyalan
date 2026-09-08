"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock3, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/date";
import type { EventTimelineStep, TimelineStepStatus } from "@/lib/types";

const STATUS_ORDER: TimelineStepStatus[] = ["در انتظار", "انجام‌شده", "مشکل"];

const STATUS_META: Record<
  TimelineStepStatus,
  { icon: React.ElementType; ring: string; dot: string; chipActive: string; label: string }
> = {
  "انجام‌شده": {
    icon: Check,
    ring: "border-forest-2 bg-forest-2 text-paper",
    dot: "bg-forest-2",
    chipActive: "border-forest-2 bg-forest-2 text-paper",
    label: "انجام‌شده",
  },
  "در انتظار": {
    icon: Clock3,
    ring: "border-stone bg-paper text-ink-soft",
    dot: "bg-stone",
    chipActive: "border-gold-deep bg-gold-soft/50 text-gold-deep",
    label: "در انتظار",
  },
  "مشکل": {
    icon: AlertTriangle,
    ring: "border-error bg-error text-paper",
    dot: "bg-error",
    chipActive: "border-error bg-error text-paper",
    label: "مشکل",
  },
};

export function EventTimelinePanel({ steps: initialSteps }: { steps: EventTimelineStep[] }) {
  const [steps, setSteps] = useState(initialSteps);

  const doneCount = steps.filter((s) => s.status === "انجام‌شده").length;
  const problemCount = steps.filter((s) => s.status === "مشکل").length;
  const pendingCount = steps.length - doneCount - problemCount;

  function setStatus(id: string, status: TimelineStepStatus) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard label="انجام‌شده" value={doneCount} tone="forest" icon={Check} />
        <SummaryCard label="در انتظار" value={pendingCount} tone="gold" icon={Clock3} />
        <SummaryCard label="مشکل" value={problemCount} tone="error" icon={AlertTriangle} />
      </div>

      {problemCount > 0 && (
        <div className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-error/30 bg-error/5 px-4 py-3">
          <AlertTriangle size={16} className="shrink-0 text-error" />
          <p className="text-[12.5px] text-error">
            {toPersianDigits(problemCount)} مرحله نیازمند رسیدگی فوری است.
          </p>
        </div>
      )}

      <div className="relative flex flex-col rounded-[var(--radius-xl)] border border-stone/50 bg-paper p-5">
        {steps.map((step, i) => {
          const meta = STATUS_META[step.status];
          const Icon = meta.icon;
          return (
            <div key={step.id} className="relative flex gap-4 pb-7 last:pb-0">
              {i < steps.length - 1 && (
                <span className="absolute right-[19px] top-11 h-[calc(100%-18px)] w-px bg-stone/50" />
              )}
              <motion.div
                key={step.status}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                  meta.ring
                )}
              >
                <Icon size={17} />
              </motion.div>

              <div className="flex-1 pb-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-num text-[11px] text-ink-soft">{step.time}</span>
                    <p className="text-[14px] font-medium text-ink">{step.title}</p>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-1.5">
                  {STATUS_ORDER.map((s) => {
                    const active = step.status === s;
                    const m = STATUS_META[s];
                    return (
                      <button
                        key={s}
                        onClick={() => setStatus(step.id, s)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
                          active ? m.chipActive : "border-stone/50 text-ink-soft"
                        )}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: number;
  tone: "forest" | "gold" | "error";
  icon: React.ElementType;
}) {
  const toneClass =
    tone === "forest" ? "text-forest bg-forest-tint" : tone === "gold" ? "text-gold-deep bg-gold-soft/40" : "text-error bg-error/10";
  return (
    <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4 text-center">
      <span className={cn("mx-auto flex h-9 w-9 items-center justify-center rounded-full", toneClass)}>
        <Icon size={16} />
      </span>
      <p className="mt-2 font-num font-display text-[22px] text-ink">{toPersianDigits(value)}</p>
      <p className="text-[10.5px] text-ink-soft">{label}</p>
    </div>
  );
}
