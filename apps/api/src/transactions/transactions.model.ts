import { Static, Type } from '@sinclair/typebox';
import { ICash } from '../models/cash.model';
import { ITimePeriod } from '../models/time-period.model';

export const Cash = Type.Object({
  units: Type.Number(),
  cents: Type.Number(),
  currency: Type.Object({}),
});

export const PartialCash = Type.Partial(Cash);

export const TimePeriod = Type.Object({
  periodicity: Type.Union([
    Type.Literal('daily'),
    Type.Literal('weekly'),
    Type.Literal('monthly'),
    Type.Literal('quarterly'),
    Type.Literal('semerter'),
    Type.Literal('yearly'),
  ]),
  when: Type.Union([Type.Number(), Type.Literal('begin'), Type.Literal('end')]),
});

export const PartialTimePeriod = Type.Partial(TimePeriod);

export interface ITransaction {
  id: number;
  type: 'income' | 'expense';
  cash: ICash;
  date: Date;
  repeat?: boolean;
  period?: ITimePeriod;
  tags: string[];
}

export const TransactionModel = Type.Object({
  type: Type.Union([Type.Literal('income'), Type.Literal('expense')]),
  cash: Cash,
  date: Type.String(),
  repeat: Type.Optional(Type.Boolean()),
  period: Type.Optional(TimePeriod),
  tags: Type.Array(Type.String()),
});

export type TTransactionModel = Static<typeof TransactionModel>;

export const PartialTransactionModel = Type.Intersect([
  Type.Partial(
    Type.Object({
      cash: PartialCash,
      period: PartialTimePeriod,
    })
  ),
  Type.Partial(Type.Omit(TransactionModel, ['cash', 'period'])),
]);

export type TPartialTransactionModel = Static<typeof PartialTransactionModel>;

export const IncomeTransactionModel = Type.Intersect([
  Type.Omit(TransactionModel, ['type']),
  Type.Object({ type: Type.Literal('income') }),
]);

export type TIncomeTransactionModel = Static<typeof IncomeTransactionModel>;

export const ExpenseTransactionModel = Type.Intersect([
  Type.Omit(TransactionModel, ['type']),
  Type.Object({ type: Type.Literal('expense') }),
]);

export type TExpenseTransactionModel = Static<typeof ExpenseTransactionModel>;
