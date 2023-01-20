import { Box, List, Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

export const DesktopNavigation: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box minHeight="100vh">
      <Paper
        square
        sx={{
          height: '100%',
          padding: 2,
        }}
      >
        <List sx={{ position: 'sticky', top: 0 }}>{children}</List>
      </Paper>
    </Box>
  );
};
