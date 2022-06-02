import { ComponentType, createElement, forwardRef, Ref } from 'react';

import dynamic from 'next/dynamic';

import type { BoxProps } from '@mui/material/Box';
import type { PaperProps } from '@mui/material';
import type { StackProps } from '@mui/material/Stack';
import type { ThemeProviderProps } from '@mui/system';
import type { TypographyProps } from '@mui/material/Typography';
import type {
  DefaultComponentProps,
  OverridableComponent,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/material/OverridableComponent';

function withForwardedRef<
  C extends React.ElementType,
  M extends OverridableTypeMap,
  P extends OverrideProps<M, C> | DefaultComponentProps<M>,
  R = 'ref' extends keyof P ? P['ref'] : Ref<unknown>
>(Component: OverridableComponent<M>, ref: R) {
  return function WithForwardedRef(props) {
    return <Component {...{ ...props, ref }} />;
  };
}

function withDynamicForwardRef<
  M extends OverridableTypeMap,
  C extends React.ElementType,
  P extends OverrideProps<M, C> | DefaultComponentProps<M>
>(importedModule: Promise<any>) {
  return forwardRef((props: any, ref) =>
    createElement(
      dynamic<P>(() =>
        importedModule.then((ComponentModule) =>
          withForwardedRef(ComponentModule.default, ref)
        )
      ),
      props
    )
  ) as OverridableComponent<M>;
}

export const Box = dynamic<BoxProps>(() => import('@mui/material/Box'));

export const BottomNavigation = dynamic(
  () => import('@mui/material/BottomNavigation')
);
export const BottomNavigationAction = dynamic(
  () => import('@mui/material/BottomNavigationAction')
);

export const Card = dynamic(() => import('@mui/material/Card'));

export const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);

export const Container = dynamic(() => import('@mui/material/Container'));

export const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'));

export const Divider = dynamic(() => import('@mui/material/Divider'));

export const Fab = dynamic(() => import('@mui/material/Fab'));

export const IconButton = dynamic(() => import('@mui/material/IconButton'));

export const Paper: ComponentType<PaperProps> = withDynamicForwardRef(
  import('@mui/material/Paper')
);

export const Stack: ComponentType<StackProps> = dynamic(
  import('@mui/material/Stack')
);

// @mui/material/styles
export const ThemeProvider = dynamic<ThemeProviderProps>(() =>
  import('@mui/material/styles').then((mod) => mod.ThemeProvider)
);

export const Typography = dynamic<TypographyProps>(
  () => import('@mui/material/Typography')
);
