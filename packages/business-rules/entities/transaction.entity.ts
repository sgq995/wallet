import { Account } from './account.entity';
import { Cash } from './cash.entity';
import { TimePeriod } from './time-period.entity';

export enum TTransactionType {
  Income = 'income',
  Expense = 'expense',
}

export class Transaction {
  constructor(
    public type: TTransactionType,
    public cash: Cash,
    public date: Date,
    public isRecurring: boolean,
    public recurringPeriod: TimePeriod,
    public tags: string[]
  ) {}
}
