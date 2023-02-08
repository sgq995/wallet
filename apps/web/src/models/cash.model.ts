import { TIndexable } from '@wallet/utilities/model.utility';
import { ICurrency } from './currency.model';

export interface ICashBase {
  units: number;
  cents: number;
}

export interface ICash extends ICashBase {
  currency: TIndexable<ICurrency>;
}

export interface ICashById extends ICashBase {
  // TODO: number -> TId
  currencyId: number;
}
