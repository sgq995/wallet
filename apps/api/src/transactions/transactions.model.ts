import { IAppCashModel } from '../models/cash.model';
import { IAppTimePeriodModel } from '../models/time-period.model';

export interface IAppTransactionModel {
  type: 'income' | 'expense';
  cash: IAppCashModel;
  date: Date;
  description?: string;
  repeat?: boolean;
  period?: IAppTimePeriodModel;
  tags: string[];
  accountId?: number;
}
