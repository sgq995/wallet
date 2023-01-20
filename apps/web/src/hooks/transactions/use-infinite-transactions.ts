import { HttpError } from '@wallet/utilities';
import { useInfiniteQuery } from 'react-query';
import {
  TransactionsService,
  TTransactionQuery,
  TTransactionResponse,
} from '../../services';
import { TRANSACTIONS_KEY } from './transactions.key';

export function useInfiniteTransactions(
  query?: TTransactionQuery,
  options?: Parameters<typeof useInfiniteQuery>[2]
) {
  return useInfiniteQuery<TTransactionResponse, HttpError>(
    [TRANSACTIONS_KEY, query],
    () => TransactionsService.find(query)
  );
}
