import type { EventTimelineStep, TimelineStepStatus } from "@/lib/types";

const STEPS: { time: string; title: string }[] = [
  { time: "۱۳:۰۰", title: "ورود تیم دکور" },
  { time: "۱۴:۳۰", title: "چیدمان میزها" },
  { time: "۱۶:۰۰", title: "تست نور و صدا" },
  { time: "۱۷:۰۰", title: "تحویل سالن به تشریفات" },
  { time: "۱۸:۰۰", title: "ورود عروس و داماد" },
  { time: "۱۹:۰۰", title: "ورود مهمانان" },
  { time: "۲۰:۰۰", title: "پذیرایی" },
  { time: "۲۲:۰۰", title: "شام" },
  { time: "۲۳:۳۰", title: "برش کیک" },
  { time: "۰۱:۰۰", title: "پایان مراسم" },
];

/**
 * Builds a full day-of timeline for an event. `statuses` lets each event
 * override the status of specific steps by index; steps not mentioned
 * default to `fallback` (e.g. "در انتظار" for a future event or
 * "انجام‌شده" for a past one).
 */
export function buildTimeline(
  eventId: string,
  fallback: TimelineStepStatus,
  overrides: Record<number, TimelineStepStatus> = {}
): EventTimelineStep[] {
  return STEPS.map((step, i) => ({
    id: `${eventId}-t${i}`,
    time: step.time,
    title: step.title,
    status: overrides[i] ?? fallback,
  }));
}
