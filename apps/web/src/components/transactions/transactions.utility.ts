import { isUndefined } from 'lodash';
import { ITransactionMutableModel } from '../../models/transaction.model';
import { TTransactionsStore } from './transactions.types';

export function transactionStoreToModel(
  store: TTransactionsStore
): ITransactionMutableModel;
export function transactionStoreToModel(
  store: Partial<TTransactionsStore>
): Partial<ITransactionMutableModel>;
export function transactionStoreToModel(
  store: TTransactionsStore | Partial<TTransactionsStore>
): ITransactionMutableModel | Partial<ITransactionMutableModel> {
  const cash: ITransactionMutableModel['cash'] | undefined =
    !isUndefined(store.units) &&
    !isUndefined(store.cents) &&
    !isUndefined(store.currency)
      ? {
          units: store.units,
          cents: store.cents,
          currencyId: store.currency,
        }
      : undefined;

  const date: ITransactionMutableModel['date'] | undefined =
    !isUndefined(store.year) &&
    !isUndefined(store.month) &&
    !isUndefined(store.day)
      ? new Date(store.year, store.month, store.day)
      : undefined;

  // TODO: const tags: ITransactionMutableModel['tags'] | undefined =

  return {
    cash,
    date,
    tags: [],
    type: store.type,
    accountId: undefined,
    description: store.description,
    period: undefined,
    repeat: undefined,
  };
}
