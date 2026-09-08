"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronLeft,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
  Sparkles,
  Camera,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { MY_EVENT } from "@/lib/mock-data/my-event";
import { useAuth } from "@/lib/hooks/useAuth";

const menuItems = [
  { href: "/dashboard", label: "مراسم من", icon: Sparkles },
  { href: "/ideas", label: "علاقه‌مندی‌ها", icon: Sparkles },
  { href: "/naghshe", label: "نقشه و مسیر عمارت", icon: MapPin },
  { href: "/soalat", label: "سوالات متداول", icon: HelpCircle },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // حالت برای نگهداری آدرس عکس پروفایل
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  // بارگذاری تصویر ذخیره‌شده از قبل (در صورت وجود)
  useEffect(() => {
    const savedAvatar = localStorage.getItem("user_avatar");
    if (savedAvatar) {
      setAvatarImage(savedAvatar);
    }
  }, []);

  // مدیریت انتخاب و آپلود فایل عکس
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // بررسی نوع فایل (باید تصویر باشد)
    if (!file.type.startsWith("image/")) {
      alert("لطفاً یک فایل تصویری (JPG, PNG یا WEBP) انتخاب کنید.");
      return;
    }

    // بررسی حجم فایل (حداکثر ۵ مگابایت)
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }

    // خواندن فایل و تبدیل به Base64 جهت نمایش آنی و ذخیره محلی
    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result as string;
      setAvatarImage(base64Url);
      localStorage.setItem("user_avatar", base64Url);

      // در صورت اتصال به بک‌اند، در این قسمت می‌توانید تصویر را با FormData به API بفرستید:
      // const formData = new FormData();
      // formData.append("avatar", file);
      // await uploadAvatarApi(formData);
    };
    reader.readAsDataURL(file);
  };

  // حذف عکس پروفایل و بازگشت به حروف اختصاری
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarImage(null);
    localStorage.removeItem("user_avatar");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col pb-8">
      <PageHeader title="پروفایل من" />

      {/* بخش آواتار و مشخصات */}
      <div className="flex flex-col items-center gap-3 px-5 pt-2 text-center">
        <div className="relative">
          {/* کانتینر آواتار */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-forest/20 bg-forest-tint shadow-sm transition-all hover:opacity-90 active:scale-95"
            title="کلیک برای تغییر عکس"
          >
            {avatarImage ? (
              <img
                src={avatarImage}
                alt={user?.name ?? "پروفایل"}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-display text-[32px] text-forest">
                {user?.avatarInitial ?? "آ"}
              </span>
            )}

            {/* لایه تیره در هاور برای زیبایی بیشتر */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera size={22} className="text-white" />
            </div>
          </div>

          {/* دکمه کوچک دوربین در گوشه آواتار */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="تغییر عکس پروفایل"
            className="absolute bottom-0 start-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-forest text-paper shadow-md transition-transform active:scale-90"
          >
            <Camera size={14} />
          </button>

          {/* دکمه حذف عکس (تنها زمانی که عکس آپلود شده باشد نشان داده می‌شود) */}
          {avatarImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label="حذف عکس پروفایل"
              title="حذف عکس"
              className="absolute top-0 start-0 flex h-6 w-6 items-center justify-center rounded-full border border-paper bg-error text-white shadow-sm transition-transform hover:scale-105 active:scale-90"
            >
              <Trash2 size={12} />
            </button>
          )}

          {/* اینپوت مخفی فایل */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div>
          <p className="font-display text-[20px] text-ink">
            {user?.name ?? MY_EVENT.coupleNames}
          </p>
          <p className="text-[12.5px] text-ink-soft">
            {user?.title ?? `مراسم ${MY_EVENT.eventType} · ${MY_EVENT.date}`}
          </p>
          {user && (
            <p dir="ltr" className="mt-1 text-[11px] text-ink-soft">
              {user.phone}
            </p>
          )}
        </div>
      </div>

      {/* منوها */}
      <div className="mt-6 flex flex-col gap-2.5 px-5">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-[var(--radius-lg)] border border-stone/50 bg-paper p-4 transition-colors hover:bg-stone-light/40"
          >
            <span className="flex items-center gap-3 text-[13.5px] font-medium text-ink">
              <item.icon size={17} className="text-forest" /> {item.label}
            </span>
            <ChevronLeft size={16} className="text-ink-soft" />
          </Link>
        ))}
      </div>

      {/* تنظیمات */}
      <div className="mt-6 px-5">
        <p className="mb-2.5 text-[12px] font-medium text-ink-soft">تنظیمات</p>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-[var(--radius-lg)] border border-stone/50 bg-paper p-4">
            <span className="flex items-center gap-3 text-[13.5px] font-medium text-ink">
              <Bell size={17} className="text-forest" /> اعلان‌های مراسم
            </span>
            <span className="h-6 w-11 rounded-full bg-forest p-0.5">
              <span className="block h-5 w-5 translate-x-[-22px] rounded-full bg-paper transition-transform" />
            </span>
          </div>
          <div className="flex items-center justify-between rounded-[var(--radius-lg)] border border-stone/50 bg-paper p-4">
            <span className="flex items-center gap-3 text-[13.5px] font-medium text-ink">
              <Settings size={17} className="text-forest" /> اطلاعات حساب کاربری
            </span>
            <ChevronLeft size={16} className="text-ink-soft" />
          </div>
        </div>
      </div>

      {/* خروج */}
      <button
        onClick={() => {
          logout();
          // Hard navigation clears any stale client-router cache from the
          // now-invalidated session, same fix as the login redirect.
          window.location.href = "/login?role=customer";
        }}
        className="mx-5 mt-8 flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-error/30 py-3.5 text-[13.5px] font-medium text-error transition-colors hover:bg-error/5 active:scale-95"
      >
        <LogOut size={16} /> خروج از حساب کاربری
      </button>
    </div>
  );
}
