import { Static, Type } from '@sinclair/typebox';
import { CreateQuery } from '../helpers/models';

import { AccountModel } from './model';

export const Params = Type.Required(Type.Pick(AccountModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = CreateQuery(AccountModel);

export type TQuery = Static<typeof Query>;

export const AddOne = Type.Intersect([
  Type.Pick(AccountModel, ['name']),
  Type.Object({
    transaction: Type.Pick(AccountModel['properties']['transaction'], [
      'units',
      'cents',
      'currencyId',
    ]),
  }),
]);

export type TAddOne = Static<typeof AddOne>;

export const UpdateOne = Type.Intersect([
  Type.Partial(Type.Omit(AccountModel, ['id', 'transactionId', 'transaction'])),
  Type.Partial(
    Type.Object({
      transaction: Type.Partial(
        Type.Pick(AccountModel['properties']['transaction'], [
          'units',
          'cents',
          'currencyId',
        ])
      ),
    })
  ),
]);

export type TUpdateOne = Static<typeof UpdateOne>;
