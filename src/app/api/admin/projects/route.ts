import { createProject, listProjects, routeHandler } from "@repo/api";

export const GET = () => routeHandler(async () => listProjects());

export async function POST(req: Request) {
  return routeHandler(async () => {
    const body = await req.json();
    return createProject(body);
  });
}
