import type { FormControlProps, TextFieldProps } from '@mui/material';

import { FormControl, TextField } from '@mui/material';
import { useControlledFormComponent } from '@wallet/forms';

export interface IFormTextFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: TextFieldProps['required'];
  id?: TextFieldProps['id'];
  name: TextFieldProps['name'];
  label: TextFieldProps['label'];
}

export function FormTextField({
  fullWidth,
  required,
  id,
  name,
  label,
}: IFormTextFieldProps) {
  const fieldName = name ?? '';

  const { value, onChange, isValid } = useControlledFormComponent({
    name: fieldName,
  });

  return (
    <FormControl fullWidth={fullWidth} error={!isValid}>
      <TextField
        required={required}
        id={id}
        name={name}
        label={label}
        variant="outlined"
        multiline
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </FormControl>
  );
}
