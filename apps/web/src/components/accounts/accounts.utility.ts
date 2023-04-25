import { isUndefined } from 'lodash';
import { IAccountMutableModel } from '../../models/account.model';
import { TAccountsStore } from './accounts.types';

export function accountStoreToModel(
  store: TAccountsStore
): IAccountMutableModel;
export function accountStoreToModel(
  store: Partial<TAccountsStore>
): Partial<IAccountMutableModel>;
export function accountStoreToModel(
  store: TAccountsStore | Partial<TAccountsStore>
): IAccountMutableModel | Partial<IAccountMutableModel> {
  const label: IAccountMutableModel['label'] | undefined = store.label;

  const currencyId: IAccountMutableModel['currencyId'] | undefined =
    store.currency;

  const balance: IAccountMutableModel['balance'] | undefined =
    !isUndefined(store.units) && !isUndefined(store.cents)
      ? {
          units: store.units,
          cents: store.cents,
        }
      : undefined;

  const startingBalance: IAccountMutableModel['startingBalance'] | undefined =
    !isUndefined(store.startingUnits) && !isUndefined(store.startingCents)
      ? {
          units: store.startingUnits,
          cents: store.startingCents,
        }
      : undefined;

  return {
    label,
    currencyId,
    balance,
    startingBalance,
  };
}
