import {
  FastifyInstance,
  FastifyReply,
  RawServerDefault,
  ContextConfigDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { VerifySessionOptions } from 'supertokens-node/recipe/session';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';
import { FastifyRequestWithSession } from './types';

export interface preHandlerAsyncHookHandlerWithSession<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  ContextConfig = ContextConfigDefault
> {
  (
    this: FastifyInstance,
    request: FastifyRequestWithSession<RouteGeneric, RawServer, RawRequest>,
    reply: FastifyReply<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig
    >
  ): void;
}

export function verifySessionHandler<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  ContextConfig = ContextConfigDefault
>(
  options?: VerifySessionOptions
): preHandlerAsyncHookHandlerWithSession<
  RouteGeneric,
  RawServer,
  RawRequest,
  RawReply,
  ContextConfig
> {
  return verifySession(options) as preHandlerAsyncHookHandlerWithSession<
    RouteGeneric,
    RawServer,
    RawRequest,
    RawReply,
    ContextConfig
  >;
}
