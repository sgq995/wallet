import { AppProps } from 'next/app';
import { useState } from 'react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Layout } from '../components/layout';
import { PageProvider } from '../components/page';

export function reportWebVitals(metric: unknown) {
  console.log(metric);
}

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <PageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PageProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
