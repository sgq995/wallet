import {
  ContextConfigDefault,
  FastifyReply,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from 'fastify';

import { RouteGenericInterface } from 'fastify/types/route';

export function replyOK<
  T,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault
>(
  reply: FastifyReply<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig
  >,
  data: T
) {
  return reply.status(200).send({
    statusCode: 200,
    data,
  });
}

export function replyCreated<
  T,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault
>(
  reply: FastifyReply<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig
  >,
  data: T
) {
  return reply.status(201).send({
    statusCode: 201,
    data,
  });
}

export function replyNotFound<
  T,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault
>(
  reply: FastifyReply<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig
  >,
  message: string
) {
  return reply.status(404).send({
    statusCode: 404,
    error: 'Not Found',
    message,
  });
}
