import { Static } from '@sinclair/typebox';
import { HttpBadRequest, HttpNotFound } from '../commons/reply';
import { ComposeStatic, NotFound, OK } from '../helpers/responses';
import { AccountTypeModel, ArrayOfAccountTypeModel } from './model';

export const AccountTypeArrayOK = OK(ArrayOfAccountTypeModel);

export type TAccountTypeArrayOK = Static<typeof AccountTypeArrayOK['200']>;

export const AccountTypeOK = OK(AccountTypeModel);

export type TAccountTypeOK = Static<typeof AccountTypeOK['200']>;

export const AccountTypeRecord = {
  ...AccountTypeOK,
  ...NotFound(),
};

export type TAccountTypeRecord = ComposeStatic<typeof AccountTypeRecord>;

export const FindAll = {
  ...AccountTypeArrayOK,
  ...HttpBadRequest,
};

export type TFindAll = ComposeStatic<typeof FindAll>;

export const FindOne = {
  ...AccountTypeOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TFindOne = ComposeStatic<typeof FindOne>;
