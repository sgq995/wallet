import { Add as AddIcon, Send as SendIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useFormStore } from '@wallet/form-store';
import { useCreateTransaction } from '../../hooks/transactions';
import { TTransactionsStore } from './transactions.types';

export const TransactionsFormCreateButton: React.FC = () => {
  const { snapshot } = useFormStore<TTransactionsStore>();
  const { isLoading, mutate } = useCreateTransaction();

  const handleClick = () => {
    const data = snapshot();
    if (data.hasError === false) {
      mutate({
        cash: {
          units: data.units,
          cents: data.cents,
          currencyId: data.currency,
        },
        date: new Date(data.year, data.month, data.day),
        tags: [],
        type: data.type,
        accountId: undefined,
        description: data.description,
        period: undefined,
        repeat: undefined,
      });
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
