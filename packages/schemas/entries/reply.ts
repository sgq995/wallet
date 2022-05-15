import { Static } from '@sinclair/typebox';

import { HttpBadRequest, HttpNotFound } from '../commons/reply';

import { ComposeStatic, Created, OK } from '../helpers/responses';
import { ArrayOfEntryModel, EntryModel } from './model';

export const EntryArrayOK = OK(ArrayOfEntryModel);

export type TEntryArrayOK = Static<typeof EntryArrayOK['200']>;

export const EntryCreated = Created(EntryModel);

export type TEntryCreated = Static<typeof EntryCreated['201']>;

export const EntryOK = OK(EntryModel);

export type TEntryOK = Static<typeof EntryOK['200']>;

export const EntryRecord = {
  ...EntryOK,
  ...HttpNotFound,
};

export type TEntryRecord = ComposeStatic<typeof EntryRecord>;

export const FindAll = {
  ...EntryArrayOK,
  ...HttpBadRequest,
};

export type TFindAll = ComposeStatic<typeof FindAll>;

export type TFindAllData = ComposeStatic<typeof EntryArrayOK>;

export type TFindAllError = ComposeStatic<typeof HttpBadRequest>;

export const AddOne = {
  ...EntryCreated,
  ...HttpBadRequest,
};

export type TAddOne = ComposeStatic<typeof AddOne>;

export const FindOne = {
  ...EntryOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TFindOne = ComposeStatic<typeof FindOne>;

export const UpdateOne = {
  ...EntryOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TUpdateOne = ComposeStatic<typeof UpdateOne>;

export const RemoveOne = {
  ...EntryOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TRemoveOne = ComposeStatic<typeof RemoveOne>;
