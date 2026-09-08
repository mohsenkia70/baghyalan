"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useAuth } from "@/lib/hooks/useAuth";
import { EVENTS } from "@/lib/mock-data/events";
import type { EventBooking } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

const ease = [0.16, 1, 0.3, 1] as const;

function getEventStatusLabel(status: EventBooking["status"]) {
  switch (status) {
    case "در آماده‌سازی":
      return "در حال آماده‌سازی";

    case "تایید شده":
      return "تأیید شده";

    case "برنامه‌ریزی":
      return "برنامه‌ریزی شده";

    case "برگزار شده":
      return "برگزار شده";

    default:
      return status;
  }
}

function getEventStatusClass(status: EventBooking["status"]) {
  switch (status) {
    case "در آماده‌سازی":
      return "border-gold/25 bg-gold/10 text-gold";

    case "تایید شده":
      return "border-forest/20 bg-forest/10 text-forest";

    case "برنامه‌ریزی":
      return "border-stone/40 bg-paper text-ink-soft";

    case "برگزار شده":
      return "border-stone/30 bg-stone/10 text-ink-soft";

    default:
      return "border-stone/30 bg-paper text-ink-soft";
  }
}

function getCheckedInCount(event: EventBooking) {
  return event.guests.filter(
    (guest) => guest.checkInStatus === "وارد شده",
  ).length;
}

function getPendingCount(event: EventBooking) {
  return event.guests.filter(
    (guest) => guest.checkInStatus === "منتظر ورود",
  ).length;
}

function EventCard({
  event,
  index,
}: {
  event: EventBooking;
  index: number;
}) {
  const checkedInCount = getCheckedInCount(event);
  const pendingCount = getPendingCount(event);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.12 + index * 0.06,
        duration: 0.55,
        ease,
      }}
      className="group overflow-hidden rounded-[var(--radius-xl)] border border-stone/50 bg-paper shadow-[var(--shadow-soft)]"
    >
      <div className="border-b border-stone/40 bg-ivory-deep/30 px-5 py-5 md:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[10.5px] font-medium",
                  getEventStatusClass(event.status),
                )}
              >
                {getEventStatusLabel(event.status)}
              </span>

              <span className="rounded-full bg-forest/5 px-2.5 py-1 text-[10.5px] text-forest">
                {event.eventType}
              </span>
            </div>

            <h2 className="truncate text-[17px] font-semibold text-ink md:text-[18px]">
              {event.coupleNames}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                {event.date}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Users size={14} />
                {event.guestCount.toLocaleString("fa-IR")} مهمان
              </span>
            </div>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-paper shadow-sm">
            <ShieldCheck size={21} />
          </div>
        </div>
      </div>

      <div className="px-5 py-5 md:px-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[var(--radius-md)] bg-ivory-deep/40 px-4 py-3">
            <p className="text-[10.5px] text-ink-soft">
              وارد شده
            </p>

            <p className="mt-1 text-[20px] font-semibold text-forest">
              {checkedInCount.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="rounded-[var(--radius-md)] bg-ivory-deep/40 px-4 py-3">
            <p className="text-[10.5px] text-ink-soft">
              منتظر ورود
            </p>

            <p className="mt-1 text-[20px] font-semibold text-ink">
              {pendingCount.toLocaleString("fa-IR")}
            </p>
          </div>
        </div>

        <a
          href={`/guard/${event.id}/check-in`}
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-forest px-5 py-3 text-[13.5px] font-medium text-paper transition-transform hover:bg-forest-2 active:scale-[0.98]"
        >
          ورود به کنترل مهمانان
          <ChevronLeft size={17} />
        </a>
      </div>
    </motion.article>
  );
}

export default function GuardHomePage() {
  const { user, logout } = useAuth();

  const activeEvents = EVENTS.filter(
    (event) =>
      event.status === "در آماده‌سازی" ||
      event.status === "تایید شده",
  );

  async function handleLogout() {
    await logout();
    window.location.href = "/login?role=guard";
  }

  return (
    <main className="min-h-dvh bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone/40 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-paper">
              <ShieldCheck size={19} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-ink">
                عمارت یلان
              </p>

              <p className="truncate text-[10.5px] text-ink-soft">
                پنل کنترل ورود مهمانان
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden text-left sm:block">
              <p className="text-[11.5px] font-medium text-ink">
                {user?.name ?? "نگهبان ورودی"}
              </p>

              <p className="text-[10px] text-ink-soft">
                نگهبان
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              aria-label="خروج"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/50 bg-paper text-ink-soft transition-colors hover:border-stone hover:text-ink"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
        >
          <div className="mb-7">
            <p className="text-[11px] font-medium text-gold">
              کنترل ورودی
            </p>

            <h1 className="mt-1.5 text-[24px] font-semibold tracking-tight text-ink md:text-[29px]">
              انتخاب مراسم
            </h1>

            <p className="mt-2 max-w-xl text-[12px] leading-6 text-ink-soft md:text-[13px]">
              مراسمی را که امروز مسئول کنترل ورود مهمانان آن هستید
              انتخاب کنید.
            </p>
          </div>
        </motion.div>

        {activeEvents.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[var(--radius-xl)] border border-stone/50 bg-paper px-6 py-12 text-center shadow-[var(--shadow-soft)]"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ivory-deep text-ink-soft">
              <CalendarDays size={24} />
            </div>

            <h2 className="mt-4 text-[16px] font-semibold text-ink">
              در حال حاضر مراسم فعالی وجود ندارد
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[12px] leading-6 text-ink-soft">
              هنوز مراسمی برای کنترل ورود مهمانان به حساب شما
              اختصاص داده نشده است.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {activeEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}