import dynamic from 'next/dynamic';

import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

import EntryPaper from '../components/EntryPaper';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '../components/Material';
import { useFindAllQuery, useRemoveOneMutation } from '../hooks/entries';
import { TArrayOfEntryModel } from '../services/entries';
import AsyncViewer, {
  AsyncData,
  AsyncError,
  AsyncLoading,
} from '../components/AsyncViewer';
import { useState } from 'react';
import { yyyyMMdd } from '../utils/date-utils';
import AddEntryForm from '../components/entries/AddEntryForm';

const ThirdPartyEmailPasswordAuthNoSSR = dynamic(
  new Promise<typeof ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>(
    (res) => res(ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth)
  ),
  { ssr: false }
);

interface EntryListProps {
  data: TArrayOfEntryModel;
}

function EntryList({ data }: EntryListProps) {
  const { mutate } = useRemoveOneMutation();

  const [id, setId] = useState(-1);
  const [open, setOpen] = useState(false);

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

  if (data.length === 0) {
    return <>Empty</>;
  }

  return (
    <>
      <Stack spacing={2}>
        {data.map(({ description, date, id, transaction }, index) => (
          <EntryPaper
            key={index}
            description={description}
            units={transaction.units}
            cents={transaction.cents}
            date={date}
            onDelete={() => handleDeleteConfirm(id)}
          />
        ))}
      </Stack>

      <Dialog open={open}>
        <DialogTitle>Delete Entry</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete?
          </Typography>

          {data
            .filter(({ id: dataId }) => dataId === id)
            .map(({ description, date, transaction }) => (
              <Box display="flex" flexDirection="column">
                <Typography>{description}</Typography>
                <Typography>{yyyyMMdd(date)}</Typography>
                <Typography>{transaction.units}</Typography>
                <Typography>{transaction.cents}</Typography>
              </Box>
            ))}

          <Box mt={2} display="flex" flexDirection="row" justifyContent="end">
            <Button onClick={handleClose}>CANCEL</Button>
            <Button color="error" onClick={handleDelete}>
              DELETE
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Home() {
  const { isLoading, isError, data, error } = useFindAllQuery();

  return (
    <>
      <Typography variant="h1">Home</Typography>

      <AsyncViewer isLoading={isLoading} isError={isError}>
        <AsyncLoading>
          <CircularProgress />
        </AsyncLoading>

        <AsyncError>{error?.message}</AsyncError>

        <AsyncData>
          <EntryList data={data?.data} />
        </AsyncData>
      </AsyncViewer>
    </>
  );
}

export default function ProtectedHome() {
  return (
    <ThirdPartyEmailPasswordAuthNoSSR>
      <Home />
    </ThirdPartyEmailPasswordAuthNoSSR>
  );
}
