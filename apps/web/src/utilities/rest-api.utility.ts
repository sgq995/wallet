import { buildUrl } from './url.utility';

const BASE_URL = 'http://localhost:5000';

interface IRestOptions {
  baseUrl: string;
  endpoint: string;
}

async function restFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: { ...init?.headers, 'Content-Type': 'application/json' },
  });

  const body = await response.json();
  if (200 <= response.status && response.status < 400) {
    return body;
  }

  throw new Error(`[${response.status}] ${body.error}`);
}

export type TGetOptions<Query extends Record<string, any>> = IRestOptions &
  RequestInit & {
    query?: Query;
  };

export async function restGet<
  T,
  Query extends Record<string, any> = Record<string, any>
>({ baseUrl, endpoint, query, ...init }: TGetOptions<Query>): Promise<T> {
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
>({ baseUrl, endpoint, body, ...init }: TPostOptions<Body>): Promise<T> {
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
>({ baseUrl, endpoint, body, ...init }: TPatchOptions<Body>): Promise<T> {
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
}: TDeleteOptions): Promise<T> {
  const url = buildUrl(baseUrl, endpoint);
  return restFetch(url, { ...init, method: 'DELETE' });
}
