import { IAppCashModel } from '../models/cash.model';
import { IAppTimePeriodModel } from '../models/time-period.model';

export interface IAppTransactionModel {
  id: number;
  type: 'income' | 'expense';
  cash: IAppCashModel;
  date: Date;
  repeat?: boolean;
  period?: IAppTimePeriodModel;
  tags: string[];
}
