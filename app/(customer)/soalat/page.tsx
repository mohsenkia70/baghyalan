"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { FAQ_ITEMS } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = ["همه", "رزرو", "پرداخت", "امکانات", "خدمات"];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("همه");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return FAQ_ITEMS.filter((f) => {
      const matchesCat = cat === "همه" || f.category === cat;
      const matchesQuery =
        !query.trim() ||
        f.question.toLowerCase().includes(query.toLowerCase()) ||
        f.answer.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [query, cat]);

  return (
    <div className="flex flex-col pb-8">
      <PageHeader title="سوالات متداول" subtitle="پاسخ سریع به پرسش‌های رایج شما" />

      <div className="px-5 pt-2">
        <div className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-stone/50 bg-paper px-4">
          <Search size={16} className="text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجو در سوالات..."
            className="h-11 flex-1 bg-transparent text-[13.5px] text-ink outline-none"
          />
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
              cat === c ? "border-gold bg-gold-soft/40 text-gold-deep" : "border-stone/50 bg-paper text-ink-soft"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2.5 px-5">
        {filtered.length === 0 && (
          <p className="mt-8 text-center text-[13px] text-ink-soft">نتیجه‌ای برای جست‌وجوی شما یافت نشد.</p>
        )}
        {filtered.map((f) => {
          const open = openId === f.id;
          return (
            <div key={f.id} className="overflow-hidden rounded-[var(--radius-lg)] bg-paper border border-stone/50">
              <button
                onClick={() => setOpenId(open ? null : f.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-right"
              >
                <span className="text-[13.5px] font-medium text-ink">{f.question}</span>
                <ChevronDown size={16} className={cn("shrink-0 text-ink-soft transition-transform", open && "rotate-180")} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-[12.5px] leading-6 text-ink-soft">{f.answer}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
