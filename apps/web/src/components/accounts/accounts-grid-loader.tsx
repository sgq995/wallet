import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { TIndexable } from '@wallet/utilities/model.utility';
import { isEqual, uniqWith } from 'lodash';
import { useMemo } from 'react';
import { useInfiniteAccounts } from '../../hooks/accounts';
import { IAccount } from '../../models/account.model';
import { TAccountReadResponse } from '../../services';
import { Repeat } from '../helpers';
import { AccountsGrid } from './accounts-grid';
import { AccountsGridItem } from './accounts-grid-item';

function fake(): TIndexable<IAccount>[] {
  return [
    {
      balance: {
        units: 0,
        cents: 0,
      },
      currency: {
        symbol: '$',
        separator: ',',
        decimal: '.',
        precision: 2,
        code: 'COP',
      },
      id: 0,
      label: 'label',
      startingBalance: {
        units: 0,
        cents: 0,
      },
    },
    {
      balance: {
        units: 0,
        cents: 0,
      },
      currency: {
        symbol: '$',
        separator: ',',
        decimal: '.',
        precision: 2,
        code: 'COP',
      },
      id: 0,
      label: 'label',
      startingBalance: {
        units: 0,
        cents: 0,
      },
    },
  ];
}

export const AccountsGridLoader: React.FC = () => {
  const { isLoading, data, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteAccounts();
  // const accounts = useMemo(
  //   () => uniqWith(data?.pages.map((page) => page.accounts).flat(), isEqual),
  //   [data]
  // );
  const accounts = fake();

  if (isLoading) {
    return (
      <Stack>
        <Repeat times={5}>
          <Skeleton>
            <AccountsGridItem label="" balance="" />
          </Skeleton>
        </Repeat>
      </Stack>
    );
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
