import { Static, Type } from '@sinclair/typebox';

import { Id } from '../custom-types/id';

export const EntryTypeModel = Type.Object({
  id: Id(),
  name: Type.String(),
});

export type TEntryTypeModel = Static<typeof EntryTypeModel>;

export const ArrayOfEntryTypeModel = Type.Array(EntryTypeModel);

export type TArrayOfEntryTypeModel = Static<typeof ArrayOfEntryTypeModel>;
