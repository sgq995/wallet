import FormTextField, { IFormTextFieldProps } from './FormTextField';

interface IFormDescriptionFieldProps {
  fullWidth?: IFormTextFieldProps['fullWidth'];
  required?: IFormTextFieldProps['required'];
  id?: IFormTextFieldProps['id'];
  name?: IFormTextFieldProps['name'];
}

export default function FormDescriptionField({
  fullWidth,
  required,
  id,
  name,
}: IFormDescriptionFieldProps) {
  const fieldName = name ?? 'description';

  return (
    <FormTextField
      fullWidth={fullWidth}
      required={required}
      id={id}
      name={fieldName}
      label="Description"
    />
  );
}
