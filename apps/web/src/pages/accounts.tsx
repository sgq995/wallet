import { Box, Grid, Stack } from '@mui/material';
import { AccountsGridLoader } from '../components/accounts';
import { AccountsForm } from '../components/accounts/accounts-form';
import { AccountsFormCreateButton } from '../components/accounts/accounts-form-create-button';

export default function Accounts() {
  return (
    <Stack width="100%" component="main" padding={2}>
      <Grid item xs={12} md={6} xl={4}>
        <AccountsForm>
          <Box display="flex" alignItems="center">
            <AccountsFormCreateButton />
          </Box>
        </AccountsForm>
      </Grid>

      <AccountsGridLoader />
    </Stack>
  );
}
