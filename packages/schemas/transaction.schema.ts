import { Static, Type } from '@sinclair/typebox';
import { IndexType } from '@wallet/utilities/schema.utility';
import { CashMutableSchema, CashReadonlySchema } from './cash.schema';
import { TimePeriodSchema } from './time-period.schema';

export const TransactionBaseSchema = Type.Object({
  type: Type.Union([Type.Literal('income'), Type.Literal('expense')]),
  date: Type.String({ format: 'date-time' }),
  description: Type.Optional(Type.String()),
  repeat: Type.Optional(Type.Boolean()),
  period: Type.Optional(TimePeriodSchema),
  tags: Type.Array(Type.String()),
  accountId: Type.Optional(IndexType),
});

export type TTransactionBaseSchema = Static<typeof TransactionBaseSchema>;

export const TransactionReadonlySchema = Type.Intersect([
  TransactionBaseSchema,
  Type.Object({
    cash: CashReadonlySchema,
  }),
]);

export type TTransactionReadonlySchema = Static<
  typeof TransactionReadonlySchema
>;

export const TypedTransactionReadonlySchema = Type.Omit(
  TransactionReadonlySchema,
  ['type']
);

export type TTypedTransactionReadonlySchema = Static<
  typeof TypedTransactionReadonlySchema
>;

export const TransactionMutableSchema = Type.Intersect([
  TransactionBaseSchema,
  Type.Object({
    cash: CashMutableSchema,
  }),
]);

export type TTransactionMutableSchema = Static<typeof TransactionMutableSchema>;

export const TypedTransactionMutableSchema = Type.Omit(
  TransactionMutableSchema,
  ['type']
);

export type TTypedTransactionMutableSchema = Static<
  typeof TypedTransactionMutableSchema
>;
