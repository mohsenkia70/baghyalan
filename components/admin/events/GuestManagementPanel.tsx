"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Pencil,
  Plus,
  Search,
  ShieldAlert,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { EVENTS } from "@/lib/mock-data/events";
import type {
  Guest,
  GuestCheckInStatus,
  GuestGroup,
} from "@/lib/types";
import { cn } from "@/lib/utils/cn";

const ease = [0.16, 1, 0.3, 1] as const;

const GROUPS: GuestGroup[] = [
  "خانواده عروس",
  "خانواده داماد",
  "دوستان",
  "همکاران",
];

const STATUSES: GuestCheckInStatus[] = [
  "منتظر ورود",
  "وارد شده",
  "نیازمند بررسی",
];

type GuestFormState = {
  name: string;
  phone: string;
  group: GuestGroup;
  companions: string;
  confirmed: boolean;
  checkInStatus: GuestCheckInStatus;
};

const EMPTY_FORM: GuestFormState = {
  name: "",
  phone: "",
  group: "خانواده عروس",
  companions: "0",
  confirmed: true,
  checkInStatus: "منتظر ورود",
};

function normalizeSearchValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/\s+/g, " ");
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

function getStatusClass(status: GuestCheckInStatus) {
  switch (status) {
    case "وارد شده":
      return "border-forest/20 bg-forest/10 text-forest";

    case "نیازمند بررسی":
      return "border-red-200 bg-red-50 text-red-700";

    case "منتظر ورود":
    default:
      return "border-gold/20 bg-gold/10 text-gold";
  }
}

function StatusIcon({
  status,
}: {
  status: GuestCheckInStatus;
}) {
  if (status === "وارد شده") {
    return <CheckCircle2 size={14} />;
  }

  if (status === "نیازمند بررسی") {
    return <ShieldAlert size={14} />;
  }

  return <Clock3 size={14} />;
}

function StatusBadge({
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
      <StatusIcon status={status} />
      {status}
    </span>
  );
}

function GuestModal({
  guest,
  onClose,
  onSave,
}: {
  guest: Guest | null;
  onClose: () => void;
  onSave: (form: GuestFormState) => void;
}) {
  const [form, setForm] = useState<GuestFormState>(() => {
    if (!guest) {
      return EMPTY_FORM;
    }

    return {
      name: guest.name,
      phone: guest.phone ?? "",
      group: guest.group,
      companions: String(guest.companions),
      confirmed: guest.confirmed,
      checkInStatus: guest.checkInStatus,
    };
  });

  const isEditing = Boolean(guest);

  function updateForm<K extends keyof GuestFormState>(
    key: K,
    value: GuestFormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-night/30 p-0 backdrop-blur-sm md:items-center md:p-5">
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-[28px] border border-stone/50 bg-paper shadow-2xl md:max-w-lg md:rounded-[24px]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone/40 bg-paper/95 px-5 py-4 backdrop-blur-md">
          <div>
            <p className="text-[15px] font-semibold text-ink">
              {isEditing
                ? "ویرایش مهمان"
                : "افزودن مهمان"}
            </p>

            <p className="mt-1 text-[10.5px] text-ink-soft">
              اطلاعات موردنیاز برای مدیریت ورود مهمان
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-deep text-ink-soft"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-ink">
                نام مهمان
              </label>

              <input
                autoFocus
                value={form.name}
                onChange={(event) =>
                  updateForm("name", event.target.value)
                }
                placeholder="مثلاً سارا محمودی"
                className="h-12 w-full rounded-[var(--radius-md)] border border-stone/50 bg-ivory px-4 text-[13px] text-ink outline-none transition-colors focus:border-forest/40"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-ink">
                شماره موبایل
              </label>

              <input
                dir="ltr"
                value={form.phone}
                onChange={(event) =>
                  updateForm("phone", event.target.value)
                }
                inputMode="tel"
                placeholder="09xxxxxxxxx"
                className="h-12 w-full rounded-[var(--radius-md)] border border-stone/50 bg-ivory px-4 text-left text-[13px] text-ink outline-none transition-colors focus:border-forest/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-ink">
                  گروه مهمان
                </label>

                <select
                  value={form.group}
                  onChange={(event) =>
                    updateForm(
                      "group",
                      event.target.value as GuestGroup,
                    )
                  }
                  className="h-12 w-full appearance-none rounded-[var(--radius-md)] border border-stone/50 bg-ivory px-3 text-[12px] text-ink outline-none focus:border-forest/40"
                >
                  {GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-ink">
                  تعداد همراه
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.companions}
                  onChange={(event) =>
                    updateForm(
                      "companions",
                      event.target.value,
                    )
                  }
                  className="h-12 w-full rounded-[var(--radius-md)] border border-stone/50 bg-ivory px-4 text-[13px] text-ink outline-none focus:border-forest/40"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-ink">
                وضعیت ورود
              </label>

              <select
                value={form.checkInStatus}
                onChange={(event) =>
                  updateForm(
                    "checkInStatus",
                    event.target.value as GuestCheckInStatus,
                  )
                }
                className="h-12 w-full appearance-none rounded-[var(--radius-md)] border border-stone/50 bg-ivory px-3 text-[12px] text-ink outline-none focus:border-forest/40"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex cursor-pointer items-center justify-between rounded-[var(--radius-md)] border border-stone/40 bg-ivory px-4 py-3.5">
              <div>
                <p className="text-[12px] font-medium text-ink">
                  دعوت تأیید شده
                </p>

                <p className="mt-0.5 text-[10px] text-ink-soft">
                  مهمان اجازه ورود عادی دارد
                </p>
              </div>

              <input
                type="checkbox"
                checked={form.confirmed}
                onChange={(event) =>
                  updateForm(
                    "confirmed",
                    event.target.checked,
                  )
                }
                className="h-5 w-5 accent-forest"
              />
            </label>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-12 rounded-[var(--radius-pill)] border border-stone/50 bg-paper text-[12px] font-medium text-ink-soft"
            >
              انصراف
            </button>

            <button
              type="submit"
              className="flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-forest text-[12px] font-medium text-paper"
            >
              <Check size={17} />
              {isEditing ? "ذخیره تغییرات" : "افزودن مهمان"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function DeleteModal({
  guest,
  onClose,
  onConfirm,
}: {
  guest: Guest;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-night/30 p-5 backdrop-blur-sm">
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="w-full max-w-sm rounded-[24px] border border-stone/50 bg-paper p-6 shadow-2xl"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 size={23} />
        </div>

        <h3 className="mt-4 text-center text-[16px] font-semibold text-ink">
          حذف مهمان
        </h3>

        <p className="mt-2 text-center text-[11.5px] leading-6 text-ink-soft">
          آیا از حذف «{guest.name}» از لیست مهمانان مطمئن
          هستید؟
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-full border border-stone/50 text-[12px] text-ink-soft"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 rounded-full bg-red-600 text-[12px] font-medium text-paper"
          >
            حذف مهمان
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function GuestManagementPanel({
  eventId,
}: {
  eventId: string;
}) {
  const event = EVENTS.find(
    (item) => item.id === eventId,
  );

  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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

        if (!cancelled) setGuests(data.guests as Guest[]);
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
  const [statusFilter, setStatusFilter] =
    useState<GuestCheckInStatus | "همه">("همه");

  const [groupFilter, setGroupFilter] =
    useState<GuestGroup | "همه">("همه");

  const [modalMode, setModalMode] = useState<
    "create" | "edit" | null
  >(null);

  const [editingGuest, setEditingGuest] =
    useState<Guest | null>(null);

  const [deletingGuest, setDeletingGuest] =
    useState<Guest | null>(null);

  const [notice, setNotice] = useState<string | null>(
    null,
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

      const matchesStatus =
        statusFilter === "همه" ||
        guest.checkInStatus === statusFilter;

      const matchesGroup =
        groupFilter === "همه" ||
        guest.group === groupFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesGroup
      );
    });
  }, [
    guests,
    search,
    statusFilter,
    groupFilter,
  ]);

  const statistics = useMemo(() => {
    const entered = guests.filter(
      (guest) => guest.checkInStatus === "وارد شده",
    ).length;

    const waiting = guests.filter(
      (guest) => guest.checkInStatus === "منتظر ورود",
    ).length;

    const review = guests.filter(
      (guest) =>
        guest.checkInStatus === "نیازمند بررسی",
    ).length;

    const confirmed = guests.filter(
      (guest) => guest.confirmed,
    ).length;

    return {
      total: guests.length,
      entered,
      waiting,
      review,
      confirmed,
    };
  }, [guests]);

  function showNotice(message: string) {
    setNotice(message);

    window.setTimeout(() => {
      setNotice(null);
    }, 3000);
  }

  function handleOpenCreate() {
    setEditingGuest(null);
    setModalMode("create");
  }

  function handleOpenEdit(guest: Guest) {
    setEditingGuest(guest);
    setModalMode("edit");
  }

  async function handleSave(form: GuestFormState) {
    const companions = Math.max(
      0,
      Number.parseInt(form.companions, 10) || 0,
    );

    setSaving(true);

    try {
      if (modalMode === "create") {
        const res = await fetch(`/api/events/${eventId}/guests`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            phone: form.phone.trim() || undefined,
            group: form.group,
            companions,
            confirmed: form.confirmed,
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          showNotice(data.error ?? "افزودن مهمان انجام نشد.");
          return;
        }

        setGuests((current) => [data.guest as Guest, ...current]);
        showNotice(`مهمان «${data.guest.name}» با موفقیت اضافه شد.`);
      }

      if (modalMode === "edit" && editingGuest) {
        const res = await fetch(
          `/api/events/${eventId}/guests/${editingGuest.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.name.trim(),
              phone: form.phone.trim() || undefined,
              group: form.group,
              companions,
              confirmed: form.confirmed,
            }),
          },
        );
        const data = await res.json();

        if (!res.ok) {
          showNotice(data.error ?? "به‌روزرسانی مهمان انجام نشد.");
          return;
        }

        setGuests((current) =>
          current.map((guest) =>
            guest.id === editingGuest.id ? (data.guest as Guest) : guest,
          ),
        );
        showNotice(`اطلاعات «${form.name.trim()}» به‌روزرسانی شد.`);
      }

      setModalMode(null);
      setEditingGuest(null);
    } catch {
      showNotice("خطا در ارتباط با سرور. دوباره تلاش کنید.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingGuest) return;

    try {
      const res = await fetch(
        `/api/events/${eventId}/guests/${deletingGuest.id}`,
        { method: "DELETE" },
      );
      const data = await res.json();

      if (!res.ok) {
        showNotice(data.error ?? "حذف مهمان انجام نشد.");
        return;
      }

      setGuests((current) =>
        current.filter((guest) => guest.id !== deletingGuest.id),
      );
      showNotice(`مهمان «${deletingGuest.name}» حذف شد.`);
    } catch {
      showNotice("خطا در ارتباط با سرور. دوباره تلاش کنید.");
    } finally {
      setDeletingGuest(null);
    }
  }

  if (!event) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-stone/50 bg-paper p-8 text-center">
        <ShieldAlert
          size={30}
          className="mx-auto text-red-600"
        />

        <h1 className="mt-4 text-[17px] font-semibold text-ink">
          مراسم پیدا نشد
        </h1>

        <p className="mt-2 text-[12px] text-ink-soft">
          اطلاعات مراسم موردنظر در دسترس نیست.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
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
        className="mb-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] text-ink-soft">
              <span>مراسم‌ها</span>

              <ChevronRight size={13} />

              <span>{event.coupleNames}</span>

              <ChevronRight size={13} />

              <span className="text-forest">
                مهمانان
              </span>
            </div>

            <h1 className="text-[24px] font-semibold tracking-tight text-ink md:text-[28px]">
              مدیریت مهمانان
            </h1>

            <p className="mt-1.5 text-[12px] text-ink-soft">
              {event.coupleNames} · {event.date}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-forest px-5 text-[12.5px] font-medium text-paper shadow-sm transition-transform active:scale-[0.98]"
          >
            <Plus size={18} />
            افزودن مهمان
          </button>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <div className="rounded-[var(--radius-lg)] border border-stone/45 bg-paper p-4">
          <div className="flex items-center gap-2 text-ink-soft">
            <Users size={15} />

            <span className="text-[10.5px]">
              کل مهمانان
            </span>
          </div>

          <p className="mt-2 text-[23px] font-semibold text-ink">
            {statistics.total.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-forest/15 bg-forest/5 p-4">
          <div className="flex items-center gap-2 text-forest">
            <CheckCircle2 size={15} />

            <span className="text-[10.5px]">
              وارد شده
            </span>
          </div>

          <p className="mt-2 text-[23px] font-semibold text-forest">
            {statistics.entered.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-gold/20 bg-gold/5 p-4">
          <div className="flex items-center gap-2 text-gold">
            <Clock3 size={15} />

            <span className="text-[10.5px]">
              منتظر ورود
            </span>
          </div>

          <p className="mt-2 text-[23px] font-semibold text-ink">
            {statistics.waiting.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-red-100 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-600">
            <ShieldAlert size={15} />

            <span className="text-[10.5px]">
              نیازمند بررسی
            </span>
          </div>

          <p className="mt-2 text-[23px] font-semibold text-red-700">
            {statistics.review.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-stone/45 bg-paper p-4">
          <div className="flex items-center gap-2 text-ink-soft">
            <Check size={15} />

            <span className="text-[10.5px]">
              تأیید شده
            </span>
          </div>

          <p className="mt-2 text-[23px] font-semibold text-ink">
            {statistics.confirmed.toLocaleString("fa-IR")}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 rounded-[var(--radius-xl)] border border-stone/45 bg-paper p-4 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-[var(--radius-md)] border border-stone/45 bg-ivory px-4 focus-within:border-forest/40">
            <Search
              size={18}
              className="shrink-0 text-forest"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="جستجوی نام یا شماره موبایل..."
              className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft/60"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-ink-soft"
              >
                <X size={15} />
              </button>
            )}
          </label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | GuestCheckInStatus
                  | "همه",
              )
            }
            className="min-h-12 rounded-[var(--radius-md)] border border-stone/45 bg-ivory px-4 text-[11.5px] text-ink outline-none lg:w-48"
          >
            <option value="همه">
              همه وضعیت‌ها
            </option>

            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={groupFilter}
            onChange={(event) =>
              setGroupFilter(
                event.target.value as
                  | GuestGroup
                  | "همه",
              )
            }
            className="min-h-12 rounded-[var(--radius-md)] border border-stone/45 bg-ivory px-4 text-[11.5px] text-ink outline-none lg:w-48"
          >
            <option value="همه">
              همه گروه‌ها
            </option>

            {GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Guest table */}
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-stone/45 bg-paper shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between border-b border-stone/40 px-5 py-4">
          <div>
            <h2 className="text-[14px] font-semibold text-ink">
              لیست مهمانان
            </h2>

            <p className="mt-1 text-[10.5px] text-ink-soft">
              {filteredGuests.length.toLocaleString("fa-IR")} نتیجه
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
            <p className="text-[12px] text-ink-soft">در حال دریافت لیست مهمانان...</p>
          </div>
        ) : loadError ? (
          <div className="px-6 py-14 text-center">
            <AlertTriangle size={26} className="mx-auto text-red-600" />
            <p className="mt-3 text-[13px] font-medium text-red-700">{loadError}</p>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ivory-deep text-ink-soft">
              <Search size={23} />
            </div>

            <h3 className="mt-4 text-[15px] font-semibold text-ink">
              مهمانی پیدا نشد
            </h3>

            <p className="mt-2 text-[11px] text-ink-soft">
              فیلترها یا عبارت جستجو را تغییر دهید.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-right">
                <thead>
                  <tr className="border-b border-stone/40 bg-ivory-deep/20">
                    <th className="px-5 py-3 text-[10.5px] font-medium text-ink-soft">
                      مهمان
                    </th>

                    <th className="px-5 py-3 text-[10.5px] font-medium text-ink-soft">
                      گروه
                    </th>

                    <th className="px-5 py-3 text-[10.5px] font-medium text-ink-soft">
                      همراه
                    </th>

                    <th className="px-5 py-3 text-[10.5px] font-medium text-ink-soft">
                      دعوت
                    </th>

                    <th className="px-5 py-3 text-[10.5px] font-medium text-ink-soft">
                      وضعیت ورود
                    </th>

                    <th className="px-5 py-3 text-[10.5px] font-medium text-ink-soft">
                      عملیات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr
                      key={guest.id}
                      className="border-b border-stone/30 last:border-b-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-ink-soft">
                            <UserRound size={17} />
                          </div>

                          <div>
                            <p className="text-[12.5px] font-medium text-ink">
                              {guest.name}
                            </p>

                            {guest.phone && (
                              <p
                                dir="ltr"
                                className="mt-1 text-left text-[10px] text-ink-soft"
                              >
                                {guest.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[10px] font-medium",
                            getGroupClass(
                              guest.group,
                            ),
                          )}
                        >
                          {guest.group}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-[11.5px] text-ink">
                        {guest.companions.toLocaleString(
                          "fa-IR",
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "text-[11px] font-medium",
                            guest.confirmed
                              ? "text-forest"
                              : "text-red-600",
                          )}
                        >
                          {guest.confirmed
                            ? "تأیید شده"
                            : "تأیید نشده"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={
                            guest.checkInStatus
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenEdit(
                                guest,
                              )
                            }
                            aria-label="ویرایش"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone/40 text-ink-soft transition-colors hover:border-forest/30 hover:text-forest"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeletingGuest(
                                guest,
                              )
                            }
                            aria-label="حذف"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-100 text-red-500 transition-colors hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-stone/30 md:hidden">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-ink-soft">
                      <UserRound size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-ink">
                            {guest.name}
                          </p>

                          {guest.phone && (
                            <p
                              dir="ltr"
                              className="mt-1 text-right text-[10px] text-ink-soft"
                            >
                              {guest.phone}
                            </p>
                          )}
                        </div>

                        <StatusBadge
                          status={
                            guest.checkInStatus
                          }
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[9.5px] font-medium",
                            getGroupClass(
                              guest.group,
                            ),
                          )}
                        >
                          {guest.group}
                        </span>

                        <span className="rounded-full bg-ivory-deep px-2.5 py-1 text-[9.5px] text-ink-soft">
                          {guest.companions.toLocaleString(
                            "fa-IR",
                          )}{" "}
                          همراه
                        </span>

                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[9.5px]",
                            guest.confirmed
                              ? "bg-forest/5 text-forest"
                              : "bg-red-50 text-red-600",
                          )}
                        >
                          {guest.confirmed
                            ? "تأیید شده"
                            : "تأیید نشده"}
                        </span>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEdit(
                              guest,
                            )
                          }
                          className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-stone/40 text-[10.5px] text-ink-soft"
                        >
                          <Pencil size={13} />
                          ویرایش
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeletingGuest(
                              guest,
                            )
                          }
                          className="flex min-h-10 w-11 items-center justify-center rounded-full border border-red-100 text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modalMode && (
          <GuestModal
            guest={
              modalMode === "edit"
                ? editingGuest
                : null
            }
            onClose={() => {
              setModalMode(null);
              setEditingGuest(null);
            }}
            onSave={handleSave}
          />
        )}

        {deletingGuest && (
          <DeleteModal
            guest={deletingGuest}
            onClose={() =>
              setDeletingGuest(null)
            }
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>

      {/* Notice */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.97,
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
            className="fixed bottom-5 left-4 right-4 z-[150] mx-auto max-w-md"
          >
            <div className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-forest px-4 py-3.5 text-paper shadow-xl">
              <CheckCircle2
                size={19}
                className="shrink-0"
              />

              <p className="flex-1 text-[11.5px] font-medium">
                {notice}
              </p>

              <button
                type="button"
                onClick={() => setNotice(null)}
                className="opacity-70 hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}