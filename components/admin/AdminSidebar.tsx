"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, PartyPopper, ClipboardList,
  Image as ImageIcon, BarChart3, Bell, ChevronLeft, Menu, X, User, Gift,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ADMIN_NOTIFICATIONS } from "@/lib/mock-data/crm";
import { useAuth } from "@/lib/hooks/useAuth";

const ease = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "تقویم مدیریت", icon: CalendarDays },
  { href: "/admin/events", label: "مراسم‌ها", icon: PartyPopper },
  { href: "/admin/event-day", label: "پنل روز مراسم", icon: ClipboardList },
  { href: "/admin/visits", label: "بازدیدها", icon: CalendarDays },
  { href: "/admin/content", label: "مدیریت محتوا", icon: ImageIcon },
  { href: "/admin/reports", label: "گزارش‌ها", icon: BarChart3 },
  { href: "/admin/referrals", label: "ردیابی معرفی", icon: Gift },
  { href: "/admin/notifications", label: "اعلان‌ها", icon: Bell },
  { href: "/admin/profile", label: "پروفایل من", icon: User },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = ADMIN_NOTIFICATIONS.filter((n) => !n.read).length;

  // Close the drawer whenever the route changes, and lock body scroll while open.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile top bar */}
  {/* Mobile hamburger button */}
<button
  type="button"
  onClick={() => setMobileOpen(true)}
  aria-label="باز کردن منو"
  className="fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-stone/50 bg-paper text-ink shadow-sm transition-transform active:scale-90 md:hidden"
>
  <Menu size={20} />
</button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-50 md:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.35, ease }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-night/55 backdrop-blur-[2px]"
            />
            <motion.div
              variants={{
                open: { x: 0, opacity: 1 },
                closed: { x: "100%", opacity: 0.4 },
              }}
              transition={{ duration: 0.5, ease }}
              className="absolute inset-y-0 right-0 flex h-full w-[82%] max-w-xs flex-col bg-paper p-5 shadow-[var(--shadow-lg)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-paper">
                    <span className="font-display text-[15px]">ی</span>
                  </span>
                  <span className="font-display text-[17px] text-ink">عمارت یلان</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="بستن منو"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stone/50 text-ink transition-transform active:scale-90"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
                {NAV.map(({ href, label, icon: Icon }, i) => {
                  const active = pathname === href || (href !== "/admin" && pathname?.startsWith(href));
                  return (
                    <motion.div
                      key={href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: 16 },
                      }}
                      transition={{ duration: 0.35, ease, delay: 0.08 + i * 0.035 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-[var(--radius-md)] px-3 py-3 text-[13.5px] font-medium transition-colors",
                          active ? "bg-forest text-paper" : "text-ink-soft active:bg-ivory-deep"
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon size={17} />
                          {label}
                        </span>
                        {active && <ChevronLeft size={14} />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 10 } }}
                transition={{ duration: 0.4, ease, delay: 0.3 }}
              >
                <Link
                  href="/admin/profile"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex items-center gap-2.5 rounded-[var(--radius-lg)] bg-forest-tint p-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-paper font-display text-[14px]">
                    {user?.avatarInitial ?? "س"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-ink">{user?.name ?? "سارا محمودی"}</p>
                    <p className="truncate text-[10.5px] text-ink-soft">{user?.title ?? "مدیر فروش و پذیرش"}</p>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-l border-stone/50 bg-paper p-5 md:flex">
        <div className="mb-8 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-paper">
            <span className="font-display text-[16px]">ی</span>
          </span>
          <div>
            <p className="font-display text-[16px] text-ink leading-none">عمارت یلان</p>
            <p className="mt-1 text-[10.5px] text-ink-soft">پنل مدیریت مجموعه</p>
          </div>
        </div>
        <SidebarLinks pathname={pathname} />
        <Link href="/admin/profile" className="mt-auto flex items-center gap-2.5 rounded-[var(--radius-lg)] bg-forest-tint p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-paper font-display text-[14px]">
            {user?.avatarInitial ?? "س"}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-medium text-ink">{user?.name ?? "سارا محمودی"}</p>
            <p className="truncate text-[10.5px] text-ink-soft">{user?.title ?? "مدیر فروش و پذیرش"}</p>
          </div>
        </Link>
      </aside>
    </>
  );
}

function SidebarLinks({ pathname, onNavigate }: { pathname: string | null; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/admin" && pathname?.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center justify-between rounded-[var(--radius-md)] px-3 py-2.5 text-[13px] font-medium transition-colors",
              active ? "bg-forest text-paper" : "text-ink-soft hover:bg-ivory-deep"
            )}
          >
            <span className="flex items-center gap-2.5">
              <Icon size={16} />
              {label}
            </span>
            {active && <ChevronLeft size={14} />}
          </Link>
        );
      })}
    </nav>
  );
}
