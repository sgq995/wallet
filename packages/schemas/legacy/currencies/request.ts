import { Static, Type } from '@sinclair/typebox';

import { CurrencyModel } from './model';

export const Params = Type.Required(Type.Pick(CurrencyModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(CurrencyModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Omit(CurrencyModel, ['id']);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Partial(Type.Omit(CurrencyModel, ['id']));

export type TUpdateOne = Static<typeof UpdateOne>;
