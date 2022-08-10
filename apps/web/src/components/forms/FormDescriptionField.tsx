import type { FormControlProps, TextFieldProps } from '@mui/material';

import { FormControl, TextField } from '@mui/material';
import { useFormController } from './hooks';

interface IFormDescriptionFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: TextFieldProps['required'];
  id?: TextFieldProps['id'];
  name?: TextFieldProps['name'];
}

export default function FormDescriptionField({
  fullWidth,
  required,
  id,
  name,
}: IFormDescriptionFieldProps) {
  const fieldName = name ?? 'description';

  const [value, error, onChange] = useFormController(fieldName);

  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <TextField
        required={required}
        id={id}
        name={name}
        label="Description"
        variant="outlined"
        multiline
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </FormControl>
  );
}
