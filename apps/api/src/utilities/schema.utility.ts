import { Static, TObject, TProperties, TSchema, Type } from '@sinclair/typebox';
import { TypeGuard } from '@sinclair/typebox/guard';

export function RecursivePartial<
  Properties extends TProperties = TProperties,
  Schema extends TObject<Properties> = TObject<Properties>
>(schema: Schema) {
  const properties = Object.keys(schema.properties).map(
    (property): [string, TSchema] => {
      const value = schema.properties[property];
      if (TypeGuard.TObject(value)) {
        return [property, RecursivePartial(value)];
      }

      return [property, value];
    }
  );
  return Type.Partial(
    Type.Object(
      properties.reduce((properties, pair) => {
        return { ...properties, [pair[0]]: pair[1] };
      }, {})
    )
  );
}

export const WithStatus = Type.Object({
  status: Type.String(),
});

export function withStatus<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([WithStatus, schema]);
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
  id: Type.Integer(),
});

export type TWithId = Static<typeof WithId>;

export function Indexable<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([WithId, schema]);
}

export function PartialAndIndexable<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([RecursivePartial(schema), Type.Partial(WithId)]);
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
