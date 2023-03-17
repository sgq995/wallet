import dynamic from 'next/dynamic';
import { ToolbarCreateButton } from '../common/toolbar-create-button';

const AccountsCreateDialog = dynamic(() =>
  import('./accounts-create-dialog').then((mod) => mod.AccountsCreateDialog)
);

export const AccountsCreateButton: React.FC = () => {
  return (
    <ToolbarCreateButton
      renderDialog={(isOpen, handleClose) => (
        <AccountsCreateDialog open={isOpen} onClose={handleClose} />
      )}
    />
  );
};
