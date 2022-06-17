import { HttpBadRequest, HttpNotFound } from '../commons/reply';
import { ComposeStatic, Created, OK } from '../helpers/responses';
import { CategoryModel, ArrayOfCategoryModel } from './model';

export const CategoryArrayOK = OK(ArrayOfCategoryModel);

export const CategoryCreated = Created(CategoryModel);

export const CategoryOK = OK(CategoryModel);

export const CategoryRecord = {
  ...CategoryOK,
  ...HttpNotFound,
};

export const FindAll = {
  ...CategoryArrayOK,
  ...HttpBadRequest,
};

export type TFindAll = ComposeStatic<typeof FindAll>;

export type TFindAllData = ComposeStatic<typeof CategoryArrayOK>;

export type TFindAllError = ComposeStatic<typeof HttpBadRequest>;

export const AddOne = {
  ...CategoryOK,
  ...HttpBadRequest,
};

export type TAddOne = ComposeStatic<typeof AddOne>;

export type TAddOneData = ComposeStatic<typeof CategoryOK>;

export type TAddOneError = ComposeStatic<typeof HttpBadRequest>;

export const FindOne = {
  ...CategoryCreated,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TFindOne = ComposeStatic<typeof FindOne>;

export const UpdateOne = {
  ...CategoryOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TUpdateOne = ComposeStatic<typeof UpdateOne>;

export const RemoveOne = {
  ...CategoryOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TRemoveOne = ComposeStatic<typeof RemoveOne>;
