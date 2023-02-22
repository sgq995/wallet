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

export interface ITransactionsFormProps extends PropsWithChildren {
  type?: string;
  description?: string;
  year?: string;
  month?: string;
  day?: string;
  currency?: string;
  units?: string;
  cents?: string;
}

export const TransactionsForm: React.FC<ITransactionsFormProps> =
  WithFormStoreProvider(
    ({
      type = defaultType,
      description = defaultDescription,
      year = defaultYear,
      month = defaultMonth,
      day = defaultDay,
      currency = defaultCurrency,
      units = defaultUnits,
      cents = defaultCents,
      children,
    }) => {
      const typeRef = useUncontrolledInput('type', {
        defaultValue: type,
        rawValidator: isValidType,
      });
      const descriptionRef = useUncontrolledInput('description', {
        defaultValue: description,
      });

      return (
        <Stack component="form" direction="column" spacing={4}>
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
    },
    DEFAULT_TRANSACTIONS_FORM_VALUES
  );
