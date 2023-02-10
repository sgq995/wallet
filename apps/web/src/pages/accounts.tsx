import { Box, Stack } from '@mui/material';
import { AccountsGridLoader } from '../components/accounts';

export default function Accounts() {
  return (
    <Stack width="100%" component="main" padding={2}>
      <AccountsGridLoader />
    </Stack>
  );
}
