import { Static, Type } from '@sinclair/typebox';

import { Id } from '../custom-types/id';
import { Nullable } from '../helpers/nullable';
import { TransactionModel } from '../transactions/model';

export const EntryModel = Type.Object({
  id: Id(),
  description: Type.String({ maxLength: 255 }),
  transaction: Type.Optional(TransactionModel),
  transactionId: Id(),
  date: Type.String({
    description: 'YYYY-MM-DD',
    pattern: '\\d{4}-\\d{2}-\\d{2}',
  }),
  typeId: Id(),
  accountId: Nullable(Id()),
  categoryId: Nullable(Id()),
  tagId: Nullable(Id()),
  // profileId: Id(),
});

export type TEntryModel = Static<typeof EntryModel>;

export const ArrayOfEntryModel = Type.Array(EntryModel);

export type TArrayOfEntryModel = Static<typeof ArrayOfEntryModel>;
