import { Request, Reply } from 'schemas/categories';
import { EndpointService } from './api';

const ACCOUNTS_BASE_URL = '/v1/accounts';

const accountsService = new EndpointService<{
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
}>(ACCOUNTS_BASE_URL);

export default accountsService;
