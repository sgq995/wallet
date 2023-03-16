import { Stack } from '@mui/material';
import { AccountsGridLoader } from '../components/accounts';
import { AccountsCreateButton } from '../components/accounts/accounts-create-button';
import { PageToolbar } from '../components/page';

export default function Accounts() {
  return (
    <Stack width="100%" component="main" padding={2}>
      <PageToolbar>
        <AccountsCreateButton />
      </PageToolbar>

      <AccountsGridLoader />
    </Stack>
  );
}
