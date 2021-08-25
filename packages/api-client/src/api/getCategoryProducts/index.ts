// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCategoryProducts(context, params) {
  const url = new URL('/rest/categoryProducts', context.config.api.url);

  url.searchParams.set('slug', params.input.categorySlug);
  url.searchParams.set('with_all_images', '0');

  const { data } = await context.client.get(url.href);

  return data;
}
