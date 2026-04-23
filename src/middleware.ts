import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_AUTH_COOKIE = "yi_admin_token";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/api/admin/auth/login") {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/api/admin/auth/logout") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
