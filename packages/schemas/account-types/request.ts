import { Static, Type } from '@sinclair/typebox';

import { AccountTypeModel } from './model';

export const Params = Type.Required(Type.Pick(AccountTypeModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(AccountTypeModel);

export type TQuery = Static<typeof Query>;
