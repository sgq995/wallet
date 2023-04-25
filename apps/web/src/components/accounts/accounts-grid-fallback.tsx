import { Grid, Skeleton } from '@mui/material';
import { Repeat } from '../common';


export const AccountsGridFallback: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Repeat times={5}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Skeleton></Skeleton>
        </Grid>
      </Repeat>
    </Grid>
  );
};
