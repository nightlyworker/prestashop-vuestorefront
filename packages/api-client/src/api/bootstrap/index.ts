// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function bootstrap(context) {
  const url = new URL('/bootstrap', context.config.api.url);
  const { data } = await context.client.get(url.href);

  return data;
}
