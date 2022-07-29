import { DialogProps, useMediaQuery } from '@mui/material';

import theme from '../../theme';
import { Dialog } from '../Material';

interface IResponsiveDialogProps extends DialogProps {}

export default function ResponsiveDialog({ ...props }: IResponsiveDialogProps) {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog fullWidth scroll="body" maxWidth={isXs ? 'xs' : 'sm'} {...props} />
  );
}
