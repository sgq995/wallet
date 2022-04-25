import { Static, Type } from '@sinclair/typebox';

import { Id } from '../types/id';

export const AccountModel = Type.Object({
  id: Id(),
  name: Type.String(),
  balance: Type.Number(),
});

export type TAccountModel = Static<typeof AccountModel>;

export const ArrayOfAccountModel = Type.Array(AccountModel);

export type TArrayOfAccountModel = Static<typeof ArrayOfAccountModel>;
