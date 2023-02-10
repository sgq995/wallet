import { Card, CardContent, Grid, Typography } from '@mui/material';

export interface IAccountsGridItemProps {
  label: string;
  balance: string;
}

export const AccountsGridItem: React.FC<IAccountsGridItemProps> = ({
  label,
  balance,
}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {label}
          </Typography>
          <Typography variant="h3">{balance}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
