import { Save as SaveIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useFormStore } from '@wallet/form-store';
import { TIndex } from '@wallet/utilities/model.utility';
import { useUpdateTransactions } from '../../hooks/transactions/use-update-transaction';
import { TTransactionsStore } from './transactions.types';
import { transactionStoreToModel } from './transactions.utility';

export interface ITransactionsFormUpdateButton {
  id: TIndex;
}

export const TransactionsFormUpdateButton: React.FC<
  ITransactionsFormUpdateButton
> = ({ id }) => {
  const { snapshot } = useFormStore<TTransactionsStore>();
  const { isLoading, mutate } = useUpdateTransactions();

  const handleClick = () => {
    const data = snapshot();
    if (data.hasError === false) {
      const params = { id };
      const transaction = transactionStoreToModel(data);
      mutate({ params, transaction });
    }
  };

  return (
    <Button
      color="primary"
      fullWidth
      disabled={isLoading}
      endIcon={<SaveIcon />}
      onClick={handleClick}
    >
      Save
    </Button>
  );
};
