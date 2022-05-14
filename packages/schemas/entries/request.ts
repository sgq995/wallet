import { Static, Type } from '@sinclair/typebox';

import { EntryModel } from './model';

export const Params = Type.Required(Type.Pick(EntryModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(EntryModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Intersect([
  Type.Pick(EntryModel, ['amount', 'date', 'typeId']),
  Type.Partial(
    Type.Pick(EntryModel, ['description', 'accountId', 'categoryId'])
  ),
]);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Partial(
  Type.Pick(EntryModel, [
    'description',
    'amount',
    'date',
    'typeId',
    'accountId',
    'categoryId',
  ])
);

export type TUpdateOne = Static<typeof UpdateOne>;
