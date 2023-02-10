import { Stack, TextField } from '@mui/material';
import {
  useUncontrolledInput,
  WithFormStoreProvider,
} from '@wallet/form-store';
import { PropsWithChildren } from 'react';
import { FormAmountField } from '../forms/form-amount-field';
import { FormDateField } from '../forms/form-date-field';
import {
  defaultCents,
  defaultCurrency,
  defaultDay,
  defaultDescription,
  defaultMonth,
  defaultType,
  defaultUnits,
  defaultYear,
  DEFAULT_TRANSACTIONS_FORM_VALUES,
} from './transactions-default-values';

function isValidType(type: string) {
  if (type === 'income') {
    return true;
  }

  if (type === 'expense') {
    return true;
  }

  return false;
}

export interface ITransactionsFormProps {}

export const TransactionsForm: React.FC<
  PropsWithChildren<ITransactionsFormProps>
> = WithFormStoreProvider(({ children }) => {
  const typeRef = useUncontrolledInput('type', {
    defaultValue: defaultType,
    rawValidator: isValidType,
  });
  const descriptionRef = useUncontrolledInput('description', {
    defaultValue: defaultDescription,
  });

  return (
    <Stack component="form" direction="column" spacing={4}>
      <FormDateField
        id="transactions-date"
        defaultYear={defaultYear}
        defaultMonth={defaultMonth}
        defaultDay={defaultDay}
        required
      />

      <TextField
        id="transactions-type"
        inputRef={typeRef}
        defaultValue={defaultType}
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
        defaultCurrency={defaultCurrency}
        defaultUnits={defaultUnits}
        defaultCents={defaultCents}
        required
      />

      <TextField
        id="transactions-description"
        inputRef={descriptionRef}
        defaultValue={defaultDescription}
        label="Description"
      />

      {children}
    </Stack>
  );
}, DEFAULT_TRANSACTIONS_FORM_VALUES);
