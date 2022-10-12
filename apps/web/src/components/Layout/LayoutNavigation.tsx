import { useState } from 'react';

import { useRouter } from 'next/router';

import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  DialogContent,
  DialogTitle,
  Fab,
  Tab,
  Tabs,
} from '@mui/material';

import { AccountsIcon, AddIcon, HomeIcon, LogoutIcon } from '../IconsMaterial';

import { AccountForm } from '../accounts';
import { CategoryForm } from '../categories';
import { EntryForm } from '../entries';
import { ResponsiveDialog } from '../dialogs/ResponsiveDialog';

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
];

export default function LayoutNavigation() {
  const router = useRouter();

  const [selectedForm, setSelectedForm] = useState(0);

  const handleFormChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedForm(newValue);
  };

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const handleClickOpen = () => setIsFormDialogOpen(true);

  const handleClickClose = () => setIsFormDialogOpen(false);

  const [route, setRoute] = useState(
    routes.findIndex((route) => {
      if (route.path !== '/') {
        return router.pathname.startsWith(route.path);
      } else {
        return router.pathname === route.path;
      }
    })
  );

  const handleOnChange = (event, newValue) => {
    if (!routes[newValue]) {
      return;
    }

    setRoute(newValue);
    router.push(routes[newValue].path);
  };

  const handleOnLogout = async () => {
    await signOut();
    router.push('/auth/');
  };

  return (
    <BottomNavigation
      showLabels
      sx={{ flexGrow: 1 }}
      value={route}
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

      <SessionAuth>
        <BottomNavigationAction
          label="Logout"
          icon={<LogoutIcon />}
          onClick={handleOnLogout}
        />
      </SessionAuth>

      <Box paddingRight={2} sx={{ transform: 'translateY(-50%)' }}>
        <Fab color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Box>

      {/* TODO: fullScreen */}
      <ResponsiveDialog open={isFormDialogOpen} onClose={handleClickClose}>
        {/* TODO: AppBar & Close Button */}
        <DialogTitle>New Data</DialogTitle>
        <DialogContent>
          <Box width="100%" borderBottom={1} sx={{ borderColor: 'divider' }}>
            <Tabs value={selectedForm} onChange={handleFormChange} centered>
              <Tab label="Entry" />
              <Tab label="Category" />
              <Tab label="Account" />
            </Tabs>
          </Box>
          <Box p={2}>
            <Box sx={{ display: selectedForm === 0 ? 'block' : 'none' }}>
              <EntryForm />
            </Box>

            <Box sx={{ display: selectedForm === 1 ? 'block' : 'none' }}>
              <CategoryForm />
            </Box>

            <Box sx={{ display: selectedForm === 2 ? 'block' : 'none' }}>
              <AccountForm />
            </Box>
          </Box>
        </DialogContent>
      </ResponsiveDialog>
    </BottomNavigation>
  );
}
