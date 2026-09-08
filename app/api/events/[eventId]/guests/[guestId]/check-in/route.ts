import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/server/session";

import { TEST_USERS } from "@/lib/mock-data/auth";

import {
  checkInGuest,
  getGuest,
  hasEvent,
} from "@/lib/server/guest-store";

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

  if (
    user.role !== "guard" &&
    user.role !== "admin"
  ) {
    return null;
  }

  return user;
}

function getCurrentPersianTime(): string {
  return new Intl.DateTimeFormat(
    "fa-IR",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date());
}

export async function POST(
  _request: Request,
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
          success: false,
          error: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        }
      );
    }

    const { eventId, guestId } = await context.params;

    if (!hasEvent(eventId)) {
      return NextResponse.json(
        {
          success: false,
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
          success: false,
          error: "مهمان موردنظر پیدا نشد.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      guest.checkInStatus ===
      "وارد شده"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "ALREADY_CHECKED_IN",
          error:
            "ورود این مهمان قبلاً ثبت شده است.",
          guest,
        },
        {
          status: 409,
        }
      );
    }

    if (
      !guest.confirmed ||
      guest.checkInStatus ===
        "نیازمند بررسی"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "GUEST_NEEDS_REVIEW",
          error:
            "ورود این مهمان نیازمند بررسی مدیر مجموعه است.",
          guest,
        },
        {
          status: 409,
        }
      );
    }

    const checkedInGuest = checkInGuest(
      eventId,
      guestId,
      user.id,
      getCurrentPersianTime()
    );

    if (!checkedInGuest) {
      return NextResponse.json(
        {
          success: false,
          error:
            "ثبت ورود مهمان انجام نشد.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "ورود مهمان با موفقیت ثبت شد.",
      guest: checkedInGuest,
    });
  } catch (error) {
    console.error(
      "POST guest check-in error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "خطا در ثبت ورود مهمان.",
      },
      {
        status: 500,
      }
    );
  }
}