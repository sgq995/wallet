import { TObject, TProperties, TSchema, Type } from '@sinclair/typebox';

export const WithStatus = Type.Object({
  status: Type.String(),
});

export function withStatus<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([schema, WithStatus]);
}

export function toReplySchema(schema: TSchema) {
  return withStatus(
    Type.Object({
      data: schema,
    })
  );
}

export function toErrorSchema(schema: TSchema) {
  return withStatus(
    Type.Object({
      error: Type.Union([
        schema,
        Type.Object({
          message: Type.String(),
        }),
      ]),
    })
  );
}

export const WithId = Type.Object({
  id: Type.String(),
});

export function withId<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([schema, WithId]);
}

export const Paging = Type.Object({
  page: Type.Optional(Type.String()),
  previous: Type.Optional(Type.String()),
  next: Type.Optional(Type.String()),
  offset: Type.Optional(Type.Number()),
  limit: Type.Optional(Type.Number()),
});

export function withPagingSchema<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([
    schema,
    Type.Object({
      paging: Type.Optional(Paging),
    }),
  ]);
}
