import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { useSystemContext } from '../../contexts/system';

import { EntryFormComponentProps } from './types';

export function typeIdFilter(value: string): string {
  return value;
}

export function typeIdValidator(value: string): boolean {
  return true;
}

export default function EntryFormType({
  form,
  error,
  handleChange,
}: EntryFormComponentProps) {
  const { entryTypes } = useSystemContext();

  return (
    <FormControl fullWidth required error={error.typeId}>
      <InputLabel id="entry-form-type-label">Type</InputLabel>
      <Select
        required
        id="entry-form-type"
        name="typeId"
        labelId="entry-form-type-label"
        label="Type"
        value={form.typeId}
        onChange={handleChange as SelectProps['onChange']}
      >
        {entryTypes.map((entryType) => (
          <MenuItem value={entryType.id.toString()}>{entryType.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
