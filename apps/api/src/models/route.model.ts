import { Static, TSchema } from '@sinclair/typebox';
import { HttpStatus } from '../utilities/http.utility';
import { Paging } from '../utilities/schema.utility';

type UndefinedToUnknown<T> = [T] extends [undefined] ? unknown : T;

export type THttpVerb = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type TParamsDefault = unknown;
type TQueryDefault = unknown;
type THeadersDefault = unknown;
type TBodyDefault = unknown;

export interface IRequestType {
  Params?: TParamsDefault;
  Query?: TQueryDefault;
  Headers?: THeadersDefault;
  Body?: TBodyDefault;
}

export interface IRequest<Request extends IRequestType = IRequestType> {
  params: UndefinedToUnknown<Request['Params']>;
  query: UndefinedToUnknown<Request['Query']>;
  headers: UndefinedToUnknown<Request['Headers']>;
  body: UndefinedToUnknown<Request['Body']>;
}

type TReplyDefault = unknown;
type TPagingDefault = Static<typeof Paging>;

export interface IReplyType {
  Reply?: TReplyDefault;
  Paging?: TPagingDefault;
}

export interface IReply<Reply extends IReplyType = IReplyType> {
  status: HttpStatus;
  data: UndefinedToUnknown<Reply['Reply']>;
  paging?: TPagingDefault;
}

export interface IRouteArgs extends IRequestType, IReplyType {}

export type TRouteHandler<RouteArgs extends IRouteArgs = IRouteArgs> = (
  args: IRequest<RouteArgs>
) => Promise<IReply<RouteArgs>> | IReply<RouteArgs> | never;

export interface ISchemaType {
  Params?: TSchema;
  Query?: TSchema;
  Headers?: Record<string, TSchema>;
  Body?: TSchema;
  Reply?: Record<number, TSchema>;
  Paging?: TPagingDefault;
}

export interface IRouteSchema<SchemaType extends ISchemaType = ISchemaType> {
  params?: SchemaType['Params'];
  query?: SchemaType['Query'];
  headers?: SchemaType['Headers'];
  body?: SchemaType['Body'];
  reply?: SchemaType['Reply'];
  paging?: SchemaType['Paging'];
}

export interface IRoute<RouteArgs extends IRouteArgs = IRouteArgs> {
  endpoint: string;
  method: THttpVerb;
  handler: TRouteHandler<RouteArgs>;
  schema?: IRouteSchema;
}
