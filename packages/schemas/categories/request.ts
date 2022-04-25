import { Static, Type } from '@sinclair/typebox';

import { CategoryModel } from './model';

export const Params = Type.Required(Type.Pick(CategoryModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(CategoryModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Omit(CategoryModel, ['id']);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Intersect([
  Type.Pick(CategoryModel, ['id']),
  Type.Partial(Type.Omit(CategoryModel, ['id'])),
]);

export type TUpdateOne = Static<typeof UpdateOne>;
