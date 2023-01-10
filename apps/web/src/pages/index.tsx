import { Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { TransactionsList } from '../components/transactions';

export default function Home() {
  return (
    <Grid component="main" container padding={2} spacing={2}>
      <Grid item xs={12}>
        <TransactionsList />
      </Grid>
    </Grid>
  );
}
