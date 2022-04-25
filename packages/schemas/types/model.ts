import { Static, Type } from '@sinclair/typebox';

import { Id } from '../custom-types/id';

export const TypeModel = Type.Object({
  id: Id(),
  name: Type.String(),
});

export type TTypeModel = Static<typeof TypeModel>;

export const ArrayOfTypeModel = Type.Array(TypeModel);

export type TArrayOfTypeModel = Static<typeof ArrayOfTypeModel>;
