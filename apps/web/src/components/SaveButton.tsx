import type { ButtonProps } from '@mui/material/Button';

import { Button } from '@mui/material';

import { SaveIcon } from './IconsMaterial';

interface SaveButtonProps {
  onClick: ButtonProps['onClick'];
}

export default function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <Button
      type="button"
      variant="outlined"
      startIcon={<SaveIcon />}
      onClick={onClick}
    >
      SAVE
    </Button>
  );
}
