"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Play } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { VENUE_SPACES, VENUE_IMAGES } from "@/lib/mock-data/venue";
import { Badge } from "@/components/ui/Badge";

const ease = [0.16, 1, 0.3, 1] as const;

const tourStops = [
  { id: "entrance", label: "ورودی", image: VENUE_IMAGES.entranceDome },
  { id: "garden", label: "باغ", image: VENUE_IMAGES.rotundaNight },
  { id: "hall", label: "سالن", image: VENUE_IMAGES.ballroom },
  { id: "aghd", label: "فضای عقد", image: VENUE_IMAGES.sofrehAghdDay },
  { id: "photo", label: "لوکیشن عکاسی", image: VENUE_IMAGES.coupleFountain },
];

export default function DiscoverVenuePage() {
  const [tourIndex, setTourIndex] = useState(0);

  return (
    <div className="flex flex-col pb-4">
      <PageHeader title="کشف عمارت" subtitle="گشتی در فضاهای عمارت یلان" />

      {/* Virtual tour */}
      <div className="px-5 pt-2">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
          <div className="relative h-[260px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={tourStops[tourIndex].id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={tourStops[tourIndex].image}
                  alt={`تور مجازی — ${tourStops[tourIndex].label}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-night/50 px-3 py-1.5 text-[11.5px] text-on-night backdrop-blur-sm">
              <Compass size={13} /> تور مجازی
            </div>
            <button
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-on-night/15 text-on-night backdrop-blur-md transition-transform active:scale-90"
              aria-label="پخش تور مجازی"
            >
              <Play size={22} className="translate-x-[-1px]" />
            </button>
            <p className="absolute bottom-4 right-4 font-display text-[18px] text-on-night">
              {tourStops[tourIndex].label}
            </p>
          </div>
          <div className="flex gap-1.5 bg-paper p-3">
            {tourStops.map((stop, i) => (
              <button
                key={stop.id}
                onClick={() => setTourIndex(i)}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i === tourIndex ? "bg-gold" : "bg-stone/60"
                }`}
                aria-label={`رفتن به ${stop.label}`}
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-center text-[11.5px] text-ink-soft">
          نسخه نمایشی تور مجازی — در نسخه نهایی امکان چرخش ۳۶۰ درجه و ویدیوی کامل اضافه می‌شود.
        </p>
      </div>

      {/* Spaces list */}
      <div className="mt-8 flex flex-col gap-5 px-5">
        {VENUE_SPACES.map((space, i) => (
          <motion.div
            key={space.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.05 }}
          >
            <Link
              href={`/emarat/${space.id}`}
              className="group block overflow-hidden rounded-[var(--radius-xl)] bg-paper border border-stone/50"
            >
              <div className="relative h-[190px] w-full overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover transition-transform duration-700 group-active:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-[19px] text-ink">{space.name}</h3>
                <p className="mt-1 text-[13px] leading-6 text-ink-soft">{space.shortDescription}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {space.tags.map((tag) => (
                    <Badge key={tag} tone="forest">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
