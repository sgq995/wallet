import { TSchema, Type } from '@sinclair/typebox';

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

export function NotFound() {
  return {
    404: Type.Object({
      statusCode: Type.Literal(201),
      error: Type.Literal('Not Found'),
      message: Type.String(),
    }),
  };
}
