import { Button } from '@mui/material';
import {
  useFormDataSelector,
  useFormResetEvent,
  useFormValidityCheck,
} from '@wallet/forms';
import { SaveIcon } from '../IconsMaterial';

export interface IFormSubmitButtonProps<T> {
  onClick?: (state: T) => void;
  disabledOnError?: boolean;
  resetOnSubmit?: boolean;
}

export function FormSubmitButton<T>({
  onClick,
  disabledOnError,
  resetOnSubmit,
}: IFormSubmitButtonProps<T>) {
  const getData = useFormDataSelector();
  const validValues = useFormValidityCheck();
  const reset = useFormResetEvent();

  const isDisabled =
    disabledOnError && Object.values(validValues).some((isValid) => !isValid);

  const handleClick = () => {
    const data: any = getData();

    onClick?.(data);

    if (resetOnSubmit) {
      reset();
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
