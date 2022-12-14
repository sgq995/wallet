import { Static, Type } from '@sinclair/typebox';

export const RestCashSchema = Type.Object({
  units: Type.Number(),
  cents: Type.Number(),
  currency: Type.Object({}),
});

export type TRestCashSchema = Static<typeof RestCashSchema>;
