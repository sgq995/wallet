import { Static } from '@sinclair/typebox';

import { HttpBadRequest, HttpNotFound } from '../commons/reply';

import { ComposeStatic, Created, OK } from '../helpers/responses';
import { ArrayOfTagModel, TagModel } from './model';

export const TagArrayOK = OK(ArrayOfTagModel);

export type TTagArrayOK = Static<typeof TagArrayOK['200']>;

export const TagCreated = Created(TagModel);

export type TTagCreated = Static<typeof TagCreated['201']>;

export const TagOK = OK(TagModel);

export type TTagOK = Static<typeof TagOK['200']>;

export const TagRecord = {
  ...TagOK,
  ...HttpNotFound,
};

export type TTagRecord = ComposeStatic<typeof TagRecord>;

export const FindAll = {
  ...TagArrayOK,
  ...HttpBadRequest,
};

export type TFindAll = ComposeStatic<typeof FindAll>;

export type TFindAllData = ComposeStatic<typeof TagArrayOK>;

export type TFindAllError = ComposeStatic<typeof HttpBadRequest>;

export const AddOne = {
  ...TagCreated,
  ...HttpBadRequest,
};

export type TAddOne = ComposeStatic<typeof AddOne>;

export type TAddOneData = ComposeStatic<typeof TagCreated>;

export type TAddOneError = ComposeStatic<typeof HttpBadRequest>;

export const FindOne = {
  ...TagOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TFindOne = ComposeStatic<typeof FindOne>;

export const UpdateOne = {
  ...TagOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TUpdateOne = ComposeStatic<typeof UpdateOne>;

export const RemoveOne = {
  ...TagOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TRemoveOne = ComposeStatic<typeof RemoveOne>;
