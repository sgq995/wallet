import type { SelectProps } from '@mui/material/Select';
import { useFindAllQuery } from '../../hooks/accounts';
import AsyncViewer, {
  AsyncData,
  AsyncError,
  AsyncLoading,
} from '../AsyncViewer';

import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '../Material';

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
  const {
    isLoading: isAccountsLoading,
    isError: isAccountsError,
    data: accounts,
    error: accountsError,
  } = useFindAllQuery();

  return (
    <AsyncViewer isLoading={isAccountsLoading} isError={isAccountsError}>
      <AsyncLoading>
        <CircularProgress />
      </AsyncLoading>

      <AsyncError>{accountsError}</AsyncError>

      <AsyncData>
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
            {accounts?.data.map(({ id, name }) => (
              <MenuItem key={id} value={id.toString()}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AsyncData>
    </AsyncViewer>
  );
}
