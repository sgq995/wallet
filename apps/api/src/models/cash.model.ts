import { TIndexable } from '../utilities/model.utility';
import { IAppCurrencyModel } from './currency.model';

export interface IAppCashValueModel {
  units: number;
  cents: number;
}

export interface IAppCashModel extends IAppCashValueModel {
  currency?: TIndexable<IAppCurrencyModel>;
  currencyId?: number;
}
