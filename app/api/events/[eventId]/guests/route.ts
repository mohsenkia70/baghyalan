import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/server/session";

import { TEST_USERS } from "@/lib/mock-data/auth";
import {
  createGuest,
  getGuests,
  hasEvent,
} from "@/lib/server/guest-store";

import type {
  Guest,
  GuestGroup,
} from "@/lib/types";

const ALLOWED_ROLES = ["admin", "guard"] as const;

async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);

  if (!payload) {
    return null;
  }

  const user = TEST_USERS.find(
    (item) => item.id === payload.uid
  );

  if (!user) {
    return null;
  }

  if (!ALLOWED_ROLES.includes(user.role as (typeof ALLOWED_ROLES)[number])) {
    return null;
  }

  return user;
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      eventId: string;
    }>;
  }
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        }
      );
    }

    const { eventId } = await context.params;

    if (!hasEvent(eventId)) {
      return NextResponse.json(
        {
          error: "مراسم موردنظر پیدا نشد.",
        },
        {
          status: 404,
        }
      );
    }

    const guests = getGuests(eventId) ?? [];

    const searchParams = request.nextUrl.searchParams;

    const search = normalizeText(
      searchParams.get("search")
    ).toLowerCase();

    const status = normalizeText(
      searchParams.get("status")
    );

    const group = normalizeText(
      searchParams.get("group")
    );

    let filteredGuests = guests;

    if (search) {
      filteredGuests = filteredGuests.filter((guest) => {
        const name = guest.name.toLowerCase();
        const phone = guest.phone?.toLowerCase() ?? "";

        return (
          name.includes(search) ||
          phone.includes(search)
        );
      });
    }

    if (status) {
      filteredGuests = filteredGuests.filter(
        (guest) => guest.checkInStatus === status
      );
    }

    if (group) {
      filteredGuests = filteredGuests.filter(
        (guest) => guest.group === (group as GuestGroup)
      );
    }

    return NextResponse.json({
      success: true,
      eventId,
      count: filteredGuests.length,
      guests: filteredGuests,
    });
  } catch (error) {
    console.error("GET guests error:", error);

    return NextResponse.json(
      {
        error: "خطا در دریافت لیست مهمانان.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: {
    params: Promise<{
      eventId: string;
    }>;
  }
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          error: "فقط مدیر مجموعه می‌تواند مهمان جدید ثبت کند.",
        },
        {
          status: 403,
        }
      );
    }

    const { eventId } = await context.params;

    if (!hasEvent(eventId)) {
      return NextResponse.json(
        {
          error: "مراسم موردنظر پیدا نشد.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const name = normalizeText(body.name);
    const phone = normalizeText(body.phone);
    const group = normalizeText(body.group) as GuestGroup;

    const companions = Number(body.companions ?? 0);
    const confirmed = Boolean(body.confirmed ?? true);

    if (!name) {
      return NextResponse.json(
        {
          error: "نام مهمان الزامی است.",
        },
        {
          status: 400,
        }
      );
    }

    if (!group) {
      return NextResponse.json(
        {
          error: "گروه مهمان الزامی است.",
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isInteger(companions) || companions < 0) {
      return NextResponse.json(
        {
          error: "تعداد همراهان نامعتبر است.",
        },
        {
          status: 400,
        }
      );
    }

    const validGroups: GuestGroup[] = [
      "خانواده عروس",
      "خانواده داماد",
      "دوستان",
      "همکاران",
    ];

    if (!validGroups.includes(group)) {
      return NextResponse.json(
        {
          error: "گروه مهمان نامعتبر است.",
        },
        {
          status: 400,
        }
      );
    }

    const guest: Guest = {
      id: `guest-${eventId}-${Date.now()}`,
      name,
      phone: phone || undefined,
      group,
      companions,
      confirmed,
      checkInStatus: confirmed
        ? "منتظر ورود"
        : "نیازمند بررسی",
    };

    const createdGuest = createGuest(
      eventId,
      guest
    );

    return NextResponse.json(
      {
        success: true,
        guest: createdGuest,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST guest error:", error);

    return NextResponse.json(
      {
        error: "خطا در ثبت مهمان.",
      },
      {
        status: 500,
      }
    );
  }
}