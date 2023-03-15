import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import { isUndefined } from 'lodash';
import { IPaging } from '../models/paging.model';

export function pagingRestToApp(paging: TPaginableSchema['paging']): IPaging {
  return {};
}

export function getNextPageParamFactory<TResponse extends { paging: IPaging }>(
  getLastPageLength: (lastPage: TResponse) => number
) {
  return function getNextPageParam(
    lastPage: TResponse,
    _allPages: TResponse[]
  ): IPaging | undefined {
    if (!lastPage.paging) {
      return undefined;
    }

    if (
      !isUndefined(lastPage.paging.limit) &&
      getLastPageLength(lastPage) < lastPage.paging.limit
    ) {
      return undefined;
    }

    let offset = undefined;
    if (
      !isUndefined(lastPage.paging.offset) &&
      !isUndefined(lastPage.paging.limit)
    ) {
      offset = lastPage.paging.offset + lastPage.paging.limit;
    }

    let limit = undefined;
    if (!isUndefined(lastPage.paging.limit)) {
      limit = lastPage.paging.limit;
    }

    return {
      offset,
      limit,
    };
  };
}
