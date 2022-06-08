import '@/styles/globals.css';
import '@/styles/fonts.css';
import { AppProps } from 'next/app';
import { StorefrontCoreProvider } from '@fabric2/storefront-core';
import { storefrontClient } from '@/lib/storefront-client';

function MyApp({ Component, pageProps }: AppProps) {

  const providerProps = {
    client: storefrontClient
  }
  return (
    <StorefrontCoreProvider {...providerProps}>
      <Component {...pageProps} />
    </StorefrontCoreProvider>
  );
}

export default MyApp;


