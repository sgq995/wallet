import { PropsWithChildren } from 'react';

import { Box, DialogContent, DialogTitle } from '@mui/material';
import { IResponsiveDialogProps, ResponsiveDialog } from './ResponsiveDialog';

export interface IEditDialogProps {
  isOpen: IResponsiveDialogProps['open'];
  onClose: IResponsiveDialogProps['onClose'];
  title: string;
}

export const EditDialog: React.FC<PropsWithChildren<IEditDialogProps>> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <ResponsiveDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box p={2}>{children}</Box>
      </DialogContent>
    </ResponsiveDialog>
  );
};
