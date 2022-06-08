import { Attribute, ProductVariant, Product } from '@fabric2/storefront-core';

export type ProductViewModel = {
  attributes: Record<Attribute['name'], Attribute>;
  variants: ProductVariantViewModel[];
  image: Product['primaryImage'];
} & Omit<Product, 'attributes' | 'variants' | 'primaryImage'>;

export type ProductVariantViewModel = {
  attributes: Record<Attribute['name'], Attribute>;
} & Omit<ProductVariant, 'attributes'>;
