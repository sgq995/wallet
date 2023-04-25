import { MutationFunction, useMutation, useQueryClient } from 'react-query';

export function useUpdate<TData = unknown, TVariables = unknown>(
  key: string,
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation([key, 'update'], mutationFn, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}
