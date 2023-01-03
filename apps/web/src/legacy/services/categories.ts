import { Request, Reply } from '@wallet/schemas/categories';
import { EndpointService } from './api';

const CATEGORIES_BASE_URL = '/v1/categories';

const categoriesService = new EndpointService<{
  Id: Request.TParams['id'];
  Query: Request.TQuery;
  Request: {
    AddOne: Request.TAddOne;
    UpdateOne: Request.TUpdateOne;
  };
  Reply: {
    FindAll: Reply.TFindAll;
    AddOne: Reply.TAddOne;
    FindOne: Reply.TFindOne;
    UpdateOne: Reply.TUpdateOne;
    RemoveOne: Reply.TRemoveOne;
  };
}>(CATEGORIES_BASE_URL);

export default categoriesService;

export type {
  TCategoryModel,
  TArrayOfCategoryModel,
} from '@wallet/schemas/categories/model';
