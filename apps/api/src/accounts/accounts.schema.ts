import { Static, Type } from '@sinclair/typebox';
import { RestCashValueSchema } from '../schemas/cash.schema';
import { RestCurrencySchema } from '../schemas/currency.schema';
import { Indexable } from '../utilities/schema.utility';

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
