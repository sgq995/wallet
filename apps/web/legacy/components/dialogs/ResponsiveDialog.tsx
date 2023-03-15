import { DialogProps, useMediaQuery } from '@mui/material';

import theme from '../../theme';
import { Dialog } from '@mui/material';

export interface IResponsiveDialogProps extends DialogProps {}

export const ResponsiveDialog: React.FC<IResponsiveDialogProps> = (props) => {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog fullWidth scroll="body" maxWidth={isXs ? 'xs' : 'sm'} {...props} />
  );
};
