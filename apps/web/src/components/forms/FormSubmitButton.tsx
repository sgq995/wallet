import { useContext } from 'react';

import type { ButtonProps } from '@mui/material/Button';

import { Button } from '@mui/material';
import { SaveIcon } from '../IconsMaterial';

import { FormContext } from './context';
import { IFormState } from './state';

interface IFormSubmitButtonProps {
  onClick?: (state: IFormState) => void;
  disabledOnError?: boolean;
  resetOnSubmit?: boolean;
}

export default function FormSubmitButton({
  onClick,
  disabledOnError,
  resetOnSubmit,
}: IFormSubmitButtonProps) {
  const { state, dispatch } = useContext(FormContext);

  const isDisabled =
    disabledOnError && Object.values(state.error).some((value) => value);

  const handleClick = () => {
    onClick?.(state);

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
