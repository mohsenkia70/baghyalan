"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowLeft, LogIn, Quote, Sparkles } from "lucide-react";
import { ScrollScene, useSectionReveal, ease } from "@/components/landing/ScrollScene";
import { VENUE_IMAGES, VENUE_SPACES, TESTIMONIALS } from "@/lib/mock-data/venue";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <ScrollScene className="relative bg-ivory py-28 md:py-40">
      {(progress) => {
        const { opacity } = useSectionReveal(progress);
        const imgY = useTransform(progress, [0, 1], [60, -60]);
        const textX = useTransform(progress, [0, 0.4], [40, 0]);
        return (
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <motion.div
              style={{ y: imgY, opacity }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] md:order-2"
            >
              <Image
                src={VENUE_IMAGES.entranceDome}
                alt="ورودی گنبددار عمارت یلان"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div style={{ x: textX, opacity }} className="md:order-1">
              <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-gold-deep">
                <span className="h-px w-6 bg-gold-deep/60" /> درباره عمارت یلان
              </span>
              <h2 className="mt-4 font-display text-[30px] leading-[1.35] text-ink md:text-[40px]">
                باغ‌عمارتی در دل گرمدره، برای مراسمی که یک بار در عمر اتفاق می‌افتد
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-8 text-ink-soft md:text-[16px]">
                با بیش از یک دهه تجربه در برگزاری مراسم‌های لوکس، عمارت یلان ترکیبی از معماری
                کلاسیک اروپایی، باغی وسیع و تیم تشریفاتی حرفه‌ای را در اختیار شما قرار می‌دهد تا
                خاطره‌ای بی‌نظیر بسازید.
              </p>
              <Link href="/emarat" className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-forest">
                کشف کامل فضاها <ArrowLeft size={16} />
              </Link>
            </motion.div>
          </div>
        );
      }}
    </ScrollScene>
  );
}

function SpaceCard({ progress, index, space }: { progress: MotionValue<number>; index: number; space: (typeof VENUE_SPACES)[number] }) {
  const start = index * 0.12;
  const y = useTransform(progress, [start, start + 0.4, 1], [90, 0, -20 - index * 10]);
  const opacity = useTransform(progress, [start, start + 0.25], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.35], [0.9, 1]);
  return (
    <motion.div style={{ y, opacity, scale }} className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)]">
      <Image
        src={space.image}
        alt={space.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-[22px] text-on-night">{space.name}</h3>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-6 text-on-night-soft">{space.shortDescription}</p>
      </div>
    </motion.div>
  );
}

export function SpacesSection() {
  const spaces = VENUE_SPACES.slice(0, 3);
  return (
    <ScrollScene className="relative bg-night py-28 md:py-40">
      {(progress) => {
        const headOpacity = useTransform(progress, [0, 0.2], [0, 1]);
        const headY = useTransform(progress, [0, 0.2], [40, 0]);
        return (
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <motion.div style={{ opacity: headOpacity, y: headY }} className="mb-14 text-center">
              <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-gold-soft">
                <Sparkles size={13} /> فضاهای عمارت
              </span>
              <h2 className="mt-4 font-display text-[30px] text-on-night md:text-[40px]">
                هر گوشه‌ی عمارت، یک قاب برای خاطره
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {spaces.map((space, i) => (
                <SpaceCard key={space.id} progress={progress} index={i} space={space} />
              ))}
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}

export function TestimonialSection() {
  const t = TESTIMONIALS[0];
  return (
    <ScrollScene className="relative overflow-hidden bg-ivory py-28 md:py-40">
      {(progress) => {
        const { opacity, scale } = useSectionReveal(progress);
        const bgY = useTransform(progress, [0, 1], [-40, 40]);
        return (
          <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
            <motion.div style={{ y: bgY }} className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />
            <motion.div style={{ opacity, scale }}>
              <Quote size={34} className="mx-auto text-gold-deep/50" />
              <p className="mt-6 font-display text-[24px] leading-[1.6] text-ink md:text-[30px]">
                «{t.quote}»
              </p>
              <div className="mt-7 flex items-center justify-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={t.image} alt={t.coupleName} fill className="object-cover" />
                </div>
                <div className="text-right">
                  <p className="text-[13.5px] font-medium text-ink">{t.coupleName}</p>
                  <p className="text-[11.5px] text-ink-soft">{t.eventDate} · سبک {t.style}</p>
                </div>
              </div>
            </motion.div>
          </div>
        );
      }}
    </ScrollScene>
  );
}

export function FinalCtaSection() {
  return (
    <ScrollScene className="relative overflow-hidden bg-night py-32 md:py-44">
      {(progress) => {
        const { opacity, scale } = useSectionReveal(progress);
        const glow = useTransform(progress, [0, 0.5, 1], [0.15, 0.45, 0.15]);
        return (
          <div className="relative mx-auto max-w-2xl px-6 text-center md:px-10">
            <motion.div
              style={{ opacity: glow }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[120px]"
            />
            <motion.div style={{ opacity, scale }} className="relative">
              <h2 className="font-display text-balance text-[28px] leading-snug text-on-night md:text-[38px]">
                آماده‌اید مراسم رویایی‌تان را برنامه‌ریزی کنید؟
              </h2>
              <p className="mt-4 text-[14px] text-on-night-soft md:text-[15px]">
                برای دریافت پیشنهاد اختصاصی، وارد حساب کاربری خود شوید.
              </p>
              <div className="mt-9 flex justify-center">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto sm:px-14">
                    <LogIn size={17} /> ورود
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        );
      }}
    </ScrollScene>
  );
}
