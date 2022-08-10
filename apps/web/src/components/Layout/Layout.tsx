import { PropsWithChildren } from 'react';

import dynamic from 'next/dynamic';

import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

import theme from '../../theme';

import { Box, Container, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import LayoutNavigation from './LayoutNavigation';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const ThirdPartyEmailPasswordAuthNoSSR = dynamic(
  new Promise<typeof ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>(
    (res) => res(ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth)
  ),
  { ssr: false }
);

function NavigationBox() {
  const { doesSessionExist } = useSessionContext();

  if (!doesSessionExist) {
    return <></>;
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

        <ThirdPartyEmailPasswordAuthNoSSR requireAuth={false}>
          <NavigationBox />
        </ThirdPartyEmailPasswordAuthNoSSR>
      </Box>
    </ThemeProvider>
  );
}
