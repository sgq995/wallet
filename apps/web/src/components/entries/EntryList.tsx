import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ListItem from '@mui/material/ListItem';

import { Reply } from 'schemas/entries';

import { yyyyMMdd } from '../../utils/date-utils';

import {
  useFindAllInfiniteQuery,
  useFindAllQuery,
  useRemoveOneMutation,
} from '../../hooks/entries';

import {
  Stack,
  List,
  CircularProgress,
  Typography,
  Box,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import EntryItem from './EntryItem';
import DeleteDialog from '../dialogs/DeleteDialog';
import { transactionToAmount } from './utils';
import { useSystemContext } from '../../contexts/system';
import { useNotificationSystem } from '../../contexts/notifications';
import ResponsiveDialog from '../dialogs/ResponsiveDialog';
import EntryForm from './EntryForm';

interface IEntryListProps {}

function useIntersectionObserver(
  // callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): [(node: any) => void, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const lastIntersectionNode = useRef(null);
  const intersectionObserverRef = useRef(
    new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options)
  );

  const ref = useCallback((node) => {
    if (lastIntersectionNode.current) {
      intersectionObserverRef.current.unobserve(lastIntersectionNode.current);
      lastIntersectionNode.current = null;
    }

    if (node === null) {
      return;
    }

    lastIntersectionNode.current = node;
    intersectionObserverRef.current.observe(node);
  }, []);

  return [ref, isIntersecting];
}

export default function EntryList({}: IEntryListProps) {
  const { entryTypes } = useSystemContext();
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

  const [observerRef, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (hasNextPage && isIntersecting) {
      fetchNextPage();
    }
  }, [hasNextPage, isIntersecting, isFetching, fetchNextPage]);

  const [id, setId] = useState(-1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const body = useMemo<Reply.TFindAllData['data']>(
    () =>
      data?.pages?.reduce((all, current) => {
        return all.concat(current.data);
      }, []) ?? [],
    [data]
  );

  const selectedEntry = useMemo(
    () => body.find(({ id: entryId }) => id === entryId),
    [body, id]
  );

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEdit = (id) => {
    setId(id);
    setEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    mutate(id);
    setDeleteDialogOpen(false);
  };

  if (body.length === 0) {
    return <>Empty</>;
  }

  return (
    <>
      <List>
        {body.map((props) => (
          <EntryItem
            {...props}
            key={props.id}
            onEdit={() => handleEdit(props.id)}
            onDelete={() => handleDelete(props.id)}
          />
        ))}

        <ListItem ref={observerRef}></ListItem>

        <ListItem sx={{ justifyContent: 'center' }}>
          {isLoading && <CircularProgress />}
        </ListItem>
      </List>

      <ResponsiveDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      >
        <DialogTitle>New Data</DialogTitle>
        <DialogContent>
          <Box p={2}>
            <EntryForm entry={selectedEntry} />
          </Box>
        </DialogContent>
      </ResponsiveDialog>

      <DeleteDialog
        title="Delete Entry"
        open={deleteDialogOpen}
        onCancel={handleClose}
        onClose={handleClose}
        onDelete={handleDeleteConfirm}
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
