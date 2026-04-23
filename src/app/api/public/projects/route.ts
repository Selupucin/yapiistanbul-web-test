import { listProjects, routeHandler } from "@repo/api";

export const GET = () => routeHandler(async () => listProjects());
