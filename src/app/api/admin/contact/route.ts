import { getContact, routeHandler, upsertContact } from "@repo/api";

export const GET = () => routeHandler(async () => getContact());

export async function PATCH(req: Request) {
  return routeHandler(async () => {
    const body = await req.json();
    return upsertContact(body);
  });
}
