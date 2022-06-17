import { SelectProps } from '@mui/material';

import { useFindAllQuery } from '../../hooks/categories';
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
  const {
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    data: categories,
    error: categoriesError,
  } = useFindAllQuery();

  return (
    <AsyncViewer isLoading={isCategoriesLoading} isError={isCategoriesError}>
      <AsyncLoading>
        <CircularProgress />
      </AsyncLoading>

      <AsyncError>{categoriesError}</AsyncError>

      <AsyncData>
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
            {categories?.data.map(({ id, name }) => (
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
