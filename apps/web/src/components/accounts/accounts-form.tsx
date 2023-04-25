import { Stack, TextField } from '@mui/material';
import {
  useUncontrolledInput,
  WithFormStoreProvider,
} from '@wallet/form-store';
import { PropsWithChildren } from 'react';
import { FormAmountField } from '../forms/form-amount-field';
import {
  DEFAULT_ACCOUNTS_FORM_VALUES,
  defaultLabel,
  defaultCurrency,
  defaultUnits,
  defaultCents,
  defaultStartingUnits,
  defaultStartingCents,
} from './accounts-default-values';

export interface IAccountsFormProps {
  label?: string;
  currency?: string;
  units?: string;
  cents?: string;
  startingUnits?: string;
  startingCents?: string;
}

export const AccountsForm: React.FC<PropsWithChildren<IAccountsFormProps>> =
  WithFormStoreProvider(
    ({
      label = defaultLabel,
      currency = defaultCurrency,
      units = defaultUnits,
      cents = defaultCents,
      startingUnits = defaultStartingUnits,
      startingCents = defaultStartingCents,
      children,
    }) => {
      const labelRef = useUncontrolledInput('label', {
        defaultValue: label,
      });

      return (
        <Stack component="form" direction="column" spacing={4}>
          <TextField
            id="accounts-description"
            inputRef={labelRef}
            defaultValue={label}
            label="Label"
            required
          />

          <FormAmountField
            id="accounts-balance"
            defaultCurrency={currency}
            defaultUnits={units}
            defaultCents={cents}
            required
          />

          <FormAmountField
            id="accounts-starting-balance"
            name="starting"
            defaultUnits={startingUnits}
            defaultCents={startingCents}
            hideCurrency
          />

          {children}
        </Stack>
      );
    },
    DEFAULT_ACCOUNTS_FORM_VALUES
  );
