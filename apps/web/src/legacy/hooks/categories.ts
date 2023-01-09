import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Request, Reply } from '@wallet/schemas/legacy/categories';

import categoriesService from '../services/categories';

export const key = 'categories';

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'findAll', query],
    ({ signal }) => categoriesService.findAll(query, { signal }),
    { refetchOnWindowFocus: false }
  );
}

export function useAddOneMutation() {
  const queryClient = useQueryClient();

  return useMutation<Reply.TAddOneData, Reply.TAddOneError, Request.TAddOne>(
    [key, 'addOne'],
    (body: Request.TAddOne) =>
      categoriesService.addOne(body) as Promise<Reply.TAddOneData>,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key, 'findAll']);
      },
    }
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
