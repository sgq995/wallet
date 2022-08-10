import { useCallback } from 'react';

import type {
  FormControlProps,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

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
} from '@mui/material';

import { useFormController } from './hooks';

interface IFormAccountFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: FormControlProps['required'];
  id?: SelectProps['id'];
  name?: SelectProps['name'];
}

export default function FormAccountField({
  fullWidth,
  required,
  id,
  name,
}: IFormAccountFieldProps) {
  const fieldName = name ?? 'account';

  const {
    isLoading,
    isError,
    data: response,
    error: queryError,
  } = useFindAllQuery();

  const validator = useCallback(
    (value: string) => {
      return !!response?.data.some(({ name }) => value === name);
    },
    [response]
  );

  const [value, error, onChange] = useFormController(fieldName, {
    validator,
  });

  const labelId = `${id}-label`;

  return (
    <FormControl required={required} fullWidth={fullWidth} error={error}>
      <AsyncViewer isLoading={isLoading} isError={isError}>
        <AsyncLoading>
          <CircularProgress />
        </AsyncLoading>

        <AsyncError>{queryError?.error}</AsyncError>

        <AsyncData>
          <InputLabel id={labelId}>Account</InputLabel>
          <Select
            id={id}
            name={fieldName}
            labelId={labelId}
            label="Account"
            variant="outlined"
            value={value}
            onChange={({ target: { value } }: SelectChangeEvent<string>) =>
              onChange(value)
            }
          >
            <MenuItem value="">None</MenuItem>
            {response?.data.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </AsyncData>
      </AsyncViewer>
    </FormControl>
  );
}
