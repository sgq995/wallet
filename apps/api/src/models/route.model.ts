export type TRouteParamsDefault = any;
export type TRouteQueryDefault = any;
export type TRouteBodyDefault = any;

export type TResolveOrUnknown<T> = [T] extends [undefined] ? unknown : T;

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
  <Reply = unknown>(): Reply | never;
  <Request extends IRouteArgs = IRouteArgs, Reply = unknown>(
    args: IRouteHandlerArgs<Request>
  ): Reply | never;
}

export interface IRoute {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  handler: IRouteGenericHandler;
}
