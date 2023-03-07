import { ListItemButton } from '@mui/material';
import { TIndexable } from '@wallet/utilities/model.utility';
import { useState } from 'react';
import { ITransactionReadonlyModel } from '../../models/transaction.model';
import { cashToString } from '../../utilities/cash.utility';
import { TransactionsEditModal } from './transactions-edit-dialog';
import { TransactionsListItem } from './transactions-list-item';

export interface ITransactionsListContentProps {
  transactions: TIndexable<ITransactionReadonlyModel>[];
}

export const TransactionsListContent: React.FC<
  ITransactionsListContentProps
> = ({ transactions }) => {
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState<
    TIndexable<ITransactionReadonlyModel> | undefined
  >(undefined);

  return (
    <>
      <TransactionsEditModal
        open={open}
        onClose={() => setOpen(false)}
        transaction={transaction}
      />

      {transactions.map((transaction) => (
        <TransactionsListItem
          key={transaction.id}
          id={transaction.id}
          amount={cashToString(transaction.cash, transaction.cash.currency)}
          date={transaction.date}
          description={transaction.description ?? ''}
          type={transaction.type}
          renderContentItem={(content, disabled) => (
            <ListItemButton
              disabled={disabled}
              onClick={() => {
                setOpen(true);
                setTransaction(transaction);
              }}
            >
              {content}
            </ListItemButton>
          )}
        />
      ))}
    </>
  );
};
