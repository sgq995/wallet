import { Static, Type } from '@sinclair/typebox';

import { AccountModel } from './model';

export const Params = Type.Required(Type.Pick(AccountModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(AccountModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Pick(AccountModel, [
  'name',
  'balance',
  'currencyId',
]);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Intersect([
  Type.Partial(Type.Pick(AccountModel, ['name', 'balance', 'currencyId'])),
]);

export type TUpdateOne = Static<typeof UpdateOne>;
