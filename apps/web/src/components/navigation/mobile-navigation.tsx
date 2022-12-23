import { BottomNavigation, Box, Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

export const MobileNavigation: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box position="fixed" left={0} bottom={0} right={0}>
      <Paper elevation={2}>
        <BottomNavigation component="nav">{children}</BottomNavigation>
      </Paper>
    </Box>
  );
};
