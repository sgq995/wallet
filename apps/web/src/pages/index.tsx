import { useState } from 'react';

import { dehydrate, QueryClient, useQuery } from 'react-query';

import { Reply } from 'schemas/entries';

import EntryPaper from '../components/EntryPaper';
import { Stack, Typography } from '../components/Material';

export default function Home() {
  // const [entries, setEntries] = useState(new Array(50).fill({}));

  const { data } = useQuery<Reply.TEntryArrayOK>('entries', getAllEntries);

  return (
    <>
      <Typography variant="h1">Home</Typography>

      <Stack spacing={2}>
        {data?.data?.map((_, index) => (
          <EntryPaper key={index} />
        ))}
      </Stack>
    </>
  );
}

async function getAllEntries() {
  return fetch('http://localhost:5000/v1/entries').then((response) =>
    response.json()
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('entries', getAllEntries);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
