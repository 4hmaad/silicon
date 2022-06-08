import { Dialog, Tab, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useCart, useMenu } from '@fabric2/storefront-core';

export const Header = () => {
  const { data: menu } = useMenu({});
  const { data: cart } = useCart();

  return (
    <div className='bg-white'>
      <header className='relative bg-white'>
        <nav aria-label='Top' className='border-b border-gray-200 px-6'>
          <div className='flex h-16 items-center justify-between'>
            {/* Logo */}
            <a href='#' className='flex'>
              <span className='sr-only'>Workflow</span>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                alt=''
              />
            </a>

            <div className=' flex flex-1 items-center justify-end'>
              {menu?.items?.length ? (
                <div className='hidden sm:flex'>
                  {menu.items.map((menu) => (
                    <a
                      key={menu?._id}
                      href={menu?.path}
                      className='flex items-center px-2 text-sm font-medium text-gray-700 hover:text-gray-800'
                    >
                      {menu?.name}
                    </a>
                  ))}
                </div>
              ) : null}

              {/* Cart */}
              <div className='ml-4 flow-root lg:ml-6'>
                <a href='#' className='group -m-2 flex items-center p-2'>
                  <ShoppingBagIcon
                    className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                    {cart?.quantity ?? '0'}
                  </span>
                  <span className='sr-only'>items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
