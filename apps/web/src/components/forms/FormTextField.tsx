import type { FormControlProps, TextFieldProps } from '@mui/material';

import { FormControl, TextField } from '@mui/material';
import { useFormController } from './hooks';

export interface IFormTextFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: TextFieldProps['required'];
  id?: TextFieldProps['id'];
  name: TextFieldProps['name'];
  label: TextFieldProps['label'];
}

export default function FormTextField({
  fullWidth,
  required,
  id,
  name,
  label,
}: IFormTextFieldProps) {
  const fieldName = name;

  const [value, error, onChange] = useFormController(fieldName);

  return (
    <FormControl fullWidth={fullWidth} error={error}>
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
