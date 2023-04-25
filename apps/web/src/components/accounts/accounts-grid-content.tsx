import { TIndexable } from '@wallet/utilities/model.utility';
import { IAccountReadonlyModel } from '../../models/account.model';
import { cashToString } from '../../utilities/cash.utility';
import { AccountsGridItem } from './accounts-grid-item';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AccountsDeleteConfirmDialog } from './accounts-delete-confirmation-dialog';

const AccountsEditDialog = dynamic(() =>
  import('./accounts-edit-dialog').then((mod) => mod.AccountsEditDialog)
);

export interface IAccountGridProps {
  accounts: TIndexable<IAccountReadonlyModel>[];
}

export const AccountsGrid: React.FC<IAccountGridProps> = ({ accounts }) => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [account, setAccount] = useState<
    TIndexable<IAccountReadonlyModel> | undefined
  >(undefined);

  return (
    <>
      <AccountsEditDialog
        open={editIsOpen}
        onClose={() => setEditIsOpen(false)}
        account={account}
      />

      <AccountsDeleteConfirmDialog
        open={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
        id={account?.id ?? 0}
      />

      {accounts.map((account) => (
        <AccountsGridItem
          key={account.id}
          id={account.id}
          label={account.label}
          balance={cashToString(account.balance, account.currency)}
          currencyCode={account.currency.code}
          onEdit={() => {
            setEditIsOpen(true);
            setAccount(account);
          }}
          onDelete={() => {
            setDeleteIsOpen(true);
            setAccount(account);
          }}
        />
      ))}
    </>
  );
};
