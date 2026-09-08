import type { TestUser } from "@/lib/types";

export const TEST_USERS: TestUser[] = [
  {
    id: "admin-1",
    phone: "09120000000",
    password: "admin123",
    role: "admin",
    name: "سارا محمودی",
    title: "مدیر ارشد فروش و پذیرش",
    avatarInitial: "س",
  },

  {
    id: "customer-1",
    phone: "09121234567",
    password: "123456",
    role: "customer",
    name: "آیدا و آرمین",
    title: "مراسم عروسی · ۱۴ شهریور ۱۴۰۵",
    avatarInitial: "آ",
  },

  {
    id: "guard-1",
    phone: "09123334444",
    password: "guard123",
    role: "guard",
    name: "نگهبان ورودی",
    title: "کنترل ورود مهمانان",
    avatarInitial: "ن",
  },
];