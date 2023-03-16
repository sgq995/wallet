import { AppBar, Box, Grid, Paper, Toolbar } from '@mui/material';
import { PageToolbarPortal } from '../components/page/page';
import { TransactionsCreateButton } from '../components/transactions/transactions-create-buton';
import { TransactionsListLoader } from '../components/transactions/transactions-list-loader';

export default function Home() {
  return (
    <Grid component="main" container padding={2} spacing={2}>
      <PageToolbarPortal>
        <TransactionsCreateButton />
      </PageToolbarPortal>

      <Grid item xs={12}>
        <TransactionsListLoader />
      </Grid>
    </Grid>
  );
}
