import { ICashReadonly, ICashMutable } from './cash.model';
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

export interface ITransactionReadonly extends ITransactionBase {
  cash: ICashReadonly;
}

export interface ITransactionMutable extends ITransactionBase {
  cash: ICashMutable;
}
