import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';
import Link from 'next/link';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='relative'>
            <div className='relative bg-gray-100 lg:bg-transparent'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8'>
                <div className='mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64'>
                  <div className='lg:pr-16'>
                    <h1 className='text-lg font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl'>
                      Welcome to Avery & Grey
                    </h1>
                    <p className='mt-4 text-sm text-gray-600'>
                      In more than a dozen different hues and many base options,
                      this icon offers endless options to mix, match, and make
                      it your own.
                    </p>
                    <div className='mt-6'>
                      <Link href='/products/bed'>
                        <a
                          href='#'
                          className='inline-block rounded-2xl border border-black py-3 px-8 font-medium text-black hover:bg-black hover:text-white hover:outline-1'
                        >
                          Shop Our Beds
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-black'>
            <div className="flex p-10">
              <p className="">
    
              </p>
            </div>

          </div>
        </section>
      </main>
    </Layout>
  );
}
