import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { AccountsForm } from './accounts-form';
import { AccountsFormCreateButton } from './accounts-form-create-button';

export interface IAccountsCreateDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const AccountsCreateDialog: React.FC<
  IAccountsCreateDialogProps
> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <AccountsForm>
          <Box display="flex" alignItems="center">
            <AccountsFormCreateButton />
          </Box>
        </AccountsForm>
      </DialogContent>
    </Dialog>
  );
};
