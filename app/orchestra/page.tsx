"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  Music2,
  Mic2,
  Users,
  Play,
  Award,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------
 * محتوا
 * ---------------------------------------------------------------------- */

const ORCHESTRA_TEAM = [
  {
    id: 1,
    image: "/images/orchestra-team/1.jpg",
    name: "فرشاد رشیدی",
    instrument: "ویولن",
    experience: "بیش از ۱۵ سال سابقه نوازندگی و اجرا",
    description:
      "مدیر ارکستر آوان بند و نوازنده ویولن با تجربه اجرای حرفه‌ای در مراسم‌ها و رویدادهای ویژه.",
  },
  {
    id: 2,
    image: "/images/orchestra-team/2.jpg",
    name: "محمد براتلو",
    instrument: "خواننده",
    experience: "بیش از ۱۰ سال تجربه خوانندگی",
    description:
      "نوازنده پیانو با سبک‌های کلاسیک و مدرن، همراه ارکستر آوان در خلق تجربه‌ای متفاوت.",
  },
  {
    id: 3,
    image: "/images/orchestra-team/3.jpg",
    name: "علی بنابی",
    instrument: "درامز",
    experience: "بیش از ۱۲ سال سابقه اجرا",
    description:
      "گیتاریست و آهنگساز با اجراهای بین‌المللی، یکی از اعضای حرفه‌ای تیم آوان بند.",
  },
  {
    id: 4,
    image: "/images/orchestra-team/4.jpg",
    name: "خشایار روشن",
    instrument: "گیتار",
    experience: "بیش از ۸ سال تجربه نوازندگی",
    description:
      "نوازنده کمانچه با تخصص در موسیقی کردی، بخشی از ترکیب حرفه‌ای ارکستر آوان.",
  },
  {
    id: 5,
    image: "/images/orchestra-team/5.jpg",
    name: "ماهان",
    instrument: "پیانو",
    experience: "بیش از ۹ سال سابقه اجرا",
    description:
      "درامر با تجربه در اجراهای زنده و استودیو، همراه تیم آوان در اجرای موسیقی زنده.",
  },
  {
    id: 6,
    image: "/images/orchestra-team/6.jpg",
    name: "حیسا",
    instrument: "گیتار بیس",
    experience: "بیش از ۷ سال تجربه نوازندگی",
    description:
      "نوازنده سنتور با سبک خاص و تکنیک‌های نو، عضوی از خانواده آوان بند با عشق به موسیقی.",
  },
  {
    id: 7,
    image: "/images/orchestra-team/7.jpg",
    name: "محمد قورچیان",
    instrument: "ساکسیفون",
    experience: "بیش از ۱۱ سال سابقه اجرا",
    description:
      "فلوت‌نواز با سابقه در ارکسترهای معروف، همراه تیم آوان در اجراهای زنده.",
  },
  {
    id: 8,
    image: "/images/orchestra-team/8.jpg",
    name: "ایمان",
    instrument: "خواننده",
    experience: "بیش از ۸ سال تجربه خوانندگی",
    description:
      "ویولنسل‌نواز با صدای گرم و احساسی، عضوی از تیم حرفه‌ای آوان بند.",
  },
];

const VIDEOS = ["avan-1", "avan-2", "avan-3"];

/* -------------------------------------------------------------------------
 * ابزارهای مشترک
 * ---------------------------------------------------------------------- */

function StaffLines({ className = "" }: { className?: string }) {
  // خطوط حامل نت، به‌عنوان یک بافت تزیینی ظریف و مرتبط با موضوع
  return (
    <svg
      viewBox="0 0 400 60"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {[6, 18, 30, 42, 54].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * هدر — کارت پاس بک‌استیج
 * ---------------------------------------------------------------------- */

function BackstageHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone/10 bg-paper/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[64px] w-full max-w-[1440px] items-center gap-3 px-3 sm:h-[72px] sm:gap-4 sm:px-5 lg:px-8">
        <Link
          href="/"
          aria-label="بازگشت به صفحه اصلی"
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone/15 bg-paper text-ink shadow-sm transition-transform duration-300 hover:-translate-x-0.5 hover:shadow-md sm:h-11 sm:w-11"
        >
          <ArrowLeft size={17} />
        </Link>

        <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-dashed border-gold/40 bg-gold/5 py-1.5 pl-3 pr-1.5 sm:gap-3 sm:py-2 sm:pl-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-night text-gold-soft sm:h-7 sm:w-7">
            <Music2 size={12} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-[14px] text-ink sm:text-[16px]">
              ارکستر آوان بند
            </p>
            <p className="truncate text-[9px] text-ink-soft sm:text-[10px]">
              پاس اجرای زنده — عمارت یلان
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------
 * هیرو — دو لته پرده که کنار می‌روند
 * ---------------------------------------------------------------------- */

function CurtainHero() {
  const shouldReduceMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [opened, setOpened] = useState(shouldReduceMotion ?? false);

  useEffect(() => {
    const t = setTimeout(() => setOpened(true), shouldReduceMotion ? 0 : 200);
    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  const curtainStripe =
    "repeating-linear-gradient(90deg, rgba(212,175,55,0.06) 0px, rgba(212,175,55,0.06) 3px, transparent 3px, transparent 22px)";

  return (
    <section className="mx-auto w-full max-w-[1440px] px-3 pt-4 sm:px-5 sm:pt-6 lg:px-8">
      <div className="relative isolate overflow-hidden rounded-[26px] bg-night sm:rounded-[32px] lg:rounded-[40px]">
        <div className="relative min-h-[420px] w-full sm:min-h-[500px] lg:min-h-[600px]">
          {!imageError && (
            <Image
              src="/images/orchestra-team/team.jpg"
              alt="ارکستر آوان بند"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1440px) calc(100vw - 64px), 1440px"
              className="z-0 object-cover object-center"
              onError={() => setImageError(true)}
            />
          )}

          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-night/85 via-night/35 to-night/15" />

          {/* لته‌های پرده */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: opened ? "-101%" : "0%" }}
                transition={{ duration: 1.1, ease }}
                style={{ backgroundImage: curtainStripe }}
                className="absolute inset-y-0 left-0 z-[4] w-1/2 border-r border-gold/20 bg-night"
              />
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: opened ? "101%" : "0%" }}
                transition={{ duration: 1.1, ease }}
                style={{ backgroundImage: curtainStripe }}
                className="absolute inset-y-0 right-0 z-[4] w-1/2 border-l border-gold/20 bg-night"
              />
            </>
          )}

          <div className="relative z-10 flex min-h-[420px] items-end p-5 sm:min-h-[500px] sm:p-8 lg:min-h-[600px] lg:p-14">
            <div className="max-w-[680px]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 14 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="flex items-center gap-2 text-gold-soft"
              >
                <span className="h-px w-8 bg-gold-soft/60" />
                <span className="text-[11px] sm:text-[12px]">
                  یک اجرای زنده، هر بار از نو
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 22 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                className="mt-4 font-display text-[30px] leading-[1.3] text-on-night sm:mt-5 sm:text-[44px] lg:text-[62px]"
              >
               
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 16 }}
                transition={{ duration: 0.7, delay: 0.45, ease }}
                className="mt-4 max-w-[600px] text-[12px] leading-7 text-on-night-soft sm:text-[14px] lg:mt-6 lg:text-[16px] lg:leading-8"
              >
                نوازندگانی که پیش از اجرا کوک می‌کنند، صحنه را می‌شناسند و
                می‌دانند لحظه‌ی سکوت پیش از اولین نت، مهم‌ترین لحظه‌ی شب شماست.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * آمار — به‌شکل یک بلیت پاره‌شونده
 * ---------------------------------------------------------------------- */

function TicketStats() {
  const stats = [
    { icon: Users, value: "۸+", label: "نوازنده حرفه‌ای" },
    { icon: CalendarDays, value: "۱۰+", label: "سال تجربه" },
    { icon: Sparkles, value: "۲۰۰+", label: "اجرای ویژه" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto mt-6 w-full max-w-6xl px-3 sm:mt-8 sm:px-5 lg:px-8"
    >
      <div className="relative grid grid-cols-3 overflow-hidden rounded-[22px] border border-stone/15 bg-paper shadow-lg shadow-night/5 sm:rounded-[28px]">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`relative flex flex-col items-center gap-1.5 px-2 py-5 text-center sm:gap-2 sm:py-7 ${
                index !== 0
                  ? "border-r border-dashed border-stone/25"
                  : ""
              }`}
            >
              {index !== 0 && (
                <span className="absolute -top-2 right-[-9px] h-4 w-4 rounded-full bg-[var(--page-bg,theme(colors.paper))] ring-1 ring-stone/15" />
              )}
              <Icon size={16} className="text-gold-deep" />
              <p className="font-display text-[20px] text-ink sm:text-[26px] lg:text-[30px]">
                {stat.value}
              </p>
              <p className="text-[9px] text-ink-soft sm:text-[11px] lg:text-[12px]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * درباره — صفحه‌ی برنامه‌ی کنسرت
 * ---------------------------------------------------------------------- */

function ProgramNote() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto mt-10 w-full max-w-6xl px-3 sm:mt-14 sm:px-5 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-stone/15 bg-paper p-5 shadow-xl shadow-night/5 sm:rounded-[32px] sm:p-7 lg:p-12">
        <StaffLines className="pointer-events-none absolute -left-6 top-6 h-14 w-40 text-gold/20 sm:h-16 sm:w-56" />
        <StaffLines className="pointer-events-none absolute -right-6 bottom-6 h-14 w-40 rotate-180 text-gold/20 sm:h-16 sm:w-56" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:gap-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 sm:h-16 sm:w-16 sm:rounded-3xl">
            <Mic2 size={24} className="text-gold-deep" />
          </div>

          <div className="min-w-0 max-w-2xl">
            <h2 className="font-display text-[24px] text-ink sm:text-[30px] lg:text-[34px]">
              یادداشت رهبر ارکستر
            </h2>

            <p className="mt-4 text-[12px] leading-7 text-ink-soft sm:text-[13px] sm:leading-8 lg:text-[15px]">
              ارکستر آوان بند مجموعه‌ای از نوازندگان حرفه‌ای است که با تجربه
              اجرا در مراسم‌ها و رویدادهای ویژه، موسیقی زنده را به بخشی از
              خاطره مهم‌ترین شب زندگی شما تبدیل می‌کنند.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-2 rounded-full border border-gold/15 bg-gold/5 px-3 py-2 sm:px-4">
                <Users size={13} className="shrink-0 text-gold-deep" />
                <span className="text-[10px] text-ink-soft sm:text-[11px]">
                  تیم حرفه‌ای نوازندگان
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gold/15 bg-gold/5 px-3 py-2 sm:px-4">
                <Award size={13} className="shrink-0 text-gold-deep" />
                <span className="text-[10px] text-ink-soft sm:text-[11px]">
                  تجربه اجراهای ویژه
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------
 * نوازندگان — روی صحنه، ردیف‌بندی مثل یک ارکستر واقعی، با افکت اسپات‌لایت
 * ---------------------------------------------------------------------- */

function MusicianSpot({
  member,
  index,
}: {
  member: (typeof ORCHESTRA_TEAM)[0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  // ردیف‌بندی شبیه یک صحنه‌ی واقعی: دو انتهای هر سطر کمی بالاتر می‌ایستند
  const col = index % 3;
  const riserClass =
    col === 1 ? "lg:translate-y-2" : "lg:-translate-y-4";

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 26, scale: 0.94 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6, ease }}
      className={`group relative ${riserClass}`}
    >
      <div className="relative flex flex-col items-center rounded-[24px] border border-stone/15 bg-paper/70 px-4 pb-5 pt-10 text-center shadow-md shadow-night/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-night/10 sm:rounded-[28px]">
        {/* مخروط نور اسپات‌لایت */}
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? { opacity: 0.5 } : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease }}
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/25 blur-3xl sm:h-48 sm:w-48"
        />

        <motion.div
          initial={
            shouldReduceMotion
              ? { filter: "none", opacity: 1 }
              : {
                  filter: "grayscale(1) brightness(0.55)",
                  opacity: 0.7,
                  scale: 0.92,
                }
          }
          whileInView={{
            filter: "grayscale(0) brightness(1)",
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, ease }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          className="relative z-10 h-[104px] w-[104px] overflow-hidden rounded-full border-4 border-paper shadow-[0_14px_36px_rgba(0,0,0,0.18)] sm:h-[124px] sm:w-[124px]"
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="124px"
            className="object-cover"
          />
        </motion.div>

        <div className="relative z-10 mt-4 flex items-center gap-1.5 rounded-full bg-night px-3 py-1 text-gold-soft">
          <Music2 size={11} />
          <span className="text-[10px] sm:text-[11px]">
            {member.instrument}
          </span>
        </div>

        <h3 className="relative z-10 mt-3 font-display text-[18px] text-ink sm:text-[20px]">
          {member.name}
        </h3>

        <p className="relative z-10 mt-2 flex items-start gap-1.5 text-right text-[10px] leading-6 text-ink-soft sm:text-[11px]">
          <Award size={12} className="mt-0.5 shrink-0 text-gold-deep" />
          {member.experience}
        </p>

        <p className="relative z-10 mt-2 text-[10px] leading-6 text-ink-soft sm:text-[11px]">
          {member.description}
        </p>
      </div>
    </motion.article>
  );
}

function TheStage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const beamX = useTransform(scrollYProgress, [0, 1], ["6%", "94%"]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-16 w-full max-w-[1280px] px-3 pb-16 sm:mt-24 sm:px-5 lg:px-8 lg:pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-[26px] leading-[1.35] text-ink sm:text-[34px] lg:text-[44px]">
          روی صحنه، کنار هم
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[12px] leading-7 text-ink-soft sm:text-[13px]">
          هر اجرا نتیجه هماهنگی، تجربه و عشق به موسیقی است. با اعضای ارکستر
          آوان بند آشنا شوید.
        </p>
      </motion.div>

      {/* خط کف صحنه با یک پرتو نور که با اسکرول جابه‌جا می‌شود */}
      <div className="relative mx-auto mt-3 hidden h-6 max-w-3xl sm:block">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-stone/25" />
        <motion.div
          style={{ left: beamX }}
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_16px_rgba(212,175,55,0.7)]"
        />
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-14">
        {ORCHESTRA_TEAM.map((member, index) => (
          <MusicianSpot key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * ویدیوها — به‌شکل حلقه‌های فیلم
 * ---------------------------------------------------------------------- */

function FilmReels() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto w-full max-w-6xl px-3 sm:px-5 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-stone/15 bg-night p-5 shadow-xl shadow-night/10 sm:rounded-[32px] sm:p-7 lg:p-10">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10">
            <Play size={19} className="text-gold-soft" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-[20px] text-on-night sm:text-[24px]">
              اجرای زنده ارکستر
            </h2>
            <p className="mt-1 text-[10px] text-on-night-soft sm:text-[11px]">
              لحظاتی واقعی از اجرای آوان بند
            </p>
          </div>
        </div>

        <div className="relative -mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:-mx-7 sm:gap-5 sm:px-7 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {VIDEOS.map((video, index) => (
            <motion.div
              key={video}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1, ease }}
              className="relative w-[72vw] max-w-[260px] shrink-0 snap-center sm:w-[240px] lg:w-full lg:max-w-none"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] border border-white/10 bg-black shadow-xl">
                {/* سوراخ‌های حلقه‌ی فیلم */}
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-3 flex-col justify-between py-3 opacity-70">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className="mx-auto h-1.5 w-1.5 rounded-[2px] bg-paper/70"
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-3 flex-col justify-between py-3 opacity-70">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className="mx-auto h-1.5 w-1.5 rounded-[2px] bg-paper/70"
                    />
                  ))}
                </div>

                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                >
                  <source src={`/videos/orchestra/${video}.mp4`} type="video/mp4" />
                  مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                </video>

                <div className="pointer-events-none absolute right-4 top-3 rounded-full border border-white/10 bg-night/70 px-3 py-1 text-[9px] text-on-night backdrop-blur-xl">
                  اجرای {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------
 * صفحه اصلی
 * ---------------------------------------------------------------------- */

export default function OrchestraPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-gradient-to-b from-paper via-paper to-stone/10 pb-16 sm:pb-20"
    >
      <BackstageHeader />
      <CurtainHero />
      <TicketStats />
      <ProgramNote />
      <TheStage />
      <div className="mt-4 sm:mt-6">
        <FilmReels />
      </div>
    </main>
  );
}
