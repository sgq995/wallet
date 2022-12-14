import { ICurrency } from './currency.model';

export interface ICash {
  units: number;
  cents: number;
  currency: ICurrency;
}
