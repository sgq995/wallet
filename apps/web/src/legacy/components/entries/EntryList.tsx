import { useEffect, useMemo, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { Reply, TEntryModel } from '@wallet/schemas/legacy/entries';

import { useNotificationSystem } from '../../contexts/notifications';

import {
  useFindAllInfiniteQuery,
  useRemoveOneMutation,
} from '../../hooks/entries';

import { EntryItem } from './EntryItem';
import { EntryDeleteDialog } from './EntryDeleteDialog';
import { EntryEditDialog } from './EntryEditDialog';
import { InfiniteList } from '../../components/infinite-list';

export interface IEntryListProps {}

export const EntryList: React.FC<IEntryListProps> = ({}) => {
  const { error: notifyError } = useNotificationSystem();

  const {
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    data,
    error,
  } = useFindAllInfiniteQuery({
    sort: 'date',
    desc: true,
  });
  const { mutate } = useRemoveOneMutation();

  useEffect(() => {
    if (isError) {
      notifyError('Something goes wrong');
    }
  }, [isError, notifyError]);

  const [id, setId] = useState(-1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const body = useMemo<Reply.TFindAllData['data']>(
    () =>
      data?.pages?.reduce((all, current) => {
        return all.concat(current.data);
      }, [] as Reply.TFindAllData['data']) ?? [],
    [data]
  );

  const selectedEntry = useMemo(
    () => body.find(({ id: entryId }) => id === entryId) ?? ({} as TEntryModel),
    [body, id]
  );

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEdit = (id: number) => {
    setId(id);
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    mutate(id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = (id: number) => {
    setId(id);
    setDeleteDialogOpen(true);
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Typography variant="body2">Something goes wrong</Typography>
        <Button>Retry</Button>
      </Box>
    );
  }

  if (body.length === 0) {
    return (
      <Box display="flex" justifyContent="center">
        <Button>Add Entry</Button>
      </Box>
    );
  }

  return (
    <>
      <InfiniteList
        list={body}
        isLoading={isLoading}
        isFetching={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={handleLoadMore}
      >
        {(entry: TEntryModel) => (
          <EntryItem
            entry={entry}
            key={entry.id}
            onEdit={() => handleEdit(entry.id)}
            onDelete={() => handleDeleteConfirm(entry.id)}
          />
        )}
      </InfiniteList>

      <EntryEditDialog
        entry={selectedEntry}
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />

      <EntryDeleteDialog
        entry={selectedEntry}
        isOpen={deleteDialogOpen}
        onCancel={handleClose}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </>
  );
};
