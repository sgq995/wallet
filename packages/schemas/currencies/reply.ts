import { Static } from '@sinclair/typebox';

import { HttpBadRequest, HttpNotFound } from '../commons/reply';

import { ComposeStatic, Created, OK } from '../helpers/responses';
import { ArrayOfCurrencyModel, CurrencyModel } from './model';

export const CurrencyArrayOK = OK(ArrayOfCurrencyModel);

export type TCurrencyArrayOK = Static<typeof CurrencyArrayOK['200']>;

export const CurrencyCreated = Created(CurrencyModel);

export type TCurrencyCreated = Static<typeof CurrencyCreated['201']>;

export const CurrencyOK = OK(CurrencyModel);

export type TCurrencyOK = Static<typeof CurrencyOK['200']>;

export const CurrencyRecord = {
  ...CurrencyOK,
  ...HttpNotFound,
};

export type TCurrencyRecord = ComposeStatic<typeof CurrencyRecord>;

export const FindAll = {
  ...CurrencyArrayOK,
  ...HttpBadRequest,
};

export type TFindAll = ComposeStatic<typeof FindAll>;

export type TFindAllData = ComposeStatic<typeof CurrencyArrayOK>;

export type TFindAllError = ComposeStatic<typeof HttpBadRequest>;

export const AddOne = {
  ...CurrencyCreated,
  ...HttpBadRequest,
};

export type TAddOne = ComposeStatic<typeof AddOne>;

export type TAddOneData = ComposeStatic<typeof CurrencyCreated>;

export type TAddOneError = ComposeStatic<typeof HttpBadRequest>;

export const FindOne = {
  ...CurrencyOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TFindOne = ComposeStatic<typeof FindOne>;

export const UpdateOne = {
  ...CurrencyOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TUpdateOne = ComposeStatic<typeof UpdateOne>;

export const RemoveOne = {
  ...CurrencyOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TRemoveOne = ComposeStatic<typeof RemoveOne>;
