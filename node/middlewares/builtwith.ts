export async function builtwithMiddleware(
  context: Context,
  next: () => Promise<unknown>
) {
  const { clients, body, app, vtex, search } = context

  console.log({ body, app, vtex, search })

  context.status = 200
  context.body = await clients.builtwith.getBuiltWith()
  context.set('cache-control', 'no-cache')

  await next()
}
