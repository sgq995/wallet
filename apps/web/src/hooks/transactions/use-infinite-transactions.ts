import { HttpError } from '@wallet/utilities/http.utility';
import { useInfiniteQuery } from 'react-query';
import { IPaging } from '../../models/paging.model';
import {
  TransactionsService,
  TTransactionQuery,
  TTransactionReadResponse,
} from '../../services';
import { TRANSACTIONS_KEY } from './transactions.key';

export function useInfiniteTransactions(query?: TTransactionQuery) {
  return useInfiniteQuery<TTransactionReadResponse, HttpError>(
    [TRANSACTIONS_KEY, query],
    ({ signal, pageParam }) =>
      TransactionsService.find({ ...query, paging: pageParam }),
    {
      getNextPageParam(lastPage, allPages): IPaging | undefined {
        if (!lastPage.paging) {
          return undefined;
        }

        if (lastPage.transactions.length < lastPage.paging.limit) {
          return undefined;
        }

        return {
          offset: lastPage.paging.offset + lastPage.paging.limit,
          limit: lastPage.paging.limit,
        };
      },
    }
  );
}
