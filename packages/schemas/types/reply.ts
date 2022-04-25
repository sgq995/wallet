import { NotFound, OK } from '../helpers/responses';
import { TypeModel, ArrayOfTypeModel } from './model';

export const TypeArrayOK = OK(ArrayOfTypeModel);

export const TypeOK = OK(TypeModel);

export const TypeRecord = {
  ...TypeOK,
  ...NotFound(),
};
