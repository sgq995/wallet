import { Static, Type } from '@sinclair/typebox';

import { Id } from '../custom-types/id';

export const AccountTypeModel = Type.Object({
  id: Id(),
  name: Type.String(),
});

export type TAccountTypeModel = Static<typeof AccountTypeModel>;

export const ArrayOfAccountTypeModel = Type.Array(AccountTypeModel);

export type TArrayOfAccountTypeModel = Static<typeof ArrayOfAccountTypeModel>;
