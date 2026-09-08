"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Phone,
  ArrowLeft,
  Check,
  Sparkles,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

import { RotundaSignature } from "@/components/auth/RotundaSignature";
import { GoldParticles } from "@/components/auth/GoldParticles";
import { useAuth } from "@/lib/hooks/useAuth";
import { TEST_USERS } from "@/lib/mock-data/auth";
import { cn } from "@/lib/utils/cn";
import type { UserRole } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;

const LOGIN_ROLES: UserRole[] = ["customer", "admin", "guard"];

const ROLE_LABELS: Record<UserRole, string> = {
  customer: "عروس و داماد",
  admin: "مدیریت مجموعه",
  guard: "نگهبان ورودی",
};

function isValidRole(value: string | null): value is UserRole {
  return value === "customer" || value === "admin" || value === "guard";
}

function getDefaultPath(role: UserRole) {
  switch (role) {
    case "admin":
      return "/admin";

    case "guard":
      return "/guard";

    case "customer":
    default:
      return "/khane";
  }
}

function LoginContent() {
  const params = useSearchParams();
  const { login } = useAuth();

  // جلوگیری از اسکرول هنگام mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.documentElement.style.height = "100vh";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, []);

  const requestedRole = params.get("role");

  const initialRole: UserRole = isValidRole(requestedRole)
    ? requestedRole
    : "customer";

  const [role, setRole] = useState<UserRole>(initialRole);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const testUser = TEST_USERS.find((user) => user.role === role);

  const requestedNext = params.get("next");

  const nextPath =
    requestedNext && requestedNext.startsWith("/")
      ? requestedNext
      : getDefaultPath(role);

  function fillTest() {
    if (!testUser) return;

    setPhone(testUser.phone);
    setPassword(testUser.password ?? "");
    setStatus("idle");
  }

  function getSafeTarget(foundRole: UserRole) {
    if (foundRole === "admin") {
      return nextPath.startsWith("/admin")
        ? nextPath
        : "/admin";
    }

    if (foundRole === "guard") {
      return nextPath.startsWith("/guard")
        ? nextPath
        : "/guard";
    }

    return nextPath.startsWith("/khane")
      ? nextPath
      : "/khane";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!phone.trim() || !password) {
      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 900);

      return;
    }

    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 400));

    const found = await login(phone, password);

    if (!found) {
      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 900);

      return;
    }

    setStatus("success");

    const target = getSafeTarget(found.role);

    setTimeout(() => {
      window.location.href = target;
    }, 800);
  }

  return (
    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-night p-4">
      {/* ====================================================== */}
      {/* Background */}
      {/* ====================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]"
      />

      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[-160px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-forest-2/25 blur-[110px]"
      />

      <GoldParticles />

      {/* ====================================================== */}
      {/* Main Content */}
      {/* ====================================================== */}

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center justify-center">
        {/* ================================================== */}
        {/* Logo */}
        {/* ================================================== */}

        <div className="mb-2 h-32 w-52 md:h-40 md:w-64">
          <RotundaSignature />
        </div>

        {/* ================================================== */}
        {/* Title */}
        {/* ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
            ease,
          }}
          className="mb-4 text-center"
        >
          <p className="font-display text-2xl text-on-night md:text-[26px]">
            عمارت یلان
          </p>

          <p className="mt-1 text-[11px] text-on-night-soft md:text-[12.5px]">
            ورود به پلتفرم دیجیتال عمارت
          </p>
        </motion.div>

        {/* ================================================== */}
        {/* Role Selector */}
        {/* ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.6,
            ease,
          }}
          className="relative mb-4 flex w-full rounded-full border border-on-night/15 bg-on-night/5 p-1 backdrop-blur-sm"
        >
          {LOGIN_ROLES.map((currentRole) => (
            <button
              key={currentRole}
              type="button"
              onClick={() => {
                setRole(currentRole);
                setStatus("idle");
                setPhone("");
                setPassword("");
              }}
              className="relative z-10 flex-1 rounded-full py-2 text-[11px] font-medium transition-colors md:py-2.5 md:text-[12px]"
            >
              {role === currentRole && (
                <motion.span
                  layoutId="role-pill"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-full bg-gold"
                />
              )}

              <span
                className={cn(
                  "relative whitespace-nowrap",
                  role === currentRole
                    ? "text-paper"
                    : "text-on-night-soft"
                )}
              >
                {ROLE_LABELS[currentRole]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ================================================== */}
        {/* Login Form */}
        {/* ================================================== */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.7,
            ease,
          }}
          className={cn(
            "w-full rounded-[var(--radius-xl)] border border-on-night/15 bg-on-night/[0.06] p-4 backdrop-blur-md md:p-5",
            status === "error" && "animate-[shake_0.4s]"
          )}
        >
          <div className="flex flex-col gap-2.5 md:gap-3">
            {/* ============================================== */}
            {/* Phone */}
            {/* ============================================== */}

            <label className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-on-night/15 bg-night/40 px-3 md:px-4 focus-within:border-gold">
              <Phone
                size={15}
                className="shrink-0 text-gold-soft md:size-4"
              />

              <input
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xxxxxxxxx"
                inputMode="numeric"
                autoComplete="tel"
                className="h-10 flex-1 bg-transparent text-left text-[13px] text-on-night outline-none placeholder:text-on-night-soft/50 md:h-12 md:text-[14px]"
              />
            </label>

            {/* ============================================== */}
            {/* Password */}
            {/* ============================================== */}

            <label className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-on-night/15 bg-night/40 px-3 md:px-4 focus-within:border-gold">
              <Lock
                size={15}
                className="shrink-0 text-gold-soft md:size-4"
              />

              <input
                dir="ltr"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
                autoComplete="current-password"
                className="h-10 flex-1 bg-transparent text-left text-[13px] text-on-night outline-none placeholder:text-on-night-soft/50 md:h-12 md:text-[14px]"
              />
            </label>
          </div>

          {/* ================================================= */}
          {/* Submit */}
          {/* ================================================= */}

          <button
            type="submit"
            disabled={
              status === "loading" ||
              status === "success"
            }
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-gold py-3 text-[13px] font-medium text-paper shadow-[var(--shadow-gold)] transition-transform active:scale-[0.98] disabled:opacity-90 md:mt-4 md:py-3.5 md:text-[14.5px]"
          >
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper/40 border-t-paper md:h-4 md:w-4" />
                  در حال ورود...
                </motion.span>
              ) : status === "success" ? (
                <motion.span
                  key="success"
                  initial={{
                    scale: 0.5,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} />
                  خوش آمدید
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  ورود
                  <ArrowLeft size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* ================================================= */}
          {/* Error */}
          {/* ================================================= */}

          {status === "error" && (
            <motion.p
              initial={{
                opacity: 0,
                y: -4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-2 text-center text-[11px] text-[#E8A9A0] md:mt-2.5 md:text-[12px]"
            >
              شماره یا رمز عبور صحیح نیست.
            </motion.p>
          )}
        </motion.form>

        {/* ================================================== */}
        {/* Test Account */}
        {/* ================================================== */}

        {testUser && (
          <motion.button
            type="button"
            onClick={fillTest}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.6,
            }}
            className="mt-3 flex w-full items-center justify-between gap-2 rounded-[var(--radius-lg)] border border-dashed border-gold/30 bg-gold/5 px-3 py-2.5 text-right md:mt-4 md:gap-3 md:px-4 md:py-3"
          >
            <span className="flex min-w-0 items-center gap-2 md:gap-2.5">
              <ShieldCheck
                size={14}
                className="shrink-0 text-gold-soft md:size-4"
              />

              <span className="text-[10.5px] leading-5 text-on-night-soft md:text-[11.5px]">
                حساب آزمایشی{" "}
                {ROLE_LABELS[role]}:

                <span
                  dir="ltr"
                  className="mr-1 font-medium text-gold-soft"
                >
                  {testUser.phone} / {testUser.password}
                </span>
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-gold-soft md:text-[11px]">
              <KeyRound size={11} />
              پر کردن خودکار
            </span>
          </motion.button>
        )}

        {/* ================================================== */}
        {/* Footer */}
        {/* ================================================== */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.1,
          }}
          className="mt-4 flex items-center gap-1.5 text-[10px] text-on-night-soft/70 md:mt-6 md:text-[11px]"
        >
          <Sparkles size={10} />
          نسخه نمایشی — اطلاعات ورود واقعی نیست
        </motion.p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}