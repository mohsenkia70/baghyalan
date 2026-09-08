"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Gem, Heart, PartyPopper, Sparkles, Users,
} from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/date";
import { VENUE_IMAGES, PACKAGES, VENUE_CONTACT } from "@/lib/mock-data/venue";
import type { EventStyle, EventType, SpaceChoice } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;
const BUDGET_LEVEL: Record<string, number> = { classic: 1, royal: 2, luxury: 3 };

const EVENT_TYPES: { id: EventType; icon: React.ElementType }[] = [
  { id: "عروسی", icon: Heart },
  { id: "عقد", icon: Gem },
  { id: "نامزدی", icon: Sparkles },
  { id: "جشن خانوادگی", icon: PartyPopper },
];

const SPACES: SpaceChoice[] = ["باغ", "سالن", "ترکیبی"];
const STYLES: EventStyle[] = ["کلاسیک", "رویال", "مدرن", "مینیمال", "باغی", "اروپایی"];
const COLORS = [
  { id: "gold", label: "طلایی و عاجی", hex: "#AC8A52" },
  { id: "blush", label: "صورتی ملایم", hex: "#C79188" },
  { id: "forest", label: "سبز و کرم", hex: "#1E3B2E" },
  { id: "white", label: "سفید و نقره‌ای", hex: "#D9D9D9" },
  { id: "burgundy", label: "زرشکی و طلایی", hex: "#6E2A2A" },
];
const BUDGETS = ["زیر ۱ میلیارد", "۱ تا ۲ میلیارد", "۲ تا ۳ میلیارد", "بالای ۳ میلیارد"];

const STEP_TITLES = ["نوع مراسم", "تعداد مهمان", "فضای مورد علاقه", "سبک مراسم", "رنگ مراسم", "بودجه تقریبی"];

export default function EventPlanningPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [eventType, setEventType] = useState<EventType | null>(null);
  const [guestCount, setGuestCount] = useState(200);
  const [space, setSpace] = useState<SpaceChoice | null>(null);
  const [style, setStyle] = useState<EventStyle | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const totalSteps = STEP_TITLES.length;
  const canProceed = [!!eventType, true, !!space, !!style, !!color, !!budget][step];

  const suggestedPackage = useMemo(() => {
    if (budget === "بالای ۳ میلیارد") return PACKAGES[2];
    if (budget === "۲ تا ۳ میلیارد" || style === "رویال") return PACKAGES[1];
    if (budget === "زیر ۱ میلیارد") return PACKAGES[0];
    return PACKAGES[1];
  }, [budget, style]);

  function next() {
    if (step === totalSteps - 1) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  }

  if (done) {
    return (
      <div className="flex flex-col pb-8">
        <div className="relative h-[280px] w-full">
          <Image src={VENUE_IMAGES.coupleFountain} alt="پیشنهاد اختصاصی مراسم شما" fill priority sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-night/10 to-night/50" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-night/40 px-3 py-1 text-[11px] text-gold-soft backdrop-blur-sm">
              <Sparkles size={12} /> اختصاصی برای شما
            </span>
            <h1 className="mt-2 font-display text-[26px] text-on-night text-balance">پیشنهاد اختصاصی برای مراسم شما</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5 pt-5">
          <div className="grid grid-cols-2 gap-2.5">
            <SummaryChip label="نوع مراسم" value={eventType ?? "—"} />
            <SummaryChip label="تعداد مهمان" value={`${toPersianDigits(guestCount)} نفر`} />
            <SummaryChip label="فضا" value={space ?? "—"} />
            <SummaryChip label="سبک" value={style ?? "—"} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="overflow-hidden rounded-[var(--radius-xl)] border-2 border-gold bg-paper"
          >
            <div className="flex items-center justify-between bg-gold px-5 py-2.5">
              <span className="text-[13px] font-medium text-paper">پکیج پیشنهادی</span>
              <span className="text-[13px] font-bold text-paper">{suggestedPackage.name}</span>
            </div>
            <div className="p-5">
              <p className="text-[13.5px] leading-6 text-ink-soft">{suggestedPackage.tagline}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <Gem
                      key={i}
                      size={14}
                      className={i <= (BUDGET_LEVEL[suggestedPackage.id] ?? 1) ? "fill-gold text-gold" : "text-stone"}
                    />
                  ))}
                </span>
                <span className="text-[11px] text-ink-soft">سطح بودجه پیشنهادی</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {suggestedPackage.services.slice(0, 4).map((s) => (
                  <li key={s} className="flex items-center gap-2 text-[12.5px] text-ink">
                    <Check size={14} className="text-forest" /> {s}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-2">
                <Link href="/bazdid" className="flex-1">
                  <Button className="w-full" size="sm">رزرو بازدید حضوری</Button>
                </Link>
                <Link href="/pakijha" className="flex-1">
                  <Button className="w-full" size="sm" variant="outline">مقایسه پکیج‌ها</Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <p className="text-center text-[12px] text-ink-soft">
            این پیشنهاد بر اساس انتخاب‌های شما تولید شده و می‌توانید هر بخش را با مشاور اختصاصی خود تنظیم کنید.
          </p>
          <a href={VENUE_CONTACT.phoneHref} className="text-center text-[13px] font-medium text-gold-deep">
            تماس با مشاور درباره این پیشنهاد
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-6">
      <PageHeader title="برنامه‌ریزی مراسم من" subtitle={STEP_TITLES[step]} />
      <div className="px-5 pt-1">
        <ProgressBar percent={((step + 1) / totalSteps) * 100} showValue={false} />
        <p className="mt-1.5 text-[11px] text-ink-soft">
          مرحله {toPersianDigits(step + 1)} از {toPersianDigits(totalSteps)}
        </p>
      </div>

      <div className="min-h-[360px] px-5 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease }}
          >
            {step === 0 && (
              <div className="grid grid-cols-2 gap-3">
                {EVENT_TYPES.map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setEventType(id)}
                    className={cn(
                      "flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border p-6 transition-all",
                      eventType === id ? "border-gold bg-gold-soft/30" : "border-stone/50 bg-paper"
                    )}
                  >
                    <span className={cn("flex h-12 w-12 items-center justify-center rounded-full", eventType === id ? "bg-gold text-paper" : "bg-forest-tint text-forest")}>
                      <Icon size={22} />
                    </span>
                    <span className="text-[14px] font-medium text-ink">{id}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col items-center gap-8 py-8">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-tint text-forest">
                  <Users size={26} />
                </span>
                <p className="font-display text-[42px] text-ink">{toPersianDigits(guestCount)}</p>
                <p className="text-[13px] text-ink-soft">نفر مهمان</p>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[--color-gold]"
                />
                <div className="flex w-full justify-between text-[11px] text-ink-soft">
                  <span>۵۰</span>
                  <span>۵۰۰ نفر</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-3">
                {SPACES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpace(s)}
                    className={cn(
                      "flex items-center justify-between rounded-[var(--radius-lg)] border p-5 text-right transition-all",
                      space === s ? "border-gold bg-gold-soft/30" : "border-stone/50 bg-paper"
                    )}
                  >
                    <span className="text-[15px] font-medium text-ink">{s}</span>
                    {space === s && <Check size={18} className="text-gold-deep" />}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-2 gap-3">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={cn(
                      "rounded-[var(--radius-lg)] border p-5 text-center transition-all",
                      style === s ? "border-gold bg-gold-soft/30 text-gold-deep" : "border-stone/50 bg-paper text-ink"
                    )}
                  >
                    <span className="text-[14px] font-medium">{s}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-[var(--radius-lg)] border p-4 text-right transition-all",
                      color === c.id ? "border-gold bg-gold-soft/30" : "border-stone/50 bg-paper"
                    )}
                  >
                    <span className="h-8 w-8 shrink-0 rounded-full border border-stone/40" style={{ backgroundColor: c.hex }} />
                    <span className="text-[14px] font-medium text-ink">{c.label}</span>
                    {color === c.id && <Check size={16} className="mr-auto text-gold-deep" />}
                  </button>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    className={cn(
                      "flex items-center justify-between rounded-[var(--radius-lg)] border p-5 text-right transition-all",
                      budget === b ? "border-gold bg-gold-soft/30" : "border-stone/50 bg-paper"
                    )}
                  >
                    <span className="text-[15px] font-medium text-ink">{b}</span>
                    {budget === b && <Check size={18} className="text-gold-deep" />}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-3 px-5">
        {step > 0 && (
          <Button variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
            <ArrowRight size={18} />
          </Button>
        )}
        <Button size="lg" className="flex-1" disabled={!canProceed} onClick={next}>
          {step === totalSteps - 1 ? "دریافت پیشنهاد اختصاصی" : "ادامه"}
          <ArrowLeft size={18} />
        </Button>
      </div>
    </div>
  );
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-paper border border-stone/50 p-3">
      <p className="text-[10.5px] text-ink-soft">{label}</p>
      <p className="mt-0.5 text-[13.5px] font-medium text-ink">{value}</p>
    </div>
  );
}
