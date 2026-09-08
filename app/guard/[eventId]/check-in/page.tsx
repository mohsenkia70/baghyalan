"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  LogOut,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  Users,
  X,
  AlertTriangle,
} from "lucide-react";

import { AuthGate } from "@/components/auth/AuthGate";
import { EVENTS } from "@/lib/mock-data/events";
import type { Guest, GuestCheckInStatus, GuestGroup } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

const ease = [0.16, 1, 0.3, 1] as const;

type FilterValue =
  | "همه"
  | "منتظر ورود"
  | "وارد شده"
  | "نیازمند بررسی";

function normalizeSearchValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/\s+/g, " ");
}

function getStatusClass(status: GuestCheckInStatus) {
  switch (status) {
    case "وارد شده":
      return "border-forest/20 bg-forest/10 text-forest";

    case "نیازمند بررسی":
      return "border-red-200 bg-red-50 text-red-700";

    case "منتظر ورود":
    default:
      return "border-gold/25 bg-gold/10 text-gold";
  }
}

function getGroupClass(group: GuestGroup) {
  switch (group) {
    case "خانواده عروس":
      return "bg-rose-50 text-rose-700";

    case "خانواده داماد":
      return "bg-sky-50 text-sky-700";

    case "دوستان":
      return "bg-violet-50 text-violet-700";

    case "همکاران":
      return "bg-amber-50 text-amber-700";

    default:
      return "bg-ivory-deep text-ink-soft";
  }
}

function getStatusIcon(status: GuestCheckInStatus) {
  switch (status) {
    case "وارد شده":
      return <CheckCircle2 size={15} />;

    case "نیازمند بررسی":
      return <ShieldAlert size={15} />;

    case "منتظر ورود":
    default:
      return <Clock3 size={15} />;
  }
}

function GuestStatus({
  status,
}: {
  status: GuestCheckInStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium",
        getStatusClass(status),
      )}
    >
      {getStatusIcon(status)}
      {status}
    </span>
  );
}

function GuestCard({
  guest,
  selected,
  onSelect,
}: {
  guest: Guest;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -8,
      }}
      transition={{
        duration: 0.25,
        ease,
      }}
      onClick={onSelect}
      className={cn(
        "w-full rounded-[var(--radius-lg)] border bg-paper p-4 text-right transition-all",
        "active:scale-[0.99]",
        selected
          ? "border-forest/40 bg-forest/[0.03] shadow-sm"
          : "border-stone/45 hover:border-stone",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            guest.checkInStatus === "وارد شده"
              ? "bg-forest/10 text-forest"
              : guest.checkInStatus === "نیازمند بررسی"
                ? "bg-red-50 text-red-600"
                : "bg-ivory-deep text-ink-soft",
          )}
        >
          <UserRound size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-[14px] font-semibold text-ink">
              {guest.name}
            </p>

            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[9.5px] font-medium",
                getGroupClass(guest.group),
              )}
            >
              {guest.group}
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-ink-soft">
            <Users size={13} />

            <span>
              {guest.companions === 0
                ? "بدون همراه"
                : `${guest.companions.toLocaleString("fa-IR")} همراه`}
            </span>
          </div>
        </div>

        <div className="hidden shrink-0 sm:block">
          <GuestStatus status={guest.checkInStatus} />
        </div>

        <ArrowRight
          size={17}
          className={cn(
            "shrink-0 transition-transform",
            selected
              ? "text-forest"
              : "text-ink-soft",
          )}
        />
      </div>

      <div className="mt-3 sm:hidden">
        <GuestStatus status={guest.checkInStatus} />
      </div>
    </motion.button>
  );
}

function GuestDetails({
  guest,
  onClose,
  onCheckIn,
  onReview,
  checkingIn,
}: {
  guest: Guest;
  onClose: () => void;
  onCheckIn: () => void;
  onReview: () => void;
  checkingIn: boolean;
}) {
  const isCheckedIn = guest.checkInStatus === "وارد شده";
  const needsReview = guest.checkInStatus === "نیازمند بررسی";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
      transition={{
        duration: 0.35,
        ease,
      }}
      className="fixed inset-x-0 bottom-0 z-50 md:absolute md:inset-auto md:right-0 md:top-0 md:h-full md:w-[390px]"
    >
      <div className="h-full overflow-y-auto rounded-t-[28px] border border-stone/50 bg-paper shadow-[0_-15px_50px_rgba(0,0,0,0.12)] md:rounded-none md:rounded-r-[24px] md:shadow-[-15px_0_50px_rgba(0,0,0,0.08)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone/40 bg-paper/95 px-5 py-4 backdrop-blur-md">
          <p className="text-[13px] font-semibold text-ink">
            اطلاعات مهمان
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-deep text-ink-soft transition-colors hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-full",
                isCheckedIn
                  ? "bg-forest/10 text-forest"
                  : needsReview
                    ? "bg-red-50 text-red-600"
                    : "bg-gold/10 text-gold",
              )}
            >
              {isCheckedIn ? (
                <CheckCircle2 size={35} />
              ) : needsReview ? (
                <ShieldAlert size={35} />
              ) : (
                <UserRound size={35} />
              )}
            </div>

            <h2 className="mt-4 text-[20px] font-semibold text-ink">
              {guest.name}
            </h2>

            <div className="mt-2">
              <GuestStatus status={guest.checkInStatus} />
            </div>
          </div>

          <div className="mt-7 overflow-hidden rounded-[var(--radius-lg)] border border-stone/40">
            <div className="flex items-center justify-between border-b border-stone/30 px-4 py-3.5">
              <span className="text-[11.5px] text-ink-soft">
                گروه مهمان
              </span>

              <span className="text-[12px] font-medium text-ink">
                {guest.group}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-stone/30 px-4 py-3.5">
              <span className="text-[11.5px] text-ink-soft">
                تعداد همراه
              </span>

              <span className="text-[12px] font-medium text-ink">
                {guest.companions.toLocaleString("fa-IR")}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-stone/30 px-4 py-3.5">
              <span className="text-[11.5px] text-ink-soft">
                وضعیت دعوت
              </span>

              <span
                className={cn(
                  "text-[12px] font-medium",
                  guest.confirmed
                    ? "text-forest"
                    : "text-red-600",
                )}
              >
                {guest.confirmed
                  ? "تأیید شده"
                  : "تأیید نشده"}
              </span>
            </div>

            {guest.phone && (
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-[11.5px] text-ink-soft">
                  شماره تماس
                </span>

                <span
                  dir="ltr"
                  className="text-[12px] font-medium text-ink"
                >
                  {guest.phone}
                </span>
              </div>
            )}
          </div>

          {isCheckedIn && (
            <div className="mt-4 rounded-[var(--radius-lg)] border border-forest/15 bg-forest/5 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-forest"
                />

                <div>
                  <p className="text-[12.5px] font-semibold text-forest">
                    ورود این مهمان قبلاً ثبت شده است
                  </p>

                  {guest.checkedInAt && (
                    <p className="mt-1 text-[11px] leading-5 text-ink-soft">
                      زمان ورود: {guest.checkedInAt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {needsReview && (
            <div className="mt-4 rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={19}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <div>
                  <p className="text-[12.5px] font-semibold text-red-700">
                    ورود این مهمان نیازمند بررسی است
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-red-700/75">
                    قبل از اجازه ورود، وضعیت دعوت مهمان را با
                    مسئول مراسم بررسی کنید.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            {isCheckedIn ? (
              <button
                type="button"
                disabled
                className="flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-forest/10 text-[14px] font-semibold text-forest"
              >
                <CheckCircle2 size={19} />
                ورود ثبت شده است
              </button>
            ) : needsReview ? (
              <button
                type="button"
                onClick={onReview}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-red-600 text-[14px] font-semibold text-paper shadow-sm transition-transform active:scale-[0.98]"
              >
                <ShieldAlert size={19} />
                درخواست بررسی ورود
              </button>
            ) : (
              <button
                type="button"
                onClick={onCheckIn}
                disabled={checkingIn}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-forest text-[14px] font-semibold text-paper shadow-sm transition-transform active:scale-[0.98] disabled:opacity-60"
              >
                {checkingIn ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                ) : (
                  <Check size={20} />
                )}
                {checkingIn ? "در حال ثبت..." : "ثبت ورود مهمان"}
              </button>
            )}
          </div>

          {!isCheckedIn && !needsReview && !guest.confirmed && (
            <p className="mt-3 text-center text-[10.5px] leading-5 text-ink-soft">
              این مهمان تأیید نهایی نشده است. در صورت نیاز،
              ابتدا وضعیت دعوت را بررسی کنید.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CheckInContent() {
  const params = useParams<{ eventId: string }>();
  const router = useRouter();

  const eventId = params.eventId;

  const event = useMemo(
    () => EVENTS.find((item) => item.id === eventId),
    [eventId],
  );

  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [checkingInId, setCheckingInId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadGuests() {
      setLoading(true);
      setLoadError(null);

      try {
        const res = await fetch(`/api/events/${eventId}/guests`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "خطا در دریافت لیست مهمانان.");
        }

        if (!cancelled) {
          setGuests(data.guests as Guest[]);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            err instanceof Error
              ? err.message
              : "خطا در دریافت لیست مهمانان.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (eventId) loadGuests();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("همه");
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(
    null,
  );

  const [notice, setNotice] = useState<{
    type: "success" | "warning";
    message: string;
  } | null>(null);

  const selectedGuest = useMemo(
    () =>
      guests.find(
        (guest) => guest.id === selectedGuestId,
      ) ?? null,
    [guests, selectedGuestId],
  );

  const filteredGuests = useMemo(() => {
    const normalizedSearch =
      normalizeSearchValue(search);

    return guests.filter((guest) => {
      const matchesSearch =
        !normalizedSearch ||
        normalizeSearchValue(guest.name).includes(
          normalizedSearch,
        ) ||
        guest.phone?.includes(normalizedSearch);

      const matchesFilter =
        filter === "همه" ||
        guest.checkInStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [guests, search, filter]);

  const statistics = useMemo(() => {
    const entered = guests.filter(
      (guest) => guest.checkInStatus === "وارد شده",
    ).length;

    const waiting = guests.filter(
      (guest) => guest.checkInStatus === "منتظر ورود",
    ).length;

    const review = guests.filter(
      (guest) => guest.checkInStatus === "نیازمند بررسی",
    ).length;

    return {
      total: guests.length,
      entered,
      waiting,
      review,
    };
  }, [guests]);

  async function handleCheckIn() {
    if (!selectedGuest) return;

    if (selectedGuest.checkInStatus === "وارد شده") {
      setNotice({
        type: "warning",
        message: "ورود این مهمان قبلاً ثبت شده است.",
      });
      return;
    }

    if (selectedGuest.checkInStatus === "نیازمند بررسی") {
      setNotice({
        type: "warning",
        message: "این مهمان قبل از ورود نیازمند بررسی است.",
      });
      return;
    }

    setCheckingInId(selectedGuest.id);

    try {
      const res = await fetch(
        `/api/events/${eventId}/guests/${selectedGuest.id}/check-in`,
        { method: "POST" },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        setNotice({
          type: "warning",
          message: data.error ?? "ثبت ورود مهمان انجام نشد.",
        });
        // sync with server truth in case another door already checked them in
        if (data.guest) {
          setGuests((current) =>
            current.map((g) => (g.id === selectedGuest.id ? data.guest : g)),
          );
        }
        return;
      }

      setGuests((current) =>
        current.map((g) => (g.id === selectedGuest.id ? data.guest : g)),
      );

      setNotice({
        type: "success",
        message: `ورود «${selectedGuest.name}» با موفقیت ثبت شد.`,
      });

      setSelectedGuestId(null);

      window.setTimeout(() => {
        setNotice(null);
      }, 3500);
    } catch {
      setNotice({
        type: "warning",
        message: "خطا در ارتباط با سرور. دوباره تلاش کنید.",
      });
    } finally {
      setCheckingInId(null);
    }
  }

  function handleReview() {
    if (!selectedGuest) return;

    setNotice({
      type: "warning",
      message: `وضعیت «${selectedGuest.name}» برای بررسی به مسئول مراسم ارجاع شد.`,
    });

    setSelectedGuestId(null);

    window.setTimeout(() => {
      setNotice(null);
    }, 4000);
  }

  if (!event) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-ivory px-5">
        <div className="w-full max-w-md rounded-[var(--radius-xl)] border border-stone/50 bg-paper p-7 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <ShieldAlert size={25} />
          </div>

          <h1 className="mt-4 text-[17px] font-semibold text-ink">
            مراسم پیدا نشد
          </h1>

          <p className="mt-2 text-[12px] leading-6 text-ink-soft">
            مراسم موردنظر وجود ندارد یا دسترسی به آن امکان‌پذیر
            نیست.
          </p>

          <button
            type="button"
            onClick={() => router.push("/guard")}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-forest text-[13px] font-medium text-paper"
          >
            <ArrowRight size={17} />
            بازگشت به انتخاب مراسم
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone/40 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => router.push("/guard")}
              aria-label="بازگشت"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone/50 bg-paper text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowRight size={18} />
            </button>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-ink">
                {event.coupleNames}
              </p>

              <p className="truncate text-[10.5px] text-ink-soft">
                کنترل ورود مهمانان · {event.date}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden rounded-full border border-forest/15 bg-forest/5 px-3 py-2 sm:flex sm:items-center sm:gap-1.5">
              <ShieldCheck
                size={14}
                className="text-forest"
              />

              <span className="text-[10.5px] font-medium text-forest">
                ورودی فعال
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/login?role=guard";
              }}
              aria-label="خروج"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/50 bg-paper text-ink-soft transition-colors hover:text-ink"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-5 md:px-6 md:py-7">
        {/* Page title */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease,
          }}
          className="mb-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-paper">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-[10.5px] font-medium text-gold">
                کنترل ورودی
              </p>

              <h1 className="text-[21px] font-semibold text-ink">
                ثبت ورود مهمانان
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="mb-5 grid grid-cols-3 gap-2.5 md:grid-cols-4 md:gap-3">
          <div className="rounded-[var(--radius-lg)] border border-stone/40 bg-paper px-3 py-3.5 md:px-4">
            <p className="text-[10px] text-ink-soft">
              کل مهمانان
            </p>

            <p className="mt-1 text-[21px] font-semibold text-ink">
              {statistics.total.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-forest/15 bg-forest/5 px-3 py-3.5 md:px-4">
            <p className="text-[10px] text-forest">
              وارد شده
            </p>

            <p className="mt-1 text-[21px] font-semibold text-forest">
              {statistics.entered.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-gold/20 bg-gold/5 px-3 py-3.5 md:px-4">
            <p className="text-[10px] text-gold">
              منتظر ورود
            </p>

            <p className="mt-1 text-[21px] font-semibold text-ink">
              {statistics.waiting.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="hidden rounded-[var(--radius-lg)] border border-red-100 bg-red-50 px-3 py-3.5 md:block md:px-4">
            <p className="text-[10px] text-red-600">
              نیازمند بررسی
            </p>

            <p className="mt-1 text-[21px] font-semibold text-red-700">
              {statistics.review.toLocaleString("fa-IR")}
            </p>
          </div>
        </div>

        {/* Search + filters */}
        <div className="mb-5 rounded-[var(--radius-xl)] border border-stone/45 bg-paper p-3.5 shadow-[var(--shadow-soft)] md:p-4">
          <label className="flex min-h-14 items-center gap-3 rounded-[var(--radius-lg)] border border-stone/50 bg-ivory px-4 transition-colors focus-within:border-forest/40 focus-within:bg-paper">
            <Search
              size={21}
              className="shrink-0 text-forest"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="نام یا شماره موبایل مهمان را جستجو کنید..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-soft/60 md:text-[14px]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="پاک کردن جستجو"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-ink-soft"
              >
                <X size={15} />
              </button>
            )}
          </label>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5">
            {(
              [
                "همه",
                "منتظر ورود",
                "وارد شده",
                "نیازمند بررسی",
              ] as FilterValue[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-medium transition-colors",
                  filter === item
                    ? "border-forest bg-forest text-paper"
                    : "border-stone/45 bg-paper text-ink-soft hover:border-stone hover:text-ink",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main area */}
        <div className="relative">
          <div
            className={cn(
              "transition-[padding] duration-300",
              selectedGuest && "md:pl-[410px]",
            )}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-[14px] font-semibold text-ink">
                  فهرست مهمانان
                </h2>

                <p className="mt-1 text-[10.5px] text-ink-soft">
                  {filteredGuests.length.toLocaleString("fa-IR")} مهمان
                  نمایش داده می‌شود
                </p>
              </div>

              {search && (
                <span className="rounded-full bg-forest/5 px-2.5 py-1 text-[10px] text-forest">
                  نتیجه جستجو
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center gap-3 rounded-[var(--radius-xl)] border border-stone/45 bg-paper px-6 py-16 text-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
                <p className="text-[12px] text-ink-soft">در حال دریافت لیست مهمانان...</p>
              </div>
            ) : loadError ? (
              <div className="rounded-[var(--radius-xl)] border border-red-200 bg-red-50 px-6 py-10 text-center">
                <AlertTriangle size={26} className="mx-auto text-red-600" />
                <p className="mt-3 text-[13px] font-medium text-red-700">{loadError}</p>
              </div>
            ) : filteredGuests.length === 0 ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="rounded-[var(--radius-xl)] border border-stone/45 bg-paper px-6 py-12 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ivory-deep text-ink-soft">
                  <Search size={24} />
                </div>

                <h3 className="mt-4 text-[15px] font-semibold text-ink">
                  مهمانی پیدا نشد
                </h3>

                <p className="mt-2 text-[11.5px] leading-6 text-ink-soft">
                  نام یا شماره موبایل را بررسی کنید و دوباره
                  جستجو کنید.
                </p>

                {(search || filter !== "همه") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setFilter("همه");
                    }}
                    className="mt-4 rounded-full bg-forest px-4 py-2.5 text-[11px] font-medium text-paper"
                  >
                    نمایش همه مهمانان
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="grid gap-2.5 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filteredGuests.map((guest) => (
                    <GuestCard
                      key={guest.id}
                      guest={guest}
                      selected={
                        selectedGuestId === guest.id
                      }
                      onSelect={() =>
                        setSelectedGuestId(guest.id)
                      }
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Desktop overlay */}
          <AnimatePresence>
            {selectedGuest && (
              <>
                <motion.button
                  type="button"
                  aria-label="بستن اطلاعات مهمان"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  onClick={() =>
                    setSelectedGuestId(null)
                  }
                  className="fixed inset-0 z-40 bg-night/15 backdrop-blur-[1px] md:absolute md:inset-y-0 md:right-0 md:left-[390px]"
                />

                <GuestDetails
                  guest={selectedGuest}
                  onClose={() =>
                    setSelectedGuestId(null)
                  }
                  onCheckIn={handleCheckIn}
                  onReview={handleReview}
                  checkingIn={checkingInId === selectedGuest.id}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notice */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            className="fixed bottom-5 left-4 right-4 z-[70] mx-auto max-w-md"
          >
            <div
              className={cn(
                "flex items-start gap-3 rounded-[var(--radius-lg)] border px-4 py-3.5 shadow-lg backdrop-blur-md",
                notice.type === "success"
                  ? "border-forest/20 bg-forest text-paper"
                  : "border-red-200 bg-red-50 text-red-800",
              )}
            >
              {notice.type === "success" ? (
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0"
                />
              )}

              <p className="flex-1 text-[12px] font-medium leading-5">
                {notice.message}
              </p>

              <button
                type="button"
                onClick={() => setNotice(null)}
                className="mt-0.5 opacity-70 transition-opacity hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function GuardCheckInPage() {
  return (
    <AuthGate role="guard">
      <CheckInContent />
    </AuthGate>
  );
}