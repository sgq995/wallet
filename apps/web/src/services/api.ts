import config from '../config';
import { objectToUrlSearchParams } from '../utils/url-utils';

const BASE_URL = config.app.apiBaseUrl;

export class RequestError<T = any> extends Error {
  readonly status: number;
  readonly body: T;

  constructor(status: number, body: T, message?, options?) {
    super(message, options);

    this.status = status;
    this.body = body;
  }
}

export async function request<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  let response: Response = null;
  if (typeof input === 'string') {
    response = await fetch(`${BASE_URL}${input}`, init);
  } else {
    response = await fetch(
      {
        ...input,
        url: `${BASE_URL}${input.url}`,
      },
      init
    );
  }

  const body = await response.json();

  if (!response.ok) {
    throw new RequestError<T>(response.status, body);
  }

  return body;
}

export function requestWithBaseFactory(routeBase: string) {
  return function requestWithBase<T>(input: RequestInfo, init?: RequestInit) {
    if (typeof input === 'string') {
      return request<T>(`${routeBase}${input}`, init);
    } else {
      return request<T>(
        {
          ...input,
          url: `${routeBase}${input.url}`,
        },
        init
      );
    }
  };
}

type TDefault = unknown;

export interface IEndpointServiceRequest {
  AddOne?: TDefault;
  UpdateOne?: TDefault;
}

export interface IEndpointServiceReply {
  FindAll?: TDefault;
  AddOne?: TDefault;
  FindOne?: TDefault;
  UpdateOne?: TDefault;
  RemoveOne?: TDefault;
}

export interface IEndpointServiceOptions {
  Id?: TDefault;
  Query?: TDefault;
  Request?: IEndpointServiceRequest;
  Reply?: IEndpointServiceReply;
}
export class EndpointService<
  Options extends IEndpointServiceOptions = IEndpointServiceOptions
> {
  constructor(private basePath: string) {}

  request<T>(input: RequestInfo, init?: RequestInit) {
    if (typeof input === 'string') {
      return request<T>(`${this.basePath}${input}`, init);
    } else {
      return request<T>(
        {
          ...input,
          url: `${this.basePath}${input.url}`,
        },
        init
      );
    }
  }

  findAll = <TQuery = Options['Query'], TFindAll = Options['Reply']['FindAll']>(
    query?: TQuery,
    init?: RequestInit
  ) => {
    const searchParams = query ? objectToUrlSearchParams(query) : '';
    const url = query ? `/?${searchParams}` : '/';
    return this.request<TFindAll>(url, init);
  };

  addOne = <
    TRequestAddOne = Options['Request']['AddOne'],
    TReplyAddOne = Options['Reply']['AddOne']
  >(
    body: TRequestAddOne,
    init?: RequestInit
  ) => {
    return this.request<TReplyAddOne>('/', {
      ...init,
      method: 'POST',
      headers: {
        ...(typeof init?.headers === 'object' ? init.headers : {}),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  findOne = <TId = Options['Id'], TFindOne = Options['Reply']['FindOne']>(
    id: TId,
    init?: RequestInit
  ) => {
    return this.request<TFindOne>(`/${id}`, init);
  };

  updateOne = <
    TId = Options['Id'],
    TRequestUpdateOne = Options['Request']['UpdateOne'],
    TReplyUpdateOne = Options['Reply']['UpdateOne']
  >(
    id: TId,
    body: TRequestUpdateOne,
    init?: RequestInit
  ) => {
    return this.request<TReplyUpdateOne>(`/${id}`, {
      ...init,
      method: 'PUT',
      headers: {
        ...(typeof init?.headers === 'object' ? init.headers : {}),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  removeOne = <TId = Options['Id'], TRemoveOne = Options['Reply']['RemoveOne']>(
    id: TId,
    init?: RequestInit
  ) => {
    return this.request<TRemoveOne>(`/${id}`, {
      ...init,
      method: 'DELETE',
    });
  };
}
