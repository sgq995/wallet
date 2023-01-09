import { Static, Type } from '@sinclair/typebox';

import { TransactionModel } from './model';

export const Params = Type.Required(Type.Pick(TransactionModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(TransactionModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Omit(TransactionModel, ['id']);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Partial(Type.Omit(TransactionModel, ['id']));

export type TUpdateOne = Static<typeof UpdateOne>;
