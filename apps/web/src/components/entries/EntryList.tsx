import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ListItem from '@mui/material/ListItem';

import { Reply } from 'schemas/entries';

import { yyyyMMdd } from '../../utils/date-utils';

import {
  useFindAllInfiniteQuery,
  useFindAllQuery,
  useRemoveOneMutation,
} from '../../hooks/entries';

import { Stack, List, CircularProgress, Typography, Box } from '../Material';
import EntryItem from './EntryItem';
import DeleteDialog from '../dialogs/DeleteDialog';
import { transactionToAmount } from './utils';
import { useSystemContext } from '../../contexts/system';
import { useNotificationSystem } from '../../contexts/notifications';

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
    take: 2,
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
  const [open, setOpen] = useState(false);

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
            onDelete={() => handleDeleteConfirm(props.id)}
          />
        ))}

        <ListItem ref={observerRef}></ListItem>

        <ListItem sx={{ justifyContent: 'center' }}>
          {isLoading && <CircularProgress />}
        </ListItem>
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
