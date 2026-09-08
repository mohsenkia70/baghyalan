import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/server/session";

const ADMIN_PREFIX = "/admin";

const CUSTOMER_PATHS = [
  "/khane",
  "/emarat",
  "/emkanat",
  "/gallery",
  "/ideas",
  "/barname-rizi",
  "/pakijha",
  "/pakij-shakhsi",
  "/menu",
  "/tarikh",
  "/bazdid",
  "/dashboard",
  "/naghshe",
  "/zoj-ha",
  "/soalat",
  "/profile",
  "/pardakht",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPath =
    pathname.startsWith(ADMIN_PREFIX);

  const isCustomerPath =
    CUSTOMER_PATHS.some(
      (path) =>
        pathname === path ||
        pathname.startsWith(`${path}/`)
    );

  /**
   * مسیرهایی که توسط Proxy محافظت نمی‌شوند
   */
  if (!isAdminPath && !isCustomerPath) {
    return NextResponse.next();
  }

  /**
   * دریافت Session Token
   */
  const token =
    request.cookies.get(SESSION_COOKIE)?.value;

  /**
   * اگر Token وجود نداشته باشد،
   * اصلاً verifySessionToken را صدا نمی‌زنیم.
   */
  if (!token) {
    const url = request.nextUrl.clone();

    url.pathname = "/login";

    const requiredRole = isAdminPath
      ? "admin"
      : "customer";

    url.search =
      `?role=${requiredRole}` +
      `&next=${encodeURIComponent(pathname)}`;

    return NextResponse.redirect(url);
  }

  /**
   * در این مرحله token حتماً string است.
   */
  const session = verifySessionToken(token);

  const requiredRole = isAdminPath
    ? "admin"
    : "customer";

  /**
   * Session نامعتبر یا Role اشتباه
   */
  if (
    !session ||
    session.role !== requiredRole
  ) {
    const url = request.nextUrl.clone();

    url.pathname = "/login";

    url.search =
      `?role=${requiredRole}` +
      `&next=${encodeURIComponent(pathname)}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",

    "/khane/:path*",
    "/emarat/:path*",
    "/emkanat/:path*",
    "/gallery/:path*",
    "/ideas/:path*",
    "/barname-rizi/:path*",
    "/pakijha/:path*",
    "/pakij-shakhsi/:path*",
    "/menu/:path*",
    "/tarikh/:path*",
    "/bazdid/:path*",
    "/dashboard/:path*",
    "/naghshe/:path*",
    "/zoj-ha/:path*",
    "/soalat/:path*",
    "/profile/:path*",
    "/pardakht/:path*",
  ],
};