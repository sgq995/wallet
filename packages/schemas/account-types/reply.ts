import { NotFound, OK } from '../helpers/responses';
import { AccountTypeModel, ArrayOfAccountTypeModel } from './model';

export const AccountTypeArrayOK = OK(ArrayOfAccountTypeModel);

export const AccountTypeOK = OK(AccountTypeModel);

export const AccountTypeRecord = {
  ...AccountTypeOK,
  ...NotFound(),
};
