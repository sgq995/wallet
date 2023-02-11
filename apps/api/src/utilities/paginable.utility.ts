import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import { IPagingModel } from '../models/paging.model';

export function paginableRestToModel(
  paging: TPaginableSchema['paging']
): IPagingModel {
  return {
    page: paging.page,
    previous: paging.previous,
    next: paging.next,
    offset: paging.offset,
    limit: paging.limit,
  };
}
