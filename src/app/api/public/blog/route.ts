import { listBlogs, routeHandler } from "@repo/api";

export const GET = () => routeHandler(async () => listBlogs());
