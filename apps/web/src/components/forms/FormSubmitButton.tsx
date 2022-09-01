import { useContext } from 'react';

import type { ButtonProps } from '@mui/material/Button';

import { Button } from '@mui/material';
import { SaveIcon } from '../IconsMaterial';

import { FormContext } from './context';
import { IFormState } from './state';

interface IFormSubmitButtonProps<T> {
  onClick?: (state: T) => void;
  disabledOnError?: boolean;
  resetOnSubmit?: boolean;
}

export default function FormSubmitButton<T>({
  onClick,
  disabledOnError,
  resetOnSubmit,
}: IFormSubmitButtonProps<T>) {
  const { state, dispatch } = useContext(FormContext);

  const isDisabled =
    disabledOnError && Object.values(state.error).some((value) => value);

  const handleClick = () => {
    const data: T = Object.keys(state.data).reduce((data, name) => {
      let value: unknown = state.data[name];
      if (typeof state.parser[name] === 'function') {
        value = state.parser[name](value as string);
      }

      return { ...data, [name]: value };
    }, {} as T);

    onClick?.(data);

    if (resetOnSubmit) {
      dispatch.reset();
    }
  };

  return (
    <Button
      disabled={isDisabled}
      type="button"
      variant="outlined"
      startIcon={<SaveIcon />}
      onClick={handleClick}
    >
      SAVE
    </Button>
  );
}
