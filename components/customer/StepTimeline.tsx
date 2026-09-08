import { Check, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { JourneyStep } from "@/lib/types";

export function StepTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const done = step.status === "انجام‌شده";
        const active = step.status === "در حال انجام";
        return (
          <li key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  "absolute right-[13px] top-7 h-[calc(100%-8px)] w-px",
                  done ? "bg-forest-2" : "bg-stone/60"
                )}
              />
            )}
            <span
              className={cn(
                "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                done && "border-forest-2 bg-forest-2 text-paper",
                active && "border-gold bg-gold-soft/40 text-gold-deep",
                !done && !active && "border-stone bg-paper text-stone"
              )}
            >
              {done ? <Check size={13} /> : active ? <Clock size={12} /> : <Circle size={8} className="fill-current" />}
            </span>
            <div className="flex-1 pb-1">
              <div className="flex items-center justify-between gap-2">
                <p className={cn("text-[13.5px] font-medium", done || active ? "text-ink" : "text-ink-soft")}>
                  {step.title}
                </p>
                {step.date && <span className="shrink-0 text-[11px] text-ink-soft">{step.date}</span>}
              </div>
              <p className="mt-0.5 text-[12px] leading-5 text-ink-soft">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
