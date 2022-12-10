import { PropsWithChildren } from 'react';

import {
  ButtonProps,
  DialogProps,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { Box, Button, DialogContent, DialogTitle } from '@mui/material';
import theme from '../../theme';
import { ResponsiveDialog } from './ResponsiveDialog';

export interface IDeleteDialogProps {
  open: DialogProps['open'];
  title: string;
  onClose: DialogProps['onClose'];
  onCancel: ButtonProps['onClick'];
  onDelete: ButtonProps['onClick'];
}

export const DeleteDialog: React.FC<PropsWithChildren<IDeleteDialogProps>> = ({
  open,
  title,
  onClose,
  onCancel,
  onDelete,
  children,
}) => {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <ResponsiveDialog
      fullWidth={true}
      maxWidth={isXs ? 'xs' : 'sm'}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body1">
            Are you sure you want to delete?
          </Typography>
        </Box>

        <Stack spacing={2}>{children}</Stack>

        <Box mt={2} display="flex" flexDirection="row" justifyContent="end">
          <Button onClick={onCancel}>CANCEL</Button>
          <Button color="error" onClick={onDelete}>
            DELETE
          </Button>
        </Box>
      </DialogContent>
    </ResponsiveDialog>
  );
};
