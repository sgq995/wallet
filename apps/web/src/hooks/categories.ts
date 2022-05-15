import { useMutation, useQuery } from 'react-query';

import { Request } from 'schemas/categories';

import categoriesService from '../services/categories';

export const key = 'categories';

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery([key, 'findAll', query], ({ signal }) =>
    categoriesService.findAll(query, { signal })
  );
}

export function useAddOneMutation() {
  return useMutation([key, 'addOne'], (body: Request.TAddOne) =>
    categoriesService.addOne(body)
  );
}

export function useFindOneQuery(id: Request.TParams['id']) {
  return useQuery([key, 'findOne', id], ({ signal }) =>
    categoriesService.findOne(id, { signal })
  );
}

export function useUpdateOneMutation() {
  return useMutation(
    [key, 'updateOne'],
    ({ id, body }: { id: Request.TParams['id']; body: Request.TUpdateOne }) =>
      categoriesService.updateOne(id, body)
  );
}

export function useRemoveOneMutation() {
  return useMutation([key, 'removeOne'], (id: Request.TParams['id']) =>
    categoriesService.removeOne(id)
  );
}
