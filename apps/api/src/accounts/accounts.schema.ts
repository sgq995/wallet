import { Static, Type } from '@sinclair/typebox';
import { RestCashValueSchema } from '../schemas/cash.schema';
import { RestCurrencySchema } from '../schemas/currency.schema';
import { Indexable } from '../utilities/schema.utility';

export const RestAccountSchema = Type.Object({
  label: Type.String(),
  currency: Indexable(RestCurrencySchema),
  startingBalance: Type.Optional(RestCashValueSchema),
  balance: RestCashValueSchema,
});

export type TRestAccountSchema = Static<typeof RestAccountSchema>;

export const RestCreateAccountSchema = Type.Object({
  label: Type.String(),
  currencyId: Type.Integer(),
  startingBalance: Type.Optional(RestCashValueSchema),
  balance: RestCashValueSchema,
});

export type TRestCreateAccountSchema = Static<typeof RestCreateAccountSchema>;
