import { Box } from '@mui/material';
import { AccountsGridLoader } from '../components/accounts';

export default function Accounts() {
  return (
    <Box component="main" padding={2}>
      <AccountsGridLoader />
    </Box>
  );
}
