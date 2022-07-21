import { Children, ReactElement } from 'react';

import type { TextFieldProps } from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';

import { TextField } from '../Material';

interface IFormFieldValidatorProps {
  children: ReactElement<TextFieldProps, typeof TextField>;
  validate: (value: string) => boolean;
  onSuccess: () => void;
  onFailure: () => void;
}

export default function FormFieldValidator({
  children,
  validate,
  onSuccess,
  onFailure,
}: IFormFieldValidatorProps) {
  const { required } = useFormControl();

  const childrenOnChange = children.props.onChange;
  children.props.onChange = (event) => {
    const { target } = event;
    const { value } = target;

    if (validate(value)) {
      onSuccess();
    } else {
      onFailure();
    }

    childrenOnChange?.(event);
  };

  return children;
}
