import { EntryFormComponentProps } from './types';

import { FormControl, TextField, TextFieldProps } from '@mui/material';

export function descriptionFilter(value: string): string {
  return value;
}

export function descriptionValidator(value: string): boolean {
  if (value.length > 255) {
    return false;
  }

  return true;
}

export default function EntryFormDescription({
  form,
  error,
  handleChange,
}: EntryFormComponentProps) {
  return (
    <FormControl fullWidth error={error.description}>
      <TextField
        id="entry-form-description"
        name="description"
        label="Description"
        variant="outlined"
        multiline
        error={error.description}
        value={form.description}
        onChange={handleChange as TextFieldProps['onChange']}
      />
    </FormControl>
  );
}
