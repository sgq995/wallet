import { Save as SaveIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const TransactionsFormUpdateButton: React.FC = () => {
  return (
    <IconButton color="primary" sx={{ flexGrow: 0 }}>
      <SaveIcon />
    </IconButton>
  );
};
