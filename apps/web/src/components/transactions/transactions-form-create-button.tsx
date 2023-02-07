import { Add as AddIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useFormStore } from '@wallet/form-store';
import { TTransactionsStore } from './transactions.types';

export const TransactionsFormCreateButton: React.FC = () => {
  const { snapshot } = useFormStore<TTransactionsStore>();

  const handleClick = () => {
    const data = snapshot();
    if (data.hasError === false) {
      data.description
    }
    console.log(data);
  };

  return (
    <IconButton color="primary" sx={{ flexGrow: 0 }} onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
};
