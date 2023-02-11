import { TIndex } from '@wallet/utilities/model.utility';
import { ICashMutableModel, ICashReadonlyModel } from '../models/cash.model';
import { ITimePeriodModel } from '../models/time-period.model';

export interface ITransactionBaseModel {
  type: 'income' | 'expense';
  date: Date;
  description?: string;
  repeat?: boolean;
  period?: ITimePeriodModel;
  tags: string[];
  accountId?: TIndex;
}

export interface ITransactionReadonlyModel extends ITransactionBaseModel {
  cash: ICashReadonlyModel;
}

export interface ITransactionMutableModel extends ITransactionBaseModel {
  cash: ICashMutableModel;
}
