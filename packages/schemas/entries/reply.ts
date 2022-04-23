import {
  ArrayOfEntryModel,
  EntryModel,
  TArrayOfEntryModel,
  TEntryModel,
} from './model';

export const FindAll = {
  200: ArrayOfEntryModel,
};

export type TFindAll = {
  200: TArrayOfEntryModel;
};

export const AddOne = {
  201: EntryModel,
};

export type TAddOne = {
  201: TEntryModel;
};
