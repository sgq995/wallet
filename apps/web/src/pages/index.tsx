import { Grid } from '@mui/material';
import { PageToolbar } from '../components/page';
import { TransactionsCreateButton } from '../components/transactions/transactions-create-buton';
import { TransactionsListLoader } from '../components/transactions/transactions-list-loader';

export default function Home() {
  return (
    <Grid component="main" container padding={2} spacing={2}>
      <PageToolbar>
        <TransactionsCreateButton />
      </PageToolbar>

      <Grid item xs={12}>
        <TransactionsListLoader />
      </Grid>
    </Grid>
  );
}
