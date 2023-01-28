import { HttpError } from '@wallet/utilities/http.utility';
import { isSuccessfulStatus } from '@wallet/utilities/rest.utility';
import { buildUrl } from './url.utility';

interface IRestOptions {
  baseUrl: string;
  endpoint: string;
}

interface IWithStatus {
  status: string;
}

interface IWithMessage {
  message: string;
}

interface ISuccessResponse<T, P = undefined> extends IWithStatus {
  data: T;
  paging: P;
}

interface IFailureResponse<T> extends IWithStatus {
  error: T | IWithMessage;
}

type TRestResponse<T, P = undefined> =
  | ISuccessResponse<T, P>
  | IFailureResponse<T>;

export function isSuccessResponse<T, P = undefined>(
  response: TRestResponse<T, P>
): response is ISuccessResponse<T, P> {
  return 'data' in response;
}

export function isFailureResponse<T, P = undefined>(
  response: TRestResponse<T, P>
): response is IFailureResponse<T> {
  return 'error' in response;
}

function isErrorWithMessage<T>(error: T | IWithMessage): error is IWithMessage {
  return typeof error === 'object' && 'message' in error;
}

async function restFetch<T, P = undefined>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ISuccessResponse<T, P>> {
  const response = await fetch(input, {
    ...init,
    headers: { ...init?.headers, 'Content-Type': 'application/json' },
  });

  const body: TRestResponse<T, P> = await response.json();
  if (isSuccessfulStatus(response.status) && isSuccessResponse(body)) {
    return body;
  }

  if (!isFailureResponse(body)) {
    throw new Error(`Unknown response ${JSON.stringify(body)}`);
  }

  if (isErrorWithMessage(body.error)) {
    throw new HttpError(response.status, body.error.message);
  }

  throw new HttpError(response.status, JSON.stringify(body.error));
}

export type TGetOptions<Query extends Record<string, any>> = IRestOptions &
  RequestInit & {
    query?: Query;
  };

export async function restGet<
  T,
  P = undefined,
  Query extends Record<string, any> = Record<string, any>
>({
  baseUrl,
  endpoint,
  query,
  ...init
}: TGetOptions<Query>): Promise<ISuccessResponse<T, P>> {
  const url = buildUrl(baseUrl, endpoint, query);
  return restFetch(url, { ...init, method: 'GET' });
}

export type TPostOptions<Body extends Record<string, any>> = IRestOptions &
  Omit<RequestInit, 'body'> & {
    body?: Body;
  };

export async function restPost<
  T,
  Body extends Record<string, any> = Record<string, any>
>({
  baseUrl,
  endpoint,
  body,
  ...init
}: TPostOptions<Body>): Promise<ISuccessResponse<T>> {
  const url = buildUrl(baseUrl, endpoint);
  return restFetch(url, {
    ...init,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export type TPatchOptions<Body extends Record<string, any>> = IRestOptions &
  Omit<RequestInit, 'body'> & {
    body?: Body;
  };

export async function restPatch<
  T,
  Body extends Record<string, any> = Record<string, any>
>({
  baseUrl,
  endpoint,
  body,
  ...init
}: TPatchOptions<Body>): Promise<ISuccessResponse<T>> {
  const url = buildUrl(baseUrl, endpoint);
  return restFetch(url, {
    ...init,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export type TDeleteOptions = IRestOptions & RequestInit;

export async function restDelete<T>({
  baseUrl,
  endpoint,
  body,
  ...init
}: TDeleteOptions): Promise<ISuccessResponse<T>> {
  const url = buildUrl(baseUrl, endpoint);
  return restFetch(url, { ...init, method: 'DELETE' });
}
