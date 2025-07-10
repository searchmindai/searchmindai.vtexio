import { json } from "co-body";

export async function searchmindaiMiddleware(context: Context, next: () => Promise<unknown>) {
  const { clients, req } = context;
  const appId = process.env.VTEX_APP_ID || "";
  const config = await context.clients.apps.getAppSettings(appId);
  const body = await json(req);

  context.status = 200;
  context.body = await clients.searchmindai.getSearchMind({ body, config });
  context.set("cache-control", "no-cache");

  await next();
}
