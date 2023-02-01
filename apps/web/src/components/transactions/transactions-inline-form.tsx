import { Stack, TextField } from '@mui/material';
import {
  useUncontrolledInput,
  WithFormStoreProvider,
} from '@wallet/form-store';
import { PropsWithChildren } from 'react';
import { FormAmountField } from '../forms/form-amount-field';
import { FormDateField } from '../forms/form-date-field';

const DEFAULT_TRANSACTIONS_FORM_VALUES = {
  year: '',
  month: '',
  day: '',
  type: '',
  currency: '',
  units: '',
  cents: '',
  description: '',
};

const { year, month, day, type, currency, units, cents, description } =
  DEFAULT_TRANSACTIONS_FORM_VALUES;

export interface ITransactionsInlineFormProps {}

export const TransactionsInlineForm: React.FC<
  PropsWithChildren<ITransactionsInlineFormProps>
> = WithFormStoreProvider(({ children }) => {
  const typeRef = useUncontrolledInput('type', { defaultValue: type });
  const descriptionRef = useUncontrolledInput('description', {
    defaultValue: description,
  });

  return (
    <Stack direction="row" spacing={4}>
      <FormDateField
        id="transactions-date"
        defaultYear={year}
        defaultMonth={month}
        defaultDay={day}
        required
      />

      <TextField
        id="transactions-type"
        inputRef={typeRef}
        defaultValue={type}
        label="Type"
        required
        select
        SelectProps={{ native: true }}
      >
        <option value="" disabled></option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </TextField>

      <FormAmountField
        id="transactions-amount"
        defaultCurrency={currency}
        defaultUnits={units}
        defaultCents={cents}
        required
      />

      <TextField
        id="transactions-description"
        inputRef={descriptionRef}
        defaultValue={description}
        label="Description"
      />

      {children}
    </Stack>
  );
}, DEFAULT_TRANSACTIONS_FORM_VALUES);
