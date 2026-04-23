import { createBlog, listBlogs, routeHandler } from "@repo/api";

export const GET = () => routeHandler(async () => listBlogs());

export async function POST(req: Request) {
  return routeHandler(async () => {
    const body = await req.json();
    return createBlog(body);
  });
}
