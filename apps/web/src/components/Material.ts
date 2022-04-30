import dynamic from 'next/dynamic';

import type { BoxProps } from '@mui/material/Box';
import type { StackProps } from '@mui/material/Stack';
import type { ThemeProviderProps } from '@mui/system';
import type { TypographyProps } from '@mui/material/Typography';

export const Box = dynamic<BoxProps>(() => import('@mui/material/Box'));

export const BottomNavigation = dynamic(
  () => import('@mui/material/BottomNavigation')
);
export const BottomNavigationAction = dynamic(
  () => import('@mui/material/BottomNavigationAction')
);

export const Card = dynamic(() => import('@mui/material/Card'));

export const Container = dynamic(() => import('@mui/material/Container'));

export const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'));

export const Divider = dynamic(() => import('@mui/material/Divider'));

export const Fab = dynamic(() => import('@mui/material/Fab'));

export const IconButton = dynamic(() => import('@mui/material/IconButton'));

export const Paper = dynamic(() => import('@mui/material/Paper'));

export const Stack = dynamic<StackProps>(() => import('@mui/material/Stack'));

// @mui/material/styles
export const ThemeProvider = dynamic<ThemeProviderProps>(() =>
  import('@mui/material/styles').then((mod) => mod.ThemeProvider)
);

export const Typography = dynamic<TypographyProps>(() => import('@mui/material/Typography'));
