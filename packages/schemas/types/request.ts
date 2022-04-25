import { Static, Type } from '@sinclair/typebox';

import { TypeModel } from './model';

export const Params = Type.Required(Type.Pick(TypeModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(TypeModel);

export type TQuery = Static<typeof Query>;
