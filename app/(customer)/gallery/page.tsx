"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { GALLERY_IMAGES } from "@/lib/mock-data/venue";
import { INSPIRATION_ITEMS } from "@/lib/mock-data/content";
import { useSavedIdeas } from "@/lib/hooks/useSavedIdeas";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

const GALLERY_CATEGORIES = [
  "همه", "مراسم واقعی", "مراسم شب", "مراسم روز", "باغ", "سالن", "عقد", "گل‌آرایی", "سفره عقد", "جایگاه عروس و داماد",
] as const;

const INSPIRATION_CATEGORIES = [
  "همه", "ترند جدید", "ترکیب رنگ", "گل‌آرایی", "دکور", "مراسم شب", "سفره عقد", "سبک مراسم",
] as const;

export default function GalleryPage() {
  const [tab, setTab] = useState<"gallery" | "inspiration">("gallery");
  const [galleryCat, setGalleryCat] = useState<(typeof GALLERY_CATEGORIES)[number]>("همه");
  const [inspCat, setInspCat] = useState<(typeof INSPIRATION_CATEGORIES)[number]>("همه");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { toggle, isSaved, ready } = useSavedIdeas();

  const filteredGallery = useMemo(
    () => (galleryCat === "همه" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((g) => g.category === galleryCat)),
    [galleryCat]
  );
  const filteredInspiration = useMemo(
    () => (inspCat === "همه" ? INSPIRATION_ITEMS : INSPIRATION_ITEMS.filter((g) => g.category === inspCat)),
    [inspCat]
  );

  const activeImage = GALLERY_IMAGES.find((g) => g.id === lightbox);

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        title="گالری و الهام"
        subtitle="تصاویر واقعی و ایده‌های مراسم"
        action={
          <Link href="/ideas" className="flex h-10 items-center gap-1.5 rounded-full bg-forest-tint px-3 text-[12px] font-medium text-forest">
            <Heart size={14} /> ایده‌های من
          </Link>
        }
      />

      <div className="flex gap-1.5 px-5 pt-1">
        {(["gallery", "inspiration"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-full py-2.5 text-[13.5px] font-medium transition-colors",
              tab === t ? "bg-forest text-paper" : "bg-paper text-ink-soft border border-stone/50"
            )}
          >
            {t === "gallery" ? "گالری عمارت" : "الهام برای مراسم"}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
        {(tab === "gallery" ? GALLERY_CATEGORIES : INSPIRATION_CATEGORIES).map((c) => {
          const active = tab === "gallery" ? galleryCat === c : inspCat === c;
          return (
            <button
              key={c}
              onClick={() => (tab === "gallery" ? setGalleryCat(c as any) : setInspCat(c as any))}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                active ? "border-gold bg-gold-soft/40 text-gold-deep" : "border-stone/50 bg-paper text-ink-soft"
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      {tab === "gallery" ? (
        <div className="mt-4 grid grid-cols-2 gap-2 px-5">
          {filteredGallery.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative overflow-hidden rounded-[var(--radius-md)]"
            >
              <button onClick={() => setLightbox(img.id)} className="block w-full">
                <div className="relative aspect-[4/5] w-full">
                  <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
                </div>
              </button>
              <button
                onClick={() => toggle(img.id)}
                aria-label="ذخیره در ایده‌های من"
                className="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-night/40 backdrop-blur-sm"
              >
                <Heart
                  size={15}
                  className={cn("transition-colors", ready && isSaved(img.id) ? "fill-gold text-gold" : "text-on-night")}
                />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent p-2">
                <p className="text-[10.5px] text-on-night line-clamp-1">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3 px-5">
          {filteredInspiration.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 overflow-hidden rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-3"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                <Image src={item.image} alt={item.title} fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10.5px] font-medium text-gold-deep">{item.category}</span>
                <p className="mt-0.5 text-[13.5px] font-medium text-ink">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-ink-soft">{item.description}</p>
              </div>
              <button
                onClick={() => toggle(item.id)}
                aria-label="ذخیره ایده"
                className="self-start"
              >
                <Heart size={17} className={cn(ready && isSaved(item.id) ? "fill-gold text-gold" : "text-ink-soft")} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-on-night/10 text-on-night"
              onClick={() => setLightbox(null)}
              aria-label="بستن"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={activeImage.src} alt={activeImage.alt} fill sizes="400px" className="object-cover" />
            </motion.div>
            <p className="absolute bottom-8 text-[13px] text-on-night">{activeImage.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
