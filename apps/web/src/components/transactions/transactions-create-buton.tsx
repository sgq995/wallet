import { ToolbarCreateButton } from '../common/toolbar-create-button';
import { TransactionsCreateDialog } from './transactions-create-dialog';

export const TransactionsCreateButton: React.FC = () => {
  return (
    <ToolbarCreateButton
      renderDialog={(isOpen, handleClose) => (
        <TransactionsCreateDialog open={isOpen} onClose={handleClose} />
      )}
    />
  );
};
