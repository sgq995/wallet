import {
  ComponentType,
  createElement,
  ElementType,
  forwardRef,
  Ref,
} from 'react';

import dynamic from 'next/dynamic';

import type { BoxProps } from '@mui/material/Box';
import type { BackdropProps } from '@mui/material/Backdrop';
import type { DialogTitleProps } from '@mui/material/DialogTitle';
import type { PaperProps } from '@mui/material/Paper';
import type { StackProps } from '@mui/material/Stack';
import type { ThemeProviderProps } from '@mui/system';
import type { TypographyProps } from '@mui/material/Typography';
import type {
  DefaultComponentProps,
  OverridableComponent,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/material/OverridableComponent';
import { ListItemProps } from '@mui/material';

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

export const Alert = dynamic(() => import('@mui/material/Alert'));

export const Backdrop = dynamic<BackdropProps>(
  () => import('@mui/material/Backdrop')
);

export const DynamicBox = dynamic<BoxProps>(() => import('@mui/material/Box'));

export const Box = <D extends ElementType, P>(props: BoxProps<D, P>) => (
  <DynamicBox {...props} />
);

export const BottomNavigation = dynamic(
  () => import('@mui/material/BottomNavigation')
);

export const BottomNavigationAction = dynamic(
  () => import('@mui/material/BottomNavigationAction')
);

export const Button = dynamic(() => import('@mui/material/Button'));

export const Card = dynamic(() => import('@mui/material/Card'));

export const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);

export const Collapse = dynamic(() => import('@mui/material/Collapse'));

export const Container = dynamic(() => import('@mui/material/Container'));

export const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'));

export const Dialog = dynamic(() => import('@mui/material/Dialog'));

export const DialogContent = dynamic(
  () => import('@mui/material/DialogContent')
);

export const DialogTitle = dynamic<DialogTitleProps>(
  () => import('@mui/material/DialogTitle')
);

export const Divider = dynamic(() => import('@mui/material/Divider'));

export const Fab = dynamic(() => import('@mui/material/Fab'));

export const FormControl = dynamic(() => import('@mui/material/FormControl'));

export const IconButton = dynamic(() => import('@mui/material/IconButton'));

export const InputLabel = dynamic(() => import('@mui/material/InputLabel'));

export const List = dynamic(() => import('@mui/material/List'));

export const DynamicListItem = dynamic(() => import('@mui/material/ListItem'));

export const ListItem = <D extends ElementType, P>(
  props: ListItemProps<D, P>
) => <DynamicListItem {...props} />;

export const ListItemText = dynamic(() => import('@mui/material/ListItemText'));

export const MenuItem = dynamic(() => import('@mui/material/MenuItem'));

export const Paper: ComponentType<PaperProps> = withDynamicForwardRef(
  import('@mui/material/Paper')
);

export const Select = dynamic(() => import('@mui/material/Select'));

export const DynamicStack = dynamic<StackProps>(import('@mui/material/Stack'));

export const Stack = <D extends ElementType, P>(props: StackProps<D, P>) => (
  <DynamicStack {...props} />
);

export const Tab = dynamic(() => import('@mui/material/Tab'));

export const Tabs = dynamic(() => import('@mui/material/Tabs'));

export const TextField = dynamic(() => import('@mui/material/TextField'));

// @mui/material/styles
export const ThemeProvider = dynamic<ThemeProviderProps>(() =>
  import('@mui/material/styles').then((mod) => mod.ThemeProvider)
);

export const Typography = dynamic<TypographyProps>(
  () => import('@mui/material/Typography')
);
