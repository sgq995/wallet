import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

import { EntryFormComponentProps } from './types';

export function accountIdFilter(value: string): string {
  return value;
}

export function accountIdValidator(value: string): boolean {
  return true;
}

export default function EntryFormAccount({
  form,
  error,
  handleChange,
}: EntryFormComponentProps) {
  return (
    <FormControl fullWidth error={error.accountId}>
      <InputLabel id="entry-form-account-label">Account</InputLabel>
      <Select
        required
        id="entry-form-account"
        name="accountId"
        labelId="entry-form-account-label"
        label="Account"
        value={form.accountId}
        onChange={handleChange as SelectProps['onChange']}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value={1}>Davivienda</MenuItem>
      </Select>
    </FormControl>
  );
}
