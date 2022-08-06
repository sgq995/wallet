import { useMemo, useState } from 'react';
import { yyyyMMdd } from '../../utils/date-utils';

import { useFindAllQuery, useRemoveOneMutation } from '../../hooks/entries';

import { Stack, List, CircularProgress, Typography, Box } from '../Material';
import EntryItem from './EntryItem';
import DeleteDialog from '../dialogs/DeleteDialog';
import { transactionToAmount } from './utils';
import { useSystemContext } from '../../contexts/system';

interface IEntryListProps {}

export default function EntryList({}: IEntryListProps) {
  const { entryTypes } = useSystemContext();

  const {
    isLoading,
    isError,
    data: body,
    error,
  } = useFindAllQuery({ sort: 'date', desc: true });
  const { mutate } = useRemoveOneMutation();

  const [id, setId] = useState(-1);
  const [open, setOpen] = useState(false);

  const selectedEntry = useMemo(
    () => body?.data.find(({ id: entryId }) => id === entryId),
    [body, id]
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    mutate(id);
    setOpen(false);
  };

  const handleDeleteConfirm = (id) => {
    setId(id);
    setOpen(true);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <>{error}</>;
  }

  if (body.data.length === 0) {
    return <>Empty</>;
  }

  return (
    <>
      <List>
        {body.data.map((props) => (
          <EntryItem
            {...props}
            key={props.id}
            onDelete={() => handleDeleteConfirm(props.id)}
          />
        ))}
      </List>

      <DeleteDialog
        title="Delete Entry"
        open={open}
        onCancel={handleClose}
        onClose={handleClose}
        onDelete={handleDelete}
      >
        <Box mb={2}>
          <Typography variant="body1">
            Are you sure you want to delete?
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Typography variant="body2">
            {entryTypes.find(({ id }) => id === selectedEntry?.typeId)?.name}
          </Typography>

          <Typography variant="body2">{selectedEntry?.description}</Typography>

          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 'bold' }} variant="body2">
              {yyyyMMdd(selectedEntry?.date)}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body2">
              {transactionToAmount(selectedEntry?.transaction)}
            </Typography>
          </Stack>
        </Stack>
      </DeleteDialog>
    </>
  );
}
