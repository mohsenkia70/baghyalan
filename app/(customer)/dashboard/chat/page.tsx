"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Camera, Send } from "lucide-react";
import { MY_CHAT } from "@/lib/mock-data/my-event";
import { cn } from "@/lib/utils/cn";
import type { ChatMessage } from "@/lib/types";

export default function ChatWithConsultantPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(MY_CHAT);
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;
    const newMessage: ChatMessage = {
      id: `cm-${Date.now()}`,
      sender: "customer",
      text: text.trim(),
      time: "اکنون",
    };
    setMessages((prev) => [...prev, newMessage]);
    setText("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `cm-${Date.now() + 1}`,
          sender: "consultant",
          text: "پیام شما دریافت شد، در اسرع وقت پاسخ می‌دهم 🌿",
          time: "اکنون",
        },
      ]);
    }, 1200);
  }

  return (
    <div className="flex min-h-[calc(100dvh-6rem)] flex-col bg-ivory">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-stone/50 bg-paper/90 px-4 py-3 backdrop-blur-lg">
        <button
          onClick={() => router.back()}
          aria-label="بازگشت"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone/60"
        >
          <ArrowRight size={16} />
        </button>
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-forest-tint">
          <div className="flex h-full w-full items-center justify-center font-display text-[16px] text-forest">س</div>
          <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-paper bg-forest-2" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-ink">سارا محمودی</p>
          <p className="text-[11px] text-forest-2">مشاور ارشد مراسم · آنلاین</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.2) }}
              className={cn("flex", m.sender === "customer" ? "justify-start" : "justify-end")}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-[var(--radius-lg)] px-4 py-2.5 text-[13.5px] leading-6",
                  m.sender === "customer"
                    ? "rounded-bl-sm bg-forest text-paper"
                    : "rounded-br-sm bg-paper border border-stone/50 text-ink"
                )}
              >
                {m.imageUrl && (
                  <div className="relative mb-2 h-32 w-48 overflow-hidden rounded-[var(--radius-sm)]">
                    <Image src={m.imageUrl} alt="تصویر ارسالی مشاور" fill sizes="200px" className="object-cover" />
                  </div>
                )}
                <p>{m.text}</p>
                <p className={cn("mt-1 text-[10px]", m.sender === "customer" ? "text-paper/70" : "text-ink-soft")}>
                  {m.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-24 flex items-center gap-2 border-t border-stone/50 bg-paper px-4 py-3 md:bottom-0">
        <button
          aria-label="ارسال تصویر"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone/50 text-ink-soft"
        >
          <Camera size={18} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="پیام خود را بنویسید..."
          className="h-11 flex-1 rounded-full border border-stone/50 bg-ivory px-4 text-[13.5px] text-ink outline-none focus:border-gold"
        />
        <button
          onClick={send}
          aria-label="ارسال پیام"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-paper transition-transform active:scale-90"
        >
          <Send size={17} className="-scale-x-100" />
        </button>
      </div>
    </div>
  );
}
