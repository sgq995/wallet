import { HttpStatus } from '../utilities/http.utility';

export type TResolveOrUnknown<T> = [T] extends [undefined] ? unknown : T;

export type TReplyDefault = unknown;

export interface IReply<Data = TReplyDefault> {
  status: HttpStatus;
  data?: Data;
}

export type TRouteParamsDefault = unknown;
export type TRouteQueryDefault = unknown;
export type TRouteBodyDefault = unknown;

export interface IRouteArgs {
  Params: TRouteParamsDefault;
  Query: TRouteQueryDefault;
  Body: TRouteBodyDefault;
}

export interface IRequest<Args extends Partial<IRouteArgs> = IRouteArgs> {
  params: TResolveOrUnknown<Args['Params']>;
  query: TResolveOrUnknown<Args['Query']>;
  body: TResolveOrUnknown<Args['Body']>;
}

export interface IRouteHandler {
  <Data = unknown, Reply extends IReply<Data> = IReply<Data>>(): Reply | never;
  <
    Data = unknown,
    Request extends IRouteArgs = IRouteArgs,
    Reply extends IReply<Data> = IReply<Data>
  >(
    args: IRequest<Request>
  ): Reply | never;
}

export interface ISchemaType {
  Params: unknown;
  Query: unknown;
  Headers: unknown;
  Body: unknown;
  Reply: unknown;
}

export interface IRouteSchema<SchemaType extends ISchemaType = ISchemaType> {
  params?: SchemaType['Params'];
  query?: SchemaType['Query'];
  headers?: SchemaType['Headers'];
  body?: SchemaType['Body'];
  reply?: SchemaType['Reply'];
}

export interface IRoute {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  handler: IRouteHandler;
  schema?: IRouteSchema;
}
