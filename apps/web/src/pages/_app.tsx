import { useState } from 'react';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';

import {
  dehydrate,
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { frontendConfig } from '../config/frontendConfig';
import { SystemContextProvider } from '../contexts/system';
import { NotificationSystemProvider } from '../contexts/notifications';

const Layout = dynamic(() => import('../components/Layout'));

if (typeof window !== 'undefined') {
  SuperTokensReact.init(frontendConfig());
}

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SuperTokensWrapper>
          <SystemContextProvider>
            <NotificationSystemProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationSystemProvider>
          </SystemContextProvider>
        </SuperTokensWrapper>
      </Hydrate>
    </QueryClientProvider>
  );
}
