import { Static, Type } from '@sinclair/typebox';
import { RestCashSchema } from './cash.schema';
import { RestTimePeriodSchema } from './time-period.schema';

export const RestTransactionSchema = Type.Object({
  type: Type.Union([Type.Literal('income'), Type.Literal('expense')]),
  cash: RestCashSchema,
  date: Type.String({ format: 'date-time' }),
  description: Type.Optional(Type.String()),
  repeat: Type.Optional(Type.Boolean()),
  period: Type.Optional(RestTimePeriodSchema),
  tags: Type.Array(Type.String()),
  accountId: Type.Optional(Type.Integer({ minimum: 0 })),
});

export type TRestTransactionSchema = Static<typeof RestTransactionSchema>;

export const RestTypedTransactionSchema = Type.Omit(RestTransactionSchema, [
  'type',
]);

export type TRestTypedTransactionSchema = Static<
  typeof RestTypedTransactionSchema
>;
