import { HttpError } from '@wallet/utilities/http.utility';
import { useInfiniteQuery } from 'react-query';
import { IPaging } from '../../models/paging.model';
import {
  AccountsService,
  TAccountQuery,
  TAccountReadResponse,
} from '../../services';
import { ACCOUNTS_KEY } from './accounts.key';

export function useInfiniteAccounts(query?: TAccountQuery) {
  return useInfiniteQuery<TAccountReadResponse, HttpError>(
    [ACCOUNTS_KEY, query],
    ({ signal, pageParam }) =>
      AccountsService.find({ ...query, paging: pageParam }),
    {
      getNextPageParam(lastPage, allPages): IPaging | undefined {
        if (!lastPage.paging) {
          return undefined;
        }

        if (lastPage.accounts.length < lastPage.paging.limit) {
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
