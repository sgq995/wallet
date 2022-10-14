import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { Request, Reply } from 'schemas/accounts';

import accountsService from '../services/accounts';

export const key = 'accounts';

export function useFindAllInfiniteQuery(query?: Request.TQuery) {
  return useInfiniteQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'infiniteFindAll', query],
    ({ signal, pageParam }) =>
      accountsService.findAll({ ...query, ...pageParam }, { signal }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam(lastPage, pages) {
        if (
          typeof query?.take === 'number' &&
          lastPage.data.length < query?.take
        ) {
          return undefined;
        }

        if (lastPage.data.length === 0) {
          return undefined;
        }

        return {
          skip: pages.reduce(
            (count, account) => count + account.data.length,
            0
          ),
        };
      },
    }
  );
}

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'findAll', query],
    ({ signal }) => accountsService.findAll(query, { signal }),
    { refetchOnWindowFocus: false }
  );
}

export function useAddOneMutation() {
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
