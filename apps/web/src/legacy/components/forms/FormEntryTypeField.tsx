import { useCallback } from 'react';

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

import { useFindAllQuery } from '../../hooks/entry-types';

import AsyncViewer, {
  AsyncData,
  AsyncError,
  AsyncLoading,
} from '../AsyncViewer';
import { useControlledFormComponent } from '@wallet/forms';
import { toInteger } from 'lodash';

export interface IFormEntryTypeFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: FormControlProps['required'];
  id?: SelectProps['id'];
  name?: SelectProps['name'];
}

export function FormEntryTypeField({
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
    (value: number) => {
      return !!response?.data.some(({ id }) => value === id);
    },
    [response]
  );

  const { value, onChange, isValid } = useControlledFormComponent<number>({
    name: fieldName,
    validator,
  });

  return (
    <FormControl required={required} fullWidth={fullWidth} error={!isValid}>
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
            onChange={({ target: { value } }: SelectChangeEvent<number>) =>
              onChange(toInteger(value))
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
