import { CssBaseline, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Feed } from '../feed';
import { Navigation } from '../navigation';
import { useDesktopFlag } from '../../hooks/use-desktop-flag';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const isDesktop = useDesktopFlag();

  return (
    <Stack
      direction="row"
      sx={[
        { minHeight: '100vh' },
        !isDesktop && {
          pb: 8,
        },
      ]}
    >
      <CssBaseline />

      <Navigation />

      {children}

      {/* <Feed /> */}
    </Stack>
  );
};
