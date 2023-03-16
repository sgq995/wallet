import { TIndex, TIndexable } from '@wallet/utilities/model.utility';
import { ICashBase } from './cash.model';
import { ICurrency } from './currency.model';

export interface IAccountBaseModel {
  label: string;
  startingBalance?: ICashBase;
  balance: ICashBase;
}

export interface IAccountReadonlyModel extends IAccountBaseModel {
  currency: TIndexable<ICurrency>;
}

export interface IAccountMutableModel extends IAccountBaseModel {
  currencyId: TIndex;
}
