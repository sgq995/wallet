import { HttpError } from '@wallet/utilities/http.utility';
import { isUndefined } from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { IPaging } from '../../models/paging.model';
import {
  AccountsService,
  TAccountQuery,
  TAccountReadResponse,
} from '../../services';
import { getNextPageParamFactory } from '../../utilities/paging.utility';
import { ACCOUNTS_KEY } from './accounts.key';

export function useInfiniteAccounts(query?: TAccountQuery) {
  return useInfiniteQuery<TAccountReadResponse, HttpError>(
    [ACCOUNTS_KEY, query],
    ({ signal, pageParam }) =>
      AccountsService.withSignal(signal).find({ ...query, paging: pageParam }),
    {
      getNextPageParam: getNextPageParamFactory(
        (lastPage) => lastPage.accounts.length
      ),
    }
  );
}
