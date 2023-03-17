import dynamic from 'next/dynamic';
import { ToolbarCreateButton } from '../common/toolbar-create-button';

const TransactionsCreateDialog = dynamic(() =>
  import('./transactions-create-dialog').then(
    (mod) => mod.TransactionsCreateDialog
  )
);

export const TransactionsCreateButton: React.FC = () => {
  return (
    <ToolbarCreateButton
      renderDialog={(isOpen, handleClose) => (
        <TransactionsCreateDialog open={isOpen} onClose={handleClose} />
      )}
    />
  );
};
