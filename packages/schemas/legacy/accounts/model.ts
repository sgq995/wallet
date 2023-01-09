import { Static, Type } from '@sinclair/typebox';

import { Id } from '../custom-types/id';
import { TransactionModel } from '../transactions/model';

export const AccountModel = Type.Object({
  id: Id(),
  name: Type.String(),
  transaction: Type.Optional(TransactionModel),
  transactionId: Id(),
});

export type TAccountModel = Static<typeof AccountModel>;

export const ArrayOfAccountModel = Type.Array(AccountModel);

export type TArrayOfAccountModel = Static<typeof ArrayOfAccountModel>;
