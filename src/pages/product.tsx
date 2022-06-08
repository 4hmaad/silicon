import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { APIError, Product } from '@fabric2/storefront-core';
import { storefrontClient } from '@/lib/storefront-client';
import { GetServerSidePropsContext } from 'next';
import { ProductOverview } from '@/components/product-details';

export default function ProductDetailsPage({ product }: { product: Product }) {
  return (
    <Layout>
      <Seo title={product.name} />
      <ProductOverview product={product} />
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const sku = context.query.sku as string;

  let product: Product;
  try {
    product = await storefrontClient.product.getProduct({ sku });
  } catch (error) {
    const partialData = error?.partialData;
    if (!partialData) {
      throw new Error(error.message);
    }
    product = partialData;
  }

  return { props: { product } };
};
