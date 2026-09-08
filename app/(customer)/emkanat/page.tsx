"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Trees, Building2, Heart, Waves, Camera, Car, Sparkles as SparklesIcon,
  Flower2, Lightbulb, Music, Utensils, ClipboardCheck,
} from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { AMENITIES } from "@/lib/mock-data/venue";

const iconMap: Record<string, React.ElementType> = {
  trees: Trees,
  building: Building2,
  heart: Heart,
  waves: Waves,
  camera: Camera,
  car: Car,
  sparkles: SparklesIcon,
  flower: Flower2,
  lightbulb: Lightbulb,
  music: Music,
  utensils: Utensils,
  "clipboard-check": ClipboardCheck,
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function AmenitiesPage() {
  return (
    <div className="flex flex-col pb-6">
      <PageHeader title="امکانات عمارت" subtitle="هر آنچه برای مراسمی بی‌نقص نیاز دارید" />
      <div className="flex flex-col gap-3 px-5 pt-2">
        {AMENITIES.map((a, i) => {
          const Icon = iconMap[a.icon] ?? SparklesIcon;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: (i % 6) * 0.04 }}
              className="flex gap-3 overflow-hidden rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-3"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                <Image src={a.image} alt={a.title} fill sizes="80px" className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-night/35">
                  <Icon size={18} className="text-on-night" />
                </div>
              </div>
              <div className="min-w-0 flex-1 py-0.5">
                <p className="text-[14px] font-medium text-ink">{a.title}</p>
                <p className="mt-0.5 text-[12px] text-gold-deep">{a.description}</p>
                <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-ink-soft">{a.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

  
    </div>
  );
}
