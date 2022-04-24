import { Static, Type } from '@sinclair/typebox';

import { EntryModel } from './model';

export const Params = Type.Required(Type.Pick(EntryModel, ['id']));

export type TParams = Static<typeof Params>;

export const AddOne = Type.Intersect([
  Type.Omit(EntryModel, ['id', 'description', 'accountId', 'categoryId']),
  Type.Partial(Type.Omit(EntryModel, ['id', 'amount', 'date', 'typeId'])),
]);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Intersect([
  Type.Pick(EntryModel, ['id']),
  Type.Partial(Type.Omit(EntryModel, ['id'])),
]);

export type TUpdateOne = Static<typeof UpdateOne>;
