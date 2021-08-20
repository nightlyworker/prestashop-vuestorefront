// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateProducts = (psProducts: Array<any>) => {
  const populateProducts = psProducts.map((product) => ({
    id: product.id_product,
    name: product.name,
    slug: 'todo-back',
    regularPrice: product.float_price,
    // eslint-disable-next-line line-comment-position
    discountPrice: product.float_price, // todo
    coverImageSmall: product.cover_image,
    coverImageMedium: product.cover_image,
    coverImageLarge: product.cover_image
  }));

  return populateProducts;
};

export default populateProducts;
