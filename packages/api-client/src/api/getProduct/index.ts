// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getProduct(context, params) {
  console.log(params);
  const url = new URL('/rest/productdetail', context.config.api.url);

  params.id && url.searchParams.set('product_id', params.id);
  // params.catId && url.searchParams.set('catId', params.catId);
  // params.limit && url.searchParams.set('limit', params.limit);

  const { data } = await context.client.get(url.href);

  return data;
}
