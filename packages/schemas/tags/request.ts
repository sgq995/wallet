import { Static, Type } from '@sinclair/typebox';

import { TagModel } from './model';

export const Params = Type.Required(Type.Pick(TagModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(TagModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Omit(TagModel, ['id']);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Partial(Type.Omit(TagModel, ['id']));

export type TUpdateOne = Static<typeof UpdateOne>;
