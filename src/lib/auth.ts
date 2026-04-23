import { cookies } from "next/headers";
import { ADMIN_AUTH_COOKIE, verifyAdminToken } from "@repo/api";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}
