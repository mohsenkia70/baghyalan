import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/server/session";

import { TEST_USERS } from "@/lib/mock-data/auth";

import {
  deleteGuest,
  getGuest,
  hasEvent,
  updateGuest,
} from "@/lib/server/guest-store";

import type {
  GuestGroup,
  GuestCheckInStatus,
} from "@/lib/types";

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

  return user ?? null;
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      eventId: string;
      guestId: string;
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
          error: "فقط مدیر مجموعه می‌تواند اطلاعات مهمان را ویرایش کند.",
        },
        {
          status: 403,
        }
      );
    }

    const { eventId, guestId } = await context.params;

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

    const existingGuest = getGuest(
      eventId,
      guestId
    );

    if (!existingGuest) {
      return NextResponse.json(
        {
          error: "مهمان موردنظر پیدا نشد.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const updates: Record<string, unknown> = {};

    if (body.name !== undefined) {
      const name = normalizeText(body.name);

      if (!name) {
        return NextResponse.json(
          {
            error: "نام مهمان نمی‌تواند خالی باشد.",
          },
          {
            status: 400,
          }
        );
      }

      updates.name = name;
    }

    if (body.phone !== undefined) {
      const phone = normalizeText(body.phone);

      updates.phone = phone || undefined;
    }

    if (body.group !== undefined) {
      const group = normalizeText(
        body.group
      ) as GuestGroup;

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

      updates.group = group;
    }

    if (body.companions !== undefined) {
      const companions = Number(
        body.companions
      );

      if (
        !Number.isInteger(companions) ||
        companions < 0
      ) {
        return NextResponse.json(
          {
            error: "تعداد همراهان نامعتبر است.",
          },
          {
            status: 400,
          }
        );
      }

      updates.companions = companions;
    }

    if (body.confirmed !== undefined) {
      updates.confirmed = Boolean(
        body.confirmed
      );

      if (!body.confirmed) {
        updates.checkInStatus =
          "نیازمند بررسی" satisfies GuestCheckInStatus;
      } else if (
        existingGuest.checkInStatus ===
        "نیازمند بررسی"
      ) {
        updates.checkInStatus =
          "منتظر ورود" satisfies GuestCheckInStatus;
      }
    }

    const updatedGuest = updateGuest(
      eventId,
      guestId,
      updates
    );

    return NextResponse.json({
      success: true,
      guest: updatedGuest,
    });
  } catch (error) {
    console.error("PATCH guest error:", error);

    return NextResponse.json(
      {
        error: "خطا در ویرایش اطلاعات مهمان.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: {
    params: Promise<{
      eventId: string;
      guestId: string;
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
          error: "فقط مدیر مجموعه می‌تواند مهمان را حذف کند.",
        },
        {
          status: 403,
        }
      );
    }

    const { eventId, guestId } = await context.params;

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

    const guest = getGuest(
      eventId,
      guestId
    );

    if (!guest) {
      return NextResponse.json(
        {
          error: "مهمان موردنظر پیدا نشد.",
        },
        {
          status: 404,
        }
      );
    }

    if (guest.checkInStatus === "وارد شده") {
      return NextResponse.json(
        {
          error:
            "مهمانی که ورودش ثبت شده است قابل حذف نیست.",
        },
        {
          status: 409,
        }
      );
    }

    const deleted = deleteGuest(
      eventId,
      guestId
    );

    if (!deleted) {
      return NextResponse.json(
        {
          error: "حذف مهمان انجام نشد.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      guestId,
    });
  } catch (error) {
    console.error("DELETE guest error:", error);

    return NextResponse.json(
      {
        error: "خطا در حذف مهمان.",
      },
      {
        status: 500,
      }
    );
  }
}