import { Request, Reply } from 'schemas/account-types';
import { EndpointService } from './api';

const ACCOUNT_TYPES_BASE_URL = '/v1/account-types';

const accountTypesService = new EndpointService<{
  Id: Request.TParams['id'];
  Query: Request.TQuery;
  Reply: {
    FindAll: Reply.TFindAll;
    FindOne: Reply.TFindOne;
  };
}>(ACCOUNT_TYPES_BASE_URL);

export default accountTypesService;
