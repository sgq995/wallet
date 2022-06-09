import { useMutation, useQuery } from 'react-query';

import { Request, Reply } from 'schemas/entries';

import entriesService from '../services/entries';

export const key = 'entries';

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'findAll', query],
    ({ signal }) => entriesService.findAll(query, { signal })
  );
}

export function useAddOneMutation() {
  return useMutation<Reply.TAddOneData, Reply.TAddOneError, Request.TAddOne>(
    [key, 'addOne'],
    (body: Request.TAddOne) =>
      entriesService.addOne(body) as Promise<Reply.TAddOneData>
  );
}

export function useFindOneQuery(id: Request.TParams['id']) {
  return useQuery([key, 'findOne', id], ({ signal }) =>
    entriesService.findOne(id, { signal })
  );
}

export function useUpdateOneMutation() {
  return useMutation(
    [key, 'updateOne'],
    ({ id, body }: { id: Request.TParams['id']; body: Request.TUpdateOne }) =>
      entriesService.updateOne(id, body)
  );
}

export function useRemoveOneMutation() {
  return useMutation([key, 'removeOne'], (id: Request.TParams['id']) =>
    entriesService.removeOne(id)
  );
}
