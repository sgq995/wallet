import { TIndexable } from '@wallet/utilities/model.utility';
import { ICurrency } from './currency.model';

export interface ICashBase {
  units: number;
  cents: number;
}

export interface ICashWithCurrency extends ICashBase {
  currency: TIndexable<ICurrency>;
}

export interface ICashWithCurrencyId extends ICashBase {
  // TODO: number -> TId
  currencyId: number;
}
