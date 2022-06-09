import { Static, TSchema, Type } from '@sinclair/typebox';

export type ComposeStatic<T> = T[keyof T] extends TSchema
  ? Static<T[keyof T]>
  : T[keyof T];

export function OK<T extends TSchema>(data: T) {
  return {
    200: Type.Object({
      statusCode: Type.Literal(200),
      data,
    }),
  };
}

export function Created<T extends TSchema>(data: T) {
  return {
    201: Type.Object({
      statusCode: Type.Literal(201),
      data,
    }),
  };
}

export function BadRequest() {
  return {
    400: Type.Object({
      statusCode: Type.Literal(400),
      error: Type.Literal('Bad Request'),
      message: Type.String(),
    }),
  };
}

export function NotFound() {
  return {
    404: Type.Object({
      statusCode: Type.Literal(404),
      error: Type.Literal('Not Found'),
      message: Type.String(),
    }),
  };
}
