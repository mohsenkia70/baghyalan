"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Lock, CreditCard, ArrowRight, CheckCircle2, Loader2, Landmark, Receipt, Copy,
} from "lucide-react";
import { PACKAGES } from "@/lib/mock-data/venue";
import { Button } from "@/components/ui/Button";
import { formatToman, toPersianDigits } from "@/lib/utils/date";
import { useAuth } from "@/lib/hooks/useAuth";

const ease = [0.16, 1, 0.3, 1] as const;
type Step = "review" | "redirecting" | "gateway" | "processing" | "success";

function formatCardNumber(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function PaymentContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();

  const pkgId = params.get("pkg") ?? "royal";
  const pkg = PACKAGES.find((p) => p.id === pkgId) ?? PACKAGES[1];
  const depositAmount = Math.round((pkg.priceFrom * 0.1) / 1_000_000) * 1_000_000;

  const [step, setStep] = useState<Step>("review");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [dynamicPass, setDynamicPass] = useState("");
  const trackingCode = useMemo(() => `YLN-${Math.floor(100000 + Math.random() * 899999)}`, []);

  function goToGateway() {
    setStep("redirecting");
    setTimeout(() => setStep("gateway"), 1600);
  }

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => setStep("success"), 1800);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-ivory pb-10">
      <AnimatePresence mode="wait">
        {step === "review" && (
          <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
            <div className="flex items-center gap-3 px-5 pt-[max(16px,env(safe-area-inset-top))] pb-2">
              <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-full bg-paper border border-stone/60">
                <ArrowRight size={17} />
              </button>
              <h1 className="font-display text-[19px] text-ink">تایید و پرداخت بیعانه</h1>
            </div>

            <div className="mx-5 mt-3 rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
              <p className="text-[12px] text-ink-soft">پکیج انتخابی</p>
              <p className="mt-1 font-display text-[21px] text-forest">{pkg.name}</p>
              <p className="mt-1 text-[12.5px] leading-6 text-ink-soft">{pkg.tagline}</p>

              <div className="mt-4 flex items-center justify-between border-t border-stone/40 pt-4 text-[13px]">
                <span className="text-ink-soft">مبلغ کل پکیج (از)</span>
                <span className="font-medium text-ink">{formatToman(pkg.priceFrom)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[13px]">
                <span className="text-ink-soft">بیعانه قابل‌پرداخت (۱۰٪)</span>
                <span className="font-medium text-gold-deep">{formatToman(depositAmount)}</span>
              </div>
            </div>

            <div className="mx-5 mt-3 flex items-start gap-2.5 rounded-[var(--radius-lg)] bg-forest-tint p-4">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-forest" />
              <p className="text-[11.5px] leading-6 text-forest">
                پرداخت شما از طریق درگاه بانکی معتبر و مطابق استاندارد شاپرک انجام می‌شود. اطلاعات کارت شما نزد عمارت یلان ذخیره نمی‌شود.
              </p>
            </div>

            <div className="mx-5 mt-6">
              <Button size="lg" className="w-full" onClick={goToGateway}>
                <Lock size={16} /> اتصال به درگاه پرداخت
              </Button>
              <p className="mt-3 text-center text-[11px] text-ink-soft">
                در حال ورود به‌عنوان {user?.name ?? "مهمان"}
              </p>
            </div>
          </motion.div>
        )}

        {step === "redirecting" && (
          <motion.div
            key="redirecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-forest/20 border-t-forest"
            >
              <Landmark size={20} className="text-forest" />
            </motion.span>
            <p className="text-[14px] font-medium text-ink">در حال اتصال امن به درگاه بانکی...</p>
            <p className="text-[12px] text-ink-soft">لطفاً صبر کنید، در حال انتقال به صفحه پرداخت هستید</p>
          </motion.div>
        )}

        {step === "gateway" && (
          <motion.div
            key="gateway"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-1 flex-col bg-[#F4F6F8]"
            dir="rtl"
          >
            <div className="flex items-center justify-between bg-[#0B3D91] px-5 py-4 text-white">
              <span className="flex items-center gap-2 text-[13px] font-medium">
                <ShieldCheck size={16} /> درگاه پرداخت الکترونیک بانکی
              </span>
              <span className="rounded bg-white/15 px-2 py-1 text-[10.5px]">SSL امن</span>
            </div>

            <div className="mx-5 mt-5 rounded-[var(--radius-lg)] bg-white p-5 shadow-[var(--shadow-md)]">
              <div className="flex items-center justify-between text-[12.5px] text-[#334155]">
                <span>مبلغ قابل پرداخت</span>
                <span dir="ltr" className="font-num font-bold text-[#0B3D91]">
                  {formatToman(depositAmount)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-[#64748B]">
                <span>شناسه سفارش</span>
                <span dir="ltr" className="font-num">{trackingCode}</span>
              </div>

              <form onSubmit={pay} className="mt-5 flex flex-col gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[11.5px] text-[#334155]">شماره کارت</span>
                  <div className="flex items-center gap-2 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] px-3">
                    <CreditCard size={15} className="text-[#94A3B8]" />
                    <input
                      dir="ltr"
                      required
                      value={card}
                      onChange={(e) => setCard(formatCardNumber(e.target.value))}
                      placeholder="•••• •••• •••• ••••"
                      inputMode="numeric"
                      className="h-11 flex-1 bg-transparent text-[14px] tracking-widest text-[#0F172A] outline-none"
                    />
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11.5px] text-[#334155]">تاریخ انقضا</span>
                    <input
                      dir="ltr"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value.replace(/[^\d/]/g, "").slice(0, 5))}
                      placeholder="MM/YY"
                      className="h-11 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11.5px] text-[#334155]">CVV2</span>
                    <input
                      dir="ltr"
                      required
                      value={cvv2}
                      onChange={(e) => setCvv2(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="****"
                      className="h-11 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] px-3 text-[14px] text-[#0F172A] outline-none"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[11.5px] text-[#334155]">رمز پویا (پیامکی)</span>
                  <input
                    dir="ltr"
                    required
                    value={dynamicPass}
                    onChange={(e) => setDynamicPass(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="------"
                    className="h-11 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] px-3 text-[14px] tracking-[0.3em] text-[#0F172A] outline-none"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#0B3D91] text-[14px] font-medium text-white transition-transform active:scale-[0.98]"
                >
                  <Lock size={15} /> پرداخت
                </button>
                <p className="text-center text-[10.5px] text-[#94A3B8]">
                  این صفحه نمایشی است — هیچ تراکنش بانکی واقعی انجام نمی‌شود.
                </p>
              </form>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <Loader2 size={34} className="animate-spin text-forest" />
            <p className="text-[14px] font-medium text-ink">در حال پردازش تراکنش...</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 flex-col px-6 pt-10 text-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-tint text-forest"
            >
              <CheckCircle2 size={36} />
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 font-display text-[23px] text-ink text-balance"
            >
              پرداخت با موفقیت انجام شد
            </motion.h1>
            <p className="mt-2 text-[13px] text-ink-soft">رزرو پکیج {pkg.name} برای شما نهایی شد</p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mx-auto mt-7 w-full max-w-sm rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5 text-right"
            >
              <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
                <Receipt size={15} className="text-forest" /> رسید پرداخت
              </p>
              <div className="mt-3 flex flex-col gap-2 text-[12.5px]">
                <Row label="کد رهگیری" value={trackingCode} mono />
                <Row label="مبلغ پرداخت‌شده" value={formatToman(depositAmount)} />
                <Row label="پکیج" value={pkg.name} />
                <Row label="پرداخت‌کننده" value={user?.name ?? "مهمان"} />
              </div>
            </motion.div>

            <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-2.5">
              <Link href="/dashboard">
                <Button className="w-full" variant="gold">
                  مشاهده در داشبورد مراسم من
                </Button>
              </Link>
              <Link href="/khane">
                <Button className="w-full" variant="outline">
                  بازگشت به صفحه اصلی
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-stone/30 pb-2 last:border-0 last:pb-0">
      <span className="text-ink-soft">{label}</span>
      <span dir={mono ? "ltr" : undefined} className="font-medium text-ink">
        {value}
      </span>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={null}>
      <PaymentContent />
    </Suspense>
  );
}
