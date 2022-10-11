import FormTextField, { IFormTextFieldProps } from './FormTextField';

interface IFormNameFieldProps {
  fullWidth?: IFormTextFieldProps['fullWidth'];
  required?: IFormTextFieldProps['required'];
  id?: IFormTextFieldProps['id'];
  name?: IFormTextFieldProps['name'];
}

export default function FormNameField({
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
