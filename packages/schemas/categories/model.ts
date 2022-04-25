import { Static, Type } from '@sinclair/typebox';

import { Id } from '../types/id';

export const CategoryModel = Type.Object({
  id: Id(),
  name: Type.String(),
});

export type TCategoryModel = Static<typeof CategoryModel>;

export const ArrayOfCategoryModel = Type.Array(CategoryModel);

export type TArrayOfCategoryModel = Static<typeof ArrayOfCategoryModel>;
