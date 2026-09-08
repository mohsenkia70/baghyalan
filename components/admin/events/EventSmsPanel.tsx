"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Send, Users, Clock, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/date";
import type { Guest } from "@/lib/types";

const TEMPLATES = {
  reminder: {
    label: "یادآوری + آدرس",
    text: "سلام {نام مهمان} عزیز؛ مراسم فردا ساعت ۱۸:۰۰ در عمارت یلان (گرمدره، بلوار اصلی) برگزار می‌شود. منتظر حضور گرم شما هستیم. 🌿",
  },
  greeting: {
    label: "تبریک روز مراسم",
    text: "{نام مهمان} عزیز، امروز روز جشن است! خوشحال می‌شویم امشب در کنار ما در عمارت یلان باشید. 💛",
  },
  thanks: {
    label: "تشکر بعد از مراسم",
    text: "{نام مهمان} عزیز، از حضور گرم شما در مراسم سپاسگزاریم. حضور شما لحظات ما را به‌یادماندنی‌تر کرد. 🌸",
  },
} as const;

type TemplateKey = keyof typeof TEMPLATES;
type SendState = "idle" | "queued" | "sent" | "failed";

export function EventSmsPanel({ eventId }: { eventId: string }) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [templateKey, setTemplateKey] = useState<TemplateKey>("reminder");
  const [message, setMessage] = useState<string>(TEMPLATES.reminder.text);
  const [confirmedOnly, setConfirmedOnly] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<Record<string, SendState>>({});

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/events/${eventId}/guests`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.guests) setGuests(data.guests as Guest[]);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [eventId]);

  const recipients = useMemo(
    () => (confirmedOnly ? guests.filter((g) => g.confirmed) : guests),
    [guests, confirmedOnly]
  );

  function selectTemplate(key: TemplateKey) {
    setTemplateKey(key);
    setMessage(TEMPLATES[key].text);
  }

  const previewName = recipients[0]?.name ?? "مهمان";

  function handleSend() {
    if (recipients.length === 0 || sending) return;
    setSending(true);
    const initial: Record<string, SendState> = {};
    recipients.forEach((g) => (initial[g.id] = "queued"));
    setSendStatus(initial);

    recipients.forEach((g, i) => {
      window.setTimeout(() => {
        setSendStatus((prev) => ({
          ...prev,
          [g.id]: Math.random() > 0.93 ? "failed" : "sent",
        }));
        if (i === recipients.length - 1) setSending(false);
      }, 350 + i * 220);
    });
  }

  const sentCount = Object.values(sendStatus).filter((s) => s === "sent").length;
  const failedCount = Object.values(sendStatus).filter((s) => s === "failed").length;
  const hasSent = Object.keys(sendStatus).length > 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[var(--radius-xl)] border border-stone/50 bg-paper p-5">
        <p className="mb-3 text-[13px] font-medium text-ink">انتخاب قالب پیام</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => (
            <button
              key={key}
              onClick={() => selectTemplate(key)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                templateKey === key ? "border-forest bg-forest text-paper" : "border-stone/50 text-ink-soft"
              )}
            >
              {TEMPLATES[key].label}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-4 w-full resize-none rounded-[var(--radius-md)] border border-stone/50 bg-ivory p-3 text-[13px] leading-6 text-ink outline-none focus:border-gold"
        />
        <p className="mt-1.5 text-[10.5px] text-ink-soft">
          از {"{نام مهمان}"} برای درج خودکار نام هر مهمان استفاده کنید.
        </p>

        <div className="mt-4 rounded-[var(--radius-md)] bg-ivory-deep/50 p-3">
          <p className="text-[10.5px] font-medium text-ink-soft">پیش‌نمایش برای اولین مهمان:</p>
          <p className="mt-1 text-[12.5px] leading-6 text-ink">{message.replace("{نام مهمان}", previewName)}</p>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-stone/40 pt-4">
          <label className="flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-2 text-ink">
              <Users size={14} className="text-forest" /> فقط مهمانان تایید‌شده
            </span>
            <input
              type="checkbox"
              checked={confirmedOnly}
              onChange={(e) => setConfirmedOnly(e.target.checked)}
              className="h-5 w-5 accent-forest"
            />
          </label>
          <label className="flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-2 text-ink">
              <Clock size={14} className="text-forest" /> ارسال خودکار ۲۴ ساعت قبل از مراسم
            </span>
            <input
              type="checkbox"
              checked={autoSchedule}
              onChange={(e) => setAutoSchedule(e.target.checked)}
              className="h-5 w-5 accent-forest"
            />
          </label>
        </div>

        <button
          onClick={handleSend}
          disabled={loading || sending || recipients.length === 0}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-gold py-3 text-[13.5px] font-medium text-paper shadow-[var(--shadow-gold)] transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {sending
            ? "در حال ارسال..."
            : `ارسال پیامک به ${toPersianDigits(recipients.length)} مهمان`}
        </button>
        {autoSchedule && (
          <p className="mt-2 text-center text-[11px] text-gold-deep">
            این پیام همچنین ۲۴ ساعت قبل از مراسم به‌صورت خودکار ارسال خواهد شد.
          </p>
        )}
      </div>

      {hasSent && (
        <div className="rounded-[var(--radius-xl)] border border-stone/50 bg-paper p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <MessageSquareText size={15} className="text-forest" /> وضعیت ارسال
            </p>
            <p className="text-[11.5px] text-ink-soft">
              {toPersianDigits(sentCount)} ارسال‌شده
              {failedCount > 0 && ` · ${toPersianDigits(failedCount)} ناموفق`}
            </p>
          </div>
          <div className="flex max-h-64 flex-col gap-1.5 overflow-y-auto">
            <AnimatePresence>
              {recipients.map((g) => {
                const status = sendStatus[g.id] ?? "queued";
                return (
                  <motion.div
                    key={g.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between rounded-[var(--radius-sm)] px-2.5 py-2 text-[12px]"
                  >
                    <span className="text-ink">{g.name}</span>
                    <StatusPill status={status} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: SendState }) {
  if (status === "sent") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-forest-tint px-2.5 py-1 text-[10.5px] font-medium text-forest-2">
        <CheckCircle2 size={11} /> ارسال شد
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-error/10 px-2.5 py-1 text-[10.5px] font-medium text-error">
        <XCircle size={11} /> ناموفق
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 rounded-full bg-gold-soft/40 px-2.5 py-1 text-[10.5px] font-medium text-gold-deep">
      <Loader2 size={11} className="animate-spin" /> در صف
    </span>
  );
}
