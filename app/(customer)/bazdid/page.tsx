"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck2,
  Clock,
  MapPin,
  Phone,
  Users,
  CheckCircle2,
  Bell,
  Navigation,
  Map,
} from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { PersianCalendar } from "@/components/ui/PersianCalendar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { formatJalaliDate, toPersianDigits } from "@/lib/utils/date";

const ease = [0.16, 1, 0.3, 1] as const;

const TIME_SLOTS = [
  "۱۰:۰۰",
  "۱۱:۳۰",
  "۱۳:۰۰",
  "۱۵:۰۰",
  "۱۶:۳۰",
  "۱۸:۰۰",
];

// موقعیت دقیق عمارت یلان
const VENUE_LATITUDE = 35.751133153923625;
const VENUE_LONGITUDE = 51.04446889530227;

function getAvailability(date: Date) {
  const seed = date.getDate() + date.getMonth();
  // داده آزمایشی: بیشتر روزها آزاد هستند
  return seed % 5 !== 0;
}

function normalizePhone(phone: string) {
  return phone
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    )
    .replace(/\D/g, "");
}

export default function VisitBookingPage() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [companions, setCompanions] = useState(1);
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const normalizedPhone = normalizePhone(phone);

  const canSubmit =
    Boolean(date) &&
    Boolean(time) &&
    normalizedPhone.length >= 10 &&
    fullName.trim().length > 1;

  const handleNavigation = () => {
    const destination = `${VENUE_LATITUDE},${VENUE_LONGITUDE}`;

    const googleMapsUrl = new URL(
      "https://www.google.com/maps/dir/"
    );

    googleMapsUrl.searchParams.set("api", "1");
    googleMapsUrl.searchParams.set(
      "destination",
      destination
    );
    googleMapsUrl.searchParams.set("travelmode", "driving");

    window.open(
      googleMapsUrl.toString(),
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (submitted && date && time) {
    return (
      <div className="flex flex-col pb-10">
        <div className="flex flex-col items-center px-6 pt-10 text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-forest-tint text-forest"
          >
            <CheckCircle2 size={36} />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 font-display text-[24px] text-balance text-ink"
          >
            بازدید شما با موفقیت رزرو شد
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-2 text-[13.5px] leading-6 text-ink-soft"
          >
            منتظر خوش‌آمدگویی تیم عمارت یلان باشید
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.6,
            ease,
          }}
          className="mx-5 mt-8 flex flex-col gap-4 rounded-[var(--radius-xl)] border border-stone/50 bg-paper p-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-tint text-forest">
              <CalendarCheck2 size={17} />
            </span>

            <div>
              <p className="text-[11.5px] text-ink-soft">
                تاریخ بازدید
              </p>

              <p className="text-[14px] font-medium text-ink">
                {formatJalaliDate(date, true)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-tint text-forest">
              <Clock size={17} />
            </span>

            <div>
              <p className="text-[11.5px] text-ink-soft">
                ساعت
              </p>

              <p className="text-[14px] font-medium text-ink">
                {time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-tint text-forest">
              <MapPin size={17} />
            </span>

            <div>
              <p className="text-[11.5px] text-ink-soft">
                آدرس
              </p>

              <p className="text-[14px] font-medium text-ink">
                گرمدره، بلوار اصلی، عمارت یلان
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-tint text-forest">
              <Bell size={17} />
            </span>

            <div>
              <p className="text-[11.5px] text-ink-soft">
                یادآوری
              </p>

              <p className="text-[14px] font-medium text-ink">
                ۲ ساعت پیش از بازدید برایتان پیامک ارسال می‌شود
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mx-5 mt-6 flex flex-col gap-3">
          <Button
            type="button"
            className="w-full"
            variant="gold"
            onClick={handleNavigation}
          >
            <Navigation size={16} />
            مسیریابی تا عمارت
          </Button>

          {/* نقشه تعاملی با مارکر و کلیک برای مسیریابی */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease }}
            onClick={handleNavigation}
            className="relative h-52 w-full overflow-hidden rounded-[var(--radius-xl)] border border-stone/50 bg-stone-light shadow-sm cursor-pointer group"
          >
            {/* نقشه گوگل با مارکر */}
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${VENUE_LATITUDE},${VENUE_LONGITUDE}&center=${VENUE_LATITUDE},${VENUE_LONGITUDE}&zoom=16&maptype=roadmap&language=fa`}
              className="h-full w-full border-0 pointer-events-none"
              allowFullScreen={false}
              loading="lazy"
              title="موقعیت عمارت یلان روی نقشه"
            />
            
            {/* لایه تاریک‌کننده برای خوانایی متن روی نقشه */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity group-hover:from-black/80" />
            
            {/* اطلاعات و دکمه راهنما روی نقشه */}
            <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/90 text-white shadow-lg ring-2 ring-white/20">
                  <Map size={14} />
                </span>
                <div>
                  <span className="text-[13px] font-bold shadow-sm drop-shadow-lg">
                    عمارت یلان
                  </span>
                  <span className="block text-[10px] text-white/80">
                    گرمدره، بلوار اصلی
                  </span>
                </div>
              </div>
              <span className="rounded-md bg-white/20 px-3 py-1.5 text-[10px] font-medium backdrop-blur-sm transition-colors group-hover:bg-white/30">
                مسیریابی
              </span>
            </div>
            
            {/* نشانگر مارکر روی نقشه (آیکون ثابت) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative">
                <div className="absolute -inset-4 animate-ping rounded-full bg-gold/30" />
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <svg
                    className="h-8 w-8 drop-shadow-lg"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                      fill="#C9A84C"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="10" r="3" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <a href="/dashboard" className="block mt-1">
            <Button
              type="button"
              className="w-full"
              variant="outline"
            >
              مشاهده در داشبورد مراسم من
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-8">
      <PageHeader
        title="رزرو بازدید حضوری"
        subtitle="زمانی برای دیدن فضای رویاهایتان انتخاب کنید"
      />

      <div className="flex flex-col gap-5 px-5 pt-2">
        <PersianCalendar
          getStatus={(currentDate) =>
            getAvailability(currentDate)
              ? "available"
              : "full"
          }
          selected={date}
          onSelect={setDate}
        />

        <AnimatePresence>
          {date && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <p className="mb-2.5 text-[13px] font-medium text-ink-soft">
                ساعت بازدید
              </p>

              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={cn(
                      "rounded-[var(--radius-md)] border py-2.5 text-[13px] font-medium transition-colors",
                      time === slot
                        ? "border-gold bg-gold-soft/40 text-gold-deep"
                        : "border-stone/50 bg-paper text-ink"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <p className="mb-2.5 text-[13px] font-medium text-ink-soft">
            تعداد همراهان
          </p>

          <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-stone/50 bg-paper p-3">
            <Users size={17} className="text-forest" />

            <div className="flex flex-1 items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setCompanions((current) =>
                    Math.max(0, current - 1)
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone/50 text-ink transition-transform active:scale-90"
                aria-label="کاهش تعداد همراهان"
              >
                −
              </button>

              <span className="font-num text-[14px] font-medium text-ink">
                {toPersianDigits(companions)} نفر
              </span>

              <button
                type="button"
                onClick={() =>
                  setCompanions((current) =>
                    Math.min(10, current + 1)
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone/50 text-ink transition-transform active:scale-90"
                aria-label="افزایش تعداد همراهان"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-ink-soft">
              نام و نام خانوادگی
            </span>

            <input
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              placeholder="مثلاً آیدا محمدی"
              autoComplete="name"
              className="h-12 rounded-[var(--radius-md)] border border-stone/50 bg-paper px-4 text-[14px] text-ink outline-none transition-colors focus:border-gold"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-ink-soft">
              شماره تماس
            </span>

            <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-stone/50 bg-paper px-4 transition-colors focus-within:border-gold">
              <Phone size={15} className="text-ink-soft" />

              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="۰۹۱۲xxxxxxx"
                inputMode="tel"
                autoComplete="tel"
                className="h-12 flex-1 bg-transparent text-[14px] text-ink outline-none"
              />
            </div>
          </label>
        </div>

        <Button
          type="button"
          size="lg"
          disabled={!canSubmit}
          onClick={() => setSubmitted(true)}
        >
          ثبت درخواست بازدید
        </Button>
      </div>
    </div>
  );
}