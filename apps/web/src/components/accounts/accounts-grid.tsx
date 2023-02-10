import { Grid } from '@mui/material';
import { TIndexable } from '@wallet/utilities/model.utility';
import { IAccount } from '../../models/account.model';
import { cashToString } from '../../utilities/cash.utility';
import { AccountsGridItem } from './accounts-grid-item';

export interface IAccountGridProps {
  accounts: TIndexable<IAccount>[];
}

export const AccountsGrid: React.FC<IAccountGridProps> = ({ accounts }) => {
  return (
    <Grid container spacing={2}>
      {accounts.map((account) => (
        <AccountsGridItem
          key={account.id}
          label={account.label}
          balance={cashToString(account.balance, account.currency)}
        />
      ))}
    </Grid>
  );
};
