import { Box, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useInfiniteTransactions } from '../../hooks/transactions';
import { TransactionsList } from './transactions-list';
import { TransactionsListFallback } from './transactions-list-fallback';

export const TransactionsListLoader: React.FC = () => {
  const { isLoading, data, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteTransactions();
  const transactions = useMemo(
    () =>
      data?.pages.reduce((draft, page) => {
        return draft.concat(
          page.transactions.filter(
            (transaction) => !draft.find((item) => transaction.id === item.id)
          )
        );
      }, []),
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
      <Box>
        <Typography variant="body1">Something goes wrong</Typography>
      </Box>
    );
  }

  return (
    <>
      <TransactionsList
        transactions={transactions}
        onBottomReached={handleListBottomReached}
      />

      {isFetchingNextPage && <TransactionsListFallback />}
    </>
  );
};
