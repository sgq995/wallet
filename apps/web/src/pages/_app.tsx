import { AppProps } from 'next/app';
import { useRef } from 'react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Layout } from '../components/layout';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
