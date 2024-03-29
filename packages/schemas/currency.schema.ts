import { Static, Type } from '@sinclair/typebox';

export const CurrencySchema = Type.Object({
  precision: Type.Integer(),
  symbol: Type.String({ maxLength: 10 }),
  code: Type.String({ maxLength: 3 }),
  decimal: Type.String({ maxLength: 1 }),
  separator: Type.String({ maxLength: 1 }),
});

export type TCurrencySchema = Static<typeof CurrencySchema>;
