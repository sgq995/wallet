import { PropsWithChildren } from 'react';

import type { BoxProps } from '@mui/material';

import { Box } from '../Material';

import { FormContext } from './context';
import { useFormState } from './hooks';
import { IFormData } from './state';

export interface IFormProps
  extends BoxProps<
    'form',
    { initialState?: IFormData; onSubmit?: HTMLFormElement['onsubmit'] }
  > {}

export default function Form({
  initialState,
  onSubmit,
  children,
  ...props
}: PropsWithChildren<IFormProps>) {
  const [state, dispatch] = useFormState(initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <Box component="form" onSubmit={onSubmit} {...props}>
        {children}
      </Box>
    </FormContext.Provider>
  );
}
