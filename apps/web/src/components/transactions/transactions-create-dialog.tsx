import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { TransactionsForm } from './transactions-form';
import { TransactionsFormCreateButton } from './transactions-form-create-button';

export interface ITransactionsCreateDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const TransactionsCreateDialog: React.FC<
  ITransactionsCreateDialogProps
> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <TransactionsForm>
          <Box display="flex" alignItems="center">
            <TransactionsFormCreateButton />
          </Box>
        </TransactionsForm>
      </DialogContent>
    </Dialog>
  );
};
