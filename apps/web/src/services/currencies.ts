import { Request, Reply } from 'schemas/currencies';
import { EndpointService } from './api';

const CURRENCIES_BASE_URL = '/v1/currencies';

const currenciesService = new EndpointService<{
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
}>(CURRENCIES_BASE_URL);

export default currenciesService;

export type {
  TCurrencyModel,
  TArrayOfCurrencyModel,
} from 'schemas/currencies/model';
