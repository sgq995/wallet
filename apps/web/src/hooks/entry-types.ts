import { useQuery } from 'react-query';

import { Request } from 'schemas/entry-types';

import entryTypesService from '../services/entry-types';

export const key = 'entry-types';

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery([key, 'findAll', query], ({ signal }) =>
    entryTypesService.findAll(query, { signal })
  );
}

export function useFindOneQuery(id: Request.TParams['id']) {
  return useQuery([key, 'findOne', id], ({ signal }) =>
    entryTypesService.findOne(id, { signal })
  );
}
