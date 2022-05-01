import { useState } from 'react';

import { useRouter } from 'next/router';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
} from '../Material';

import {
  AccountsIcon,
  AddIcon,
  BalanceSheetIcon,
  CashFlowIcon,
  HomeIcon,
} from '../IconsMaterial';

interface Route {
  path: string;
  label: string;
  icon: JSX.Element;
}

const routes: Route[] = [
  {
    path: '/',
    label: 'Home',
    icon: <HomeIcon />,
  },
  {
    path: '/accounts',
    label: 'Accounts',
    icon: <AccountsIcon />,
  },
  {
    path: '/balance_sheet',
    label: 'Balance Sheet',
    icon: <BalanceSheetIcon />,
  },
  {
    path: '/cash_flow',
    label: 'Cash Flow',
    icon: <CashFlowIcon />,
  },
];

export default function LayoutNavigation() {
  const router = useRouter();

  const [value, setValue] = useState(
    routes.findIndex((route) => {
      if (route.path !== '/') {
        return router.pathname.startsWith(route.path);
      } else {
        return router.pathname === route.path;
      }
    })
  );

  const handleOnChange = (event, newValue) => {
    setValue(newValue);
    router.push(routes[newValue].path);
  };

  return (
    <BottomNavigation
      showLabels
      sx={{ flexGrow: 1 }}
      value={value}
      onChange={handleOnChange}
    >
      {routes.map((route) => (
        <BottomNavigationAction
          key={route.path}
          label={route.label}
          icon={route.icon}
          onMouseOver={(event) => router.prefetch(route.path)}
        />
      ))}

      <Box paddingRight={2} sx={{ transform: 'translateY(-50%)' }}>
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Box>
    </BottomNavigation>
  );
}
