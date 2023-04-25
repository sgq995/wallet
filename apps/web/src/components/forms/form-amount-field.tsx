import { Skeleton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import {
  useUncontrolledFormComponent,
  useUncontrolledInput,
} from '@wallet/form-store';
import { isEmpty, isUndefined, wrap } from 'lodash';
import { useCallback } from 'react';
import { useCurrencies } from '../../hooks/currencies/use-currencies';
import { flowOr } from '../../utilities/validator.utility';

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

  const validator = useCallback(
    (id: number) => {
      return !!data?.some((currency) => id === currency.id);
    },
    [data]
  );

  const fieldId = id ? `${id}-currency` : undefined;
  const fieldName = name ? `${name}-currency` : 'currency';
  const ref = useUncontrolledFormComponent(fieldName, getSelectValue, {
    defaultValue,
    parser: parseInt,
    validator,
  });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField />
      </Skeleton>
    );
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
      fullWidth
    >
      <option value="" disabled></option>
      {data?.map(({ id, code, symbol }) => (
        <option key={id} value={id.toString()}>
          {symbol} ({code})
        </option>
      ))}
    </TextField>
  );
};

const parseIfNotEmpty = wrap(parseInt, (func, string: string) => {
  if (isEmpty(string)) {
    throw new Error('String could not be empty');
  }

  return func.apply(this, [string]);
});

const isUndefinedOrFinite = flowOr(isUndefined, isFinite);

export interface IFormAmountFieldProps {
  id?: string;
  name?: string;
  required?: boolean;
  defaultCurrency?: string;
  defaultUnits?: string;
  defaultCents?: string;
  hideCurrency?: boolean;
}

export const FormAmountField: React.FC<IFormAmountFieldProps> = ({
  id,
  name,
  required,
  defaultCurrency,
  defaultUnits,
  defaultCents,
  hideCurrency,
}) => {
  const unitsFieldId = id ? `${id}-units` : undefined;
  const unitsFieldName = name ? `${name}Units` : 'units';
  const unitsRef = useUncontrolledInput(unitsFieldName, {
    parser: required ? parseInt : parseIfNotEmpty,
    validator: required ? isFinite : isUndefinedOrFinite,
  });

  const centsFieldId = id ? `${id}-cents` : undefined;
  const centsFieldName = name ? `${name}Cents` : 'cents';
  const centsRef = useUncontrolledInput(centsFieldName, {
    parser: required ? parseInt : parseIfNotEmpty,
    validator: required ? isFinite : isUndefinedOrFinite,
  });

  const shouldShowCurrency = !hideCurrency;

  return (
    <Stack direction="row" spacing={2}>
      {shouldShowCurrency && (
        <CurrencySelect
          id={id}
          name={name}
          defaultValue={defaultCurrency}
          required={required}
        />
      )}

      <TextField
        id={unitsFieldId}
        inputRef={unitsRef}
        defaultValue={defaultUnits}
        label="Units"
        required={required}
        fullWidth
      />

      <TextField
        id={centsFieldId}
        inputRef={centsRef}
        defaultValue={defaultCents}
        label="Cents"
        required={required}
        fullWidth
      />
    </Stack>
  );
};
