"use client";

import { Bell, LogOut, Phone, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { CONSULTANTS } from "@/lib/mock-data/crm";
import { toPersianDigits } from "@/lib/utils/date";

export default function AdminProfilePage() {
  const { user, logout } = useAuth();

  // Attach this admin account to a consultant record for demo stats
  const consultant = CONSULTANTS[0];

  return (
    <div className="flex flex-col gap-6 mt-14">
      <div>
        <h1 className="font-display text-[26px] text-ink">پروفایل من</h1>
        <p className="text-[13px] text-ink-soft">اطلاعات حساب کاربری مدیریت</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-paper font-display text-[24px]">
          {user?.avatarInitial ?? "س"}
        </span>
        <div>
          <p className="font-display text-[19px] text-ink">{user?.name ?? "سارا محمودی"}</p>
          <p className="text-[12.5px] text-ink-soft">{user?.title ?? "مدیر ارشد فروش و پذیرش"}</p>
          {user && (
            <p dir="ltr" className="mt-1 flex items-center gap-1.5 text-[11.5px] text-ink-soft">
              <Phone size={12} /> {user.phone}
            </p>
          )}
        </div>
        <span className="mr-auto flex items-center gap-1.5 rounded-full bg-forest-tint px-3 py-1.5 text-[11.5px] font-medium text-forest">
          <ShieldCheck size={13} /> دسترسی مدیریت
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatBox label="لیدهای فعال" value={consultant.activeLeads} />
        <StatBox label="نرخ تبدیل" value={`${toPersianDigits(consultant.conversionRate)}٪`} />
        <StatBox label="نقش" value={consultant.role} isText />
        <StatBox label="وضعیت" value="آنلاین" isText />
      </div>

      <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
        <p className="mb-3 flex items-center gap-2 text-[13.5px] font-medium text-ink">
          <Bell size={15} className="text-forest" /> تنظیمات اعلان‌ها
        </p>
        <div className="flex items-center justify-between text-[12.5px] text-ink-soft">
          <span>دریافت اعلان لید و بازدید جدید</span>
          <span className="h-6 w-11 rounded-full bg-forest p-0.5">
            <span className="block h-5 w-5 rounded-full bg-paper" />
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          logout();
          // Hard navigation clears any stale client-router cache from the
          // now-invalidated session, same fix as the login redirect.
          window.location.href = "/login?role=admin";
        }}
        className="flex w-fit items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-error/30 px-5 py-3 text-[13.5px] font-medium text-error"
      >
        <LogOut size={16} /> خروج از حساب کاربری
      </button>
    </div>
  );
}

function StatBox({ label, value, isText }: { label: string; value: string | number; isText?: boolean }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
      <p className={isText ? "text-[14px] font-medium text-ink" : "font-num font-display text-[22px] text-ink"}>
        {typeof value === "number" ? toPersianDigits(value) : value}
      </p>
      <p className="mt-1 text-[11px] text-ink-soft">{label}</p>
    </div>
  );
}
