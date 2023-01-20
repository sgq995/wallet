import { CssBaseline, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Feed } from '../feed';
import { Navigation } from '../navigation';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction="row" sx={{ minHeight: '100vh' }}>
      <CssBaseline />

      <Navigation />

      {children}

      {/* <Feed /> */}
    </Stack>
  );
};
