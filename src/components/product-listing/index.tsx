import { Product, useProductPrice } from '@fabric2/storefront-core';
import Link from 'next/link';
import { Fragment } from 'react';

export const ProductListing = ({ products }: { products: Product[] }) => {
  return (
    <Fragment>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='md:flex md:items-center md:justify-between'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
            Trending products
          </h2>
        </div>

        <div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8'>
          {products.map((product) => (
            <div key={product.sku} className='group relative'>
              <div className='h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80'>
                <img
                  src={product.primaryImage?.imageURL}
                  alt={product.primaryImage?.altLabel}
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <h3 className='mt-4 text-sm text-gray-700'>
                <Link href={`/product?sku=${product.sku}`}>
                  <a>
                    <span className='absolute inset-0' />
                    {product.name}
                  </a>
                </Link>
              </h3>
              <p className='mt-1 text-sm font-medium text-gray-900'>
                {useProductPrice(product.price).price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
