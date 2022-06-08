import {
  Product,
  useAddLineItems,
  useFormatPrice,
} from '@fabric2/storefront-core';
import { RadioGroup, Tab } from '@headlessui/react';
import { HeartIcon } from '@heroicons/react/outline';
import { useMemo, useState } from 'react';
import {
  extractImages,
  getDefaultProduct,
  getVariantOptions,
  toProductViewModel,
} from './helpers';
import { ProductVariantViewModel } from './types';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export const ProductOverview = ({
  product: productData,
}: {
  product: Product;
}) => {
  const { mutate: addToCart, isLoading } = useAddLineItems();

  const product = useMemo(() => toProductViewModel(productData), [productData]);

  const [selectedProduct, setSelectedProduct] = useState(() =>
    getDefaultProduct(product)
  );

  const variantOptions = useMemo(() => getVariantOptions(product), [product]);

  const price = useFormatPrice({
    amount: selectedProduct?.price.base,
    currency: selectedProduct?.price.currency as string,
  });

  const productImages = extractImages(
    selectedProduct as ProductVariantViewModel,
    product
  );

  const colorAttribute = variantOptions['Color']
    ? 'Color'
    : variantOptions['Bed Colour']
      ? 'Bed Colour'
      : 'Colour';

  const sizeAttribute = variantOptions['Bed Size'] ? 'Bed Size' : 'Size';
  return (
    <div className='bg-white'>
      <div className='max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse col-span-6'>
            {/* Image selector */}
            <div className='hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none'>
              <Tab.List className='grid grid-cols-3 gap-4'>
                {productImages.map((image, idx) => (
                  <Tab
                    defaultChecked={idx === 0}
                    key={image.alt}
                    className='relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
                  >
                    {({ selected }) => (
                      <>
                        <span className='sr-only'>{image.alt}</span>
                        <span className='absolute inset-0 overflow-hidden rounded-md'>
                          <img
                            src={image.url}
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-indigo-500' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden='true'
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className='w-full aspect-w-1 aspect-h-1'>
              {productImages.map((image) => (
                <Tab.Panel key={image.alt}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className='object-cover object-center w-full h-full sm:rounded-lg'
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='flex flex-col col-span-5 col-start-8 px-4 mt-10 w-100 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
              {product.name}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl text-gray-900'>{price}</p>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>

              <div
                className='space-y-6 text-base text-gray-700'
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
            {variantOptions[colorAttribute]?.length ? (
              <div className='mt-6'>
                Colors
                <div>
                  <RadioGroup
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                    className='mt-2'
                  >
                    <RadioGroup.Label className='sr-only'>
                      Choose a color
                    </RadioGroup.Label>
                    <div className='flex items-center space-x-3'>
                      {variantOptions[colorAttribute].map((variant) => {
                        const attribute = variant?.attributes?.[colorAttribute];
                        const attributeValue = attribute?.value;

                        console.log({ variant });

                        return (
                          <RadioGroup.Option
                            key={attributeValue}
                            value={variant}
                            className={({ active, checked }) =>
                              classNames(
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                              )
                            }
                          >
                            <RadioGroup.Label as='p' className='sr-only'>
                              {attributeValue}
                            </RadioGroup.Label>
                            <span
                              style={{ backgroundColor: attributeValue }}
                              aria-hidden='true'
                              className={classNames(
                                'h-8 w-8 rounded-full border border-black border-opacity-10'
                              )}
                            />
                          </RadioGroup.Option>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            ) : null}

            {variantOptions[sizeAttribute]?.length ? (
              <div className='mt-8'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-sm font-medium text-gray-900'>Size</h2>
                </div>

                <RadioGroup
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  className='mt-2'
                >
                  <RadioGroup.Label className='sr-only'>
                    Choose a size
                  </RadioGroup.Label>
                  <div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
                    {variantOptions[sizeAttribute].map((variant) => {
                      const attribute = variant?.attributes?.[sizeAttribute];
                      const attributeValue = attribute?.value;
                      return (
                        <RadioGroup.Option
                          key={attributeValue}
                          value={variant}
                          className={({ active, checked }) =>
                            classNames(
                              'cursor-pointer focus:outline-none',
                              active
                                ? 'ring-2 ring-indigo-500 ring-offset-2'
                                : '',
                              checked
                                ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                              'flex items-center justify-center rounded-md border py-1 px-1 text-xs font-medium uppercase sm:flex-1'
                            )
                          }
                        >
                          <RadioGroup.Label as='p'>
                            {attributeValue}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>
            ) : null}
            <div className='flex mt-20'>
              <button
                onClick={() =>
                  addToCart({
                    items: [{ itemID: selectedProduct.itemID, quantity: 1 }],
                  })
                }
                className='flex items-center justify-center flex-1 max-w-xs px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
              >
                {isLoading ? 'Adding...' : 'Add to cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
