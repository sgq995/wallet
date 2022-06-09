import { useState } from 'react';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import SuperTokensReact from 'supertokens-auth-react';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { frontendConfig } from '../config/frontendConfig';
import { SystemContextProvider } from '../contexts/system';

const Layout = dynamic(() => import('../components/Layout'));

if (typeof window !== 'undefined') {
  SuperTokensReact.init(frontendConfig());
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SystemContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SystemContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
