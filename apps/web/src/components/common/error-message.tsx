import { Alert, Box, Typography } from '@mui/material';

export const ErrorMessage = () => {
  return (
    <Alert variant="outlined" severity="error">
      Something goes wrong
    </Alert>
  );
};
