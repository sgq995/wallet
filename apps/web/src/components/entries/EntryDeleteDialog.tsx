import { Box, Stack, Typography } from '@mui/material';
import { TEntryModel } from 'schemas/entries';
import { useSystemContext } from '../../contexts/system';
import { yyyyMMdd } from '../../utilities/date.utility';
import { DeleteDialog, IDeleteDialogProps } from '../dialogs/DeleteDialog';
import { transactionToAmount } from './utils';

export interface IEntryDeleteDialogProps {
  isOpen: boolean;
  onCancel: IDeleteDialogProps['onCancel'];
  onClose: IDeleteDialogProps['onClose'];
  onDelete: IDeleteDialogProps['onDelete'];
  entry: TEntryModel;
}

export const EntryDeleteDialog: React.FC<IEntryDeleteDialogProps> = ({
  isOpen,
  onCancel,
  onClose,
  onDelete,
  entry,
}) => {
  const { entryTypes } = useSystemContext();

  return (
    <DeleteDialog
      title="Delete Entry"
      open={isOpen}
      onCancel={onCancel}
      onClose={onClose}
      onDelete={onDelete}
    >
      <Typography variant="body2">
        {entryTypes.find(({ id }) => id === entry.typeId)?.name}
      </Typography>

      <Typography variant="body2">{entry.description}</Typography>

      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 'bold' }} variant="body2">
          {yyyyMMdd(entry.date)}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} variant="body2">
          {transactionToAmount(entry.transaction)}
        </Typography>
      </Stack>
    </DeleteDialog>
  );
};
