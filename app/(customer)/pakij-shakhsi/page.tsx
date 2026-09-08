"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Phone } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/date";
import { VENUE_CONTACT } from "@/lib/mock-data/venue";

const ease = [0.16, 1, 0.3, 1] as const;

interface OptionGroup {
  id: string;
  title: string;
  options: string[];
}

const GROUPS: OptionGroup[] = [
  { id: "space", title: "فضای مراسم", options: ["باغ", "سالن", "ترکیبی"] },
  { id: "design", title: "دیزاین و دکور", options: ["کلاسیک", "رویال", "مینیمال", "باغی"] },
  { id: "flowers", title: "گل‌آرایی", options: ["سفید و سبز", "طلایی و عاجی", "صورتی ملایم", "زرشکی و طلایی"] },
  { id: "sofreh", title: "سفره عقد", options: ["سنتی", "مدرن آینه‌کاری", "ترکیبی"] },
  { id: "lighting", title: "نورپردازی", options: ["گرم کلاسیک", "صحنه‌ای رنگی", "مینیمال"] },
  { id: "music", title: "موسیقی", options: ["گروه سنتی", "DJ", "ارکستر VIP آوان بند", "هر دو"] },
  { id: "cake", title: "کیک مراسم", options: ["یک طبقه", "دو طبقه", "سه طبقه و بیشتر"] },
  { id: "extra", title: "خدمات ویژه", options: ["آتش‌بازی سرد", "فیلم‌برداری هوایی", "میز دسر اختصاصی", "هیچ‌کدام"] },
];

export default function CustomPackageBuilderPage() {
  const [guestCount, setGuestCount] = useState(220);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const completed = Object.keys(selections).length;
  const progress = Math.round((completed / GROUPS.length) * 100);

  const summaryList = useMemo(
    () => GROUPS.filter((g) => selections[g.id]).map((g) => ({ title: g.title, value: selections[g.id] })),
    [selections]
  );

  return (
    <div className="flex flex-col pb-8">
      <PageHeader title="ساخت پکیج شخصی" subtitle="مراسم را دقیقاً مطابق سلیقه‌تان بچینید" />

      <div className="px-5 pt-2">
        <div className="flex items-center justify-between rounded-[var(--radius-lg)] bg-forest-tint px-4 py-3">
          <span className="flex items-center gap-2 text-[13px] font-medium text-forest">
            <Sparkles size={15} /> پیشرفت شخصی‌سازی
          </span>
          <span className="font-num text-[13px] font-medium text-forest">{toPersianDigits(progress)}٪</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 px-5">
        <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
          <p className="text-[13.5px] font-medium text-ink">تعداد مهمان</p>
          <div className="mt-3 flex items-center gap-4">
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="flex-1 accent-gold"
            />
            <span className="w-16 shrink-0 text-left font-num text-[14px] font-medium text-forest">
              {toPersianDigits(guestCount)} نفر
            </span>
          </div>
        </div>

        {GROUPS.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, ease, delay: (gi % 4) * 0.04 }}
            className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4"
          >
            <p className="text-[13.5px] font-medium text-ink">{group.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.options.map((opt) => {
                const active = selections[group.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelections((s) => ({ ...s, [group.id]: opt }))}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                      active ? "border-gold bg-gold-soft/40 text-gold-deep" : "border-stone/50 text-ink-soft"
                    )}
                  >
                    {active && <Check size={12} className="ml-1 inline" />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {summaryList.length > 0 && (
        <div className="mt-6 px-5">
          <h3 className="mb-3 text-[13px] font-medium text-ink-soft">خلاصه انتخاب‌های شما</h3>
          <div className="rounded-[var(--radius-lg)] bg-night p-4">
            <ul className="flex flex-col gap-2">
              {summaryList.map((s) => (
                <li key={s.title} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-on-night-soft">{s.title}</span>
                  <span className="font-medium text-on-night">{s.value}</span>
                </li>
              ))}
              <li className="flex items-center justify-between border-t border-on-night/15 pt-2 text-[12.5px]">
                <span className="text-on-night-soft">تعداد مهمان</span>
                <span className="font-medium text-on-night">{toPersianDigits(guestCount)} نفر</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2.5 px-5">
        <Link href="/menu">
          <Button className="w-full">انتخاب منوی غذا و پذیرایی</Button>
        </Link>
        <a href={VENUE_CONTACT.phoneHref}>
          <Button variant="gold" className="w-full">
            <Phone size={16} /> تماس برای دریافت قیمت نهایی
          </Button>
        </a>
      </div>
    </div>
  );
}
