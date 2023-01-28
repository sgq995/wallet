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

export const StatusableSchema = Type.Object({
  status: Type.String(),
});

export function WithStatus<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([StatusableSchema, schema]);
}

export function toReplySchema(schema: TSchema) {
  return WithStatus(
    Type.Object({
      data: schema,
    })
  );
}

export function toErrorSchema(schema: TSchema) {
  return WithStatus(
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

export const IndexableSchema = Type.Object({
  id: Type.Integer(),
});

export type TIndexableSchema = Static<typeof IndexableSchema>;

export function WithId<
  Properties extends TProperties = TProperties,
  Schema extends TObject<TProperties> = TObject<Properties>
>(schema: Schema) {
  return Type.Intersect([IndexableSchema, schema]);
}

export function PartialWithId<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([
    RecursivePartial(schema),
    Type.Partial(IndexableSchema),
  ]);
}

export const PaginableSchema = Type.Object({
  paging: Type.Object({
    page: Type.Optional(Type.String()),
    previous: Type.Optional(Type.String()),
    next: Type.Optional(Type.String()),
    offset: Type.Optional(Type.Number()),
    limit: Type.Optional(Type.Number()),
  }),
});

export type TPaginableSchema = Static<typeof PaginableSchema>;

export function WithPaging<
  Schema extends TObject<TProperties> = TObject<TProperties>
>(schema: Schema) {
  return Type.Intersect([schema, RecursivePartial(PaginableSchema)]);
}
