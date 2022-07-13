import { Static, Type } from '@sinclair/typebox';

import { Id } from '../custom-types/id';

export const TagModel = Type.Object({
  id: Id(),
  name: Type.String(),
});

export type TTagModel = Static<typeof TagModel>;

export const ArrayOfTagModel = Type.Array(TagModel);

export type TArrayOfTagModel = Static<typeof ArrayOfTagModel>;
