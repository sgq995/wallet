import {
  ContextConfigDefault,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawServerBase,
} from 'fastify';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { SessionRequest } from 'supertokens-node/framework/fastify';

// export type DefaultRouteHandlerMethod<
//   T extends RouteGenericInterface = RouteGenericInterface
// > = RouteHandlerMethod<
//   RawServerDefault,
//   RawRequestDefaultExpression<RawServerDefault>,
//   RawReplyDefaultExpression<RawServerDefault>,
//   T
// >;

export type FastifyRequestWithSession<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>
> = FastifyRequest<RouteGeneric, RawServer, RawRequest> &
  Pick<SessionRequest, 'session'>;

export type DefaultRouteHandlerMethod<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>
> = (
  this: FastifyInstance<RawServer, RawRequest, RawReply>,
  request: FastifyRequest<RouteGeneric, RawServer, RawRequest>,
  reply: FastifyReply<RawServer, RawRequest, RawReply, RouteGeneric>
) => void | Promise<RouteGeneric['Reply'] | void>;

export type DefaultRouteHandlerMethodWithSession<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  ContextConfig = ContextConfigDefault
> = (
  this: FastifyInstance<RawServer, RawRequest, RawReply>,
  request: FastifyRequestWithSession<RouteGeneric, RawServer, RawRequest>,
  reply: FastifyReply<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig
  >
) => void | Promise<RouteGeneric['Reply'] | void>;
