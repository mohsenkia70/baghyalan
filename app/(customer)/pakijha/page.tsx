"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Gem, MessageCircle, Phone, Star } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { PACKAGES, VENUE_CONTACT } from "@/lib/mock-data/venue";

const ease = [0.16, 1, 0.3, 1] as const;

// Relative budget tier only — no exact figures are shown publicly.
const BUDGET_LEVEL: Record<string, number> = { classic: 1, royal: 2, luxury: 3 };

function BudgetGems({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`سطح بودجه ${level} از ۳`}>
      {[1, 2, 3].map((i) => (
        <Gem key={i} size={13} className={i <= level ? "fill-gold text-gold" : "text-stone"} />
      ))}
    </span>
  );
}

export default function PackagesPage() {
  const [compare, setCompare] = useState(false);

  return (
    <div className="flex flex-col pb-8">
      <PageHeader title="پکیج‌های مراسم" subtitle="سه سطح خدمات، متناسب با سلیقه و بودجه شما" />

      {/* Contact-first notice */}
      <div className="mx-5 mt-2 flex flex-col gap-3 rounded-[var(--radius-xl)] bg-night p-5">
        <p className="font-display text-[17px] text-on-night text-balance">
          قیمت پکیج‌ها بر اساس تاریخ، تعداد مهمان و سلیقه‌ی شما به‌صورت اختصاصی تعیین می‌شود
        </p>
        <p className="text-[12.5px] leading-6 text-on-night-soft">
          برای دریافت قیمت دقیق و مشاوره‌ی رایگان، با کارشناسان عمارت یلان تماس بگیرید.
        </p>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row">
          <a href={VENUE_CONTACT.phoneHref} className="flex-1">
            <Button variant="gold" className="w-full">
              <Phone size={16} /> تماس مستقیم
            </Button>
          </a>
          <a href={VENUE_CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="flex-1">
            <Button variant="night" className="w-full">
              <MessageCircle size={16} /> واتس‌اپ
            </Button>
          </a>
        </div>
        <p dir="ltr" className="text-center font-num text-[13px] text-on-night-soft">
          {VENUE_CONTACT.phoneDisplay} · {VENUE_CONTACT.workingHours}
        </p>
      </div>

      <div className="flex justify-center px-5 pt-5">
        <div className="flex rounded-full border border-stone/50 bg-paper p-1">
          {[{ id: false, label: "نمای کارتی" }, { id: true, label: "جدول مقایسه" }].map((v) => (
            <button
              key={String(v.id)}
              onClick={() => setCompare(v.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-colors",
                compare === v.id ? "bg-forest text-paper" : "text-ink-soft"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {!compare ? (
        <div className="mt-5 flex flex-col gap-4 px-5">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className={cn(
                "relative overflow-hidden rounded-[var(--radius-xl)] border bg-paper p-5",
                pkg.highlighted ? "border-2 border-gold" : "border-stone/50"
              )}
            >
              {pkg.highlighted && (
                <span className="absolute left-0 top-0 flex items-center gap-1 rounded-bl-[var(--radius-md)] bg-gold px-3 py-1 text-[11px] font-medium text-paper">
                  <Star size={11} className="fill-paper" /> محبوب‌ترین
                </span>
              )}
              <h3 className="font-display text-[22px] text-ink">{pkg.name}</h3>
              <p className="mt-1 text-[13px] leading-6 text-ink-soft">{pkg.tagline}</p>

              <div className="mt-3 flex items-center gap-2">
                <BudgetGems level={BUDGET_LEVEL[pkg.id] ?? 1} />
                <span className="text-[11px] text-ink-soft">سطح بودجه</span>
              </div>

              <p className="mt-2 text-[11.5px] text-ink-soft">{pkg.suitableFor}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {pkg.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[12.5px] leading-5 text-ink">
                    <Check size={14} className="mt-0.5 shrink-0 text-forest" /> {s}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-2">
                <a href={VENUE_CONTACT.phoneHref} className="flex-1">
                  <Button className="w-full" size="sm" variant={pkg.highlighted ? "gold" : "primary"}>
                    <Phone size={14} /> تماس برای قیمت
                  </Button>
                </a>
                <Link href="/pakij-shakhsi" className="flex-1">
                  <Button className="w-full" size="sm" variant="outline">
                    شخصی‌سازی
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto px-5">
          <table className="w-full min-w-[560px] border-separate border-spacing-y-1.5 text-[12.5px]">
            <thead>
              <tr>
                <th className="w-32 text-right text-ink-soft font-normal"> </th>
                {PACKAGES.map((p) => (
                  <th key={p.id} className={cn("rounded-t-[var(--radius-md)] p-3 text-center", p.highlighted ? "bg-gold text-paper" : "bg-forest text-paper")}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-paper">
                <td className="p-3 text-ink-soft">سطح بودجه</td>
                {PACKAGES.map((p) => (
                  <td key={p.id} className="p-3">
                    <div className="flex justify-center">
                      <BudgetGems level={BUDGET_LEVEL[p.id] ?? 1} />
                    </div>
                  </td>
                ))}
              </tr>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="bg-paper">
                  <td className="p-3 text-ink-soft">خدمت {i + 1}</td>
                  {PACKAGES.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      {p.services[i] ? <Check size={15} className="mx-auto text-forest" /> : <span className="text-stone">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-center text-[11px] text-ink-soft">برای مشاهده جزئیات کامل هر خدمت، نمای کارتی را انتخاب کنید.</p>
          <a href={VENUE_CONTACT.phoneHref} className="mt-5 block">
            <Button variant="gold" className="w-full">
              <Phone size={16} /> تماس برای دریافت قیمت دقیق
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
