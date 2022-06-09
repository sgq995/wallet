import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { EntryFormComponentProps } from './types';

export function categoryIdFilter(value: string): string {
  return value;
}

export function categoryIdValidator(value: string): boolean {
  return true;
}

export default function EntryFormCategory({
  form,
  error,
  handleChange,
}: EntryFormComponentProps) {
  return (
    <FormControl fullWidth error={error.categoryId}>
      <InputLabel id="entry-form-category-label">Category</InputLabel>
      <Select
        required
        id="entry-form-category"
        name="categoryId"
        labelId="entry-form-category-label"
        label="Category"
        value={form.categoryId}
        onChange={handleChange as SelectProps['onChange']}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value={1}>House</MenuItem>
      </Select>
    </FormControl>
  );
}
