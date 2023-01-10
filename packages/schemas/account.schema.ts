import { Static, Type } from '@sinclair/typebox';
import { Indexable } from '@wallet/utilities/schema.utility';
import { RestCashValueSchema } from './cash.schema';
import { RestCurrencySchema } from './currency.schema';

const base = {
  label: Type.String(),
  startingBalance: Type.Optional(RestCashValueSchema),
  balance: RestCashValueSchema,
};

export const RestAccountSchema = Type.Object({
  ...base,
  currency: Indexable(RestCurrencySchema),
});

export type TRestAccountSchema = Static<typeof RestAccountSchema>;

export const RestCreateAccountSchema = Type.Object({
  ...base,
  currencyId: Type.Integer(),
});

export type TRestCreateAccountSchema = Static<typeof RestCreateAccountSchema>;
