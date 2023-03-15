import { HttpError } from '@wallet/utilities/http.utility';
import { useInfiniteQuery } from 'react-query';
import { IPaging } from '../../models/paging.model';
import {
  TransactionsService,
  TTransactionQuery,
  TTransactionReadResponse,
} from '../../services';
import { getNextPageParamFactory } from '../../utilities/paging.utility';
import { TRANSACTIONS_KEY } from './transactions.key';

export function useInfiniteTransactions(query?: TTransactionQuery) {
  return useInfiniteQuery<TTransactionReadResponse, HttpError>(
    [TRANSACTIONS_KEY, query],
    ({ signal, pageParam }) =>
      TransactionsService.withSignal(signal).find({
        ...query,
        paging: pageParam,
      }),
    {
      getNextPageParam: getNextPageParamFactory(
        (lastPage) => lastPage.transactions.length
      ),
    }
  );
}
