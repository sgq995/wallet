import { List, ListItem } from '@mui/material';
import { TIndexable } from '@wallet/utilities';
import { useIntersection } from '../../hooks/use-intersection';
import { ITransaction } from '../../models/transaction.model';
import { cashToString } from '../../utilities/cash.utility';
import { TransactionsListItem } from './transactions-list-item';

export interface ITransactionsListProps {
  transactions: TIndexable<ITransaction>[];
}

export const TransactionsList: React.FC<ITransactionsListProps> = ({
  transactions,
}) => {
  const ref = useIntersection<HTMLLIElement>({
    onIntersectIn() {
      console.log('intersect in');
    },
    onIntersectOut() {
      console.log('intersect out');
    },
  });

  return (
    <List>
      {transactions.map((transaction) => (
        <TransactionsListItem
          key={transaction.id}
          amount={cashToString(transaction.cash)}
          date={transaction.date}
          description={transaction.description ?? ''}
          type={transaction.type}
        />
      ))}

      <ListItem ref={ref} disablePadding />
    </List>
  );
};
