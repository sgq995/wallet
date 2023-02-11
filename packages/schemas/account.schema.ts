import { Static, Type } from '@sinclair/typebox';
import { WithId } from '@wallet/utilities/schema.utility';
import { RestCashBaseSchema } from './cash.schema';
import { RestCurrencySchema } from './currency.schema';

const base = {
  label: Type.String(),
  startingBalance: Type.Optional(RestCashBaseSchema),
  balance: RestCashBaseSchema,
};

export const RestAccountSchema = Type.Object({
  ...base,
  currency: WithId(RestCurrencySchema),
});

export type TRestAccountSchema = Static<typeof RestAccountSchema>;

export const RestCreateAccountSchema = Type.Object({
  ...base,
  currencyId: Type.Integer(),
});

export type TRestCreateAccountSchema = Static<typeof RestCreateAccountSchema>;
