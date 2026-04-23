import { getContact, routeHandler } from "@repo/api";

export const GET = () => routeHandler(async () => getContact());
