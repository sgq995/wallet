import { useState } from 'react';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const Layout = dynamic(() => import('../components/Layout'));

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
