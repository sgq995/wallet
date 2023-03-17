import { Box, Typography } from '@mui/material';
import { isEqual, uniqWith } from 'lodash';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useInfiniteAccounts } from '../../hooks/accounts';
import { AccountsGridFallback } from './accounts-grid-fallback';

const AccountsGrid = dynamic(
  () => import('./accounts-grid').then((mod) => mod.AccountsGrid),
  {
    loading: () => <AccountsGridFallback />,
  }
);

export const AccountsGridLoader: React.FC = () => {
  const { isLoading, data, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteAccounts();
  const accounts = useMemo(
    () => uniqWith(data?.pages.map((page) => page.accounts).flat(), isEqual),
    [data]
  );

  if (isLoading) {
    return <AccountsGridFallback />;
  }

  if (error) {
    return (
      <Box width="100%" display="grid" alignContent="center">
        <Typography variant="body1" color="error">
          Something goes wrong
        </Typography>
      </Box>
    );
  }

  return <AccountsGrid accounts={accounts} />;
};
