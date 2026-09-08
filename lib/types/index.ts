// ============================================================
// عمارت یلان — Shared domain types
// ============================================================

export type UserRole = "admin" | "customer" | "guard";

export interface TestUser {
  id: string;
  phone: string;
  password?: string;
  role: UserRole;
  name: string;
  title: string;
  avatarInitial: string;
}

export type EventType =
  | "عروسی"
  | "عقد"
  | "نامزدی"
  | "جشن خانوادگی";

export type EventStyle =
  | "کلاسیک"
  | "رویال"
  | "مدرن"
  | "مینیمال"
  | "باغی"
  | "اروپایی";

export type SpaceChoice = "باغ" | "سالن" | "ترکیبی";

export type LeadSource =
  | "اینستاگرام"
  | "وب‌سایت"
  | "معرفی"
  | "تماس تلفنی";

export type LeadStage =
  | "لید جدید"
  | "در حال تماس"
  | "مشاوره"
  | "بازدید رزرو شد"
  | "بازدید انجام شد"
  | "پیشنهاد ارسال شد"
  | "در حال تصمیم‌گیری"
  | "قرارداد"
  | "از دست رفته";

export const LEAD_STAGES: LeadStage[] = [
  "لید جدید",
  "در حال تماس",
  "مشاوره",
  "بازدید رزرو شد",
  "بازدید انجام شد",
  "پیشنهاد ارسال شد",
  "در حال تصمیم‌گیری",
  "قرارداد",
  "از دست رفته",
];

export type JourneyStepStatus =
  | "انجام‌شده"
  | "در حال انجام"
  | "در انتظار";

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  status: JourneyStepStatus;
  date?: string; // Jalali display date
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category:
    | "باغ"
    | "سالن"
    | "عقد"
    | "مراسم شب"
    | "مراسم روز"
    | "گل‌آرایی"
    | "سفره عقد"
    | "جایگاه عروس و داماد";
  caption: string;
  width: number;
  height: number;
}

export interface VenueSpace {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  icon: string;
}

export interface PackageTier {
  id: string;
  name: "کلاسیک" | "رویال" | "لاکچری";
  tagline: string;
  priceFrom: number; // تومان
  suitableFor: string;
  services: string[];
  highlighted?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category:
    | "پیش‌غذا"
    | "غذای اصلی"
    | "سالاد"
    | "دسر"
    | "نوشیدنی"
    | "فینگرفود";
}

export interface Testimonial {
  id: string;
  coupleName: string;
  eventDate: string;
  style: EventStyle;
  image: string;
  quote: string;
}

export interface Consultant {
  id: string;
  name: string;
  role: string;
  avatarInitial: string;
  activeLeads: number;
  conversionRate: number;
  online: boolean;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  source: LeadSource;
  possibleDate: string; // Jalali
  guestCount: number;
  budget: number;
  stage: LeadStage;
  consultantId: string;
  createdAt: string;
  notes: {
    id: string;
    author: string;
    text: string;
    date: string;
  }[];
  eventType: EventType;
}

export interface VisitBooking {
  id: string;
  leadId: string;
  fullName: string;
  phone: string;
  date: string; // Jalali
  time: string;
  guestsAccompanying: number;
  status:
    | "در انتظار"
    | "تایید شده"
    | "انجام شده"
    | "لغو شده";
}

export interface Payment {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: "پرداخت شده" | "در انتظار";
  method?: string;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "consultant";
  text: string;
  time: string;
  imageUrl?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  done: boolean;
  timeframe:
    | "چند ماه مانده"
    | "سه ماه مانده"
    | "یک ماه مانده"
    | "یک هفته مانده"
    | "روز مراسم";
}

export interface DayTimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

// ============================================================
// Guest / Event Check-in
// ============================================================

export type GuestGroup =
  | "خانواده عروس"
  | "خانواده داماد"
  | "دوستان"
  | "همکاران";

export type GuestCheckInStatus =
  | "منتظر ورود"
  | "وارد شده"
  | "نیازمند بررسی";

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  group: GuestGroup;
  companions: number;
  confirmed: boolean;

  checkInStatus: GuestCheckInStatus;

  checkedInAt?: string;
  checkedInBy?: string;
}

export interface EventBooking {
  id: string;
  coupleNames: string;
  eventType: EventType;
  date: string; // Jalali
  countdownDays: number;
  guestCount: number;
  space: SpaceChoice;
  style: EventStyle;
  packageId: string;
  status:
    | "برنامه‌ریزی"
    | "تایید شده"
    | "در آماده‌سازی"
    | "برگزار شده";
  progressPercent: number;
  responsiblePerson: string;
  savedIdeas: string[]; // gallery image ids
  selectedMenu: string[]; // menu item ids
  journey: JourneyStep[];
  checklist: ChecklistItem[];
  dayTimeline: DayTimelineItem[];
  payments: Payment[];
  totalPrice: number;
  paidAmount: number;

  guests: Guest[];

  // Business-management additions
  adminTimeline: EventTimelineStep[];
  profitability: EventProfitability;
}

export type TimelineStepStatus = "انجام‌شده" | "در انتظار" | "مشکل";

export interface EventTimelineStep {
  id: string;
  time: string; // "13:00"
  title: string;
  status: TimelineStepStatus;
}

export interface EventProfitability {
  revenue: number;
  foodCost: number;
  decorCost: number;
  staffCost: number;
  musicCost: number;
  otherCost: number;
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "لید" | "بازدید" | "پیام" | "پرداخت";
  read: boolean;
}

export interface KpiTrendPoint {
  label: string;
  value: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InspirationItem {
  id: string;
  title: string;
  category:
    | "ترند جدید"
    | "ترکیب رنگ"
    | "گل‌آرایی"
    | "دکور"
    | "مراسم شب"
    | "سفره عقد"
    | "سبک مراسم";
  image: string;
  description: string;
}

// Referral tracking
export type ReferralStatus = "لید جدید" | "در حال بررسی" | "تبدیل به مشتری" | "رد شده";
export type RewardType = "تخفیف نقدی" | "خدمات رایگان" | "هدیه";
export type RewardStatus = "پرداخت‌نشده" | "پرداخت‌شده" | "بدون پاداش";

export interface ReferralRecord {
  id: string;
  referrerEventId: string; // couple who referred (existing/past customer)
  referrerName: string;
  refereeName: string;
  refereePhone: string;
  dateReferred: string;
  status: ReferralStatus;
  convertedEventId?: string;
  rewardType: RewardType;
  rewardValue: string;
  rewardStatus: RewardStatus;
  notes?: string;
}