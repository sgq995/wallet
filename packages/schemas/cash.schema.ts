import { Static, Type } from '@sinclair/typebox';
import { IndexableSchema, IndexType } from '@wallet/utilities/schema.utility';
import { CurrencySchema } from './currency.schema';

export const CashBaseSchema = Type.Object({
  units: Type.Integer(),
  cents: Type.Integer(),
});

export type TCashBaseSchema = Static<typeof CashBaseSchema>;

export const CashReadonlySchema = Type.Intersect([
  CashBaseSchema,
  Type.Object({
    currency: Type.Intersect([CurrencySchema, IndexableSchema]),
  }),
]);

export type TCashReadonlySchema = Static<typeof CashReadonlySchema>;

export const CashMutableSchema = Type.Intersect([
  CashBaseSchema,
  Type.Object({
    currencyId: IndexType,
  }),
]);

export type TCashMutableSchema = Static<typeof CashMutableSchema>;
