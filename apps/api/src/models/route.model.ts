export type TResolveOrUnknown<T> = [T] extends [undefined] ? unknown : T;

export type TReplyDefault = any;

export interface IReply<Data = TReplyDefault> {
  status: number;
  data?: Data;
}

export type TRouteParamsDefault = any;
export type TRouteQueryDefault = any;
export type TRouteBodyDefault = any;

export interface IRouteArgs {
  Params: TRouteParamsDefault;
  Query: TRouteQueryDefault;
  Body: TRouteBodyDefault;
}

export interface IRouteHandlerArgs<
  Args extends Partial<IRouteArgs> = IRouteArgs
> {
  params: TResolveOrUnknown<Args['Params']>;
  query: TResolveOrUnknown<Args['Query']>;
  body: TResolveOrUnknown<Args['Body']>;
}

export interface IRouteGenericHandler {
  <Data, Reply extends IReply<Data> = IReply<Data>>(): Reply | never;
  <
    Data,
    Request extends IRouteArgs = IRouteArgs,
    Reply extends IReply<Data> = IReply<Data>
  >(
    args: IRouteHandlerArgs<Request>
  ): Reply | never;
}

export interface IRoute {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  handler: IRouteGenericHandler;
}
