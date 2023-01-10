import { TIndexable } from '@wallet/utilities';
import { IAppCurrencyModel } from './currency.model';

export interface IAppCashValueModel {
  units: number;
  cents: number;
}

export interface IAppCashModel extends IAppCashValueModel {
  currency?: TIndexable<IAppCurrencyModel>;
  currencyId?: number;
}
