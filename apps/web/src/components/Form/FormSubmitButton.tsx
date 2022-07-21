import type { ButtonProps } from '@mui/material/Button';

import { Button } from '../Material';

import { SaveIcon } from '../IconsMaterial';

interface IFormSubmitButtonProps {
  onClick: ButtonProps['onClick'];
}

export default function FormSubmitButton({ onClick }: IFormSubmitButtonProps) {
  return (
    <Button
      type="button"
      variant="outlined"
      startIcon={<SaveIcon />}
    >
      SAVE
    </Button>
  );
}
