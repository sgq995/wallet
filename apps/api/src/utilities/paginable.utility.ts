import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import { IAppPagingModel } from '../models/paging.model';

export function paginableRestToModel(
  paging: TPaginableSchema['paging']
): IAppPagingModel {
  return {
    page: paging.page,
    previous: paging.previous,
    next: paging.next,
    offset: paging.offset,
    limit: paging.limit,
  };
}
