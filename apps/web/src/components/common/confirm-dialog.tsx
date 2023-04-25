import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { PropsWithChildren } from 'react';

export interface IConfirmDialog {
  open: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
}

export const ConfirmDialog: React.FC<PropsWithChildren<IConfirmDialog>> = ({
  open,
  onClose,
  onCancel,
  onOk,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Box mt={2}>{children}</Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose?.();
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose?.();
            onOk?.();
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
