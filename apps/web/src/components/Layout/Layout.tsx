import { PropsWithChildren } from 'react';

import dynamic from 'next/dynamic';

import {
  SessionAuth,
  useSessionContext,
} from 'supertokens-auth-react/recipe/session';

import theme from '../../theme';

import {
  Box,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
} from '@mui/material';
import LayoutNavigation from './LayoutNavigation';

function NavigationBox() {
  const sessionContext = useSessionContext();

  if (sessionContext.loading) {
    return <></>;
  } else if (sessionContext.loading === false) {
    if (!sessionContext.doesSessionExist) {
      return <></>;
    }
  }

  return (
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
  );
}

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

        <NavigationBox />
      </Box>
    </ThemeProvider>
  );
}
