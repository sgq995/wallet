import { Static, Type } from '@sinclair/typebox';
import { RestCashSchema } from '../schemas/cash.schema';
import { RestTimePeriodSchema } from '../schemas/time-period.schema';

export const RestTransactionSchema = Type.Object({
  type: Type.Union([Type.Literal('income'), Type.Literal('expense')]),
  cash: RestCashSchema,
  date: Type.String({ format: 'date-time' }),
  repeat: Type.Optional(Type.Boolean()),
  period: Type.Optional(RestTimePeriodSchema),
  tags: Type.Array(Type.String()),
});

export type TRestTransactionSchema = Static<typeof RestTransactionSchema>;

export const RestIncomeTransactionSchema = Type.Intersect([
  Type.Omit(RestTransactionSchema, ['type']),
  Type.Object({ type: Type.Literal('income') }),
]);

export type TRestIncomeTransactionSchema = Static<
  typeof RestIncomeTransactionSchema
>;

export const RestExpenseTransactionSchema = Type.Intersect([
  Type.Omit(RestTransactionSchema, ['type']),
  Type.Object({ type: Type.Literal('expense') }),
]);

export type TRestExpenseTransactionSchema = Static<
  typeof RestExpenseTransactionSchema
>;
