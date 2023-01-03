import { Request, Reply } from '@wallet/schemas/entry-types';
import { EndpointService } from './api';

const ENTRY_TYPES_BASE_URL = '/v1/entry-types';

const entryTypesService = new EndpointService<{
  Id: Request.TParams['id'];
  Query: Request.TQuery;
  Reply: {
    FindAll: Reply.TFindAll;
    FindOne: Reply.TFindOne;
  };
}>(ENTRY_TYPES_BASE_URL);

export default entryTypesService;

export type {
  TEntryTypeModel,
  TArrayOfEntryTypeModel,
} from '@wallet/schemas/entry-types/model';
