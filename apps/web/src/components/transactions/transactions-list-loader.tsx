import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useInfiniteTransactions } from '../../hooks/transactions';
import { TransactionsList } from './transactions-list';
import { TransactionsListFallback } from './transactions-list-fallback';

export const TransactionsListLoader: React.FC = () => {
  const { isLoading, data, error, fetchNextPage } = useInfiniteTransactions();
  const transactions = useMemo(
    () => data?.pages.reduce((draft, page) => draft.concat(page), []),
    [data]
  );

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

  return <TransactionsList transactions={transactions} />;
};
