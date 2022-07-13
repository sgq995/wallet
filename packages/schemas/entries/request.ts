import { Static, Type } from '@sinclair/typebox';

import { EntryModel } from './model';

export const Params = Type.Required(Type.Pick(EntryModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(EntryModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Intersect([
  Type.Pick(EntryModel, ['date', 'typeId']),
  Type.Object({
    transaction: Type.Pick(EntryModel['properties']['transaction'], [
      'units',
      'cents',
      'currencyId',
    ]),
  }),
  Type.Partial(
    Type.Pick(EntryModel, ['description', 'accountId', 'categoryId', 'tagId'])
  ),
]);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Intersect([
  Type.Partial(
    Type.Pick(EntryModel, [
      'description',
      'date',
      'typeId',
      'accountId',
      'categoryId',
      'tagId',
    ])
  ),
  Type.Object({
    transaction: Type.Partial(
      Type.Pick(EntryModel['properties']['transaction'], [
        'units',
        'cents',
        'currencyId',
      ])
    ),
  }),
]);

export type TUpdateOne = Static<typeof UpdateOne>;
