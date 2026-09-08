"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, WifiOff, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

const INSTALL_PROMPT_KEY = "yalan_install_prompt_shown";

export function PwaManager() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showInstall, setShowInstall] = useState(false);
  const [offline, setOffline] = useState(false);

  // جلوگیری از اجرای چندباره تایمر
  const installTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // --------------------------------------------------
    // Service Worker
    // --------------------------------------------------

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // --------------------------------------------------
    // بررسی وضعیت نصب PWA
    // --------------------------------------------------

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // مخصوص iOS
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true);

    // اگر اپ قبلاً نصب شده، اصلاً چیزی نشان نده
    if (isStandalone) {
      setShowInstall(false);
      return;
    }

    // --------------------------------------------------
    // Before Install Prompt
    // --------------------------------------------------

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();

      const installPrompt = event as BeforeInstallPromptEvent;

      setInstallEvent(installPrompt);

      // اگر قبلاً نوتیفیکیشن نمایش داده شده،
      // دیگر هیچ کاری انجام نده
      const hasBeenShown = localStorage.getItem(INSTALL_PROMPT_KEY);

      if (hasBeenShown === "true") {
        return;
      }

      // اگر تایمر قبلاً ساخته شده، دوباره نساز
      if (installTimerRef.current) {
        return;
      }

      // بعد از 2.5 ثانیه فقط یک بار نمایش بده
      installTimerRef.current = setTimeout(() => {
        // دوباره چک می‌کنیم که در این فاصله
        // مقدار ذخیره نشده باشد
        const alreadyShown =
          localStorage.getItem(INSTALL_PROMPT_KEY) === "true";

        if (alreadyShown) {
          return;
        }

        setShowInstall(true);

        // همین لحظه ثبت می‌کنیم که نوتیفیکیشن نمایش داده شده
        localStorage.setItem(INSTALL_PROMPT_KEY, "true");

        installTimerRef.current = null;
      }, 2500);
    };

    window.addEventListener(
      "beforeinstallprompt",
      onBeforeInstall as EventListener
    );

    // --------------------------------------------------
    // Online / Offline
    // --------------------------------------------------

    const onOnline = () => {
      setOffline(false);
    };

    const onOffline = () => {
      setOffline(true);
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    setOffline(!navigator.onLine);

    // --------------------------------------------------
    // Cleanup
    // --------------------------------------------------

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        onBeforeInstall as EventListener
      );

      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);

      if (installTimerRef.current) {
        clearTimeout(installTimerRef.current);
        installTimerRef.current = null;
      }
    };
  }, []);

  // --------------------------------------------------
  // Install Handler
  // --------------------------------------------------

  const handleInstall = async () => {
    if (!installEvent) {
      setShowInstall(false);
      return;
    }

    try {
      await installEvent.prompt();

      const { outcome } = await installEvent.userChoice;

      if (outcome === "accepted") {
        console.log("PWA installed");
      }
    } catch {
      // خطای احتمالی prompt را نادیده می‌گیریم
    } finally {
      setInstallEvent(null);
      setShowInstall(false);
    }
  };

  // --------------------------------------------------
  // Close Handler
  // --------------------------------------------------

  const handleCloseInstall = () => {
    setShowInstall(false);

    // اطمینان از اینکه دیگر نمایش داده نشود
    localStorage.setItem(INSTALL_PROMPT_KEY, "true");
  };

  return (
    <>
      {/* ---------------------------------------------- */}
      {/* Offline Notification */}
      {/* ---------------------------------------------- */}

      <AnimatePresence>
        {offline && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 bg-night py-2 text-[12.5px] text-on-night"
          >
            <WifiOff size={14} />

            حالت آفلاین — برخی اطلاعات ممکن است به‌روز نباشند
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------- */}
      {/* Install Notification */}
      {/* ---------------------------------------------- */}

      <AnimatePresence>
        {showInstall && (
          <motion.div
            initial={{
              y: 80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 80,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-x-4 bottom-24 z-50 flex items-center gap-3 rounded-[var(--radius-lg)] border border-stone/60 bg-paper p-4 shadow-[var(--shadow-lg)] md:inset-x-auto md:left-6 md:bottom-6 md:w-80"
          >
            {/* Icon */}
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-tint text-forest">
              <Download size={20} />
            </span>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium text-ink">
                نصب اپلیکیشن عمارت یلان
              </p>

              <p className="text-[12px] text-ink-soft">
                دسترسی سریع از صفحه اصلی گوشی شما
              </p>
            </div>

            {/* Install */}
            <Button
              size="sm"
              onClick={handleInstall}
            >
              نصب
            </Button>

            {/* Close */}
            <button
              type="button"
              aria-label="بستن"
              onClick={handleCloseInstall}
              className="text-ink-soft transition-colors hover:text-ink"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}