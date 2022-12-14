import { IAppCurrencyModel } from './currency.model';

export interface IAppCashModel {
  units: number;
  cents: number;
  currency: IAppCurrencyModel;
}
