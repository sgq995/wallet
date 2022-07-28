import type {
  FormControlProps,
  SelectChangeEvent,
  TextFieldProps,
} from '@mui/material';
import { useSystemContext } from '../../contexts/system';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '../Material';
import { useFormController } from './hooks';

function filter(value: string) {
  if (value === '') {
    return '0';
  }

  return value.replaceAll(/[^0-9]/g, '').replaceAll(/^0/g, '');
}

function validator(value: string) {
  const asNumber = parseFloat(value);

  if (isNaN(asNumber)) {
    return false;
  }

  return true;
}

interface IFormAmountFieldProps {
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

export default function FormAmountField({
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

  const [currency, currencyError, onCurrencyChange] =
    useFormController(currencyFieldName);

  const [units, unitsError, onUnitsChange] = useFormController(unitsFieldName, {
    filter,
    validator,
  });

  const [cents, centsError, onCentsChange] = useFormController(centsFieldName);

  return (
    <>
      <FormControl
        required={required}
        fullWidth={fullWidth}
        error={currencyError}
      >
        <InputLabel id={currencyLabelId}>Currency</InputLabel>
        <Select
          id={currencyId}
          name={currencyFieldName}
          labelId={currencyLabelId}
          label="Currency"
          variant="outlined"
          value={currency}
          onChange={({ target: { value } }: SelectChangeEvent<string>) => {
            onCurrencyChange(value);
          }}
        >
          {currencies?.map(({ id, code, symbol }) => (
            <MenuItem key={id} value={id.toString()}>
              ({code}) {symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth={fullWidth} error={unitsError}>
        <TextField
          required={required}
          inputMode="numeric"
          id={unitsId}
          name={unitsFieldName}
          label="Units"
          variant="outlined"
          value={units}
          onChange={({ target: { value } }) => onUnitsChange(value)}
        />
      </FormControl>

      <FormControl fullWidth={fullWidth} error={centsError}>
        <TextField
          required={required}
          inputMode="numeric"
          id={centsId}
          name={centsFieldName}
          label="Cents"
          variant="outlined"
          value={cents}
          onChange={({ target: { value } }) => onCentsChange(value)}
        />
      </FormControl>
    </>
  );
}
