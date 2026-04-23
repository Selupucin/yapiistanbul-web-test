import { getSettings, routeHandler, upsertSettings } from "@repo/api";

export const GET = () => routeHandler(async () => getSettings());

export async function PATCH(req: Request) {
  return routeHandler(async () => {
    const body = await req.json();
    return upsertSettings(body);
  });
}
