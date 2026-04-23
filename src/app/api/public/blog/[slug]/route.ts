import { getBlogBySlug, routeHandler } from "@repo/api";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  return routeHandler(async () => getBlogBySlug(slug));
}
