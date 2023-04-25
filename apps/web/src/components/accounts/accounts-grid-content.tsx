import { TIndexable } from '@wallet/utilities/model.utility';
import { IAccountReadonlyModel } from '../../models/account.model';
import { cashToString } from '../../utilities/cash.utility';
import { AccountsGridItem } from './accounts-grid-item';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AccountsEditDialog = dynamic(() =>
  import('./accounts-edit-dialog').then((mod) => mod.AccountsEditDialog)
);

export interface IAccountGridProps {
  accounts: TIndexable<IAccountReadonlyModel>[];
}

export const AccountsGrid: React.FC<IAccountGridProps> = ({ accounts }) => {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<
    TIndexable<IAccountReadonlyModel> | undefined
  >(undefined);

  return (
    <>
      <AccountsEditDialog
        open={open}
        onClose={() => setOpen(false)}
        account={account}
      />

      {accounts.map((account) => (
        <AccountsGridItem
          key={account.id}
          id={account.id}
          label={account.label}
          balance={cashToString(account.balance, account.currency)}
          currencyCode={account.currency.code}
          onClick={() => {
            setOpen(true);
            setAccount(account);
          }}
        />
      ))}
    </>
  );
};
