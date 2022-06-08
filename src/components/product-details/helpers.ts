import { Attribute, Product, ProductVariant } from '@fabric2/storefront-core';
import { ProductVariantViewModel, ProductViewModel } from './types';

export function toProductViewModel(product: Product): ProductViewModel {
  return {
    ...product,
    attributes: attributeArrayToMap(product.attributes),
    image: product.primaryImage,
    variants: product?.variants?.length
      ? product.variants.map((variant) => ({
          ...variant,
          attributes: attributeArrayToMap(variant?.attributes),
        }))
      : [],
  };
}

/**
 * Select the default product variant
 * @param product
 * @returns
 */
export const getDefaultProduct = (
  product: ProductViewModel
): ProductVariantViewModel | ProductViewModel => {
  const defaultVariant = product?.variants?.find(
    (variant) => variant.isDefault
  );

  if (defaultVariant) {
    return defaultVariant;
  }

  const firstVariant = product?.variants?.[0];
  if (firstVariant) {
    return firstVariant;
  }

  return product;
};

/**
 * Get key value pair of attributes to variant lists
 * @param product
 * @param allVariants
 * @param variant
 * @returns
 */
export const getVariantOptions = (
  product: ProductViewModel
): { [key: string]: ProductVariantViewModel[] } => {
  return product?.variantAttributes?.reduce(
    (options: Record<string, any>, variantAttribute) => {
      const variantAttributeName = variantAttribute?.name;
      if (!variantAttributeName) {
        return options;
      }

      options[variantAttributeName] = getUniqueVariants(
        product,
        variantAttributeName
      );
      return options;
    },
    {}
  );
};

export const getUniqueVariants = (
  product: ProductViewModel,
  attributeName: string
): ProductVariantViewModel[] => {
  const uniqueVariants = [
    ...(new Map(
      product?.variants.map((item) => [
        item?.attributes?.[attributeName]?.value,
        item,
      ])
    ).values() as any),
  ];
  return uniqueVariants;
};

export const attributeArrayToMap = (
  attributeArray: Attribute[] | undefined
): Record<Attribute['name'], Attribute> => {
  return attributeArray?.length
    ? attributeArray.reduce((dict, next) => {
        dict[next.name] = next;
        return dict;
      }, {})
    : {};
};

const mapItemImageToImageObject = (image: any) => ({
  url: image?.imageURL,
  alt: image?.altLabel,
});

const mapImageAttributeToImageObject = (image: any) => ({
  url: image?.value,
  alt: image?.name,
});

const getSecondaryImages = (variant) => {
  const imageAttributes =
    variant?.attributes?.SecondaryImageAttributes?.value?.split(',');

  const secondaryImages = [] as any;
  imageAttributes?.forEach((imageAttribute) => {
    const image = variant?.attributes?.[imageAttribute.trim()];
    image && secondaryImages.push(mapImageAttributeToImageObject(image));
  });

  return secondaryImages;
};

export const extractImages = (
  variantSelected: ProductVariantViewModel,
  product: ProductViewModel
): { url: string; alt: string }[] => {
  let primaryImage, secondaryImages;

  if (product?.variants?.length) {
    primaryImage = mapItemImageToImageObject(variantSelected?.image);
    secondaryImages = getSecondaryImages(variantSelected);
  } else {
    primaryImage = mapItemImageToImageObject(product?.image);
    secondaryImages =
      product?.secondaryImages?.map((image) =>
        mapItemImageToImageObject(image)
      ) || [];
  }

  return [primaryImage, ...secondaryImages];
};
