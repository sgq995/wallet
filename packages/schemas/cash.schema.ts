import { Static, Type } from '@sinclair/typebox';
import { WithId } from '@wallet/utilities/schema.utility';
import { RestCurrencySchema } from './currency.schema';

const value = {
  units: Type.Integer(),
  cents: Type.Integer(),
};

export const RestCashValueSchema = Type.Object({
  ...value,
});

export const RestCashSchema = Type.Union([
  Type.Object({
    ...value,
    currencyId: Type.Integer(),
  }),
  Type.Object({
    ...value,
    currency: WithId(RestCurrencySchema),
  }),
]);

export type TRestCashSchema = Static<typeof RestCashSchema>;
