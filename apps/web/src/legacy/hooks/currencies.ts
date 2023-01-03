import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Request, Reply } from '@wallet/schemas/currencies';

import accountsService from '../services/currencies';

export const key = 'currencies';

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'findAll', query],
    ({ signal }) => accountsService.findAll(query, { signal }),
    { refetchOnWindowFocus: false }
  );
}

function useAddOneMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    [key, 'addOne'],
    (body: Request.TAddOne) => accountsService.addOne(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key, 'findAll']);
      },
    }
  );
}

export function useFindOneQuery(id: Request.TParams['id']) {
  return useQuery([key, 'findOne', id], ({ signal }) =>
    accountsService.findOne(id, { signal })
  );
}

function useUpdateOneMutation() {
  return useMutation(
    [key, 'updateOne'],
    ({ id, body }: { id: Request.TParams['id']; body: Request.TUpdateOne }) =>
      accountsService.updateOne(id, body)
  );
}

function useRemoveOneMutation() {
  return useMutation([key, 'removeOne'], (id: Request.TParams['id']) =>
    accountsService.removeOne(id)
  );
}
