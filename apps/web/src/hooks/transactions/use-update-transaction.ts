import { useMutation, useQueryClient } from 'react-query';
import {
  TPartialTransactionBody,
  TransactionsService,
  TTransactionParams,
} from '../../services';
import { TRANSACTIONS_KEY } from './transactions.key';

export interface ITransactionUpdateMutation {
  params: TTransactionParams;
  transaction: TPartialTransactionBody;
}

export function useUpdateTransactions() {
  const queryClient = useQueryClient();

  return useMutation(
    [TRANSACTIONS_KEY, 'update'],
    ({ params, transaction }: ITransactionUpdateMutation) =>
      TransactionsService.update(params, transaction),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_KEY] });
      },
    }
  );
}
