import { Delete } from '@mui/icons-material';
import { Avatar, Box, List, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import currency from 'currency.js';
import { PropsWithChildren } from 'react';
import { useQuery } from 'react-query';
import { ICash } from '../../models/cash.model';
import { TransactionsService } from '../../services';
import { TransactionsListItem } from './transactions-list-item';

function cashToString(cash: ICash): string {
  return currency(cash.units).format({
    symbol: cash.currency.symbol,
    separator: cash.currency.separator,
    decimal: cash.currency.decimal,
    precision: cash.currency.precision,
  });
}

interface IRepeatProps {
  times: number;
}

const Repeat: React.FC<PropsWithChildren<IRepeatProps>> = ({
  times,
  children,
}) => {
  return <>{new Array(times).fill(children)}</>;
};

export const TransactionsList: React.FC = () => {
  const { isLoading, data, error } = useQuery(['transactions'], ({ signal }) =>
    TransactionsService.find()
  );

  if (isLoading) {
    return (
      <Stack direction="column" gap={2}>
        <Repeat times={5}>
          <Stack direction="row" gap={2} alignItems="center">
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
            <Stack direction="column" flexGrow={1}>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </Stack>
            <Skeleton variant="circular">
              <Delete />
            </Skeleton>
          </Stack>
        </Repeat>
      </Stack>
    );
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
    <List>
      {data.map((transaction) => (
        <TransactionsListItem
          key={transaction.id}
          amount={cashToString(transaction.cash)}
          date={transaction.date}
          description={transaction.description ?? ''}
          type={transaction.type}
        />
      ))}
    </List>
  );
};
