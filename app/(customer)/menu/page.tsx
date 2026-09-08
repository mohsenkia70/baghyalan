"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, UtensilsCrossed } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { MENU_ITEMS } from "@/lib/mock-data/venue";
import { useSavedIdeas } from "@/lib/hooks/useSavedIdeas";
import { cn } from "@/lib/utils/cn";
import type { MenuItem } from "@/lib/types";

const CATEGORIES: MenuItem["category"][] = ["پیش‌غذا", "غذای اصلی", "سالاد", "دسر", "نوشیدنی", "فینگرفود"];
const ease = [0.16, 1, 0.3, 1] as const;

export default function MenuPage() {
  const [active, setActive] = useState<MenuItem["category"]>("غذای اصلی");
  const { toggle, isSaved, ready, ids } = useSavedIdeas();

  const items = MENU_ITEMS.filter((m) => m.category === active);
  const totalSelected = ready ? ids.filter((id) => MENU_ITEMS.some((m) => m.id === id)).length : 0;

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        title="منوی غذا و پذیرایی"
        subtitle="گزینه‌های محبوب مهمانان عمارت یلان"
        action={
          <span className="flex h-10 items-center gap-1.5 rounded-full bg-forest-tint px-3 text-[12px] font-medium text-forest">
            <UtensilsCrossed size={13} /> {totalSelected} انتخاب
          </span>
        }
      />

      <div className="mt-1 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors",
              active === c ? "border-gold bg-gold-soft/40 text-gold-deep" : "border-stone/50 bg-paper text-ink-soft"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2.5 px-5">
        {items.map((item, i) => {
          const selected = ready && isSaved(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: i * 0.03 }}
              onClick={() => toggle(item.id)}
              className={cn(
                "flex items-center justify-between rounded-[var(--radius-lg)] border p-4 text-right transition-colors",
                selected ? "border-gold bg-gold-soft/25" : "border-stone/50 bg-paper"
              )}
            >
              <div>
                <p className="text-[14px] font-medium text-ink">{item.name}</p>
                <p className="mt-1 text-[12px] leading-5 text-ink-soft">{item.description}</p>
              </div>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                  selected ? "border-gold bg-gold text-paper" : "border-stone/60 text-transparent"
                )}
              >
                <Check size={14} />
              </span>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-6 px-5 text-center text-[11.5px] leading-6 text-ink-soft">
        موارد انتخابی شما در «ایده‌های من» ذخیره می‌شود و مشاور اختصاصی‌تان برای هماهنگی نهایی با شما تماس می‌گیرد.
      </p>
    </div>
  );
}
