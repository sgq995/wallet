import { useQuery } from 'react-query';

import { Request, Reply } from '@wallet/schemas/legacy/entry-types';

import entryTypesService from '../services/entry-types';

export const key = 'entry-types';

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'findAll', query],
    ({ signal }) => entryTypesService.findAll(query, { signal }),
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
}

export function useFindOneQuery(id: Request.TParams['id']) {
  return useQuery(
    [key, 'findOne', id],
    ({ signal }) => entryTypesService.findOne(id, { signal }),
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
}
