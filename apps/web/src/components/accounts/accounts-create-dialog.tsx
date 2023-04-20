import { Box } from '@mui/material';
import { AccountsForm } from './accounts-form';
import { AccountsFormCreateButton } from './accounts-form-create-button';
import { SimpleDialog } from '../common/simple-dialog';

export interface IAccountsCreateDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const AccountsCreateDialog: React.FC<IAccountsCreateDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <SimpleDialog open={open} onClose={onClose}>
      <AccountsForm>
        <Box display="flex" alignItems="center">
          <AccountsFormCreateButton />
        </Box>
      </AccountsForm>
    </SimpleDialog>
  );
};
