import type {
  FormControlProps,
  SelectChangeEvent,
  TextFieldProps,
} from '@mui/material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { numberValidator, useControlledFormComponent } from 'forms';
import { toInteger } from 'lodash';

import { useSystemContext } from '../../contexts/system';

export interface IFormAmountFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: TextFieldProps['required'];
  id?: TextFieldProps['id'];
  name?: TextFieldProps['name'];
  currencyId?: TextFieldProps['id'];
  currencyName?: TextFieldProps['name'];
  unitsId?: TextFieldProps['id'];
  unitsName?: TextFieldProps['name'];
  centsId?: TextFieldProps['id'];
  centsName?: TextFieldProps['name'];
}

export function FormAmountField({
  fullWidth,
  required,
  id,
  name,
  currencyId,
  currencyName,
  unitsId,
  unitsName,
  centsId,
  centsName,
}: IFormAmountFieldProps) {
  const defaultName = name ? `${name}-` : '';
  const currencyFieldName = currencyName ?? `${defaultName}currency`;
  const unitsFieldName = unitsName ?? `${defaultName}units`;
  const centsFieldName = centsName ?? `${defaultName}cents`;

  const defaultId = id ? `${id}-` : '';
  const currencyLabelId = `${currencyId ?? `${defaultId}year`}-label`;

  const { currencies } = useSystemContext();

  const {
    value: currency,
    onChange: onCurrencyChange,
    isValid: isValidCurrency,
  } = useControlledFormComponent<number>({
    name: currencyFieldName,
    validator: numberValidator,
  });

  const {
    value: units,
    onChange: onUnitsChange,
    isValid: isValidUnits,
  } = useControlledFormComponent<number>({
    name: unitsFieldName,
    validator: numberValidator,
  });

  const {
    value: cents,
    onChange: onCentsChange,
    isValid: isValidCents,
  } = useControlledFormComponent<number>({
    name: centsFieldName,
    validator: numberValidator,
  });

  return (
    <>
      <FormControl
        required={required}
        fullWidth={fullWidth}
        error={!isValidCurrency}
      >
        <InputLabel id={currencyLabelId}>Currency</InputLabel>
        <Select
          id={currencyId}
          name={currencyFieldName}
          labelId={currencyLabelId}
          label="Currency"
          variant="outlined"
          value={currency}
          onChange={({ target: { value } }: SelectChangeEvent<number>) => {
            onCurrencyChange(toInteger(value));
          }}
        >
          {currencies?.map(({ id, code, symbol }) => (
            <MenuItem key={id} value={id.toString()}>
              ({code}) {symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth={fullWidth} error={!isValidUnits}>
        <TextField
          required={required}
          inputMode="numeric"
          id={unitsId}
          name={unitsFieldName}
          label="Units"
          variant="outlined"
          value={units}
          onChange={({ target: { value } }) => onUnitsChange(parseInt(value))}
        />
      </FormControl>

      <FormControl fullWidth={fullWidth} error={!isValidCents}>
        <TextField
          required={required}
          inputMode="numeric"
          id={centsId}
          name={centsFieldName}
          label="Cents"
          variant="outlined"
          value={cents}
          onChange={({ target: { value } }) => onCentsChange(parseInt(value))}
        />
      </FormControl>
    </>
  );
}
