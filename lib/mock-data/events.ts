// lib/mock-data/events.ts

import type { EventBooking } from "@/lib/types";
import { MY_EVENT } from "@/lib/mock-data/my-event";
import { EVENT_GUESTS } from "@/lib/mock-data/guests";
import { buildTimeline } from "@/lib/mock-data/timeline-template";

// ============================================================
// تایپ‌های مربوط به ایستگاه‌های روز مراسم
// ============================================================

export interface EventDayStation {
  id: string;
  name: string;
  status: "آماده" | "در حال انجام" | "نیازمند بررسی";
}

// ============================================================
// داده‌های ایستگاه‌های روز مراسم (برای نمایش در پنل مدیریت)
// ============================================================

export const EVENT_DAY_STATIONS: EventDayStation[] = [
  {
    id: "hall",
    name: "سالن اصلی",
    status: "آماده",
  },
  {
    id: "garden",
    name: "فضای سبز",
    status: "در حال انجام",
  },
  {
    id: "flowers",
    name: "گل‌آرایی",
    status: "آماده",
  },
  {
    id: "tables",
    name: "چیدمان میزها",
    status: "نیازمند بررسی",
  },
  {
    id: "lighting",
    name: "نورپردازی",
    status: "آماده",
  },
  {
    id: "catering",
    name: "پذیرایی",
    status: "در حال انجام",
  },
  {
    id: "music",
    name: "سیستم صوتی",
    status: "آماده",
  },
];

// ============================================================
// داده‌های رویدادها (کپی از فایل قبلی شما)
// ============================================================

export const EVENTS: EventBooking[] = [
  {
    ...MY_EVENT,
    guests: EVENT_GUESTS[MY_EVENT.id] ?? MY_EVENT.guests,
  },

  {
    id: "ev2",
    coupleNames: "نیلوفر و کیان صفری",
    eventType: "عروسی",
    date: "۱ شهریور ۱۴۰۵",
    countdownDays: 3,
    guestCount: 260,
    space: "ترکیبی",
    style: "کلاسیک",
    packageId: "royal",
    status: "در آماده‌سازی",
    progressPercent: 91,
    responsiblePerson: "آرش نوروزی",
    savedIdeas: [],
    selectedMenu: [],
    journey: [],
    checklist: [],
    dayTimeline: [],
    payments: [],
    totalPrice: 1_900_000_000,
    paidAmount: 1_500_000_000,
    guests: EVENT_GUESTS.ev2 ?? [],
    adminTimeline: buildTimeline("ev2", "در انتظار"),
    profitability: {
      revenue: 1_900_000_000,
      foodCost: 440_000_000,
      decorCost: 140_000_000,
      staffCost: 115_000_000,
      musicCost: 65_000_000,
      otherCost: 90_000_000,
    },
  },

  {
    id: "ev3",
    coupleNames: "ترانه و کیان محسنی",
    eventType: "عروسی",
    date: "۲۵ مهر ۱۴۰۵",
    countdownDays: 57,
    guestCount: 200,
    space: "سالن",
    style: "مدرن",
    packageId: "classic",
    status: "برنامه‌ریزی",
    progressPercent: 35,
    responsiblePerson: "مهسا رستمی",
    savedIdeas: [],
    selectedMenu: [],
    journey: [],
    checklist: [],
    dayTimeline: [],
    payments: [],
    totalPrice: 1_400_000_000,
    paidAmount: 300_000_000,
    guests: EVENT_GUESTS.ev3 ?? [],
    adminTimeline: buildTimeline("ev3", "در انتظار"),
    profitability: {
      revenue: 1_400_000_000,
      foodCost: 320_000_000,
      decorCost: 105_000_000,
      staffCost: 85_000_000,
      musicCost: 45_000_000,
      otherCost: 65_000_000,
    },
  },

  {
    id: "ev4",
    coupleNames: "پریسا و امیر کاظمی",
    eventType: "عروسی",
    date: "۲ مهر ۱۴۰۵",
    countdownDays: 34,
    guestCount: 320,
    space: "باغ",
    style: "رویال",
    packageId: "luxury",
    status: "تایید شده",
    progressPercent: 54,
    responsiblePerson: "رضا کیانی",
    savedIdeas: [],
    selectedMenu: [],
    journey: [],
    checklist: [],
    dayTimeline: [],
    payments: [],
    totalPrice: 2_800_000_000,
    paidAmount: 900_000_000,
    guests: EVENT_GUESTS.ev4 ?? [],
    adminTimeline: buildTimeline("ev4", "در انتظار", {
      0: "انجام‌شده",
      1: "انجام‌شده",
      2: "انجام‌شده",
      3: "انجام‌شده",
      4: "انجام‌شده",
      5: "مشکل",
    }),
    profitability: {
      revenue: 2_800_000_000,
      foodCost: 650_000_000,
      decorCost: 210_000_000,
      staffCost: 170_000_000,
      musicCost: 95_000_000,
      otherCost: 130_000_000,
    },
  },

  {
    id: "ev5",
    coupleNames: "الناز طاهری",
    eventType: "عقد",
    date: "۲۰ آبان ۱۴۰۵",
    countdownDays: 83,
    guestCount: 180,
    space: "سالن",
    style: "مینیمال",
    packageId: "classic",
    status: "برنامه‌ریزی",
    progressPercent: 18,
    responsiblePerson: "مهسا رستمی",
    savedIdeas: [],
    selectedMenu: [],
    journey: [],
    checklist: [],
    dayTimeline: [],
    payments: [],
    totalPrice: 1_200_000_000,
    paidAmount: 0,
    guests: EVENT_GUESTS.ev5 ?? [],
    adminTimeline: buildTimeline("ev5", "در انتظار"),
    profitability: {
      revenue: 1_200_000_000,
      foodCost: 275_000_000,
      decorCost: 90_000_000,
      staffCost: 70_000_000,
      musicCost: 40_000_000,
      otherCost: 55_000_000,
    },
  },

  {
    id: "ev6",
    coupleNames: "مریم اسدی",
    eventType: "نامزدی",
    date: "۱۸ مهر ۱۴۰۵",
    countdownDays: 50,
    guestCount: 150,
    space: "باغ",
    style: "باغی",
    packageId: "classic",
    status: "برگزار شده",
    progressPercent: 100,
    responsiblePerson: "آرش نوروزی",
    savedIdeas: [],
    selectedMenu: [],
    journey: [],
    checklist: [],
    dayTimeline: [],
    payments: [],
    totalPrice: 950_000_000,
    paidAmount: 950_000_000,
    guests: EVENT_GUESTS.ev6 ?? [],
    adminTimeline: buildTimeline("ev6", "انجام‌شده"),
    profitability: {
      revenue: 950_000_000,
      foodCost: 280_000_000,
      decorCost: 90_000_000,
      staffCost: 70_000_000,
      musicCost: 40_000_000,
      otherCost: 60_000_000,
    },
  },
];

// ============================================================
// تابع کمکی برای دریافت ایستگاه‌های یک رویداد خاص
// ============================================================

export function getEventDayStations(eventId?: string): EventDayStation[] {
  // می‌توانید بر اساس eventId، ایستگاه‌های متفاوتی برگردانید
  // فعلاً همان داده‌های ثابت را برمی‌گرداند
  return EVENT_DAY_STATIONS;
}