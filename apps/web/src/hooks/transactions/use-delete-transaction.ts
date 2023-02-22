import { useMutation, useQueryClient } from 'react-query';
import { TransactionsService } from '../../services';
import { TRANSACTIONS_KEY } from './transactions.key';

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation(
    [TRANSACTIONS_KEY, 'delete'],
    (id: number) => TransactionsService.remove({ id }),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_KEY] });
      },
    }
  );
}
