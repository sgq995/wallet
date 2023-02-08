import { Box, Grid } from '@mui/material';
import { useQuery } from 'react-query';
import {
  TransactionsFormCreateButton,
  TransactionsForm,
} from '../components/transactions';
import { TransactionsListLoader } from '../components/transactions/transactions-list-loader';
import { CurrencyService } from '../services';

export default function Home() {
  return (
    <Grid component="main" container padding={2} spacing={2}>
      <Grid item xs={12} md={6} xl={4}>
        <TransactionsForm>
          <Box display="flex" alignItems="center">
            <TransactionsFormCreateButton />
          </Box>
        </TransactionsForm>
      </Grid>

      <Grid item xs={12}>
        <TransactionsListLoader />
      </Grid>
    </Grid>
  );
}
