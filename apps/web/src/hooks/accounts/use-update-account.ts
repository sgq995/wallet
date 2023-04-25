import { useUpdate } from '../use-update';
import { ACCOUNTS_KEY } from './accounts.key';
import {
  AccountsService,
  TAccountParams,
  TPartialAccountBody,
} from '../../services';

export interface IAccountUpdateMutation {
  params: TAccountParams;
  account: TPartialAccountBody;
}

export function useUpdateAccount() {
  return useUpdate(
    ACCOUNTS_KEY,
    ({ params, account }: IAccountUpdateMutation) =>
      AccountsService.update(params, account)
  );
}
