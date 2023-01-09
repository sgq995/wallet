import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { Request, Reply } from '@wallet/schemas/legacy/entries';

import entriesService from '../services/entries';

export const key = 'entries';

export function useFindAllInfiniteQuery(query?: Request.TQuery) {
  return useInfiniteQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'infiniteFindAll', query],
    ({ signal, pageParam }) =>
      entriesService.findAll({ ...query, ...pageParam }, { signal }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (
          typeof query.take === 'number' &&
          lastPage.data.length < query.take
        ) {
          return undefined;
        }

        if (lastPage.data.length === 0) {
          return undefined;
        }

        return {
          skip: pages.reduce((count, entry) => count + entry.data.length, 0),
        };
      },
    }
  );
}

export function useFindAllQuery(query?: Request.TQuery) {
  return useQuery<Reply.TFindAllData, Reply.TFindAllError>(
    [key, 'findAll', query],
    ({ signal }) => entriesService.findAll(query, { signal }),
    { refetchOnWindowFocus: false }
  );
}

export function useAddOneMutation() {
  const queryClient = useQueryClient();

  return useMutation<Reply.TAddOneData, Reply.TAddOneError, Request.TAddOne>(
    [key, 'addOne'],
    (body: Request.TAddOne) =>
      entriesService.addOne(body) as Promise<Reply.TAddOneData>,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key, 'infiniteFindAll']);
        queryClient.invalidateQueries([key, 'findAll']);
      },
    }
  );
}

export function useFindOneQuery(id: Request.TParams['id']) {
  return useQuery([key, 'findOne', id], ({ signal }) =>
    entriesService.findOne(id, { signal })
  );
}

export function useUpdateOneMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    [key, 'updateOne'],
    ({ id, body }: { id: Request.TParams['id']; body: Request.TUpdateOne }) =>
      entriesService.updateOne(id, body),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries([key, 'infiniteFindAll']);
        queryClient.invalidateQueries([key, 'findAll']);
        queryClient.invalidateQueries([key, 'findOne', id]);
      },
    }
  );
}

export function useRemoveOneMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    [key, 'removeOne'],
    (id: Request.TParams['id']) => entriesService.removeOne(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key, 'infiniteFindAll']);
        queryClient.invalidateQueries([key, 'findAll']);
      },
    }
  );
}
