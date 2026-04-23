import { ADMIN_AUTH_COOKIE, loginAdmin, loginSchema } from "@repo/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.parse(body);
    const { token, username } = await loginAdmin(parsed.username, parsed.password);

    const res = NextResponse.json({ ok: true, data: { username } });
    res.cookies.set(ADMIN_AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ ok: false, message }, { status: 401 });
  }
}
