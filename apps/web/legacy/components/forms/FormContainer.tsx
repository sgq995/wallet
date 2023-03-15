import { Box, BoxProps } from '@mui/material';
import { FormProvider, IFormProviderProps } from '@wallet/forms';
import { PropsWithChildren } from 'react';

export interface IFormContainerProps
  extends BoxProps<
    'form',
    {
      onSubmit?: HTMLFormElement['onsubmit'];
    }
  > {
  defaultValues?: IFormProviderProps['defaultValues'];
}

export function FormContainer({
  defaultValues,
  onSubmit,
  children,
  ...props
}: PropsWithChildren<IFormContainerProps>) {
  return (
    <FormProvider defaultValues={defaultValues}>
      <Box component="form" onSubmit={onSubmit} {...props}>
        {children}
      </Box>
    </FormProvider>
  );
}
