import { Static } from '@sinclair/typebox';
import { HttpBadRequest, HttpNotFound } from '../commons/reply';
import { ComposeStatic, NotFound, OK } from '../helpers/responses';
import { EntryTypeModel, ArrayOfEntryTypeModel } from './model';

export const EntryTypeArrayOK = OK(ArrayOfEntryTypeModel);

export type TEntryTypeArrayOK = Static<typeof EntryTypeArrayOK['200']>;

export const EntryTypeOK = OK(EntryTypeModel);

export type TEntryTypeOK = Static<typeof EntryTypeOK['200']>;

export const EntryTypeRecord = {
  ...EntryTypeOK,
  ...NotFound(),
};

export type TEntryTypeRecord = ComposeStatic<typeof EntryTypeRecord>;

export const FindAll = {
  ...EntryTypeArrayOK,
  ...HttpBadRequest,
};

export type TFindAll = ComposeStatic<typeof FindAll>;

export type TFindAllData = ComposeStatic<typeof EntryTypeArrayOK>;

export type TFindAllError = ComposeStatic<typeof HttpBadRequest>;

export const FindOne = {
  ...EntryTypeOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TFindOne = ComposeStatic<typeof FindOne>;
