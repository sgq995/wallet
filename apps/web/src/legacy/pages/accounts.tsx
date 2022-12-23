import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { Typography } from '@mui/material';
import { AccountList } from '../../components/accounts';

export default function Accounts() {
  return (
    <SessionAuth>
      <Typography variant="h1">Accounts</Typography>

      <AccountList />
    </SessionAuth>
  );
}
