import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { Typography } from '@mui/material';

import { EntryList } from '../components/entries/EntryList';

export default function Home() {
  return (
    <SessionAuth>
      <Typography variant="h1">Home</Typography>

      <EntryList />
    </SessionAuth>
  );
}
