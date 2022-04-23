import { Static, Type } from '@sinclair/typebox';

export const EntryModel = Type.Object({
  description: Type.Optional(Type.String()),
  amount: Type.Number({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER }),
  date: Type.String({ pattern: '\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2})?' }),
  typeId: Type.Number({ minimum: 1 }),
  accountId: Type.Optional(Type.Number({ minimum: 1 })),
  categoryId: Type.Optional(Type.Number({ minimum: 1 })),
});

export type TEntryModel = Static<typeof EntryModel>;

export const ArrayOfEntryModel = Type.Array(EntryModel);

export type TArrayOfEntryModel = Static<typeof ArrayOfEntryModel>;
