"use client";

import { useState } from "react";
import { UserPlus, CalendarCheck, MessageCircle, Wallet, CheckCheck } from "lucide-react";
import { ADMIN_NOTIFICATIONS } from "@/lib/mock-data/crm";
import { cn } from "@/lib/utils/cn";

const icons: Record<string, React.ElementType> = {
  "لید": UserPlus,
  "بازدید": CalendarCheck,
  "پیام": MessageCircle,
  "پرداخت": Wallet,
};

export default function AdminNotificationsPage() {
  const [items, setItems] = useState(ADMIN_NOTIFICATIONS);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-5 mt-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[26px] text-ink">مرکز اعلان‌ها</h1>
          <p className="text-[13px] text-ink-soft">{unread > 0 ? `${unread} اعلان خوانده‌نشده` : "همه اعلان‌ها خوانده شده‌اند"}</p>
        </div>
        <button
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
          className="flex items-center gap-1.5 rounded-full border border-stone/50 px-3.5 py-2 text-[12.5px] font-medium text-ink-soft"
        >
          <CheckCheck size={14} /> علامت‌گذاری همه به‌عنوان خوانده‌شده
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((n) => {
          const Icon = icons[n.type] ?? UserPlus;
          return (
            <button
              key={n.id}
              onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
              className={cn(
                "flex items-start gap-3 rounded-[var(--radius-lg)] border p-4 text-right transition-colors",
                n.read ? "border-stone/40 bg-paper" : "border-gold/40 bg-gold-soft/15"
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-tint text-forest">
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-medium text-ink">{n.title}</p>
                  <span className="shrink-0 text-[10.5px] text-ink-soft">{n.time}</span>
                </div>
                <p className="mt-1 text-[12px] leading-5 text-ink-soft">{n.description}</p>
              </div>
              {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
