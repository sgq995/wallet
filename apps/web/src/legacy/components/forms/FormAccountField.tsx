import { useCallback } from 'react';

import { toInteger } from 'lodash';

import type {
  FormControlProps,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { useControlledFormComponent } from '@wallet/forms';

import { useFindAllQuery } from '../../legacy/hooks/accounts';

import AsyncViewer, {
  AsyncData,
  AsyncError,
  AsyncLoading,
} from '../AsyncViewer';

export interface IFormAccountFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: FormControlProps['required'];
  id?: SelectProps['id'];
  name?: SelectProps['name'];
}

export function FormAccountField({
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
    (value: number) => {
      return !!response?.data.some(({ id }) => value === id);
    },
    [response]
  );

  const { value, onChange, isValid } = useControlledFormComponent<number>({
    name: fieldName,
    validator,
  });

  const labelId = `${id}-label`;

  return (
    <FormControl required={required} fullWidth={fullWidth} error={!isValid}>
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
            onChange={({ target: { value } }: SelectChangeEvent<number>) =>
              onChange(toInteger(value))
            }
          >
            <MenuItem value="">None</MenuItem>
            {response?.data?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </AsyncData>
      </AsyncViewer>
    </FormControl>
  );
}
