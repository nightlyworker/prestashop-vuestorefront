// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateCategoryProducts = (psProducts: Array<any>) => {
  const populateCategoryProducts = psProducts.map((product) => ({
    id: product.id_product,
    name: product.name,
    slug: product.link_rewrite,
    regularPrice: product.regular_price_amount,
    discountPrice: product.price_amount,
    coverImageSmall: product.cover?.url,
    coverImageMedium: product.cover?.url,
    coverImageLarge: product.cover?.url,
    images: [],
    description: null
  }));

  return populateCategoryProducts;
};

export default populateCategoryProducts;
