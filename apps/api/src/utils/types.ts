import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';

export type DefaultRouteHandlerMethod<
  T extends RouteGenericInterface = RouteGenericInterface
> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  T
>;
