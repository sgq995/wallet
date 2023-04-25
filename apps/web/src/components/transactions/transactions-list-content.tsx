import { Divider, ListSubheader } from '@mui/material';
import { DateFormatter } from '@wallet/utilities/date.utility';
import { TIndexable } from '@wallet/utilities/model.utility';
import { useState } from 'react';
import { ITransactionReadonlyModel } from '../../models/transaction.model';
import { cashToString } from '../../utilities/cash.utility';
import { groupByMonthAndYear } from '../../utilities/transactions.utility';
import { TransactionsListItem } from './transactions-list-item';
import styles from './transactions-list-content.module.css';
import dynamic from 'next/dynamic';

const TransactionsEditDialog = dynamic(
  import('./transactions-edit-dialog').then((mod) => mod.TransactionsEditDialog)
);

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

  const groupedTransactions = groupByMonthAndYear(transactions);

  return (
    <>
      <TransactionsEditDialog
        open={open}
        onClose={() => setOpen(false)}
        transaction={transaction}
      />

      {groupedTransactions.map((group) => {
        const formatter = new DateFormatter(group[0].date, true);
        const groupLabel = `${formatter.dateMonth()}/${formatter.dateFullYear()}`;

        return (
          <li key={groupLabel}>
            <ul className={styles.list}>
              <Divider component={ListSubheader}>{groupLabel}</Divider>

              {group.map((transaction) => (
                <TransactionsListItem
                  key={transaction.id}
                  id={transaction.id}
                  amount={cashToString(
                    transaction.cash,
                    transaction.cash.currency
                  )}
                  date={transaction.date}
                  description={transaction.description ?? ''}
                  type={transaction.type}
                  onClick={() => {
                    setOpen(true);
                    setTransaction(transaction);
                  }}
                />
              ))}
            </ul>
          </li>
        );
      })}
    </>
  );
};
