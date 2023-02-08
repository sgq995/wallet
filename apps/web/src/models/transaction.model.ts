import { ICash, ICashById } from './cash.model';
import { ITimePeriod } from './time-period.model';

export interface ITransaction {
  type: 'income' | 'expense';
  cash: ICash | ICashById;
  date: Date;
  description?: string;
  repeat?: boolean;
  period?: ITimePeriod;
  tags: string[];
  accountId?: number;
}
