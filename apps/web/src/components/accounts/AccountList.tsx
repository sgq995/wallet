import { Box, Button, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Reply } from 'schemas/accounts';
import { TAccountModel } from 'schemas/accounts/model';
import { useNotificationSystem } from '../../contexts/notifications';
import { useFindAllInfiniteQuery, useFindAllQuery } from '../../legacy/hooks/accounts';
import { InfiniteList } from '../../legacy/components/infinite-list';
import { AccountItem } from './AccountItem';

function useAccountData() {
  const {
    hasNextPage,
    isFetching,
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    refetch,
  } = useFindAllInfiniteQuery();

  const accounts = useMemo<Reply.TFindAllData['data']>(
    () =>
      data?.pages?.reduce((all, current) => {
        return all.concat(current.data);
      }, []) ?? [],
    [data]
  );

  return {
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    fetchNextPage,
    refetch,
    accounts,
  };
}

export interface AccountListProps {}

export const AccountList: React.FC<AccountListProps> = () => {
  const { error: notifyError } = useNotificationSystem();
  const {
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    fetchNextPage,
    refetch,
    accounts,
  } = useAccountData();

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Typography variant="body2">Something goes wrong</Typography>
        <Button onClick={() => refetch()}>Retry</Button>
      </Box>
    );
  }

  if (accounts.length === 0) {
    return (
      <Box display="flex" justifyContent="center">
        <Button>Add Account</Button>
      </Box>
    );
  }

  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isLoading={isLoading}
        list={accounts}
        onLoadMore={() => {
          fetchNextPage();
        }}
      >
        {(account: TAccountModel) => <AccountItem account={account} />}
      </InfiniteList>
    </>
  );
};
