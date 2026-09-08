"use client";

import Image from "next/image";
import { Heart, ImageOff } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { GALLERY_IMAGES } from "@/lib/mock-data/venue";
import { INSPIRATION_ITEMS } from "@/lib/mock-data/content";
import { useSavedIdeas } from "@/lib/hooks/useSavedIdeas";
import { cn } from "@/lib/utils/cn";

export default function IdeasPage() {
  const { ids, toggle, ready } = useSavedIdeas();

  const savedGallery = GALLERY_IMAGES.filter((g) => ids.includes(g.id));
  const savedInspiration = INSPIRATION_ITEMS.filter((g) => ids.includes(g.id));

  const isEmpty = ready && savedGallery.length === 0 && savedInspiration.length === 0;

  return (
    <div className="flex flex-col pb-6">
      <PageHeader title="ایده‌های من" subtitle="تصاویر و الهام‌هایی که ذخیره کرده‌اید" />

      {isEmpty && (
        <div className="mt-16 flex flex-col items-center gap-3 px-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-tint text-forest">
            <ImageOff size={22} />
          </span>
          <p className="text-[14px] font-medium text-ink">هنوز ایده‌ای ذخیره نکرده‌اید</p>
          <p className="text-[12.5px] leading-6 text-ink-soft">
            از گالری یا بخش الهام برای مراسم، روی نماد قلب بزنید تا اینجا نمایش داده شود.
          </p>
        </div>
      )}

      {savedGallery.length > 0 && (
        <div className="mt-4 px-5">
          <h3 className="mb-3 text-[13px] font-medium text-ink-soft">تصاویر گالری</h3>
          <div className="grid grid-cols-2 gap-2">
            {savedGallery.map((img) => (
              <div key={img.id} className="relative overflow-hidden rounded-[var(--radius-md)]">
                <div className="relative aspect-[4/5] w-full">
                  <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
                </div>
                <button
                  onClick={() => toggle(img.id)}
                  className="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-night/40 backdrop-blur-sm"
                  aria-label="حذف از ایده‌ها"
                >
                  <Heart size={15} className={cn("fill-gold text-gold")} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedInspiration.length > 0 && (
        <div className="mt-6 px-5">
          <h3 className="mb-3 text-[13px] font-medium text-ink-soft">الهام برای مراسم</h3>
          <div className="flex flex-col gap-3">
            {savedInspiration.map((item) => (
              <div key={item.id} className="flex gap-3 overflow-hidden rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                  <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-ink">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-ink-soft">{item.description}</p>
                </div>
                <button onClick={() => toggle(item.id)} aria-label="حذف از ایده‌ها" className="self-start">
                  <Heart size={16} className="fill-gold text-gold" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
