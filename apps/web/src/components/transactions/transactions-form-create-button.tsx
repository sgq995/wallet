import { Send as SendIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useFormStore } from '@wallet/form-store';
import { useCreateTransaction } from '../../hooks/transactions';
import { TTransactionsStore } from './transactions.types';
import { transactionStoreToModel } from './transactions.utility';

export const TransactionsFormCreateButton: React.FC = () => {
  const { snapshot } = useFormStore<TTransactionsStore>();
  const { isLoading, mutate } = useCreateTransaction();

  const handleClick = () => {
    const data = snapshot();
    if (data.hasError === false) {
      const transaction = transactionStoreToModel(data);
      mutate(transaction);
    }
  };

  return (
    <Button
      color="primary"
      fullWidth
      disabled={isLoading}
      endIcon={<SendIcon />}
      onClick={handleClick}
    >
      Send
    </Button>
  );
};
