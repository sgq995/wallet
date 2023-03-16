import { ToolbarCreateButton } from '../common/toolbar-create-button';
import { AccountsCreateDialog } from './accounts-create-dialog';

export const AccountsCreateButton: React.FC = () => {
  return (
    <ToolbarCreateButton
      renderDialog={(isOpen, handleClose) => (
        <AccountsCreateDialog open={isOpen} onClose={handleClose} />
      )}
    />
  );
};
