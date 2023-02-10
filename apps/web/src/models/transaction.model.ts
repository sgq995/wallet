import { ICashWithCurrency, ICashWithCurrencyId } from './cash.model';
import { ITimePeriod } from './time-period.model';

interface ITransactionBase {
  type: 'income' | 'expense';
  date: Date;
  description?: string;
  repeat?: boolean;
  period?: ITimePeriod;
  tags: string[];
  accountId?: number;
}

export interface ITransaction extends ITransactionBase {
  cash: ICashWithCurrency;
}

export interface ITransactionWithCurrencyId extends ITransactionBase {
  cash: ICashWithCurrencyId;
}
