import { Request, Reply } from '@wallet/schemas/entries';
import { EndpointService } from './api';

const ENTRIES_BASE_URL = '/v1/entries';

const entriesService = new EndpointService<{
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
}>(ENTRIES_BASE_URL);

export default entriesService;

export type { TEntryModel, TArrayOfEntryModel } from '@wallet/schemas/entries/model';
