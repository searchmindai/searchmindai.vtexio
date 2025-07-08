export async function infoClientMiddleware(
  context: Context,
  next: () => Promise<unknown>
) {
  const { clients, path } = context;

  const id = path.split("/").pop();

  if (!id) {
    context.status = 400;
    context.body = "Missing client ID";
    return;
  }

  context.status = 200;
  context.body = await clients.infoclient.getInfo(id);
  context.set("cache-control", "no-cache");

  await next();
}
