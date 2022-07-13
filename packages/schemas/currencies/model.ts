import { Static, Type } from '@sinclair/typebox';

import { Id } from '../custom-types/id';

export const CurrencyModel = Type.Object({
  id: Id(),
  precision: Type.Integer(),
  symbol: Type.String({ maxLength: 10 }),
  code: Type.String({ maxLength: 3 }),
  decimal: Type.String({ maxLength: 1 }),
  separator: Type.String({ maxLength: 1 }),
});

export type TCurrencyModel = Static<typeof CurrencyModel>;

export const ArrayOfCurrencyModel = Type.Array(CurrencyModel);

export type TArrayOfCurrencyModel = Static<typeof ArrayOfCurrencyModel>;
