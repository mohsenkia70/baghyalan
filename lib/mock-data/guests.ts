// ============================================================
// عمارت یلان — Mock Guest Data
// ============================================================

import type { Guest } from "@/lib/types";

export const EVENT_GUESTS: Record<string, Guest[]> = {
  // ----------------------------------------------------------
  // مراسم نیلوفر و کیان صفری
  // ----------------------------------------------------------
  ev2: [
    {
      id: "guest-ev2-001",
      name: "سارا محمودی",
      phone: "09121111111",
      group: "خانواده عروس",
      companions: 2,
      confirmed: true,
      checkInStatus: "وارد شده",
      checkedInAt: "۱۹:۴۲",
      checkedInBy: "guard-1",
    },
    {
      id: "guest-ev2-002",
      name: "علی رضایی",
      phone: "09122222222",
      group: "خانواده داماد",
      companions: 1,
      confirmed: true,
      checkInStatus: "وارد شده",
      checkedInAt: "۱۹:۴۷",
      checkedInBy: "guard-1",
    },
    {
      id: "guest-ev2-003",
      name: "مریم احمدی",
      phone: "09123333333",
      group: "دوستان",
      companions: 3,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev2-004",
      name: "رضا کریمی",
      phone: "09124444444",
      group: "دوستان",
      companions: 0,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev2-005",
      name: "الهام محمدی",
      phone: "09125555555",
      group: "خانواده عروس",
      companions: 2,
      confirmed: true,
      checkInStatus: "وارد شده",
      checkedInAt: "۱۹:۵۵",
      checkedInBy: "guard-1",
    },
    {
      id: "guest-ev2-006",
      name: "امیرحسین کریمی",
      phone: "09126666666",
      group: "خانواده داماد",
      companions: 1,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev2-007",
      name: "نگار حسینی",
      phone: "09127777777",
      group: "دوستان",
      companions: 1,
      confirmed: true,
      checkInStatus: "وارد شده",
      checkedInAt: "۲۰:۰۲",
      checkedInBy: "guard-1",
    },
    {
      id: "guest-ev2-008",
      name: "محمد اکبری",
      phone: "09128888888",
      group: "همکاران",
      companions: 0,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev2-009",
      name: "فاطمه موسوی",
      phone: "09129999999",
      group: "خانواده عروس",
      companions: 2,
      confirmed: true,
      checkInStatus: "وارد شده",
      checkedInAt: "۲۰:۰۸",
      checkedInBy: "guard-1",
    },
    {
      id: "guest-ev2-010",
      name: "پویا نادری",
      phone: "09121010101",
      group: "دوستان",
      companions: 1,
      confirmed: false,
      checkInStatus: "نیازمند بررسی",
    },
    {
      id: "guest-ev2-011",
      name: "مهسا رستمی",
      phone: "09122020202",
      group: "همکاران",
      companions: 0,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev2-012",
      name: "حامد یوسفی",
      phone: "09123030303",
      group: "خانواده داماد",
      companions: 2,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
  ],

  // ----------------------------------------------------------
  // مراسم ترانه و کیان محسنی
  // ----------------------------------------------------------
  ev3: [
    {
      id: "guest-ev3-001",
      name: "رضا محسنی",
      phone: "09131111111",
      group: "خانواده داماد",
      companions: 2,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev3-002",
      name: "مینا محسنی",
      phone: "09132222222",
      group: "خانواده داماد",
      companions: 1,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev3-003",
      name: "آرمان کریمی",
      phone: "09133333333",
      group: "دوستان",
      companions: 0,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev3-004",
      name: "سحر احمدی",
      phone: "09134444444",
      group: "دوستان",
      companions: 1,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev3-005",
      name: "نسرین محمدی",
      phone: "09135555555",
      group: "خانواده عروس",
      companions: 2,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
  ],

  // ----------------------------------------------------------
  // مراسم پریسا و امیر کاظمی
  // ----------------------------------------------------------
  ev4: [
    {
      id: "guest-ev4-001",
      name: "کامران کاظمی",
      phone: "09141111111",
      group: "خانواده داماد",
      companions: 2,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev4-002",
      name: "لیلا کاظمی",
      phone: "09142222222",
      group: "خانواده داماد",
      companions: 1,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev4-003",
      name: "سعید مرادی",
      phone: "09143333333",
      group: "دوستان",
      companions: 2,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev4-004",
      name: "شادی نادری",
      phone: "09144444444",
      group: "خانواده عروس",
      companions: 1,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
  ],

  // ----------------------------------------------------------
  // مراسم الناز طاهری
  // ----------------------------------------------------------
  ev5: [
    {
      id: "guest-ev5-001",
      name: "مریم طاهری",
      phone: "09151111111",
      group: "خانواده عروس",
      companions: 2,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
    {
      id: "guest-ev5-002",
      name: "نیما احمدی",
      phone: "09152222222",
      group: "دوستان",
      companions: 1,
      confirmed: true,
      checkInStatus: "منتظر ورود",
    },
  ],

  // ----------------------------------------------------------
  // مراسم مریم اسدی
  // ----------------------------------------------------------
  ev6: [
    {
      id: "guest-ev6-001",
      name: "حسین اسدی",
      phone: "09161111111",
      group: "خانواده عروس",
      companions: 2,
      confirmed: true,
      checkInStatus: "وارد شده",
      checkedInAt: "۱۸:۵۵",
      checkedInBy: "guard-1",
    },
    {
      id: "guest-ev6-002",
      name: "سارا اسدی",
      phone: "09162222222",
      group: "خانواده عروس",
      companions: 1,
      confirmed: true,
      checkInStatus: "وارد شده",
      checkedInAt: "۱۹:۰۱",
      checkedInBy: "guard-1",
    },
  ],
};