import { routeHandler, trackPageView } from "@repo/api";

function getDeviceType(ua: string) {
  const value = ua.toLowerCase();
  if (/ipad|tablet/.test(value)) return "tablet" as const;
  if (/iphone|android|mobile|mobi/.test(value)) return "mobile" as const;
  return "desktop" as const;
}

function normalizeBodyDeviceType(value: unknown) {
  if (value === "mobile" || value === "desktop" || value === "tablet") {
    return value;
  }
  return undefined;
}

function getReferrerSource(referrer: string) {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    return host || "direct";
  } catch {
    return "direct";
  }
}

export const POST = async (request: Request) =>
  routeHandler(async () => {
    const body = await request.json().catch(() => ({} as { path?: string; deviceType?: unknown }));
    const path = typeof body.path === "string" ? body.path : "/";
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    await trackPageView({
      path,
      deviceType: normalizeBodyDeviceType(body.deviceType) || getDeviceType(userAgent),
      referrerSource: getReferrerSource(referrer),
    });

    return { ok: true };
  });
