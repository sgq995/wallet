import { useMutation, useQueryClient } from 'react-query';
import { AccountsService, TAccountBody } from '../../services';
import { ACCOUNTS_KEY } from './accounts.key';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation(
    [ACCOUNTS_KEY],
    (account: TAccountBody) => AccountsService.add(account),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: [ACCOUNTS_KEY] });
      },
    }
  );
}
