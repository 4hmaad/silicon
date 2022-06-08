import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { ProductSearchResponse } from '@fabric2/storefront-core';
import { storefrontClient } from '@/lib/storefront-client';
import { GetServerSidePropsContext } from 'next';
import { ProductListing } from '@/components/product-listing';

export default function ProductListingPage({
  searchResponse,
}: {
  searchResponse: ProductSearchResponse;
}) {
  const products = searchResponse.products.edges.map(({ node }) => node);
  return (
    <Layout>
      <Seo />
      <ProductListing products={products} />
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.query.slug as string;

  let searchResponse: ProductSearchResponse;
  try {
    searchResponse = await storefrontClient.product.searchProducts(
      { keyword: slug },
      { first: 10 }
    );
  } catch (error) {
    const partialData = error?.partialData;
    if (!partialData) {
      throw new Error(error?.message);
    }
    searchResponse = partialData;
  }

  return { props: { searchResponse } };
};
