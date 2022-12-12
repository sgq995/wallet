import { TSchema } from '@sinclair/typebox';
import { HttpStatus } from '../utilities/http.utility';

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

export interface IReplyType {
  Reply?: TReplyDefault;
}

export interface IReply<Reply extends IReplyType = IReplyType> {
  status: HttpStatus;
  data: UndefinedToUnknown<Reply['Reply']>;
}

export interface IRouteArgs extends IRequestType, IReplyType {}

export type TRouteHandler<RouteArgs extends IRouteArgs = IRouteArgs> = (
  args: IRequest<RouteArgs>
) => IReply<RouteArgs> | never;

export interface ISchemaType {
  Params?: TSchema;
  Query?: TSchema;
  Headers?: Record<string, TSchema>;
  Body?: TSchema;
  Reply?: Record<number, TSchema>;
}

export interface IRouteSchema<SchemaType extends ISchemaType = ISchemaType> {
  params?: SchemaType['Params'];
  query?: SchemaType['Query'];
  headers?: SchemaType['Headers'];
  body?: SchemaType['Body'];
  reply?: SchemaType['Reply'];
}

export interface IRoute<RouteArgs extends IRouteArgs = IRouteArgs> {
  endpoint: string;
  method: THttpVerb;
  handler: TRouteHandler<RouteArgs>;
  schema?: IRouteSchema;
}
