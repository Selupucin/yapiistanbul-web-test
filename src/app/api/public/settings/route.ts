import { getSettings, routeHandler } from "@repo/api";

export const GET = () => routeHandler(async () => getSettings());
