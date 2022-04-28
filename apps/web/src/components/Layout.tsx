import { PropsWithChildren, useState } from 'react';

import { createTheme } from '@mui/material/styles';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  CssBaseline,
  Fab,
  Stack,
  ThemeProvider,
} from './Material';

import {
  AccountsIcon,
  AddIcon,
  BalanceSheetIcon,
  CashFlowIcon,
  HomeIcon,
} from './IconsMaterial';

const theme = createTheme();

export default function Layout({ children }: PropsWithChildren<{}>) {
  const [value, setValue] = useState('');

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
          justifyContent="space-around"
          alignItems="flex-end"
          position="fixed"
          left={0}
          right={0}
          bottom={0}
        >
          <BottomNavigation
            showLabels
            sx={{ flexGrow: 1 }}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Accounts" icon={<AccountsIcon />} />
            <BottomNavigationAction
              label="Balance Sheet"
              icon={<BalanceSheetIcon />}
            />
            <BottomNavigationAction label="Cash Flow" icon={<CashFlowIcon />} />

            <Box paddingRight={2} sx={{ transform: 'translateY(-50%)' }}>
              <Fab color="primary">
                <AddIcon />
              </Fab>
            </Box>
          </BottomNavigation>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
