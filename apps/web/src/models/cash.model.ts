import { TIndex, TIndexable } from '@wallet/utilities/model.utility';
import { ICurrency } from './currency.model';

export interface ICashBase {
  units: number;
  cents: number;
}

export interface ICashReadonly extends ICashBase {
  currency: TIndexable<ICurrency>;
}

export interface ICashMutable extends ICashBase {
  currencyId: TIndex;
}
