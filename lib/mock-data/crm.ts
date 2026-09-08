import type {
  AdminNotification,
  Consultant,
  KpiTrendPoint,
  Lead,
  VisitBooking,
} from "@/lib/types";

export const CONSULTANTS: Consultant[] = [
  { id: "c1", name: "سارا محمودی", role: "مشاور ارشد مراسم", avatarInitial: "س", activeLeads: 14, conversionRate: 38, online: true },
  { id: "c2", name: "رضا کیانی", role: "مشاور فروش", avatarInitial: "ر", activeLeads: 11, conversionRate: 29, online: true },
  { id: "c3", name: "مهسا رستمی", role: "مشاور فروش", avatarInitial: "م", activeLeads: 9, conversionRate: 33, online: false },
  { id: "c4", name: "آرش نوروزی", role: "مدیر تشریفات", avatarInitial: "آ", activeLeads: 6, conversionRate: 41, online: true },
];

export const LEADS: Lead[] = [
  {
    id: "l1", fullName: "نگین صادقی", phone: "۰۹۱۲۱۲۳۴۵۶۷", source: "اینستاگرام",
    possibleDate: "۱۴ شهریور ۱۴۰۵", guestCount: 250, budget: 1_800_000_000,
    stage: "لید جدید", consultantId: "c1", createdAt: "امروز، ۰۹:۲۰",
    eventType: "عروسی",
    notes: [{ id: "n1", author: "سارا محمودی", text: "از استوری اینستاگرام پیام داده، منتظر تماس اولیه.", date: "امروز" }],
  },
  {
    id: "l2", fullName: "پریسا و امیر کاظمی", phone: "۰۹۳۵۴۴۵۶۶۷۸", source: "معرفی",
    possibleDate: "۲ مهر ۱۴۰۵", guestCount: 320, budget: 2_400_000_000,
    stage: "در حال تماس", consultantId: "c2", createdAt: "دیروز، ۱۸:۴۰",
    eventType: "عروسی",
    notes: [{ id: "n2", author: "رضا کیانی", text: "توسط خانواده امیدی معرفی شده‌اند. بودجه بالا، پکیج لاکچری پیشنهاد شود.", date: "دیروز" }],
  },
  {
    id: "l3", fullName: "الناز طاهری", phone: "۰۹۱۹۸۸۷۷۶۶۵", source: "وب‌سایت",
    possibleDate: "۲۰ آبان ۱۴۰۵", guestCount: 180, budget: 1_200_000_000,
    stage: "مشاوره", consultantId: "c3", createdAt: "۲ روز پیش",
    eventType: "عقد",
    notes: [{ id: "n3", author: "مهسا رستمی", text: "به دنبال فضای عقد در نور روز است، پکیج کلاسیک را دوست داشت.", date: "۲ روز پیش" }],
  },
  {
    id: "l4", fullName: "شیدا و کاوه رحیمی", phone: "۰۹۱۲۷۷۸۸۹۹۰", source: "اینستاگرام",
    possibleDate: "۵ آذر ۱۴۰۵", guestCount: 400, budget: 3_000_000_000,
    stage: "بازدید رزرو شد", consultantId: "c1", createdAt: "۳ روز پیش",
    eventType: "عروسی",
    notes: [{ id: "n4", author: "سارا محمودی", text: "بازدید حضوری برای پنجشنبه ساعت ۱۷ رزرو شد.", date: "۳ روز پیش" }],
  },
  {
    id: "l5", fullName: "مریم اسدی", phone: "۰۹۳۸۱۱۲۲۳۳۴", source: "تماس تلفنی",
    possibleDate: "۱۸ مهر ۱۴۰۵", guestCount: 150, budget: 950_000_000,
    stage: "بازدید انجام شد", consultantId: "c4", createdAt: "هفته گذشته",
    eventType: "نامزدی",
    notes: [{ id: "n5", author: "آرش نوروزی", text: "بازدید عالی پیش رفت، منتظر تایید نهایی خانواده هستیم.", date: "۲ روز پیش" }],
  },
  {
    id: "l6", fullName: "آیدا و آرمین حسینی", phone: "۰۹۱۲۳۳۴۴۵۵۶", source: "معرفی",
    possibleDate: "۱۰ شهریور ۱۴۰۵", guestCount: 280, budget: 2_100_000_000,
    stage: "پیشنهاد ارسال شد", consultantId: "c2", createdAt: "هفته گذشته",
    eventType: "عروسی",
    notes: [{ id: "n6", author: "رضا کیانی", text: "پیشنهاد پکیج رویال برایشان ارسال شد، منتظر پاسخ.", date: "دیروز" }],
  },
];

export const VISITS: VisitBooking[] = [
  { id: "v1", leadId: "l4", fullName: "شیدا و کاوه رحیمی", phone: "۰۹۱۲۷۷۸۸۹۹۰", date: "فردا", time: "۱۷:۰۰", guestsAccompanying: 2, status: "تایید شده" },
  { id: "v2", leadId: "l3", fullName: "الناز طاهری", phone: "۰۹۱۹۸۸۷۷۶۶۵", date: "پس‌فردا", time: "۱۱:۳۰", guestsAccompanying: 1, status: "در انتظار" },
  { id: "v3", leadId: "l7", fullName: "ترانه محسنی", phone: "۰۹۱۹۵۵۶۶۷۷۸", date: "چهارشنبه", time: "۱۶:۰۰", guestsAccompanying: 3, status: "تایید شده" },
  { id: "v4", leadId: "l1", fullName: "نگین صادقی", phone: "۰۹۱۲۱۲۳۴۵۶۷", date: "جمعه", time: "۱۰:۰۰", guestsAccompanying: 2, status: "در انتظار" },
];

export const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: "an1", title: "لید جدید از اینستاگرام", description: "نگین صادقی از طریق استوری اینستاگرام درخواست مشاوره ثبت کرد.", time: "۵ دقیقه پیش", type: "لید", read: false },
  { id: "an2", title: "بازدید فردا", description: "بازدید شیدا و کاوه رحیمی برای فردا ساعت ۱۷:۰۰ تایید شده است.", time: "۱ ساعت پیش", type: "بازدید", read: false },
  { id: "an3", title: "پیام جدید مشتری", description: "خانواده حسینی در گفتگو سوالی درباره منوی غذا پرسیدند.", time: "۲ ساعت پیش", type: "پیام", read: false },
  { id: "an4", title: "پرداخت ثبت شد", description: "بیعانه مراسم نیلوفر و کیان صفری با موفقیت ثبت شد.", time: "دیروز", type: "پرداخت", read: true },
  { id: "an5", title: "بازدید انجام شد", description: "بازدید مریم اسدی با موفقیت برگزار شد.", time: "۲ روز پیش", type: "بازدید", read: true },
];

export const LEADS_TREND: KpiTrendPoint[] = [
  { label: "شنبه", value: 9 }, { label: "یکشنبه", value: 12 }, { label: "دوشنبه", value: 7 },
  { label: "سه‌شنبه", value: 14 }, { label: "چهارشنبه", value: 11 }, { label: "پنجشنبه", value: 16 }, { label: "جمعه", value: 10 },
];

export const CONVERSION_FUNNEL: KpiTrendPoint[] = [
  { label: "لید", value: 148 },
  { label: "تماس", value: 112 },
  { label: "بازدید", value: 74 },
  { label: "پیشنهاد", value: 51 },
  { label: "قرارداد", value: 23 },
];

export const REVENUE_TREND: KpiTrendPoint[] = [
  { label: "فروردین", value: 4.2 }, { label: "اردیبهشت", value: 5.1 }, { label: "خرداد", value: 6.4 },
  { label: "تیر", value: 5.8 }, { label: "مرداد", value: 7.2 }, { label: "شهریور", value: 8.6 },
];
