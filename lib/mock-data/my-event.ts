import type {
  ChatMessage,
  ChecklistItem,
  DayTimelineItem,
  EventBooking,
  Guest,
  JourneyStep,
  Payment,
} from "@/lib/types";

import { VENUE_IMAGES } from "@/lib/mock-data/venue";
import { buildTimeline } from "@/lib/mock-data/timeline-template";

// ============================================================
// Journey
// ============================================================

export const MY_JOURNEY: JourneyStep[] = [
  {
    id: "j1",
    title: "درخواست ثبت شد",
    description: "درخواست مشاوره شما با موفقیت ثبت شد.",
    status: "انجام‌شده",
    date: "۱۰ اردیبهشت",
  },
  {
    id: "j2",
    title: "بررسی توسط مشاور",
    description: "مشاور اختصاصی شما درخواست را بررسی کرد.",
    status: "انجام‌شده",
    date: "۱۱ اردیبهشت",
  },
  {
    id: "j3",
    title: "تماس اولیه",
    description: "تماس آشنایی و بررسی نیازهای مراسم شما.",
    status: "انجام‌شده",
    date: "۱۳ اردیبهشت",
  },
  {
    id: "j4",
    title: "رزرو بازدید",
    description: "بازدید حضوری از عمارت رزرو شد.",
    status: "انجام‌شده",
    date: "۱۸ اردیبهشت",
  },
  {
    id: "j5",
    title: "بازدید حضوری",
    description: "بازدید شما از باغ، سالن و فضای عقد انجام شد.",
    status: "انجام‌شده",
    date: "۲۲ اردیبهشت",
  },
  {
    id: "j6",
    title: "انتخاب پکیج",
    description: "پکیج رویال برای مراسم شما انتخاب شد.",
    status: "انجام‌شده",
    date: "۲۵ اردیبهشت",
  },
  {
    id: "j7",
    title: "پیش‌فاکتور",
    description: "پیش‌فاکتور نهایی برای شما صادر شد.",
    status: "انجام‌شده",
    date: "۲۸ اردیبهشت",
  },
  {
    id: "j8",
    title: "قرارداد",
    description: "قرارداد مراسم امضا شد.",
    status: "انجام‌شده",
    date: "۲ خرداد",
  },
  {
    id: "j9",
    title: "پرداخت بیعانه",
    description: "بیعانه مراسم پرداخت شد.",
    status: "انجام‌شده",
    date: "۲ خرداد",
  },
  {
    id: "j10",
    title: "رزرو نهایی",
    description: "تاریخ مراسم شما به‌صورت قطعی رزرو شد.",
    status: "در حال انجام",
  },
];

// ============================================================
// Checklist
// ============================================================

export const MY_CHECKLIST: ChecklistItem[] = [
  {
    id: "cl1",
    title: "انتخاب نهایی پکیج",
    done: true,
    timeframe: "چند ماه مانده",
  },
  {
    id: "cl2",
    title: "امضای قرارداد و پرداخت بیعانه",
    done: true,
    timeframe: "چند ماه مانده",
  },
  {
    id: "cl3",
    title: "انتخاب منوی غذا و پذیرایی",
    done: true,
    timeframe: "چند ماه مانده",
  },
  {
    id: "cl4",
    title: "هماهنگی گل‌آرایی و پالت رنگی",
    done: true,
    timeframe: "سه ماه مانده",
  },
  {
    id: "cl5",
    title: "ارسال لیست مهمانان اولیه",
    done: true,
    timeframe: "سه ماه مانده",
  },
  {
    id: "cl6",
    title: "رزرو عکاس و فیلم‌بردار",
    done: false,
    timeframe: "سه ماه مانده",
  },
  {
    id: "cl7",
    title: "طراحی کارت دعوت دیجیتال",
    done: false,
    timeframe: "یک ماه مانده",
  },
  {
    id: "cl8",
    title: "تایید نهایی لیست مهمانان",
    done: false,
    timeframe: "یک ماه مانده",
  },
  {
    id: "cl9",
    title: "جلسه هماهنگی نهایی با تشریفات",
    done: false,
    timeframe: "یک هفته مانده",
  },
  {
    id: "cl10",
    title: "تحویل لباس و آرایش عروس",
    done: false,
    timeframe: "یک هفته مانده",
  },
  {
    id: "cl11",
    title: "پرداخت باقی‌مانده هزینه",
    done: false,
    timeframe: "یک هفته مانده",
  },
  {
    id: "cl12",
    title: "چک نهایی چیدمان و نورپردازی",
    done: false,
    timeframe: "روز مراسم",
  },
];

// ============================================================
// Day Timeline
// ============================================================

export const MY_DAY_TIMELINE: DayTimelineItem[] = [
  {
    id: "dt1",
    time: "۱۴:۰۰",
    title: "آماده‌سازی عروس و داماد",
    description: "حضور تیم آرایش و لباس در اتاق اختصاصی عروس",
  },
  {
    id: "dt2",
    time: "۱۶:۰۰",
    title: "عکاسی اختصاصی",
    description: "عکاسی در باغ، ورودی گنبددار و کنار آب‌نما",
  },
  {
    id: "dt3",
    time: "۱۸:۳۰",
    title: "ورود مهمانان",
    description: "پذیرایی خوش‌آمدگویی در محوطه ورودی",
  },
  {
    id: "dt4",
    time: "۱۹:۱۵",
    title: "ورود عروس و داماد",
    description: "ورود رسمی به سالن با موسیقی زنده",
  },
  {
    id: "dt5",
    time: "۲۰:۰۰",
    title: "شام",
    description: "سرو شام در سالن اصلی",
  },
  {
    id: "dt6",
    time: "۲۱:۳۰",
    title: "برش کیک و رقص نور",
    description: "مراسم برش کیک و شروع بخش جشن",
  },
  {
    id: "dt7",
    time: "۲۳:۳۰",
    title: "پایان مراسم",
    description: "بدرقه مهمانان و پایان برنامه",
  },
];

// ============================================================
// Payments
// ============================================================

export const MY_PAYMENTS: Payment[] = [
  {
    id: "p1",
    title: "بیعانه اولیه",
    amount: 300_000_000,
    date: "۲ خرداد ۱۴۰۵",
    status: "پرداخت شده",
    method: "کارت بانکی",
  },
  {
    id: "p2",
    title: "قسط دوم",
    amount: 400_000_000,
    date: "۱۵ تیر ۱۴۰۵",
    status: "پرداخت شده",
    method: "انتقال بانکی",
  },
  {
    id: "p3",
    title: "قسط سوم",
    amount: 500_000_000,
    date: "۱۵ مرداد ۱۴۰۵",
    status: "در انتظار",
  },
  {
    id: "p4",
    title: "تسویه نهایی",
    amount: 450_000_000,
    date: "۵ شهریور ۱۴۰۵",
    status: "در انتظار",
  },
];

// ============================================================
// Chat
// ============================================================

export const MY_CHAT: ChatMessage[] = [
  {
    id: "cm1",
    sender: "consultant",
    text: "سلام آیدا جان، وقت بخیر 🌿 چطور می‌تونم امروز کمکتون کنم؟",
    time: "۰۹:۱۲",
  },
  {
    id: "cm2",
    sender: "customer",
    text: "سلام سارا جان، می‌خواستم بپرسم منوی دسر رو می‌تونیم عوض کنیم؟",
    time: "۰۹:۱۵",
  },
  {
    id: "cm3",
    sender: "consultant",
    text: "بله حتماً، من چند گزینه‌ی جدید براتون می‌فرستم.",
    time: "۰۹:۱۶",
  },
  {
    id: "cm4",
    sender: "consultant",
    text: "این چیدمان گل‌آرایی رو هم برای سفره‌عقدتون در نظر گرفتیم:",
    time: "۰۹:۱۸",
    imageUrl: VENUE_IMAGES.sofrehAghdDay,
  },
  {
    id: "cm5",
    sender: "customer",
    text: "وای عالیه، دقیقاً همینو می‌خواستم! ممنون سارا جان 💛",
    time: "۰۹:۲۲",
  },
  {
    id: "cm6",
    sender: "consultant",
    text: "خواهش می‌کنم عزیزم، هر سوالی بود در خدمتم.",
    time: "۰۹:۲۳",
  },
];

// ============================================================
// My Guests
// ============================================================

export const MY_GUESTS: Guest[] = [
  {
    id: "gu1",
    name: "خانواده احمدی",
    group: "خانواده عروس",
    companions: 4,
    confirmed: true,
    checkInStatus: "منتظر ورود",
  },
  {
    id: "gu2",
    name: "خانواده رضایی",
    group: "خانواده داماد",
    companions: 3,
    confirmed: true,
    checkInStatus: "منتظر ورود",
  },
  {
    id: "gu3",
    name: "نگار و پویا محمدی",
    group: "دوستان",
    companions: 2,
    confirmed: true,
    checkInStatus: "منتظر ورود",
  },
  {
    id: "gu4",
    name: "تیم شرکت کیان",
    group: "همکاران",
    companions: 6,
    confirmed: false,
    checkInStatus: "نیازمند بررسی",
  },
  {
    id: "gu5",
    name: "خانواده طاهری",
    group: "خانواده عروس",
    companions: 5,
    confirmed: false,
    checkInStatus: "نیازمند بررسی",
  },
  {
    id: "gu6",
    name: "ترانه و کیان",
    group: "دوستان",
    companions: 2,
    confirmed: true,
    checkInStatus: "منتظر ورود",
  },
];

// ============================================================
// My Event
// ============================================================

export const MY_EVENT: EventBooking = {
  id: "ev-me",
  coupleNames: "آیدا و آرمین",
  eventType: "عروسی",
  date: "۱۴ شهریور ۱۴۰۵",
  countdownDays: 27,
  guestCount: 280,
  space: "ترکیبی",
  style: "رویال",
  packageId: "royal",
  status: "در آماده‌سازی",
  progressPercent: 72,
  responsiblePerson: "سارا محمودی",
  savedIdeas: ["g1", "g2", "g6"],
  selectedMenu: ["m2", "m4", "m8", "m10"],
  journey: MY_JOURNEY,
  checklist: MY_CHECKLIST,
  dayTimeline: MY_DAY_TIMELINE,
  payments: MY_PAYMENTS,
  totalPrice: 1_650_000_000,
  paidAmount: 700_000_000,

  adminTimeline: buildTimeline("ev-me", "در انتظار"),
  profitability: {
    revenue: 1_650_000_000,
    foodCost: 380_000_000,
    decorCost: 125_000_000,
    staffCost: 100_000_000,
    musicCost: 55_000_000,
    otherCost: 80_000_000,
  },

  // مهم:
  // لیست مهمانان مراسم از همین‌جا به EventBooking متصل می‌شود.
  guests: MY_GUESTS,
};