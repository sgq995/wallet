import { objectToUrlSearchParams } from '../utils/url-utils';

const BASE_URL = 'http://localhost:5000';

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

export class BaseEndpointService {
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
}

export enum EndpointServiceMethod {
  FindAll = 'findAll',
  AddOne = 'addOne',
  FindOne = 'findOne',
  UpdateOne = 'updateOne',
  RemoveOne = 'removeOne',
}

interface IEndpointServiceFindAll<TQuery, TReply> {
  [EndpointServiceMethod.FindAll]: (query?: TQuery) => Promise<TReply>;
}

interface IEndpointServiceAddOne<TRequest, TReply> {
  [EndpointServiceMethod.AddOne]: (body: TRequest) => Promise<TReply>;
}
interface IEndpointServiceFindOne<TId, TReply> {
  [EndpointServiceMethod.FindOne]: (id: TId) => Promise<TReply>;
}
interface IEndpointServiceUpdateOne<TId, TRequest, TReply> {
  [EndpointServiceMethod.UpdateOne]: (
    id: TId,
    body: TRequest
  ) => Promise<TReply>;
}
interface IEndpointServiceRemoveOne<TId, TRemoveOne> {
  [EndpointServiceMethod.RemoveOne]: (id: TId) => Promise<TRemoveOne>;
}

export interface IEndpointServiceRequest {
  AddOne?: unknown;
  UpdateOne?: unknown;
}

export interface IEndpointServiceReply {
  FindAll?: unknown;
  AddOne?: unknown;
  FindOne?: unknown;
  UpdateOne?: unknown;
  RemoveOne?: unknown;
}

export interface IEndpointServiceOptions {
  Id?: unknown;
  Query?: unknown;
  Request?: IEndpointServiceRequest;
  Reply?: IEndpointServiceReply;
}

export type TEndpointService<
  Options extends IEndpointServiceOptions = IEndpointServiceOptions
> = BaseEndpointService &
  IEndpointServiceFindAll<Options['Query'], Options['Reply']['FindAll']> &
  IEndpointServiceAddOne<
    Options['Request']['AddOne'],
    Options['Reply']['AddOne']
  > &
  IEndpointServiceFindOne<Options['Id'], Options['Reply']['FindOne']> &
  IEndpointServiceUpdateOne<
    Options['Id'],
    Options['Request']['UpdateOne'],
    Options['Reply']['UpdateOne']
  > &
  IEndpointServiceRemoveOne<Options['Id'], Options['Reply']['RemoveOne']>;

function findAll<TQuery, TFindAll>(this: BaseEndpointService, query?: TQuery) {
  const searchParams = query ? objectToUrlSearchParams(query) : '';
  const url = query ? `/?${searchParams}` : '/';
  return this.request<TFindAll>(url);
}

function addOne<TRequestAddOne, TReplyAddOne>(
  this: BaseEndpointService,
  body: TRequestAddOne
) {
  return this.request<TReplyAddOne>('/', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

function findOne<TId, TFindOne>(this: BaseEndpointService, id: TId) {
  return this.request<TFindOne>(`/${id}`);
}

function updateOne<TId, TRequestUpdateOne, TReplyUpdateOne>(
  this: BaseEndpointService,
  id: TId,
  body: TRequestUpdateOne
) {
  return this.request<TReplyUpdateOne>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

function removeOne<TId, TRemoveOne>(this: BaseEndpointService, id: TId) {
  return this.request<TRemoveOne>(`/${id}`, {
    method: 'DELETE',
  });
}

type Flatten<T> = T extends any[] ? T[number] : T;

type TEndpointServiceKeys = (keyof TEndpointService)[];

export function endpointService<
  Options extends IEndpointServiceOptions,
  Methods extends TEndpointServiceKeys = TEndpointServiceKeys,
  Keys extends keyof TEndpointService = Flatten<Methods>,
  Return extends BaseEndpointService = BaseEndpointService &
    Pick<TEndpointService<Options>, Keys>
>(basePath: string, methods: Methods): Return {
  const base: unknown = new BaseEndpointService(basePath);
  return base as Return;
}
