import { PropsWithChildren } from 'react';

import theme from '../../theme';

import { Box, Container, CssBaseline, Stack, ThemeProvider } from '../Material';
import LayoutNavigation from './LayoutNavigation';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        pb={16}
      >
        <Container maxWidth="md">{children}</Container>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          position="fixed"
          left={0}
          right={0}
          bottom={0}
        >
          <LayoutNavigation />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
