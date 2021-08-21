// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateFeaturedProducts = (psProducts: Array<any>) => {
  const populateFeaturedProducts = psProducts.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.link_rewrite,
    regularPrice: product.regular_price_amount,
    discountPrice: product.price_amount,
    coverImageSmall: product.cover.small.url,
    coverImageMedium: product.cover.medium.url,
    coverImageLarge: product.cover.large.url,
    images: [],
    description: null
  }));
  return populateFeaturedProducts;
};

export default populateFeaturedProducts;
