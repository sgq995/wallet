import type { FormControlProps, TextFieldProps } from '@mui/material';
import { useState } from 'react';

import { FormControl, TextField } from '../Material';

import FormFieldValidator from './FormFieldValidator';

interface IFormCurrencyFieldProps {
  fullWidth: FormControlProps['fullWidth'];
  required: TextFieldProps['required'];
  id: TextFieldProps['id'];
  name: TextFieldProps['name'];
}

export function validateCurrency(value: string) {
  const asNumber = parseFloat(value);

  if (isNaN(asNumber)) {
    return false;
  }

  return true;
}

export default function FormCurrencyField({
  fullWidth,
  required,
  id,
  name,
}: IFormCurrencyFieldProps) {
  const [error, setError] = useState(false);

  const handleValidationSuccess = () => setError(false);

  const handleValidationFailure = () => setError(true);

  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <FormFieldValidator
        validate={validateCurrency}
        onSuccess={handleValidationSuccess}
        onFailure={handleValidationFailure}
      >
        <TextField
          required={required}
          inputMode="numeric"
          id={id}
          name={name}
          variant="outlined"
        />
      </FormFieldValidator>
    </FormControl>
  );
}
