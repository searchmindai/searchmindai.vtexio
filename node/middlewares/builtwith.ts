export async function builtwithMiddleware(
  context: Context,
  next: () => Promise<unknown>
) {
  const { clients } = context

  context.status = 200
  context.body = await clients.builtwith.getBuiltWith('jumbo.cl')
  context.set('cache-control', 'no-cache')

  await next()
}
