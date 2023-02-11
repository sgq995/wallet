import { TIndex, TIndexable } from '@wallet/utilities/model.utility';
import { ICashBase } from './cash.model';
import { ICurrency } from './currency.model';

export interface IAccountBase {
  label: string;
  startingBalance?: ICashBase;
  balance: ICashBase;
}

export interface IAccountReadonly extends IAccountBase {
  currency: TIndexable<ICurrency>;
}

export interface IAccountMutable extends IAccountBase {
  currencyId: TIndex;
}
