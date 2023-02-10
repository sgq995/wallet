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

export interface IAccountsFormProps {}

export const AccountsForm: React.FC<PropsWithChildren<IAccountsFormProps>> =
  WithFormStoreProvider(({ children }) => {
    const labelRef = useUncontrolledInput('label', {
      defaultValue: '',
    });

    return (
      <Stack component="form" direction="column" spacing={4}>
        <TextField
          id="accounts-description"
          inputRef={labelRef}
          defaultValue={defaultLabel}
          label="Label"
          required
        />

        <FormAmountField
          id="accounts-balance"
          defaultCurrency={defaultCurrency}
          defaultUnits={defaultUnits}
          defaultCents={defaultCents}
          required
        />

        <FormAmountField
          id="accounts-starting-balance"
          name="starting"
          defaultUnits={defaultStartingUnits}
          defaultCents={defaultStartingCents}
          hideCurrency
        />

        {children}
      </Stack>
    );
  }, DEFAULT_ACCOUNTS_FORM_VALUES);
