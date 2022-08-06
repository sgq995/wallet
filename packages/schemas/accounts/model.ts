import { Static, Type } from '@sinclair/typebox';
import { CurrencyModel } from '../currencies/model';

import { Id } from '../custom-types/id';

export const AccountModel = Type.Object({
  id: Id(),
  name: Type.String(),
  balance: Type.Number(),
  // profileId: Id(),
  currency: Type.Optional(CurrencyModel),
  currencyId: Id(),
});

export type TAccountModel = Static<typeof AccountModel>;

export const ArrayOfAccountModel = Type.Array(AccountModel);

export type TArrayOfAccountModel = Static<typeof ArrayOfAccountModel>;
