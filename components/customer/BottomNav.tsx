"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Landmark, CalendarHeart, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/khane", label: "خانه", icon: Home },
  { href: "/emarat", label: "عمارت", icon: Landmark },
  { href: "/bazdid", label: "رزرو", icon: CalendarHeart, isCta: true },
  { href: "/dashboard", label: "مراسم من", icon: Sparkles },
  { href: "/profile", label: "پروفایل", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-stone/50 bg-paper/90 backdrop-blur-lg px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 md:hidden"
      aria-label="ناوبری اصلی"
    >
      <ul className="mx-auto flex max-w-md items-end justify-between">
        {items.map(({ href, label, icon: Icon, isCta }) => {
          const active = pathname === href || (href !== "/khane" && pathname?.startsWith(href));
          if (isCta) {
            return (
              <li key={href} className="-translate-y-4">
                <Link
                  href={href}
                  className="flex flex-col items-center gap-1"
                  aria-label={label}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-paper shadow-[var(--shadow-gold)] transition-transform active:scale-95">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="text-[11px] font-medium text-gold-deep">{label}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={href}>
              <Link
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-1.5"
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2 : 1.6}
                  className={cn("transition-colors", active ? "text-forest" : "text-ink-soft/70")}
                />
                <span className={cn("text-[11px] transition-colors", active ? "font-medium text-forest" : "text-ink-soft/70")}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
