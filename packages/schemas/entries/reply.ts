import { Static } from '@sinclair/typebox';

import { Created, NotFound, OK } from '../helpers/responses';
import { ArrayOfEntryModel, EntryModel } from './model';

export const EntryArrayOK = OK(ArrayOfEntryModel);

export type TEntryArrayOK = Static<typeof EntryArrayOK['200']>;

export const EntryCreated = Created(EntryModel);

export type TEntryCreated = Static<typeof EntryCreated['201']>;

export const EntryOK = OK(EntryModel);

export type TEntryOK = Static<typeof EntryOK['200']>;

export const EntryNotFound = NotFound();

export type TEntryNotFound = Static<typeof EntryNotFound['404']>;

export const EntryRecord = {
  ...EntryOK,
  ...EntryNotFound,
};
