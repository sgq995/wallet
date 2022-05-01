import { useState } from 'react';
import EntryPaper from '../components/EntryPaper';
import { Stack, Typography } from '../components/Material';

export default function Home() {
  const [entries, setEntries] = useState(new Array(50).fill({}));

  return (
    <>
      <Typography variant="h1">Home</Typography>

      <Stack spacing={2}>
        {entries.map((_, index) => (
          <EntryPaper key={index} />
        ))}
      </Stack>
    </>
  );
}
