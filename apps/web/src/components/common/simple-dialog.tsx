import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { PropsWithChildren } from 'react';

export interface ISimpleDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const SimpleDialog: React.FC<PropsWithChildren<ISimpleDialogProps>> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <Box mt={2}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};
