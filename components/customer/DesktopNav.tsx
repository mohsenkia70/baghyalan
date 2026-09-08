"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Landmark, ImageIcon, Sparkles, UserRound, CalendarHeart } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/khane", label: "خانه", icon: Home },
  { href: "/emarat", label: "عمارت", icon: Landmark },
  { href: "/gallery", label: "گالری", icon: ImageIcon },
  { href: "/pakijha", label: "پکیج‌ها", icon: Sparkles },
  { href: "/dashboard", label: "مراسم من", icon: Sparkles },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-stone/50 bg-paper/85 backdrop-blur-lg md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-8">
        <Link href="/khane" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-paper">
            <span className="font-display text-[15px] font-bold">ی</span>
          </span>
          <span className="font-display text-[17px] font-bold text-ink">عمارت یلان</span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="ناوبری اصلی">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/khane" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors",
                  active ? "bg-forest-tint text-forest" : "text-ink-soft hover:bg-ivory-deep"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/bazdid"
            className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-[13px] font-medium text-paper shadow-[var(--shadow-gold)] transition-transform active:scale-[0.97]"
          >
            <CalendarHeart size={15} />
            رزرو بازدید
          </Link>
          <Link
            href="/profile"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              pathname?.startsWith("/profile") ? "border-forest bg-forest-tint text-forest" : "border-stone/50 text-ink-soft hover:bg-ivory-deep"
            )}
            aria-label="پروفایل"
          >
            <UserRound size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}
