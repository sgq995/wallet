import { Created, NotFound, OK } from '../helpers/responses';
import { ArrayOfEntryModel, EntryModel } from './model';

export const EntryArrayOK = OK(ArrayOfEntryModel);

export const EntryCreated = Created(EntryModel);

export const EntryOK = OK(EntryModel);

export const EntryRecord = {
  ...EntryOK,
  ...NotFound(),
};
