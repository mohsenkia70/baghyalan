"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  LogIn,
} from "lucide-react";

import { VENUE_IMAGES } from "@/lib/mock-data/venue";
import { RotundaSignature } from "@/components/auth/RotundaSignature";
import { GoldParticles } from "@/components/auth/GoldParticles";
import {
  AboutSection,
  SpacesSection,
  TestimonialSection,
  FinalCtaSection,
} from "@/components/landing/LandingSections";

const ease = [0.16, 1, 0.3, 1] as const;

const HEADLINE_LINES = [
  "شبی که تا همیشه در خاطرتان می‌ماند،",
];

function AnimatedHeadline() {
  return (
    <h1 className="font-display text-balance text-center text-[34px] leading-[1.45] text-on-night sm:text-[44px] md:text-[48px]">
      {HEADLINE_LINES.map((line, li) => (
        <span
          key={li}
          className="block overflow-hidden"
        >
          <motion.span
            className="inline-flex flex-wrap justify-center"
            initial="hidden"
            animate="show"
            transition={{
              staggerChildren: 0.09,
              delayChildren: 0.9 + li * 0.35,
            }}
          >
            {line.split(" ").map((word, wi) => (
              <motion.span
                key={wi}
                className="ml-[0.28em] inline-block"
                variants={{
                  hidden: {
                    y: "110%",
                    opacity: 0,
                  },
                  show: {
                    y: "0%",
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 0.75,
                  ease,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function SplashPage() {
  return (
    <main className="relative w-full bg-night">
      <section className="relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-night">
      {/* Background */}
      <motion.div
        initial={{
          scale: 1.18,
          opacity: 0,
        }}
        animate={{
          scale: [1.18, 1.06, 1.12],
          opacity: 1,
        }}
        transition={{
          opacity: {
            duration: 1.8,
            ease,
          },
          scale: {
            duration: 22,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
        className="absolute inset-0"
      >
        <Image
          src={VENUE_IMAGES.rotundaNight}
          alt="گلدسته ستون‌دار عمارت یلان در شب"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Main dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/20" />

      <div className="absolute inset-0 bg-gradient-to-b from-night/75 via-transparent to-night/30" />

      {/* Center gold glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: [0.2, 0.42, 0.2],
          scale: [0.85, 1.05, 0.85],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[120px]"
      />

      <GoldParticles count={26} />

      {/* Content */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* Header */}
        <motion.header
          initial={{
            opacity: 0,
            y: -14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease,
            delay: 0.3,
          }}
          className="flex items-center justify-between px-6 pt-[max(20px,env(safe-area-inset-top))] sm:px-10"
        >
          <span className="font-display text-[21px] tracking-wide text-on-night sm:text-[23px]">
            عمارت یلان
          </span>

          <span className="rounded-full border border-on-night/25 bg-night/10 px-3 py-1 text-[11px] text-on-night-soft backdrop-blur-sm">
            گرمدره، البرز
          </span>
        </motion.header>

        {/* Center Content */}
        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10">
          <div className="flex w-full max-w-[620px] flex-col items-center text-center">
            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                ease,
                delay: 0.2,
              }}
              className="mb-7 flex h-16 w-44 items-center justify-center sm:mb-8 sm:h-20 sm:w-52"
            >
              <RotundaSignature />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease,
                delay: 0.55,
              }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-night/35 px-4 py-2 text-[11.5px] text-gold-soft backdrop-blur-md sm:text-[12px]"
            >
   
              <span>
                تجربه‌ای دیجیتال از یک عمارت واقعی
              </span>
            </motion.div>

            {/* Headline */}
            <AnimatedHeadline />

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease,
                delay: 1.7,
              }}
              className="mt-5 max-w-[500px] text-[14px] leading-7 text-on-night-soft sm:text-[15px]"
            >
              عمارت یلان؛ باغ‌عمارتی برای برگزاری مراسم
              عروسی، عقد و جشن‌های خانوادگی در دل طبیعت
              گرمدره.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                ease,
                delay: 1.95,
              }}
              className="mt-8 flex w-full max-w-[420px] flex-col gap-3 sm:mt-9"
            >
              {/* Single entry point */}
              <Link
                href="/login"
                className="group relative flex h-14 w-full items-center justify-between overflow-hidden rounded-[var(--radius-pill)] bg-gold px-6 text-[14.5px] font-medium text-paper shadow-[var(--shadow-gold)] transition-transform duration-300 hover:scale-[1.015] active:scale-[0.98]"
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 -right-1/3 w-1/3 skew-x-[-20deg] bg-white/25"
                  initial={{
                    x: "-120%",
                  }}
                  animate={{
                    x: "420%",
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatDelay: 2.6,
                    ease: "easeInOut",
                  }}
                />

                <span className="relative flex items-center gap-2.5">
                  <LogIn size={18} />

                  <span>
                    ورود
                  </span>
                </span>

                <ArrowLeft
                  size={18}
                  className="relative transition-transform duration-300 group-hover:-translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom subtle caption */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 2.4,
          }}
          className="flex justify-center px-6 pb-[max(18px,env(safe-area-inset-bottom))]"
        >
          <span className="text-[10px] tracking-[0.08em] text-on-night-soft/55">
            EMARAT YALAN
          </span>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-3 hidden justify-center md:flex"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-on-night-soft/70"
          >
            <span className="text-[10px] tracking-[0.15em]">اسکرول کنید</span>
            <span className="h-8 w-px bg-on-night-soft/40" />
          </motion.div>
        </motion.div>
      </div>
      </section>

      <AboutSection />
      <SpacesSection />
      <TestimonialSection />
      <FinalCtaSection />
    </main>
  );
}