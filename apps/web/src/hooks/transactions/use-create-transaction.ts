import { useMutation, useQueryClient } from 'react-query';
import { TransactionsService, TTransactionBody } from '../../services';
import { TRANSACTIONS_KEY } from './transactions.key';

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation(
    [TRANSACTIONS_KEY, 'create'],
    (transaction: TTransactionBody) => TransactionsService.add(transaction),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_KEY] });
      },
    }
  );
}
