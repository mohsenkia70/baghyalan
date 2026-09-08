"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Camera,
  Music,
  Flower2,
  Phone,
  Sparkles,
  Trees,
  Utensils,
} from "lucide-react";
import { VENUE_IMAGES, VENUE_SPACES, AMENITIES, TESTIMONIALS, GALLERY_IMAGES, VENUE_CONTACT } from "@/lib/mock-data/venue";
import { Button } from "@/components/ui/Button";
import { Card, SectionEyebrow } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const ease = [0.16, 1, 0.3, 1] as const;
const amenityIcons: Record<string, React.ElementType> = {
  trees: Trees,
  flower: Flower2,
  camera: Camera,
  utensils: Utensils,
};

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-[max(16px,env(safe-area-inset-top))] pb-2">
        <div>
          <p className="font-display text-[19px] text-ink">آیدا عزیز 🌿</p>
        </div>
        <Link
          href="/dashboard"
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-paper border border-stone/60"
          aria-label="اعلان‌ها"
        >
          <Bell size={18} className="text-ink" />
          <span className="absolute top-2 left-2.5 h-1.5 w-1.5 rounded-full bg-gold" />
        </Link>
      </div>

      {/* Hero */}
      <div className="relative mx-5 mt-2 overflow-hidden rounded-[var(--radius-xl)]">
        <div className="relative h-[400px] w-full">
          <Image
            src={VENUE_IMAGES.coupleFountain}
            alt="عروس و داماد در مسیر آب‌نمای عمارت یلان"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <Badge tone="gold" className="w-fit bg-night/40 text-gold-soft backdrop-blur-sm">
            <Sparkles size={12} /> عمارت یلان
          </Badge>
          <h1 className="font-display text-balance text-[26px] leading-tight text-on-night">
            جایی برای آغاز رویای مشترک شما
          </h1>
          <div className="flex gap-2">
            <Link href="/emarat" className="flex-1">
              <Button className="w-full" variant="gold">
               عمارت یلان 
              </Button>
            </Link>
            <Link href="/barname-rizi" className="flex-1">
              <Button className="w-full" variant="night">
                برنامه‌ریزی مراسم
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick access strip */}
      <Reveal delay={0.05} className="mx-5 mt-6 grid grid-cols-5 gap-2">
        {[
          { href: "/tarikh", label: "تاریخ آزاد", icon: Sparkles },
          { href: "/pakijha", label: "پکیج‌ها", icon: Flower2 },
          { href: "/gallery", label: "گالری", icon: Camera },
          { href: "/orchestra", label: "ارکستر آوان", icon: Music },
          { href: VENUE_CONTACT.phoneHref, label: "تماس با ما", icon: Phone },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] bg-paper border border-stone/50 px-2 py-4 text-center transition-transform active:scale-95"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-tint text-forest">
              <Icon size={18} />
            </span>
            <span className="text-[11px] font-medium text-ink-soft">{label}</span>
          </Link>
        ))}
      </Reveal>

      {/* Intro */}
      <Reveal delay={0.1} className="mx-5 mt-9 flex flex-col gap-3">
        <SectionEyebrow>درباره عمارت یلان</SectionEyebrow>
        <h2 className="font-display text-[24px] leading-snug text-ink text-balance">
          باغ‌عمارتی در دل گرمدره، برای مراسمی که یک بار در عمر اتفاق می‌افتد
        </h2>
        <p className="text-[14px] leading-7 text-ink-soft">
          با بیش از یک دهه تجربه در برگزاری مراسم‌های لوکس، عمارت یلان ترکیبی از معماری کلاسیک اروپایی، باغی
          وسیع و تیم تشریفاتی حرفه‌ای را در اختیار شما قرار می‌دهد تا خاطره‌ای بی‌نظیر بسازید.
        </p>
      </Reveal>

      {/* Spaces */}
      <Reveal delay={0.05} className="mt-8">
        <div className="flex items-center justify-between px-5">
          <h3 className="font-display text-[19px] text-ink">فضاهای عمارت</h3>
          <Link href="/emarat" className="flex items-center gap-1 text-[12.5px] font-medium text-gold-deep">
            مشاهده همه <ArrowLeft size={13} />
          </Link>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
          {VENUE_SPACES.slice(0, 5).map((space, i) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.06 }}
            >
              <Link
                href={`/emarat/${space.id}`}
                className="block w-[210px] shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-paper border border-stone/50"
              >
                <div className="relative h-[140px] w-full">
                  <Image src={space.image} alt={space.name} fill sizes="210px" className="object-cover" />
                </div>
                <div className="p-3.5">
                  <p className="text-[14px] font-medium text-ink">{space.name}</p>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-ink-soft">{space.shortDescription}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Amenities */}
      <Reveal delay={0.05} className="mt-9 px-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[19px] text-ink">امکانات منتخب</h3>
          <Link href="/emkanat" className="flex items-center gap-1 text-[12.5px] font-medium text-gold-deep">
            همه امکانات <ArrowLeft size={13} />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {AMENITIES.slice(0, 4).map((a) => {
            const Icon = amenityIcons[a.icon] ?? Sparkles;
            return (
              <Card key={a.id} className="flex flex-col gap-2.5 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-tint text-forest">
                  <Icon size={16} />
                </span>
                <p className="text-[13.5px] font-medium text-ink">{a.title}</p>
                <p className="text-[11.5px] leading-5 text-ink-soft">{a.description}</p>
              </Card>
            );
          })}
        </div>
      </Reveal>

      {/* Gallery teaser */}
      <Reveal delay={0.05} className="mt-9">
        <div className="flex items-center justify-between px-5">
          <h3 className="font-display text-[19px] text-ink">لحظاتی از عمارت یلان</h3>
          <Link href="/gallery" className="flex items-center gap-1 text-[12.5px] font-medium text-gold-deep">
            گالری کامل <ArrowLeft size={13} />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5 px-5">
          {GALLERY_IMAGES.slice(0, 6).map((img) => (
            <Link key={img.id} href="/gallery" className="relative aspect-square overflow-hidden rounded-[var(--radius-sm)]">
              <Image src={img.src} alt={img.alt} fill sizes="120px" className="object-cover transition-transform duration-500 hover:scale-110" />
            </Link>
          ))}
        </div>
      </Reveal>

      {/* Testimonials */}
      <Reveal delay={0.05} className="mt-9 px-5">
        <h3 className="font-display text-[19px] text-ink">داستان زوج‌ها</h3>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
          {TESTIMONIALS.map((t) => (
            <Card key={t.id} className="w-[260px] shrink-0 p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.image} alt={t.coupleName} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[13.5px] font-medium text-ink">{t.coupleName}</p>
                  <p className="text-[11px] text-ink-soft">
                    {t.eventDate} · سبک {t.style}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[12.5px] leading-6 text-ink-soft">«{t.quote}»</p>
            </Card>
          ))}
          <Link
            href="/zoj-ha"
            className="flex w-[140px] shrink-0 flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-gold-deep/40 text-center"
          >
            <span className="text-[12.5px] font-medium text-gold-deep">مشاهده همه داستان‌ها</span>
            <ArrowLeft size={14} className="text-gold-deep" />
          </Link>
        </div>
      </Reveal>

      {/* CTA band */}
      <Reveal delay={0.05} className="mx-5 my-9 overflow-hidden rounded-[var(--radius-xl)] bg-night px-6 py-8 text-center">
        <p className="font-display text-[22px] leading-snug text-on-night text-balance">
          آماده‌اید مراسم رویایی‌تان را برنامه‌ریزی کنید؟
        </p>
        <p className="mt-2 text-[13px] text-on-night-soft">
          در چند دقیقه، یک پیشنهاد اختصاصی متناسب با سلیقه شما دریافت کنید.
        </p>
        <Link href="/barname-rizi">
          <Button variant="gold" className="mt-5 w-full">
            شروع برنامه‌ریزی مراسم من
          </Button>
        </Link>
      </Reveal>
    </div>
  );
}
