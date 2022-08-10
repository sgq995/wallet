import { PropsWithChildren } from 'react';

import { ButtonProps, DialogProps, useMediaQuery } from '@mui/material';

import { Box, Button, DialogContent, DialogTitle } from '@mui/material';
import theme from '../../theme';
import ResponsiveDialog from './ResponsiveDialog';

interface IDeleteDialogProps {
  open: DialogProps['open'];
  title: string;
  onClose: DialogProps['onClose'];
  onCancel: ButtonProps['onClick'];
  onDelete: ButtonProps['onClick'];
}

export default function DeleteDialog({
  open,
  title,
  onClose,
  onCancel,
  onDelete,
  children,
}: PropsWithChildren<IDeleteDialogProps>) {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <ResponsiveDialog
      fullWidth={true}
      maxWidth={isXs ? 'xs' : 'sm'}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}

        <Box mt={2} display="flex" flexDirection="row" justifyContent="end">
          <Button onClick={onCancel}>CANCEL</Button>
          <Button color="error" onClick={onDelete}>
            DELETE
          </Button>
        </Box>
      </DialogContent>
    </ResponsiveDialog>
  );
}
