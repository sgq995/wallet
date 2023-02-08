import { ICashBase } from './cash.model';
import { ICurrency } from './currency.model';

export interface IAccount {
  label: string;
  currency: ICurrency;
  startingBalance?: ICashBase;
  balance: ICashBase;
}
