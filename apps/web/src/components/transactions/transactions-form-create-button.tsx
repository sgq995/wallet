import { Add as AddIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useFormStore } from '@wallet/form-store';

export const TransactionsFormCreateButton: React.FC = () => {
  const { snapshot } = useFormStore();

  const handleClick = () => {
    console.log(snapshot());
  };

  return (
    <IconButton color="primary" sx={{ flexGrow: 0 }} onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
};
