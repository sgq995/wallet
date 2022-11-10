import { PropsWithChildren } from 'react';

import type { BoxProps } from '@mui/material';

import { Box } from '@mui/material';

import { FormProvider, IFormProviderProps } from 'forms';

export interface IFormProps
  extends BoxProps<
    'form',
    {
      onSubmit?: HTMLFormElement['onsubmit'];
    }
  > {
  defaultValues?: IFormProviderProps['defaultValues'];
}

export function Form({
  defaultValues,
  onSubmit,
  children,
  ...props
}: PropsWithChildren<IFormProps>) {
  return (
    <FormProvider defaultValues={defaultValues}>
      <Box component="form" onSubmit={onSubmit} {...props}>
        {children}
      </Box>
    </FormProvider>
  );
}
