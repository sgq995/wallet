import { Card, CardActionArea, CardContent, Grid } from '@mui/material';

export default function Home() {
  return (
    <Grid component="main" container>
      <Grid item>
        <Card variant="outlined">
          <CardActionArea>
            <CardContent>Bank Account</CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
