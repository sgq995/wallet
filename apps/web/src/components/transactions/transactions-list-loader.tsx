import { isEqual, uniqWith } from 'lodash';
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo } from 'react';
import { useInfiniteTransactions } from '../../hooks/transactions';
import { TransactionsListFallback } from './transactions-list-fallback';
import { ErrorMessage } from '../common/error-message';

const InfiniteList = dynamic(() =>
  import('../common/infinite-list').then((mod) => mod.InfiniteList)
);

const TransactionsListContent = dynamic(
  () =>
    import('./transactions-list-content').then(
      (mod) => mod.TransactionsListContent
    ),
  {
    loading: () => <TransactionsListFallback />,
  }
);

export const TransactionsListLoader: React.FC = () => {
  const { isLoading, data, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteTransactions();
  const transactions = useMemo(
    () =>
      uniqWith(data?.pages.map((page) => page.transactions).flat(), isEqual),
    [data]
  );

  const handleListBottomReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading) {
    return <TransactionsListFallback />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <InfiniteList onBottomReached={handleListBottomReached}>
        <TransactionsListContent transactions={transactions} />
      </InfiniteList>

      {isFetchingNextPage && <TransactionsListFallback />}
    </>
  );
};
