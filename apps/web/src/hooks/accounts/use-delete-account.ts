import { useMutation, useQueryClient } from 'react-query';
import { AccountsService } from '../../services';
import { ACCOUNTS_KEY } from './accounts.key';

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation(
    [ACCOUNTS_KEY, 'delete'],
    (id: number) => AccountsService.remove({ id }),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [ACCOUNTS_KEY] });
      },
    }
  );
}
