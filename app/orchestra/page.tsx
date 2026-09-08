"use client";

import { useEffect, useState } from "react";
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
  Music,
  Mic2,
  Users,
  Play,
  Award,
  Calendar,
  Star,
} from "lucide-react";

import { MUSIC_VIDEOS } from "@/lib/mock-data/musicians";
import { Badge } from "@/components/ui/Badge";

const ease = [0.16, 1, 0.3, 1] as const;

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
    name: "کاربر تست",
    instrument: "سنتور",
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
    name: "کاربر تست",
    instrument: "ویولنسل",
    experience: "بیش از ۸ سال تجربه نوازندگی",
    description:
      "ویولنسل‌نواز با صدای گرم و احساسی، عضوی از تیم حرفه‌ای آوان بند.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              y: 32,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.75,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingParticles() {
  const shouldReduceMotion = useReducedMotion();

  const [particles, setParticles] = useState<
    Array<{
      id: number;
      size: number;
      left: string;
      top: string;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        size: Math.random() * 5 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
      })),
    );
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-gold/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [0.15, 0.75, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function OrchestraHero() {
  const shouldReduceMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-3 pt-4 sm:px-5 sm:pt-6 lg:px-8">
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : {
                opacity: 0,
                y: 24,
                scale: 0.98,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.9,
          ease,
        }}
        className="relative isolate overflow-hidden rounded-[28px] bg-night sm:rounded-[34px] lg:rounded-[42px]"
      >
        <div className="relative min-h-[380px] w-full sm:min-h-[460px] lg:min-h-[560px]">
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

          {/* اوورلی برای خوانایی بهتر متن */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-night/70 via-night/30 to-night/10" />

          <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
            <FloatingParticles />
          </div>

          <div className="relative z-10 flex min-h-[380px] items-end p-5 sm:min-h-[460px] sm:p-8 lg:min-h-[560px] lg:p-14">
            <div className="max-w-[680px]">
              <Badge
                tone="gold"
                className="border border-gold/30 bg-night/50 text-gold-soft backdrop-blur-xl"
              >
                <Music size={13} />
                ارکستر VIP آوان بند
              </Badge>

              <motion.h1
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : 0.2,
                  ease,
                }}
                className="mt-4 font-display text-[30px] leading-[1.35] text-on-night sm:mt-5 sm:text-[42px] lg:text-[60px]"
              >
                موسیقی فقط شنیده
                <br />
                <span className="text-gold-soft">نمی‌شود، زندگی می‌شود</span>
              </motion.h1>

              <motion.p
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: 16,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  delay: shouldReduceMotion ? 0 : 0.35,
                  ease,
                }}
                className="mt-4 max-w-[600px] text-[12px] leading-7 text-on-night-soft sm:text-[14px] lg:mt-6 lg:text-[16px] lg:leading-8"
              >
                تیمی از نوازندگان حرفه‌ای که هر اجرا را به تجربه‌ای فراموش‌نشدنی
                تبدیل می‌کنند.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function OrchestraStats() {
  const stats = [
    {
      icon: Users,
      value: "۸+",
      label: "نوازنده حرفه‌ای",
    },
    {
      icon: Calendar,
      value: "۱۰+",
      label: "سال تجربه",
    },
    {
      icon: Star,
      value: "۲۰۰+",
      label: "اجرای ویژه",
    },
  ];

  return (
    <Reveal className="mx-auto mt-6 w-full max-w-6xl px-3 sm:mt-8 sm:px-5 lg:px-8">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease,
              }}
              whileHover={{
                y: -4,
              }}
              className="relative min-w-0 overflow-hidden rounded-[20px] border border-gold/10 bg-paper px-2 py-4 text-center shadow-lg shadow-night/5 sm:rounded-[26px] sm:p-5 lg:p-7"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-3xl" />

              <div className="relative mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 sm:h-11 sm:w-11">
                <Icon size={17} className="text-gold-deep" />
              </div>

              <p className="relative mt-2 font-display text-[19px] text-ink sm:mt-3 sm:text-[25px] lg:text-[30px]">
                {stat.value}
              </p>

              <p className="relative mt-1 text-[9px] text-ink-soft sm:text-[11px] lg:text-[12px]">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Reveal>
  );
}

function AboutOrchestra() {
  return (
    <Reveal className="mx-auto mt-10 w-full max-w-6xl px-3 sm:mt-14 sm:px-5 lg:px-8">
      <section className="relative overflow-hidden rounded-[28px] border border-stone/15 bg-paper p-5 shadow-xl shadow-night/5 sm:rounded-[34px] sm:p-7 lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 sm:h-16 sm:w-16 sm:rounded-3xl">
            <Mic2 size={24} className="text-gold-deep" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] text-gold-deep sm:text-[11px]">
              درباره ما
            </p>

            <h2 className="mt-1 font-display text-[24px] text-ink sm:text-[30px] lg:text-[34px]">
              ارکستر VIP آوان بند
            </h2>

            <p className="mt-4 max-w-3xl text-[12px] leading-7 text-ink-soft sm:text-[13px] sm:leading-8 lg:text-[15px]">
              ارکستر آوان بند مجموعه‌ای از نوازندگان حرفه‌ای است که با تجربه
              اجرا در مراسم‌ها و رویدادهای ویژه، موسیقی زنده را به بخشی از خاطره
              مهم‌ترین شب زندگی شما تبدیل می‌کنند.
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
      </section>
    </Reveal>
  );
}

function OrchestraMember({
  member,
  index,
}: {
  member: (typeof ORCHESTRA_TEAM)[0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              scale: 0.82,
              y: 40,
              filter: "blur(10px)",
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        ease,
      }}
      className={`relative flex w-full ${
        isEven ? "justify-start" : "justify-end"
      }`}
    >
      {/* نسخه موبایل - عکس در وسط */}
      <div className="relative w-full pl-12 md:hidden">
        <div className="absolute right-[19px] top-12 z-20">
          <div className="h-4 w-4 rounded-full border-4 border-paper bg-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-full border border-gold/30"
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              className="relative"
            >
              <div className="relative h-[clamp(130px,40vw,180px)] w-[clamp(130px,40vw,180px)] overflow-hidden rounded-full border-4 border-paper shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-night text-[10px] font-bold text-gold-soft shadow-lg">
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.div>
          </div>

          <div className="mt-6 w-full max-w-[340px] text-center">
            <div className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <h3 className="mt-4 font-display text-[21px] text-ink">
              {member.name}
            </h3>

            <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-gold-deep">
              <Music size={13} />
              <span>{member.instrument}</span>
            </div>

            <div className="mt-4 rounded-2xl border border-stone/15 bg-paper/80 p-4 shadow-lg shadow-night/5">
              <div className="flex items-start justify-center gap-2">
                <Award size={14} className="mt-0.5 shrink-0 text-gold-deep" />

                <p className="text-[10px] leading-6 text-ink-soft">
                  {member.experience}
                </p>
              </div>

              <p className="mt-3 text-[10px] leading-6 text-ink-soft">
                {member.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* نسخه دسکتاپ - عکس در وسط */}
      <div
        className={`relative hidden w-full md:flex ${
          isEven ? "justify-start" : "justify-end"
        }`}
      >
        <div className="relative flex w-[44%] flex-col items-center lg:w-[40%]">
          <div
            className={`absolute top-24 z-30 h-4 w-4 rounded-full border-4 border-paper bg-gold shadow-[0_0_22px_rgba(212,175,55,0.65)] ${
              isEven ? "right-[-18%]" : "left-[-18%]"
            }`}
          />

          <div className="pointer-events-none absolute top-6 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

          <motion.div
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.06,
                    rotate: isEven ? -2 : 2,
                  }
            }
            transition={{
              duration: 0.45,
            }}
            className="relative z-10"
          >
            <motion.div
              className="absolute -inset-4 rounded-full border border-gold/30"
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute -inset-7 rounded-full border border-dashed border-gold/20"
              animate={shouldReduceMotion ? {} : { rotate: -360 }}
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative h-[clamp(170px,18vw,250px)] w-[clamp(170px,18vw,250px)] overflow-hidden rounded-full border-[5px] border-paper shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 1024px) 210px, 250px"
                className="object-cover"
              />
            </div>

            <div
              className={`absolute bottom-1 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-night text-[10px] font-bold text-gold-soft shadow-xl ${
                isEven ? "right-1" : "left-1"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </motion.div>

          <div className={`mt-8 w-full ${isEven ? "text-right" : "text-left"}`}>
            <div
              className={`h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent ${
                isEven ? "mr-0 ml-auto" : "mr-auto ml-0"
              }`}
            />

            <h3 className="mt-4 font-display text-[23px] text-ink lg:text-[27px]">
              {member.name}
            </h3>

            <div
              className={`mt-2 flex items-center gap-2 text-[12px] text-gold-deep ${
                isEven ? "justify-start" : "justify-end"
              }`}
            >
              <Music size={14} />
              <span>{member.instrument}</span>
            </div>

            <div className="mt-4 rounded-[22px] border border-stone/15 bg-paper/80 p-4 shadow-lg shadow-night/5 backdrop-blur-xl lg:p-5">
              <div
                className={`flex items-start gap-2 ${
                  isEven ? "justify-start" : "justify-end"
                }`}
              >
                <Award size={14} className="mt-0.5 shrink-0 text-gold-deep" />

                <p className="text-[10px] leading-6 text-ink-soft lg:text-[11px]">
                  {member.experience}
                </p>
              </div>

              <p className="mt-3 text-[10px] leading-6 text-ink-soft lg:text-[11px]">
                {member.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function OrchestraTeamTimeline() {
  const { scrollYProgress } = useScroll();

  const lineProgress = useTransform(
    scrollYProgress,
    [0.2, 0.9],
    ["0%", "100%"],
  );

  return (
    <section className="relative mx-auto mt-20 w-full max-w-[1280px] overflow-hidden px-3 pb-16 sm:mt-28 sm:px-5 lg:px-8 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[15%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/[0.035] blur-[150px]" />
      </div>

      <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 sm:h-14 sm:w-14">
          <Users size={21} className="text-gold-deep" />
        </div>

        <h2 className="mt-5 font-display text-[28px] leading-[1.35] text-ink sm:text-[36px] lg:text-[46px]">
          آدم‌هایی که
          <br />
          <span className="text-gold-deep">صدای آوان را می‌سازند</span>
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-[12px] leading-7 text-ink-soft sm:text-[13px]">
          هر اجرا نتیجه هماهنگی، تجربه و عشق به موسیقی است. با اعضای ارکستر آوان
          بند آشنا شوید.
        </p>
      </Reveal>

      <div className="relative mt-16 sm:mt-24">
        <div className="absolute right-5 top-0 h-full w-px bg-stone/20 md:hidden" />

        <motion.div
          style={{
            height: lineProgress,
          }}
          className="absolute right-5 top-0 w-[2px] origin-top bg-gradient-to-b from-transparent via-gold to-transparent shadow-[0_0_20px_rgba(212,175,55,0.45)] md:hidden"
        />

        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-stone/30 to-transparent md:block" />

        <motion.div
          style={{
            height: lineProgress,
          }}
          className="absolute left-1/2 top-0 hidden w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-transparent via-gold to-transparent shadow-[0_0_24px_rgba(212,175,55,0.55)] md:block"
        />

        <div className="relative z-10 space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40">
          {ORCHESTRA_TEAM.map((member, index) => (
            <OrchestraMember key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OrchestraVideos() {
  const videos = ["avan-1", "avan-2", "avan-3"];

  return (
    <Reveal className="mx-auto mt-12 w-full max-w-6xl px-3 sm:mt-16 sm:px-5 lg:px-8">
      <section className="relative overflow-hidden rounded-[28px] border border-stone/15 bg-gradient-to-br from-paper via-paper to-stone/10 p-5 shadow-xl shadow-night/5 sm:rounded-[36px] sm:p-7 lg:p-10">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10">
              <Play size={19} className="text-gold-deep" />
            </div>

            <div className="min-w-0">
              <h2 className="font-display text-[21px] text-ink sm:text-[25px]">
                اجرای زنده ارکستر
              </h2>

              <p className="mt-1 text-[10px] text-ink-soft sm:text-[11px]">
                لحظاتی واقعی از اجرای آوان بند
              </p>
            </div>
          </div>

          <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:-mx-7 sm:gap-5 sm:px-7 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
            {videos.map((video, index) => (
              <motion.div
                key={video}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="w-[72vw] max-w-[260px] shrink-0 snap-center sm:w-[240px] lg:w-full lg:max-w-none"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-stone/20 bg-night shadow-xl">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  >
                    <source
                      src={`/videos/orchestra/${video}.mp4`}
                      type="video/mp4"
                    />
                    مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                  </video>

                  <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-night/70 px-3 py-1 text-[9px] text-on-night backdrop-blur-xl">
                    اجرای {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default function OrchestraPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-gradient-to-b from-paper via-paper to-stone/10 pb-16 sm:pb-20"
    >
      <header className="sticky top-0 z-50 border-b border-stone/10 bg-paper/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center gap-3 px-3 sm:h-[76px] sm:gap-4 sm:px-5 lg:px-8">
          <motion.div
            whileHover={{
              scale: 0.94,
              rotate: -7,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >
            <Link
              href="/"
              aria-label="بازگشت به صفحه اصلی"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone/15 bg-paper text-ink shadow-lg shadow-night/5 transition-shadow hover:shadow-gold/10 sm:h-11 sm:w-11"
            >
              <ArrowLeft size={18} />
            </Link>
          </motion.div>

          <div className="min-w-0">
            <h1 className="truncate font-display text-[16px] text-ink sm:text-[19px]">
              ارکستر آوان بند
            </h1>

            <p className="mt-0.5 flex items-center gap-2 truncate text-[9px] text-ink-soft sm:text-[10px]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              اجرای زنده در عمارت یلان
            </p>
          </div>
        </div>
      </header>

      <OrchestraHero />
      <OrchestraStats />
      <AboutOrchestra />
      <OrchestraVideos />
      <OrchestraTeamTimeline />
    </main>
  );
}