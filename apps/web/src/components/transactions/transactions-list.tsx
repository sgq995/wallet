import { List, ListItem } from '@mui/material';
import { TIndexable } from '@wallet/utilities/model.utility';
import { useCallback } from 'react';
import { useIntersection } from '../../hooks/use-intersection';
import { ITransactionReadonly } from '../../models/transaction.model';
import { cashToString } from '../../utilities/cash.utility';
import { TransactionsListItem } from './transactions-list-item';

export interface ITransactionsListProps {
  transactions: TIndexable<ITransactionReadonly>[];
  onBottomReached?: () => void;
}

export const TransactionsList: React.FC<ITransactionsListProps> = ({
  transactions,
  onBottomReached,
}) => {
  const handleIntersectIn = useCallback(() => {
    onBottomReached?.();
  }, [onBottomReached]);

  const ref = useIntersection<HTMLLIElement>({
    onIntersectIn: handleIntersectIn,
  });

  return (
    <List>
      {transactions.map((transaction) => (
        <TransactionsListItem
          key={transaction.id}
          id={transaction.id}
          amount={cashToString(transaction.cash, transaction.cash.currency)}
          date={transaction.date}
          description={transaction.description ?? ''}
          type={transaction.type}
        />
      ))}

      <ListItem ref={ref} disablePadding />
    </List>
  );
};
