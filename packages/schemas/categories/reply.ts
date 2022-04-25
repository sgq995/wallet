import { Created, NotFound, OK } from '../helpers/responses';
import { CategoryModel, ArrayOfCategoryModel } from './model';

export const CategoryArrayOK = OK(ArrayOfCategoryModel);

export const CategoryCreated = Created(CategoryModel);

export const CategoryOK = OK(CategoryModel);

export const CategoryRecord = {
  ...CategoryOK,
  ...NotFound(),
};
