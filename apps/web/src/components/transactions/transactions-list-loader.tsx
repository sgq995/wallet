import { Box, Typography } from '@mui/material';
import { isEqual, uniqWith } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useInfiniteTransactions } from '../../hooks/transactions';
import { InfiniteList } from '../common/infinite-list';
import { TransactionsListContent } from './transactions-list-content';
import { TransactionsListFallback } from './transactions-list-fallback';

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
    console.error(error);

    return (
      <Box width="100%" display="grid" alignContent="center">
        <Typography variant="body1" color="error">
          Something goes wrong
        </Typography>
      </Box>
    );
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
