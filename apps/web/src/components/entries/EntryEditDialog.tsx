import { TEntryModel } from '@wallet/schemas/entries';
import { EditDialog, IEditDialogProps } from '../dialogs/EditDialog';
import { EntryForm } from './EntryForm';

export interface IEntryEditDialogProps {
  isOpen: boolean;
  onClose: IEditDialogProps['onClose'];
  entry: TEntryModel;
}

export const EntryEditDialog: React.FC<IEntryEditDialogProps> = ({
  isOpen,
  onClose,
  entry,
}) => {
  return (
    <EditDialog title="Edit Entry" isOpen={isOpen} onClose={onClose}>
      <EntryForm entry={entry} />
    </EditDialog>
  );
};
