import { Static, Type } from '@sinclair/typebox';
import { IndexableSchema, IndexType } from '@wallet/utilities/schema.utility';
import { CashBaseSchema } from './cash.schema';
import { CurrencySchema } from './currency.schema';

export const AccountBaseSchema = Type.Object({
  label: Type.String(),
  startingBalance: Type.Optional(CashBaseSchema),
  balance: CashBaseSchema,
});

export type TAccountBaseSchema = Static<typeof AccountBaseSchema>;

export const AccountReadonlySchema = Type.Intersect([
  AccountBaseSchema,
  Type.Object({
    currency: Type.Intersect([CurrencySchema, IndexableSchema]),
  }),
]);

export type TAccountReadonlySchema = Static<typeof AccountReadonlySchema>;

export const AccountMutableSchema = Type.Intersect([
  AccountBaseSchema,
  Type.Object({
    currencyId: IndexType,
  }),
]);

export type TAccountMutableSchema = Static<typeof AccountMutableSchema>;
