import type {
  FormControlProps,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import { useCallback } from 'react';

import { useFindAllQuery } from '../../hooks/entry-types';

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
} from '@mui/material';

import { useFormController } from './hooks';

interface IFormEntryTypeFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: FormControlProps['required'];
  id?: SelectProps['id'];
  name?: SelectProps['name'];
}

export default function FormEntryTypeField({
  fullWidth,
  required,
  id,
  name,
}: IFormEntryTypeFieldProps) {
  const fieldName = name ?? 'type';

  const labelId = `${id}-label`;

  const {
    isLoading,
    isError,
    data: response,
    error: queryError,
  } = useFindAllQuery();

  const validator = useCallback(
    (value: string) => {
      const valueNumber = parseInt(value);

      if (isNaN(valueNumber)) {
        return false;
      }

      return !!response?.data.some(({ id }) => valueNumber === id);
    },
    [response]
  );

  const [value, error, onChange] = useFormController(fieldName, {
    validator,
  });

  return (
    <FormControl required={required} fullWidth={fullWidth} error={error}>
      <AsyncViewer isLoading={isLoading} isError={isError}>
        <AsyncLoading>
          <CircularProgress />
        </AsyncLoading>

        <AsyncError>{queryError?.error}</AsyncError>

        <AsyncData>
          <InputLabel id={labelId}>Type</InputLabel>
          <Select
            id={id}
            name={fieldName}
            labelId={labelId}
            label="Type"
            variant="outlined"
            value={value}
            onChange={({ target: { value } }: SelectChangeEvent<string>) =>
              onChange(value)
            }
          >
            {response?.data.map(({ id, name }) => (
              <MenuItem key={id} value={id.toString()}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </AsyncData>
      </AsyncViewer>
    </FormControl>
  );
}
