import { json } from "co-body";

export async function builtwithMiddleware(
  context: Context,
  next: () => Promise<unknown>
) {
  const { clients } = context
  // const appId = process.env.VTEX_APP_ID || "";
  // const config = await context.clients.apps.getAppSettings(appId)
  const body = await json(context.req)



  context.status = 200
  context.body = await clients.builtwith.getBuiltWith(body)
  context.set('cache-control', 'no-cache')

  await next()
}
