import { useMutation, useQuery } from 'react-query';

import { Request } from 'schemas/accounts';

import accountsService from '../services/accounts';

export const key = 'accounts';

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery([key, 'findAll', query], ({ signal }) =>
    accountsService.findAll(query, { signal })
  );
}

export function useAddOneMutation() {
  return useMutation([key, 'addOne'], (body: Request.TAddOne) =>
    accountsService.addOne(body)
  );
}

export function useFindOneQuery(id: Request.TParams['id']) {
  return useQuery([key, 'findOne', id], ({ signal }) =>
    accountsService.findOne(id, { signal })
  );
}

export function useUpdateOneMutation() {
  return useMutation(
    [key, 'updateOne'],
    ({ id, body }: { id: Request.TParams['id']; body: Request.TUpdateOne }) =>
      accountsService.updateOne(id, body)
  );
}

export function useRemoveOneMutation() {
  return useMutation([key, 'removeOne'], (id: Request.TParams['id']) =>
    accountsService.removeOne(id)
  );
}
