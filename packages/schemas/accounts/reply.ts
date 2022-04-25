import { Created, NotFound, OK } from '../helpers/responses';
import { AccountModel, ArrayOfAccountModel } from './model';

export const AccountArrayOK = OK(ArrayOfAccountModel);

export const AccountCreated = Created(AccountModel);

export const AccountOK = OK(AccountModel);

export const AccountRecord = {
  ...AccountOK,
  ...NotFound(),
};
