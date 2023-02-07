import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import {
  useUncontrolledFormComponent,
  useUncontrolledInput,
} from '@wallet/form-store';
import { useCurrencies } from '../../hooks/currencies/use-currencies';

function getSelectValue(select: HTMLSelectElement) {
  return select.value;
}

interface ICurrencySelectProps {
  id?: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
}

const CurrencySelect: React.FC<ICurrencySelectProps> = ({
  id,
  name,
  defaultValue,
  required,
}) => {
  const { isLoading, isError, data } = useCurrencies();

  const fieldId = id ? `${id}-currency` : undefined;
  const fieldName = name ? `${name}-currency` : 'currency';
  const ref = useUncontrolledFormComponent(fieldName, getSelectValue, {
    defaultValue,
  });

  if (isLoading) {
    return <>loading</>;
  }

  if (isError) {
    return <>error</>;
  }

  return (
    <TextField
      id={fieldId}
      inputRef={ref}
      defaultValue={defaultValue}
      label="Currency"
      required={required}
      select
      SelectProps={{ native: true }}
    >
      <option value="" disabled></option>
      {data.map(({ id, code, symbol }) => (
        <option key={id} value={id.toString()}>
          {symbol} ({code})
        </option>
      ))}
    </TextField>
  );
};

export interface IFormDateFieldProps {
  id?: string;
  name?: string;
  required?: boolean;
  defaultCurrency?: string;
  defaultUnits?: string;
  defaultCents?: string;
}

export const FormAmountField: React.FC<IFormDateFieldProps> = ({
  id,
  name,
  required,
  defaultCurrency,
  defaultUnits,
  defaultCents,
}) => {
  const unitsFieldId = id ? `${id}-units` : undefined;
  const unitsFieldName = name ? `${name}-units` : 'units';
  const unitsRef = useUncontrolledInput(unitsFieldName);

  const centsFieldId = id ? `${id}-cents` : undefined;
  const centsFieldName = name ? `${name}-cents` : 'cents';
  const centsRef = useUncontrolledInput(centsFieldName);

  return (
    <Stack direction="row" spacing={2}>
      <CurrencySelect
        id={id}
        name={name}
        defaultValue={defaultCurrency}
        required={required}
      />

      <TextField
        id={unitsFieldId}
        inputRef={unitsRef}
        defaultValue={defaultUnits}
        label="Units"
        required={required}
      />

      <TextField
        id={centsFieldId}
        inputRef={centsRef}
        defaultValue={defaultCents}
        label="Cents"
        required={required}
      />
    </Stack>
  );
};