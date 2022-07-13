import { Static, Type } from '@sinclair/typebox';
import { CurrencyModel } from '../currencies/model';

import { Id } from '../custom-types/id';

export const TransactionModel = Type.Object({
  id: Id(),
  units: Type.Integer(),
  cents: Type.Integer(),
  currency: Type.Optional(CurrencyModel),
  currencyId: Id(),
});

export type TTransactionModel = Static<typeof TransactionModel>;

export const ArrayOfTransactionModel = Type.Array(TransactionModel);

export type TArrayOfTransactionModel = Static<typeof ArrayOfTransactionModel>;
