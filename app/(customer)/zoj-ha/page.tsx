"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/customer/PageHeader";
import { TESTIMONIALS } from "@/lib/mock-data/venue";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CoupleStoriesPage() {
  return (
    <div className="flex flex-col pb-8">
      <PageHeader title="داستان زوج‌ها" subtitle="لحظاتی که در عمارت یلان جاودانه شدند" />

      <div className="flex flex-col gap-6 px-5 pt-2">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            className="overflow-hidden rounded-[var(--radius-xl)] bg-paper border border-stone/50"
          >
            <div className="relative h-56 w-full">
              <Image src={t.image} alt={t.coupleName} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-[21px] text-on-night">{t.coupleName}</h3>
                <p className="text-[11.5px] text-on-night-soft">{t.eventDate} · سبک {t.style}</p>
              </div>
            </div>
            <p className="p-4 text-[13.5px] leading-7 text-ink-soft">«{t.quote}»</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
