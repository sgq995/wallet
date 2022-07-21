import { PropsWithChildren } from 'react';

import type { ButtonProps } from '@mui/material';

import { Box, Button } from '../Material';
import { SaveIcon } from '../IconsMaterial';

interface IFromContainerProps {
  onSubmit: ButtonProps['onClick'];
}

export default function FormContainer({
  onSubmit,
  children,
}: PropsWithChildren<IFromContainerProps>) {
  return (
    <Box p="2" component="form">
      {children}

      <Button
        type="button"
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={onSubmit}
      >
        SAVE
      </Button>
    </Box>
  );
}
