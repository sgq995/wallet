import { Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { TransactionsInlineForm } from '../components/transactions';
import { TransactionsListLoader } from '../components/transactions/transactions-list-loader';
import { CurrencyService } from '../services';

export default function Home() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['currencies'],
    queryFn: () => CurrencyService.find(),
  });

  return (
    <Grid component="main" container padding={2} spacing={2}>
      <Grid item xs={12}>
        <TransactionsInlineForm />

        <TransactionsListLoader />
      </Grid>
    </Grid>
  );
}
