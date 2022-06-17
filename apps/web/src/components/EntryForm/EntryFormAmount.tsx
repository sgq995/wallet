import type { TextFieldProps } from '@mui/material/TextField';

import { FormControl, TextField } from '../Material';

import { EntryFormComponentProps } from './types';

export function amountFilter(rawValue: string): string {
  // currency.js
  let value = rawValue;
  let decimal = '';

  const hasDecimalSeparator = rawValue.indexOf('.') > -1;
  if (hasDecimalSeparator) {
    const [integer, ...decimalParts] = value.split('.');
    value = integer;
    decimal = []
      .concat(decimalParts)
      .join('')
      .replaceAll(/[^0-9]/g, '');
  }

  const hasThousandsSeparator = rawValue.indexOf(',') > -1;
  if (hasThousandsSeparator) {
    value = value
      .split(',')
      .join('')
      .replaceAll(/[^0-9]/g, '');
  }

  for (let i = value.length - 3; i > 0; i -= 3) {
    const left = value.substring(0, i);
    const right = value.substring(i);
    value = `${left},${right}`;
  }

  return hasDecimalSeparator ? `${value}.${decimal}` : value;
}

export function amountValidator(value: string): boolean {
  const asNumber = parseFloat(value);

  if (isNaN(asNumber)) {
    return false;
  }

  if (asNumber < 0) {
    return false;
  }

  if (asNumber > Number.MAX_VALUE) {
    return false;
  }

  return true;
}

export default function EntryFormAmount({
  form,
  error,
  handleChange,
}: EntryFormComponentProps) {
  return (
    <FormControl fullWidth error={error.amount}>
      <TextField
        required
        inputMode="numeric"
        id="entry-form-amount"
        name="amount"
        label="Amount"
        variant="outlined"
        error={error.amount}
        value={form.amount}
        onChange={handleChange as TextFieldProps['onChange']}
      />
    </FormControl>
  );
}
