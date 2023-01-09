import { BottomNavigation, Box, Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

export const MobileNavigation: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      position="fixed"
      left={0}
      bottom={0}
      right={0}
      zIndex={(theme) => theme.zIndex.appBar}
    >
      <Paper square sx={{ px: 2 }}>
        <BottomNavigation component="nav">{children}</BottomNavigation>
      </Paper>
    </Box>
  );
};
