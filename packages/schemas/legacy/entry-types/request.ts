import { Static, Type } from '@sinclair/typebox';

import { EntryTypeModel } from './model';

export const Params = Type.Required(Type.Pick(EntryTypeModel, ['id']));

export type TParams = Static<typeof Params>;

export const Query = Type.Partial(EntryTypeModel);

export type TQuery = Static<typeof Query>;
