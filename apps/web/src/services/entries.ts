import { Request, Reply } from 'schemas/entries';

import { objectToUrlSearchParams } from '../utils/url-utils';
import { requestWithBaseFactory } from './api';

const ENTRIES_BASE_URL = '/v1/entries';

const entriesRequest = requestWithBaseFactory(ENTRIES_BASE_URL);

export function findAll(query?: Request.TQuery) {
  const searchParams = query ? objectToUrlSearchParams(query) : '';
  const url = query ? `/?${searchParams}` : '/';
  return entriesRequest<Reply.TFindAll>(url);
}

export function addOne(body: Request.TAddOne) {
  return entriesRequest<Reply.TAddOne>('/', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function findOne(id: Request.TParams['id']) {
  return entriesRequest<Reply.TFindOne>(`/${id}`);
}

export function updateOne(id: Request.TParams['id'], body: Request.TUpdateOne) {
  return entriesRequest<Reply.TUpdateOne>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function removeOne(id: Request.TParams['id']) {
  return entriesRequest<Reply.TRemoveOne>(`/${id}`, {
    method: 'DELETE',
  });
}
