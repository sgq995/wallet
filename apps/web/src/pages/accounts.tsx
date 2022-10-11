import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { Typography } from '@mui/material';

export default function Accounts() {
  return (
    <SessionAuth>
      <Typography variant="h1">Accounts</Typography>
    </SessionAuth>
  );
}
