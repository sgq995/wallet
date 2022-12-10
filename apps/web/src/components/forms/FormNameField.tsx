import { FormTextField, IFormTextFieldProps } from './FormTextField';

export interface IFormNameFieldProps {
  fullWidth?: IFormTextFieldProps['fullWidth'];
  required?: IFormTextFieldProps['required'];
  id?: IFormTextFieldProps['id'];
  name?: IFormTextFieldProps['name'];
}

export function FormNameField({
  fullWidth,
  required,
  id,
  name,
}: IFormNameFieldProps) {
  const fieldName = name ?? 'name';

  return (
    <FormTextField
      fullWidth={fullWidth}
      required={required}
      id={id}
      name={fieldName}
      label="Name"
    />
  );
}
