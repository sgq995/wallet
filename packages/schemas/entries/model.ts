import { Static, Type } from '@sinclair/typebox';

import { Id } from '../types/id';
import { Nullable } from '../helpers/nullable';

export const EntryModel = Type.Object({
  id: Id(),
  description: Type.String(),
  amount: Type.Number({ minimum: 0, maximum: Number.MAX_VALUE }),
  date: Type.String({
    pattern: '\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2})?',
  }),
  typeId: Id(),
  accountId: Nullable(Id()),
  categoryId: Nullable(Id()),
});

export type TEntryModel = Static<typeof EntryModel>;

export const ArrayOfEntryModel = Type.Array(EntryModel);

export type TArrayOfEntryModel = Static<typeof ArrayOfEntryModel>;
