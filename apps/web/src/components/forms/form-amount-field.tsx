import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import {
  useUncontrolledFormComponent,
  useUncontrolledInput,
} from '@wallet/form-store';

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
  const fieldId = id ? `${id}-currency` : undefined;
  const fieldName = name ? `${name}-currency` : 'currency';
  const ref = useUncontrolledFormComponent(fieldName, getSelectValue, {
    defaultValue,
  });

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
    </TextField>
  );
};

export interface IFormDateFieldProps {
  id?: string;
  name?: string;
  required?: boolean;
}

export const FormAmountField: React.FC<IFormDateFieldProps> = ({
  id,
  name,
  required,
}) => {
  const unitsFieldId = id ? `${id}-units` : undefined;
  const unitsFieldName = name ? `${name}-units` : 'units';
  const unitsRef = useUncontrolledInput(unitsFieldName);

  const centsFieldId = id ? `${id}-cents` : undefined;
  const centsFieldName = name ? `${name}-cents` : 'cents';
  const centsRef = useUncontrolledInput(centsFieldName);

  return (
    <Stack direction="row" spacing={2}>
      <CurrencySelect id={id} name={name} required={required} />

      <TextField
        id={unitsFieldId}
        inputRef={unitsRef}
        label="Units"
        required={required}
      />

      <TextField
        id={centsFieldId}
        inputRef={centsRef}
        label="Cents"
        required={required}
      />
    </Stack>
  );
};
