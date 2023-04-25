import { isEqual, uniqWith } from 'lodash';
import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';
import { useInfiniteAccounts } from '../../hooks/accounts';
import { AccountsGridFallback } from './accounts-grid-fallback';
import { ErrorMessage } from '../common/error-message';

const InfiniteGrid = dynamic(
  () => import('../common/infinite-grid').then((mod) => mod.InfiniteGrid),
  {
    loading: () => <AccountsGridFallback />,
  }
);

const AccountsGridContent = dynamic(
  () => import('./accounts-grid-content').then((mod) => mod.AccountsGrid),
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

  const handleGridBottomReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading) {
    return <AccountsGridFallback />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <InfiniteGrid onBottomReached={handleGridBottomReached}>
        <AccountsGridContent accounts={accounts} />
      </InfiniteGrid>

      {isFetchingNextPage && <AccountsGridFallback />}
    </>
  );
};
