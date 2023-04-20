import { Box } from '@mui/material';
import { TransactionsForm } from './transactions-form';
import { TransactionsFormCreateButton } from './transactions-form-create-button';
import { SimpleDialog } from '../common/simple-dialog';

export interface ITransactionsCreateDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const TransactionsCreateDialog: React.FC<
  ITransactionsCreateDialogProps
> = ({ open, onClose }) => {
  return (
    <SimpleDialog open={open} onClose={onClose}>
      <TransactionsForm>
        <Box display="flex" alignItems="center">
          <TransactionsFormCreateButton />
        </Box>
      </TransactionsForm>
    </SimpleDialog>
  );
};
