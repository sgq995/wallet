import React from 'react';
import { SimpleDialog } from '../common';
import { TIndexable } from '@wallet/utilities/model.utility';
import { IAccountReadonlyModel } from '../../models/account.model';
import { AccountsForm } from './accounts-form';
import { Box } from '@mui/material';
import { AccountsFormUpdateButton } from './accounts-form-update-button';

function getFormValuesFrom(account: TIndexable<IAccountReadonlyModel>) {
  const label = account.label;
  const currency = account.currency.id.toString();
  const units = account.balance.units.toString();
  const cents = account.balance.cents.toString();
  const startingUnits = account.startingBalance?.units.toString() ?? '';
  const startingCents = account.startingBalance?.cents.toString() ?? '';

  return {
    label,
    currency,
    units,
    cents,
    startingUnits,
    startingCents,
  };
}

export interface IAccountsEditDialog {
  open: boolean;
  onClose?: () => void;
  account?: TIndexable<IAccountReadonlyModel>;
}

export const AccountsEditDialog: React.FC<IAccountsEditDialog> = ({
  open,
  onClose,
  account,
}) => {
  if (!account) {
    return null;
  }

  const { label, currency, units, cents, startingUnits, startingCents } =
    getFormValuesFrom(account);

  return (
    <SimpleDialog open={open} onClose={onClose}>
      <AccountsForm
        label={label}
        currency={currency}
        units={units}
        cents={cents}
        startingUnits={startingUnits}
        startingCents={startingCents}
      >
        <Box display="flex" alignItems="center">
          <AccountsFormUpdateButton id={account.id} />
        </Box>
      </AccountsForm>
    </SimpleDialog>
  );
};
