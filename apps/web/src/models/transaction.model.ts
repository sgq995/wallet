import {
  ICashReadonly as ICashReadonlyModel,
  ICashMutable as ICashMutableModel,
} from './cash.model';
import { ITimePeriod } from './time-period.model';

interface ITransactionBaseModel {
  type: 'income' | 'expense';
  date: Date;
  description?: string;
  repeat?: boolean;
  period?: ITimePeriod;
  tags: string[];
  accountId?: number;
}

export interface ITransactionReadonlyModel extends ITransactionBaseModel {
  cash: ICashReadonlyModel;
}

export interface ITransactionMutableModel extends ITransactionBaseModel {
  cash: ICashMutableModel;
}
